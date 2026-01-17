//Track connected clients and broad cast messages safely
import { WebSocket } from "ws";
const clients = new Set<WebSocket>(); //in memory cilent tracking


//username mapping per client 
const usernames = new Map<WebSocket, string>();
//register a new cilent connection
export function addClient(socket: WebSocket): void{
    clients.add(socket);
}

//remove a client connection
export function removeClient(socket: WebSocket): void {
    clients.delete(socket);
    usernames.delete(socket);
}
export function setUsername (socket: WebSocket, username: string): void{
    usernames.set(socket, username);
}
export function getUsername(socket: WebSocket): string | undefined{
    return usernames.get(socket);
}
/**
 * Broadcast a message to all connected clients
 * Optionally exclude the sender
 */
export function broadcast(
    message: string,
    exclude?: WebSocket
): void {
    for(const client of clients){
        //skip sender iif provided
        if(exclude && client === exclude) continue ;

        //only send to open connection
        if(client.readyState === WebSocket.OPEN) { //prevents crashes and sending to closed sockets (this check is mandatory in real systems)
            client.send(message);
        }
    }
}