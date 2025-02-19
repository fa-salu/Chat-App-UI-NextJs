import { axiosInstance } from "@/utils/axios";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

interface Message {
  senderId: string;
  receiverId: string;
  message: string;
}

interface ChatBoxProps {
  state: {
    id: string;
    name: string;
  };
}

export const socket = io("http://localhost:5000");

const ChatBox: React.FC<ChatBoxProps> = ({ state }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;

  useEffect(() => {
    const fetchChat = async () => {
      try {
        
        const res = await axiosInstance.get("http://localhost:5000/api/chat/messages");
        setMessages((prevMessages) => [...prevMessages, ...res.data]);
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };

    fetchChat();
    
    socket.on("receiveMessage", (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      if (!userId) {
        console.error("User ID is not available in localStorage");
        return;
      }

      const messageToSend = {
        senderId: userId,
        receiverId: state.id,
        content: message,
      };

      socket.emit("sendMessage", messageToSend);
      setMessage("");
    } else {
      console.error("Cannot send an empty message.");
    }
  };

  return (
    <div className="w-1/2 h-full p-4 bg-white flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-xl">Chat with {state.name || "User"}</h2>
      </div>

      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.senderId === userId ? "justify-start" : "justify-end"} mb-2`}
          >
            <div
              className={`p-3 rounded-lg ${msg.senderId === userId ? "bg-gray-200" : "bg-blue-600 text-white"}`}
            >
              <p>{msg.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center">
        <input
          type="text"
          placeholder="Write something..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300"
        />
        <button
          onClick={sendMessage}
          className="ml-2 p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
