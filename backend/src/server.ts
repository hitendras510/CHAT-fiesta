// websocket server logic
// refactoring

import { WebSocketServer, WebSocket } from "ws";
import type { RawData } from "ws";
import { addClient, removeClient, broadcast } from "./clients.js";
import { leaveRoom } from "./room.js";

/**
 * Creates and starts a WebSocket server
 * All real-time logic starts here
 */
export function createWebSocketServer(port: number): WebSocketServer {
  const wss = new WebSocketServer({ port });

  console.log(`[WS] Server initialized on port ${port}`);

  // THIS is where sockets are created
  wss.on("connection", (socket: WebSocket) => {
    console.log("[WS] Client connected");

    // register client
    addClient(socket);

    // listen for messages
    socket.on("message", (data: RawData) => {
      const message = data.toString();
      console.log("[WS] Message received:", message);

      // broadcast to others
      broadcast(message, socket);
    });

    // handle disconnect
    socket.on("close", () => {
      leaveRoom(socket);
      removeClient(socket);
    });

    // handle socket errors
    socket.on("error", (err: Error) => {
      console.error("[WS] Socket error:", err.message);
      
      leaveRoom(socket);
      removeClient(socket);
    });
  });

  return wss;
}
