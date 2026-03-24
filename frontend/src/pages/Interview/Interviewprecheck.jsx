import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Wifi, Mic, Camera, CheckCircle2, XCircle,
  Loader2, RefreshCw, ArrowRight, Shield,
} from "lucide-react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "sonner";

const CHECK_STEPS = [
  { id: "camera", label: "Camera Access", icon: Camera, description: "Verifying webcam permissions and video feed" },
  { id: "mic", label: "Microphone", icon: Mic, description: "Testing audio input and detecting sound levels" },
  { id: "internet", label: "Internet Speed", icon: Wifi, description: "Measuring upload/download bandwidth" },
  { id: "browser", label: "Browser Compatibility", icon: Shield, description: "Checking WebRTC and media support" },
];

const STATUS = { idle: "idle", checking: "checking", pass: "pass", fail: "fail" };

export default function InterviewPreCheck() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const analyserRef = useRef(null);
  const animFrameRef = useRef(null);

  const [results, setResults] = useState({
    camera: STATUS.idle,
    mic: STATUS.idle,
    internet: STATUS.idle,
    browser: STATUS.idle,
  });
  const [details, setDetails] = useState({});
  const [running, setRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(null);
  const [micLevel, setMicLevel] = useState(0);
  const [allPassed, setAllPassed] = useState(false);

  const setResult = (id, status, detail = "") => {
    setResults((prev) => ({ ...prev, [id]: status }));
    if (detail) setDetails((prev) => ({ ...prev, [id]: detail }));
  };

  // ── Check Camera ────────────────────────────────────────────────────────────
  const checkCamera = async () => {
    setCurrentStep("camera");
    setResult("camera", STATUS.checking);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      const tracks = stream.getVideoTracks();
      const settings = tracks[0]?.getSettings();
      setResult("camera", STATUS.pass, `${settings?.width}×${settings?.height} @ ${settings?.frameRate}fps`);
    } catch {
      setResult("camera", STATUS.fail, "Camera access denied or not found");
    }
  };

  // ── Check Microphone ────────────────────────────────────────────────────────
  const checkMic = async () => {
    setCurrentStep("mic");
    setResult("mic", STATUS.checking);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = new AudioContext();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;
      const buf = new Uint8Array(analyser.frequencyBinCount);

      let maxLevel = 0;
      const tick = () => {
        analyser.getByteFrequencyData(buf);
        const avg = buf.reduce((a, b) => a + b, 0) / buf.length;
        const pct = Math.min(100, (avg / 128) * 100);
        setMicLevel(pct);
        if (pct > maxLevel) maxLevel = pct;
        animFrameRef.current = requestAnimationFrame(tick);
      };
      tick();

      await new Promise((r) => setTimeout(r, 3000));
      cancelAnimationFrame(animFrameRef.current);
      ctx.close();
      stream.getTracks().forEach((t) => t.stop());

      if (maxLevel > 2) {
        setResult("mic", STATUS.pass, `Peak level: ${Math.round(maxLevel)}%`);
      } else {
        setResult("mic", STATUS.fail, "No audio detected — check mic or speak louder");
      }
      setMicLevel(0);
    } catch {
      setResult("mic", STATUS.fail, "Microphone access denied or not found");
    }
  };

  // ── Check Internet ──────────────────────────────────────────────────────────
  const checkInternet = async () => {
    setCurrentStep("internet");
    setResult("internet", STATUS.checking);
    try {
      const start = performance.now();
      await fetch(`https://www.cloudflare.com/cdn-cgi/trace?nocache=${Date.now()}`, { mode: "no-cors" });
      const latency = Math.round(performance.now() - start);

      const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      const speed = conn?.downlink ? `${conn.downlink} Mbps` : "unknown";

      if (latency < 300) {
        setResult("internet", STATUS.pass, `Latency: ${latency}ms${conn?.downlink ? ` · Speed: ${speed}` : ""}`);
      } else {
        setResult("internet", STATUS.fail, `High latency: ${latency}ms — may affect video quality`);
      }
    } catch {
      setResult("internet", STATUS.fail, "Could not reach network");
    }
  };

  // ── Check Browser ───────────────────────────────────────────────────────────
  const checkBrowser = async () => {
    setCurrentStep("browser");
    setResult("browser", STATUS.checking);
    await new Promise((r) => setTimeout(r, 600));

    const hasRTC = !!window.RTCPeerConnection;
    const hasMedia = !!(navigator.mediaDevices?.getUserMedia);
    const hasWS = !!window.WebSocket;

    if (hasRTC && hasMedia && hasWS) {
      setResult("browser", STATUS.pass, "WebRTC, MediaStream & WebSocket supported");
    } else {
      const missing = [!hasRTC && "WebRTC", !hasMedia && "MediaDevices", !hasWS && "WebSocket"]
        .filter(Boolean).join(", ");
      setResult("browser", STATUS.fail, `Missing: ${missing} — try Chrome/Edge`);
    }
  };

  const runAll = async () => {
    setRunning(true);
    setAllPassed(false);
    await checkCamera();
    await checkMic();
    await checkInternet();
    await checkBrowser();
    setCurrentStep(null);
    setRunning(false);
  };

  useEffect(() => {
    const vals = Object.values(results);
    if (vals.every((v) => v === STATUS.pass)) {
      setAllPassed(true);
      toast.success("✅ All checks passed! You're good to go.");
    }
  }, [results]);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const getIcon = (status) => {
    if (status === STATUS.pass) return <CheckCircle2 size={20} className="text-emerald-400" />;
    if (status === STATUS.fail) return <XCircle size={20} className="text-red-400" />;
    if (status === STATUS.checking) return <Loader2 size={20} className="text-violet-400 animate-spin" />;
    return <div className="w-5 h-5 rounded-full border-2 border-gray-600" />;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-violet-800/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-80 h-80 bg-blue-800/15 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 w-full max-w-3xl">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <IoMdArrowRoundBack size={20} />
          <span className="text-sm">Back</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="w-16 h-16 bg-violet-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield size={28} className="text-violet-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">System Pre-Check</h1>
          <p className="text-gray-400">Make sure everything's ready before your interview</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Checks */}
          <div className="space-y-4">
            {CHECK_STEPS.map(({ id, label, icon: Icon, description }) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`bg-white/5 border rounded-xl p-4 transition-colors ${
                  currentStep === id
                    ? "border-violet-500/50 bg-violet-500/5"
                    : results[id] === STATUS.pass
                    ? "border-emerald-500/30"
                    : results[id] === STATUS.fail
                    ? "border-red-500/30"
                    : "border-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    results[id] === STATUS.pass ? "bg-emerald-500/20" :
                    results[id] === STATUS.fail ? "bg-red-500/20" :
                    "bg-white/10"
                  }`}>
                    <Icon size={18} className={
                      results[id] === STATUS.pass ? "text-emerald-400" :
                      results[id] === STATUS.fail ? "text-red-400" : "text-gray-400"
                    } />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium text-sm">{label}</span>
                      {getIcon(results[id])}
                    </div>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {details[id] || description}
                    </p>
                  </div>
                </div>

                {/* Mic level bar */}
                {id === "mic" && results[id] === STATUS.checking && (
                  <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: `${micLevel}%` }}
                      className="h-full bg-gradient-to-r from-violet-500 to-emerald-500 rounded-full"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Right: Camera Preview */}
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden aspect-video relative">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              {results.camera === STATUS.idle && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                  <Camera size={40} className="mb-2 opacity-40" />
                  <span className="text-sm">Camera preview</span>
                </div>
              )}
              {results.camera === STATUS.fail && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/20">
                  <XCircle size={36} className="text-red-400 mb-2" />
                  <span className="text-red-400 text-sm">Camera unavailable</span>
                </div>
              )}
            </div>

            {/* Run button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={running}
              onClick={runAll}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white transition-all ${
                running
                  ? "bg-violet-700/50 cursor-not-allowed"
                  : "bg-violet-600 hover:bg-violet-500"
              }`}
            >
              {running ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Running checks…
                </>
              ) : (
                <>
                  <RefreshCw size={18} />
                  {Object.values(results).some((v) => v !== STATUS.idle) ? "Re-run Checks" : "Start System Check"}
                </>
              )}
            </motion.button>

            <AnimatePresence>
              {allPassed && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => navigate("/interview/my")}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors"
                >
                  <CheckCircle2 size={18} />
                  Go to My Interviews
                  <ArrowRight size={16} />
                </motion.button>
              )}
            </AnimatePresence>

            <p className="text-gray-600 text-xs text-center">
              We never store your video or audio during checks. All processing is local.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}