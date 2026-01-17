//bootstraps app

import { WebSocketServer, WebSocket } from "ws";
import type { RawData } from "ws";

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (socket: WebSocket) => {
  console.log("✅ Client connected");

  //listen for msg from cilent
  socket.on("message", (data: RawData) => {
    console.log("Message recieved:", data.toString());
  });
  //handle cilent disconnect
  socket.on("close", () => {
    console.log("❌ Client disconnected");
  });
  //handle socket level error
  socket.on("error", (err: Error) => {
    console.error("⚠️ WebSocket error:", err.message);
  });
});

console.log(`WebSocket server running on ws://localhost:${PORT}`);
