import React, { useEffect, useState, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
import api from '../../../../Api/baseurl';
import Chat from './Index';

export default function ChatPage() {
  const [connection, setConnection] = useState(null);
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAIMessage, setCurrentAIMessage] = useState('');
  const [chatMode, setChatMode] = useState('emotional');
  const bottomRef = useRef(null);
  const token = localStorage.getItem("token");

  // Scroll to bottom on chatLog update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog]);

  useEffect(() => {
    if (!token) {
      console.warn("Token not found. Cannot connect to chat hub.");
      return;
    }

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7237/chathub", {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    const fetchHistoryAndConnect = async () => {
      try {
        const res = (await api.get("/chat/message")).data;
        setChatLog(res.data || []);
      } catch (err) {
        console.error("Error fetching chat history", err);
      }

      try {
        await newConnection.start();
        console.log("✅ Connected to chat hub");

        newConnection.on("ReceiveMessage", (chunk) => {
          setCurrentAIMessage(prev => {
            const combined = (prev + chunk)
              .replace(/\b(\w+)[\s,.!?]*\1\b/gi, '$1')
              .replace(/[ \t]+\n/g, '\n')
              .replace(/\n{3,}/g, '\n\n')
              .replace(/[^\S\r\n]+/g, ' ')
              .replace(/ ?([.,!?]) ?/g, '$1 ')
              .replace(/\s+$/, '')
              .trim();
            return combined;
          });
        });

        setConnection(newConnection);
      } catch (err) {
        console.error("❌ SignalR connection failed:", err);
      }
    };

    fetchHistoryAndConnect();

    return () => {
      newConnection.stop();
    };
  }, [token]);

  useEffect(() => {
    if (!currentAIMessage) return;

    setChatLog(prev => {
      const updated = [...prev];
      const last = updated[updated.length - 1];

      if (!last || last.role !== 'AI') {
        updated.push({
          role: 'AI',
          message: currentAIMessage,
          mode: chatMode,
        });
      } else {
        updated[updated.length - 1] = {
          ...last,
          message: currentAIMessage,
          mode: chatMode,
        };
      }

      return updated;
    });
  }, [currentAIMessage]);

  const handleSend = async (message) => {
    if (connection && message.trim()) {
      setIsLoading(true);
      setCurrentAIMessage('');
      setChatLog(prev => [...prev, {
        role: 'User',
        message,
        mode: chatMode
      }]);

      try {
        const modeString = chatMode === 'emotional' ? "Emotional" : "CBT";
        await connection.invoke("StartChatSession", message, modeString, "");
      } catch (err) {
        console.error("❌ Error invoking chat:", err);
      }

      setIsLoading(false);
    }
  };

  const switchMode = (mode) => {
    setChatMode(mode);
    setCurrentAIMessage('');
  };

  return (
    <Chat
      chatLog={chatLog}
      isLoading={isLoading}
      chatMode={chatMode}
      onSend={handleSend}
      onModeChange={switchMode}
      bottomRef={bottomRef}
    />
  );
}
