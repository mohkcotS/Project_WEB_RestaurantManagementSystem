import { io } from "socket.io-client";

const socket = io("http://localhost:3001");


socket.on("connect", () => {
    console.log("✅ Connected to WebSocket server. ID:", socket.id);
  });
  
  socket.on("connect_error", (err) => {
    console.error("❌ Connection error:", err.message);
  });
  
export default socket;
