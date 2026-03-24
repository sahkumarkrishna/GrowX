/**
 * WebRTC Signaling via Socket.io
 * Mount this in your backend/index.js after creating the HTTP server.
 *
 * Usage:
 *   import { setupInterviewSocket } from "./sockets/interview.socket.js";
 *   setupInterviewSocket(io);
 */

export const setupInterviewSocket = (io) => {
  const rooms = new Map(); // roomId → Set of socket IDs

  const interviewNs = io.of("/interview");

  interviewNs.on("connection", (socket) => {
    console.log("[Socket] Interview client connected:", socket.id);

    // ── Join Room ────────────────────────────────────────────────────────────
    socket.on("join-room", ({ roomId, userId, userName, role }) => {
      socket.join(roomId);
      socket.data = { roomId, userId, userName, role };

      if (!rooms.has(roomId)) rooms.set(roomId, new Set());
      rooms.get(roomId).add(socket.id);

      const peers = [...rooms.get(roomId)].filter((id) => id !== socket.id);

      // Tell new user about existing peers
      socket.emit("room-peers", { peers });

      // Tell existing peers about new user
      socket.to(roomId).emit("user-joined", {
        socketId: socket.id,
        userId,
        userName,
        role,
      });

      console.log(`[Room] ${userName} (${role}) joined ${roomId}`);
    });

    // ── WebRTC Signaling ─────────────────────────────────────────────────────
    socket.on("offer", ({ to, offer }) => {
      interviewNs.to(to).emit("offer", { from: socket.id, offer });
    });

    socket.on("answer", ({ to, answer }) => {
      interviewNs.to(to).emit("answer", { from: socket.id, answer });
    });

    socket.on("ice-candidate", ({ to, candidate }) => {
      interviewNs.to(to).emit("ice-candidate", { from: socket.id, candidate });
    });

    // ── Chat ─────────────────────────────────────────────────────────────────
    socket.on("chat-message", ({ roomId, message, userName, timestamp }) => {
      interviewNs.to(roomId).emit("chat-message", {
        socketId: socket.id,
        userName,
        message,
        timestamp,
      });
    });

    // ── Screen Share Toggle ──────────────────────────────────────────────────
    socket.on("screen-share-started", ({ roomId }) => {
      socket.to(roomId).emit("screen-share-started", { socketId: socket.id });
    });

    socket.on("screen-share-stopped", ({ roomId }) => {
      socket.to(roomId).emit("screen-share-stopped", { socketId: socket.id });
    });

    // ── Proctoring Events ────────────────────────────────────────────────────
    socket.on("tab-switch", ({ roomId, count }) => {
      socket.to(roomId).emit("proctor-event", {
        type: "tab-switch",
        socketId: socket.id,
        count,
      });
    });

    socket.on("multiple-faces", ({ roomId, detected }) => {
      socket.to(roomId).emit("proctor-event", {
        type: "multiple-faces",
        socketId: socket.id,
        detected,
      });
    });

    // ── Leave / Disconnect ───────────────────────────────────────────────────
    socket.on("leave-room", () => handleLeave(socket));
    socket.on("disconnect", () => handleLeave(socket));
  });

  function handleLeave(socket) {
    const { roomId, userName } = socket.data || {};
    if (!roomId) return;

    socket.leave(roomId);
    if (rooms.has(roomId)) {
      rooms.get(roomId).delete(socket.id);
      if (rooms.get(roomId).size === 0) rooms.delete(roomId);
    }

    interviewNs.to(roomId).emit("user-left", {
      socketId: socket.id,
      userName,
    });

    console.log(`[Room] ${userName} left ${roomId}`);
  }
};