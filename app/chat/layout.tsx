"use client";

import { useState } from "react";
import { Search } from "lucide-react";

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

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedChat, setSelectedChat] = useState<Chat | null>(chats[0]);

  const filteredChats = chats.filter((chat) =>
    chat.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Chat List */}
      <div className="w-80 bg-white border-r border-gray-300 flex flex-col">
        <div className="p-4 border-b border-gray-300">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              placeholder="Search chats..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              className={`w-full text-left p-4 border-b border-y-gray-300 hover:bg-gray-50 ${
                selectedChat?.id === chat.id
                  ? "bg-blue-50 border-l-4 border-blue-500"
                  : ""
              }`}
              onClick={() => setSelectedChat(chat)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                  {chat.userName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">
                    {chat.userName}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {chat.messages.length > 0
                      ? chat.messages[chat.messages.length - 1].content
                      : "No messages"}
                  </div>
                </div>
                {chat.online && (
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {children}
    </div>
  );
}
