"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Phone, Mail, User } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-provider";
import { createSocketConnection } from "@/lib/socket";

// Simplified data types
interface User {
  id: string;
  userName: string;
  userEmail?: string;
  userPhone?: string;
  online?: boolean;
}

interface Message {
  toUserId: string;
  fromUserId: string;
  content: string;
  timestamp: number;
}

const ChatPage = () => {
  const params = useParams();
  const chatId = params.id as string;
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const [showUserInfo, setShowUserInfo] = useState(true);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const socketRef = useRef<any>(null);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Find the selected chat based on the URL parameter
  useEffect(() => {
    if (!chatId || !currentUser?._id) return;
    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      name: currentUser.name,
      fromUserId: currentUser?._id,
      toUserId: chatId,
    });

    setUser({
      id: "1",
      userName: "47joshua",
      userEmail: "joshua@gmail.com",
      userPhone: "01771472157",
      online: true,
    });

    socket.on("receiveMessage", (message) => {
      if (
        message.toUserId === currentUser._id &&
        message.fromUserId === chatId
      ) {
        setMessages((prevMessages) => [...(prevMessages || []), message]);
      }
    });

    socket.on("startTyping", ({ fromUserId, toUserId }) => {
      if (fromUserId === chatId && toUserId === currentUser._id) {
        setIsTyping(true);
      }
    });

    socket.on("stopTyping", ({ fromUserId, toUserId }) => {
      if (fromUserId === chatId && toUserId === currentUser._id) {
        setIsTyping(false);
      }
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("startTyping");
      socket.off("stopTyping");
      socket.disconnect();
    };
  }, [chatId, currentUser?._id]);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, message]);

  const handleSendMessage = (e?: React.FormEvent | React.KeyboardEvent) => {
    if (!chatId || !currentUser?._id) return;

    if (e) e.preventDefault();

    if (message.trim()) {
      const newMessage: Message = {
        fromUserId: currentUser._id,
        toUserId: chatId,
        content: message,
        timestamp: Date.now(),
      };
      socketRef.current.emit("sendMessage", newMessage);

      setMessages([...(messages || []), newMessage]);
      setMessage("");
    }
  };

  const handleTyping = () => {
    if (!socketRef.current || !user?.id) return;

    socketRef.current.emit("startTyping", {
      fromUserId: currentUser?._id,
      toUserId: chatId,
    });

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current.emit("stopTyping", {
        fromUserId: currentUser?._id,
        toUserId: chatId,
      });
    }, 2000);
  };

  return (
    <>
      {/* Chat Messages */}
      <div className="flex-1 flex flex-col">
        <>
          {/* Header */}
          <div className="bg-white p-4 border-b border-gray-300 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                {user?.userName.charAt(0)}
              </div>
              <div>
                <h2 className="font-medium">{user?.userName}</h2>
                {isTyping ? (
                  <div className="text-sm text-gray-500">Typing...</div>
                ) : (
                  <div className="text-sm text-gray-500">
                    {user?.online ? "Online" : "Offline"}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => setShowUserInfo(!showUserInfo)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <User size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages?.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.fromUserId === currentUser?._id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <article
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-md  ${
                    msg.fromUserId === currentUser?._id
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                </article>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="bg-white p-4 border-t border-gray-300">
            <div className="flex space-x-2">
              <input
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  handleTyping();
                }}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none  rounded-full focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage(e)}
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                className="bg-blue-500 text-white px-4 py-2  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                disabled={message.trim() === ""}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </>
      </div>

      {/* User Info Panel */}
      {showUserInfo && (
        <div className="w-80 bg-white border-l border-gray-300 p-4">
          <h3 className="font-medium mb-4">User Information</h3>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                {user?.userName.charAt(0)}
              </div>
              <div>
                <h4 className="font-medium">{user?.userName}</h4>
                <p className="text-sm text-gray-500">
                  {user?.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>

            {user?.userPhone && (
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-gray-400" />
                <span className="text-sm">{user?.userPhone}</span>
              </div>
            )}

            {user?.userEmail && (
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-gray-400" />
                <span className="text-sm">{user?.userEmail}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default ChatPage;
