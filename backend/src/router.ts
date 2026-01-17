import { WebSocket } from "ws";
import { broadcast,setUsername,getUsername } from "./clients.js";
import type { IncomingMessage } from "./types.js";
import { broadcastRoom,joinRoom, leaveRoom } from "./room.js";

 
export function routeMessage(
    socket: WebSocket,
    message: IncomingMessage
): void{
    switch (
      message.type //looks at the intent of msg
    ) {
      case "chat": {
        const username = getUsername(socket) ?? "Anonymous";
        //this block runs only for chat msg
        const text = message.payload.text; // extracts the actual chat msg (payload = contains the data)
        broadcast(
          JSON.stringify({
            //websockets only send string or binary
            type: "chat",
            payload: {username, text },
          }),
          socket,
        );
        break;
      }
      case "join": {
        setUsername(socket, message.payload.username);
        //runs when user join
        console.log(`[JOIN] ${message.payload.username}`);
        break;
      }

      case "join-room" : {
        joinRoom(socket,message.payload.roomid);
          console.log(`[ROOM] joined ${message.payload.roomid}`);
          break;
      }
      case "leave-room" : {
        leaveRoom(socket);
        console.log("[ROOM] left rooom");
        break;
      }

      case "leave": {
        console.log(`[LEAVE] ${getUsername(socket)}`);
        break;
      }

      //These are connection setup messages
      case "offer":
      case "answer":
      case "ice": {
        console.log(`[RTC] ${message.type}`);
        break;
      }
      default: {
      console.warn("[ROUTER] Unknown message type");
      }
    }
}