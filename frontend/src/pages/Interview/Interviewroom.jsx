import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic, MicOff, Video, VideoOff, MonitorUp, Phone,
  MessageSquare, Send, Users, AlertTriangle, Clock,
  Maximize2, Minimize2, Circle,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { io } from "socket.io-client";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
const ICE_SERVERS = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
];

export default function InterviewRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth);

  // ── Refs ────────────────────────────────────────────────────────────────────
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pcRef = useRef(null);
  const localStreamRef = useRef(null);
  const socketRef = useRef(null);
  const tabSwitchCountRef = useRef(0);

  // ── State ───────────────────────────────────────────────────────────────────
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const [remoteSocketId, setRemoteSocketId] = useState(null);

  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [sharing, setSharing] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const [messages, setMessages] = useState([]);
  const [msgInput, setMsgInput] = useState("");

  const [elapsed, setElapsed] = useState(0);
  const [proctoringAlerts, setProctoringAlerts] = useState([]);

  // ── Timer ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (s) => `${String(Math.floor(s / 3600)).padStart(2, "0")}:${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  // ── Fetch interview ─────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const { data } = await axios.get(`${BACKEND}/api/v1/interview/room/${roomId}`, { withCredentials: true });
        if (data.success) {
          setInterview(data.interview);
          await axios.put(`${BACKEND}/api/v1/interview/${data.interview._id}/status`, { status: "ongoing" }, { withCredentials: true });
        }
      } catch {
        toast.error("Interview room not found");
        navigate("/interview/my");
      } finally {
        setLoading(false);
      }
    };
    fetchInterview();
  }, [roomId]);

  // ── Media + Socket + WebRTC ─────────────────────────────────────────────────
  useEffect(() => {
    if (!interview) return;

    let socket;
    let pc;

    const init = async () => {
      // 1. Get local media
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStreamRef.current = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      } catch {
        toast.error("Could not access camera/mic");
        return;
      }

      // 2. Socket
      socket = io(`${BACKEND}/interview`, { withCredentials: true });
      socketRef.current = socket;

      // 3. PeerConnection factory
      const createPC = () => {
        const connection = new RTCPeerConnection({ iceServers: ICE_SERVERS });
        localStreamRef.current.getTracks().forEach((t) => connection.addTrack(t, localStreamRef.current));

        connection.ontrack = (e) => {
          if (remoteVideoRef.current) remoteVideoRef.current.srcObject = e.streams[0];
        };

        connection.onicecandidate = (e) => {
          if (e.candidate && remoteSocketId) {
            socket.emit("ice-candidate", { to: remoteSocketId, candidate: e.candidate });
          }
        };

        return connection;
      };

      // 4. Join room
      socket.emit("join-room", {
        roomId,
        userId: user._id,
        userName: user.fullname,
        role: user.role,
      });

      socket.on("room-peers", async ({ peers }) => {
        if (peers.length > 0) {
          const peerId = peers[0];
          setRemoteSocketId(peerId);
          pc = createPC();
          pcRef.current = pc;

          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          socket.emit("offer", { to: peerId, offer });
        }
      });

      socket.on("user-joined", async ({ socketId, userName }) => {
        toast.info(`${userName} joined the room`);
        setRemoteSocketId(socketId);
        setConnected(true);

        if (!pcRef.current) {
          pc = createPC();
          pcRef.current = pc;
        }
      });

      socket.on("offer", async ({ from, offer }) => {
        setRemoteSocketId(from);
        if (!pcRef.current) {
          pc = createPC();
          pcRef.current = pc;
        }
        await pcRef.current.setRemoteDescription(offer);
        const answer = await pcRef.current.createAnswer();
        await pcRef.current.setLocalDescription(answer);
        socket.emit("answer", { to: from, answer });
        setConnected(true);
      });

      socket.on("answer", async ({ answer }) => {
        await pcRef.current?.setRemoteDescription(answer);
        setConnected(true);
      });

      socket.on("ice-candidate", async ({ candidate }) => {
        try { await pcRef.current?.addIceCandidate(candidate); } catch {}
      });

      socket.on("user-left", ({ userName }) => {
        toast.warning(`${userName} left the room`);
        setConnected(false);
        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
      });

      socket.on("chat-message", (msg) => {
        setMessages((prev) => [...prev, msg]);
      });

      socket.on("proctor-event", ({ type }) => {
        const alert = type === "tab-switch" ? "⚠️ Tab switch detected" : "⚠️ Multiple faces detected";
        setProctoringAlerts((prev) => [...prev.slice(-4), { text: alert, id: Date.now() }]);
      });
    };

    init();

    // ── Tab switch detection ─────────────────────────────────────────────────
    const onVisibility = () => {
      if (document.hidden) {
        tabSwitchCountRef.current += 1;
        socketRef.current?.emit("tab-switch", { roomId, count: tabSwitchCountRef.current });
        axios.put(`${BACKEND}/api/v1/interview/${interview._id}/proctor`, {
          event: "tab-switch",
          tabSwitchCount: tabSwitchCountRef.current,
        }, { withCredentials: true }).catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      localStreamRef.current?.getTracks().forEach((t) => t.stop());
      pcRef.current?.close();
      socketRef.current?.emit("leave-room");
      socketRef.current?.disconnect();
    };
  }, [interview]);

  // ── Controls ─────────────────────────────────────────────────────────────────
  const toggleMic = useCallback(() => {
    const track = localStreamRef.current?.getAudioTracks()[0];
    if (track) { track.enabled = !track.enabled; setMicOn(track.enabled); }
  }, []);

  const toggleCam = useCallback(() => {
    const track = localStreamRef.current?.getVideoTracks()[0];
    if (track) { track.enabled = !track.enabled; setCamOn(track.enabled); }
  }, []);

  const toggleScreenShare = useCallback(async () => {
    if (!sharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const screenTrack = screenStream.getVideoTracks()[0];
        const sender = pcRef.current?.getSenders().find((s) => s.track?.kind === "video");
        sender?.replaceTrack(screenTrack);
        if (localVideoRef.current) localVideoRef.current.srcObject = screenStream;
        screenTrack.onended = () => toggleScreenShare();
        socketRef.current?.emit("screen-share-started", { roomId });
        setSharing(true);
        toast.info("Screen sharing started");
      } catch { toast.error("Could not share screen"); }
    } else {
      const camTrack = localStreamRef.current?.getVideoTracks()[0];
      const sender = pcRef.current?.getSenders().find((s) => s.track?.kind === "video");
      sender?.replaceTrack(camTrack);
      if (localVideoRef.current) localVideoRef.current.srcObject = localStreamRef.current;
      socketRef.current?.emit("screen-share-stopped", { roomId });
      setSharing(false);
    }
  }, [sharing, roomId]);

  const sendMessage = () => {
    if (!msgInput.trim()) return;
    socketRef.current?.emit("chat-message", {
      roomId, message: msgInput, userName: user.fullname, timestamp: Date.now(),
    });
    setMessages((prev) => [...prev, { userName: "You", message: msgInput, timestamp: Date.now(), self: true }]);
    setMsgInput("");
  };

  const endCall = async () => {
    if (!confirm("End the interview session?")) return;
    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    socketRef.current?.emit("leave-room");
    socketRef.current?.disconnect();
    if (interview) {
      await axios.put(`${BACKEND}/api/v1/interview/${interview._id}/status`, { status: "completed" }, { withCredentials: true }).catch(() => {});
    }
    toast.success("Interview ended");
    navigate(user.role === "recruiter" ? "/interview/dashboard" : "/interview/my");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin w-10 h-10 rounded-full border-4 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  const isRecruiter = user?.role === "recruiter";

  return (
    <div className={`${fullscreen ? "fixed inset-0 z-50" : "min-h-screen"} bg-gray-950 flex flex-col`}>
      {/* Header */}
      <div className="bg-gray-900 border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${connected ? "bg-emerald-400 animate-pulse" : "bg-yellow-400"}`} />
          <span className="text-white font-semibold text-sm truncate max-w-[200px]">
            {interview?.title || "Interview Room"}
          </span>
          <span className="text-gray-500 text-xs hidden sm:block">
            {interview?.candidate?.fullname} ↔ {interview?.recruiter?.fullname}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-gray-800 px-3 py-1.5 rounded-lg">
            <Clock size={14} className="text-gray-400" />
            <span className="text-white font-mono text-sm">{formatTime(elapsed)}</span>
          </div>
          {tabSwitchCountRef.current > 0 && (
            <div className="flex items-center gap-1 bg-red-900/50 border border-red-500/30 px-2 py-1 rounded-lg">
              <AlertTriangle size={13} className="text-red-400" />
              <span className="text-red-300 text-xs">{tabSwitchCountRef.current} switches</span>
            </div>
          )}
          <button onClick={() => setFullscreen((f) => !f)} className="text-gray-400 hover:text-white">
            {fullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video grid */}
        <div className="flex-1 relative bg-gray-950 p-4 flex flex-col gap-4">
          {/* Remote */}
          <div className="flex-1 relative bg-gray-900 rounded-2xl overflow-hidden min-h-0">
            <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
            {!connected && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                <Users size={48} className="mb-3 opacity-40" />
                <p className="font-medium">Waiting for other participant…</p>
                <p className="text-sm mt-1 opacity-60">Share the meeting link to invite</p>
              </div>
            )}
            <div className="absolute bottom-3 left-3 bg-black/60 px-2 py-1 rounded text-white text-xs">
              {isRecruiter ? interview?.candidate?.fullname : interview?.recruiter?.fullname}
            </div>
          </div>

          {/* Local */}
          <div className="absolute bottom-20 right-6 w-36 aspect-video bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-white/10">
            <video ref={localVideoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
            {!camOn && (
              <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                <VideoOff size={20} className="text-gray-500" />
              </div>
            )}
            <div className="absolute bottom-1 left-1 bg-black/60 px-1 py-0.5 rounded text-white text-[10px]">You</div>
          </div>

          {/* Proctoring alerts */}
          <div className="absolute top-6 left-6 space-y-2">
            <AnimatePresence>
              {proctoringAlerts.map((a) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-900/80 border border-red-500/30 text-red-300 px-3 py-2 rounded-lg text-xs flex items-center gap-2"
                >
                  <AlertTriangle size={13} />
                  {a.text}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Chat Sidebar */}
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 300, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="bg-gray-900 border-l border-white/10 flex flex-col overflow-hidden"
            >
              <div className="p-4 border-b border-white/10">
                <h3 className="text-white font-semibold text-sm">Chat</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-3 min-h-0">
                {messages.length === 0 && (
                  <p className="text-gray-600 text-xs text-center mt-6">No messages yet</p>
                )}
                {messages.map((m, i) => (
                  <div key={i} className={`flex flex-col ${m.self ? "items-end" : "items-start"}`}>
                    <span className="text-gray-500 text-[10px] mb-1">{m.userName}</span>
                    <div className={`px-3 py-2 rounded-xl text-sm max-w-[220px] break-words ${
                      m.self ? "bg-violet-600 text-white" : "bg-gray-800 text-gray-200"
                    }`}>
                      {m.message}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-white/10 flex gap-2">
                <input
                  value={msgInput}
                  onChange={(e) => setMsgInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type a message…"
                  className="flex-1 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg border border-white/10 focus:border-violet-500 outline-none placeholder-gray-600"
                />
                <button onClick={sendMessage} className="bg-violet-600 hover:bg-violet-500 text-white p-2 rounded-lg transition-colors">
                  <Send size={15} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls bar */}
      <div className="bg-gray-900 border-t border-white/10 px-6 py-4 flex items-center justify-center gap-4">
        <ControlBtn icon={micOn ? Mic : MicOff} active={micOn} onClick={toggleMic} label={micOn ? "Mute" : "Unmute"} />
        <ControlBtn icon={camOn ? Video : VideoOff} active={camOn} onClick={toggleCam} label={camOn ? "Stop Video" : "Start Video"} />
        <ControlBtn icon={MonitorUp} active={sharing} onClick={toggleScreenShare} label={sharing ? "Stop Share" : "Share Screen"} accent="blue" />
        <ControlBtn
          icon={MessageSquare}
          active={chatOpen}
          onClick={() => setChatOpen((c) => !c)}
          label="Chat"
          accent="indigo"
        />
        <button
          onClick={endCall}
          className="flex flex-col items-center gap-1 bg-red-600 hover:bg-red-500 text-white px-5 py-3 rounded-xl transition-colors"
        >
          <Phone size={20} className="rotate-[135deg]" />
          <span className="text-xs">End</span>
        </button>
      </div>
    </div>
  );
}

function ControlBtn({ icon: Icon, active, onClick, label, accent = "violet" }) {
  const colors = {
    violet: active ? "bg-violet-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700",
    blue: active ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700",
    indigo: active ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700",
  };
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl transition-colors ${colors[accent]}`}>
      <Icon size={20} />
      <span className="text-xs">{label}</span>
    </button>
  );
}