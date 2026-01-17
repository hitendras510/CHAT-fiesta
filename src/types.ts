export type MessageType = 
| "chat"
| "join"
| "leave"
| "offer"
| "answer"
| "ice"
| "join-room"
| "leave-room";


export interface BaseMessage<T = unknown> {
  type: MessageType;
  payload: T; //payload is the message’s data; type tells the server how to interpret that data.
}
export interface joinRoomPayload {
    roomid: string;
}
export interface leaveRoomPayload {
    roomid: string;
}

export interface ChatPayload {
    text: string;
}

export interface JoinPayload {
    username: string;
}

//webrtc signaling payloads-> WebRTC signaling payload is the connection-setup data (offer, answer, ICE info) that the server simply forwards between peers so they can connect directly.
export interface OfferPayload {
    offer: unknown;
}
export interface AnswerPayload {
    answer: unknown;
}
export interface IceCandidatePayload {
  candidate: unknown;
}

/**
 * Union of all valid messages
 */
export type IncomingMessage =
  | { type: "chat"; payload: ChatPayload }
  | { type: "join"; payload: JoinPayload }
  | { type: "leave"; payload: {} }
  | { type: "offer"; payload: OfferPayload }
  | { type: "answer"; payload: AnswerPayload }
  | { type: "ice"; payload: IceCandidatePayload }
  | { type: "join-room"; payload: joinRoomPayload }
  | { type: "leave-room"; payload: leaveRoomPayload };
