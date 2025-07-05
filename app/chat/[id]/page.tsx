"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Phone, Mail, User } from "lucide-react";

// Simplified data types
interface Chat {
  id: string;
  userName: string;
  userEmail?: string;
  userPhone?: string;
  messages: Message[];
  online?: boolean;
}

interface Message {
  sender: "user" | "user";
  content: string;
  timestamp: number;
}

// Sample data
const chats: Chat[] = [
  {
    id: "1",
    userName: "Nguyen Van A",
    userEmail: "nguyenvana@example.com",
    userPhone: "0901234567",
    online: true,
    messages: [
      {
        sender: "user",
        content: "Hello, I want to ask about your new product.",
        timestamp: Date.now() - 3600000,
      },
      {
        sender: "user",
        content:
          "Hi, we just launched a new product line. Which type are you interested in?",
        timestamp: Date.now() - 3500000,
      },
    ],
  },
  {
    id: "2",
    userName: "Tran Thi B",
    userEmail: "tranthib@example.com",
    userPhone: "0909876543",
    messages: [
      {
        sender: "user",
        content: "Do you ship your products to Hanoi?",
        timestamp: Date.now() - 86400000,
      },
    ],
  },
  {
    id: "3",
    userName: "Le Van C",
    userPhone: "0912345678",
    messages: [
      {
        sender: "user",
        content: "I need help with order #12345.",
        timestamp: Date.now() - 172800000,
      },
    ],
  },
];

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(chats[0]);

  const [message, setMessage] = useState("");
  const [showUserInfo, setShowUserInfo] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChat?.messages]);

  const handleSendMessage = (e?: React.FormEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    if (message.trim() && selectedChat) {
      const newMessage: Message = {
        sender: "user",
        content: message,
        timestamp: Date.now(),
      };

      // Update the selected chat's messages
      selectedChat.messages.push(newMessage);
      setMessage("");
    }
  };

  return (
    <>
      {/* Chat Messages */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Header */}
            <div className="bg-white p-4 border-b border-gray-300 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                  {selectedChat.userName.charAt(0)}
                </div>
                <div>
                  <h2 className="font-medium">{selectedChat.userName}</h2>
                  <div className="text-sm text-gray-500">
                    {selectedChat.online ? "Online" : "Offline"}
                  </div>
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
              {selectedChat.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="bg-white p-4 border-t border-gray-300">
              <div className="flex space-x-2">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage(e)}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <MessageSquare size={48} className="mx-auto mb-4 text-gray-400" />
              <p>Select a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* User Info Panel */}
      {selectedChat && showUserInfo && (
        <div className="w-80 bg-white border-l border-gray-300 p-4">
          <h3 className="font-medium mb-4">User Information</h3>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                {selectedChat.userName.charAt(0)}
              </div>
              <div>
                <h4 className="font-medium">{selectedChat.userName}</h4>
                <p className="text-sm text-gray-500">
                  {selectedChat.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>

            {selectedChat.userPhone && (
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-gray-400" />
                <span className="text-sm">{selectedChat.userPhone}</span>
              </div>
            )}

            {selectedChat.userEmail && (
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-gray-400" />
                <span className="text-sm">{selectedChat.userEmail}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default ChatPage;
