Browser (React)
   │
   │ WebSocket (JSON messages)
   ▼
Node.js Backend (TypeScript)
   ├── Connection Manager
   ├── Message Router
   ├── Room Manager
   └── WebRTC Signaling
------------------------------------------------------------------------------------------------------------------------

src/
├── index.ts         # App entry point 
├── server.ts        # WebSocket server + lifecycle
├── clients.ts       # Connected client tracking  ->  without it you cannot broadcast or create rooms
├── rooms.ts         # Room logic (later) (Group of socket) -> only people in the same group get messages
├── router.ts        # Message routing by type  -> decides what to do with a msg
├── signaling.ts     # WebRTC signaling handlers
└── types.ts         # Shared message contracts -> what msg are allowed in your system : Implemented username tracking

------------------------------------------------------------------------------------------------------------------------
