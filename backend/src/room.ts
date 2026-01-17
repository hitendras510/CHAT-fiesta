import { WebSocket } from "ws";

// roomid -> set of sockets in that room
const rooms = new Map<string, Set<WebSocket>>();

//track which room a socket is curr in 
const socketToRoom = new Map<WebSocket,string>();


//join a room
export function joinRoom(socket: WebSocket , roomid: string): void {
    //leave, if previous room  
    leaveRoom(socket);

    //create a room if didnt exist
    if(!rooms.has(roomid)){
        rooms.set(roomid, new Set());
    }
    rooms.get(roomid)!.add(socket);
    socketToRoom.set(socket, roomid);

    console.log(`[ROOM] socket joined room: ${roomid}`);
}

//leave current room
export function leaveRoom(socket: WebSocket): void {
    const roomid = socketToRoom.get(socket);
    if(!roomid) return;

    const room = rooms.get(roomid);
    if(!room) return;

    room.delete(socket);
    socketToRoom.delete(socket);

    //cleanup empty room
    if(room.size === 0){
        rooms.delete(roomid);
    }
   console.log(`[ROOM] socket left room: ${roomid}`);
}

//broadcast msg to everyone in the same room
export function broadcastRoom(
    socket: WebSocket,
    message: string
): void {
    const roomid = socketToRoom.get(socket);
        if (!roomid) return;

        const room = rooms.get(roomid);
        if(!room) return;
        
        for(const client of room){
            if(client !== socket && client.readyState === WebSocket.OPEN){
                client.send(message);
            }
        }
}