import { useEffect, useRef, useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socketRef.current = socket;

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prev) => [...prev, data.payload?.text || e.data]);
    };

    return () => socket.close();
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    socketRef.current.send(
      JSON.stringify({ type: "chat", payload: { text: input } }),
    );
    setInput("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat Fiesta</h2>

      <div
        style={{ minHeight: 200, border: "1px solid #ccc", marginBottom: 10 }}
      >
        {messages.map((m, i) => (
          <div key={i}>{m}</div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
