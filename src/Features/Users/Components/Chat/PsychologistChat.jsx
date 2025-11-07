import React, { useEffect, useRef, useState } from "react";
import { createHubConnection } from "./signalrClient";
import axios from "axios";

export default function ChatPage({ sessionId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const connRef = useRef(null);

  useEffect(() => {
    axios.get(`/api/chats/${sessionId}/messages`).then(r => setMessages(r.data));

    const conn = createHubConnection((payload) => {
      setMessages(prev => [...prev, payload]);
    });

    conn.start().then(() => {
      connRef.current = conn;
      console.log("Connected to chat hub");
    }).catch(console.error);

    return () => {
      conn.stop();
    };
  }, [sessionId]);

  const send = async () => {
    if (!text.trim()) return;
    await connRef.current.invoke("SendMessage", sessionId, text);
    setText("");
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white border rounded shadow p-4 flex flex-col h-[70vh]">
        <div className="flex-1 overflow-auto mb-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`p-2 rounded ${m.senderId === getUserId() ? 'bg-indigo-100 self-end' : 'bg-gray-100 self-start'}`}>
              <div className="text-sm text-gray-600">{m.senderName ?? m.senderId}</div>
              <div className="mt-1">{m.message}</div>
              <div className="text-xs text-gray-400 mt-1">{new Date(m.sentAt).toLocaleString()}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            className="flex-1 border rounded px-3 py-2"
            placeholder="Type a message..."
          />
          <button onClick={send} className="bg-indigo-600 text-white px-4 py-2 rounded">Send</button>
        </div>
      </div>
    </div>
  );
}