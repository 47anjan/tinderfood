"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Mail,
  User,
  Calendar,
  Globe,
  Heart,
  ChefHat,
  MapPin,
} from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-provider";
import { createSocketConnection } from "@/lib/socket";
import { useAppSelector } from "@/store/hooks/hooks";
import { UserConnection } from "@/lib/types";
import { BASE_URL } from "@/lib/constants";

interface Message {
  senderId: string;
  text: string;
  createdAt: string;
}

const ChatPage = () => {
  const params = useParams();
  const chatId = params.id as string;
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState<UserConnection | null>(null);
  const [message, setMessage] = useState("");
  const [showUserInfo, setShowUserInfo] = useState(true);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const socketRef = useRef<any>(null);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const { connections } = useAppSelector((state) => state.connections);

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoadingUser(true);
        const response = await fetch(`${BASE_URL}/api/users/${chatId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const result = await response.json();

        setUser(result);
        setLoadingUser(false);
      } catch (error) {
        console.log(error);
        setLoadingUser(false);
      }
    };

    const getMessages = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/chat/${chatId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const result = await response.json();

        setMessages(result.messages);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
    getMessages();
  }, [chatId]);

  useEffect(() => {
    if (!chatId || !currentUser?._id) return;
    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      name: currentUser.name,
      fromUserId: currentUser?._id,
      toUserId: chatId,
    });

    const user = connections.find((user) => user._id === chatId);

    setUser(user!);

    socket.on("receiveMessage", (message) => {
      if (message.senderId === chatId) {
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
      const newMessage = {
        fromUserId: currentUser._id,
        toUserId: chatId,
        text: message,
        timestamp: Date.now(),
      };

      socketRef.current.emit("sendMessage", newMessage);

      const msg: Message = {
        senderId: currentUser._id,
        text: message,
        createdAt: new Date(Date.now()).toISOString(),
      };

      setMessages([...(messages || []), msg]);
      setMessage("");
    }
  };

  const handleTyping = () => {
    if (!socketRef.current || !user?._id) return;

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

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="space-y-4 animate-pulse">
      {/* User avatar and name skeleton */}
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-full bg-gray-300"></div>
        <div>
          <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>

      {/* Info items skeleton */}
      <div className="space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
        ))}
      </div>

      {/* Bio skeleton */}
      <div className="flex items-start space-x-2">
        <div className="w-4 h-4 bg-gray-300 rounded mt-0.5"></div>
        <div className="space-y-2 flex-1">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Chat Messages */}
      <div className="flex-1 flex flex-col">
        <>
          {/* Header */}
          <div className="bg-white p-4 border-b border-gray-300 flex items-center justify-between">
            {loadingUser ? (
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                  {user?.name.charAt(0)}
                </div>
                <div>
                  <h2 className="font-medium">{user?.name}</h2>
                  {isTyping ? (
                    <div className="text-sm text-gray-500">Typing...</div>
                  ) : (
                    <div className=""></div>
                  )}
                </div>
              </div>
            )}

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
                  msg.senderId === currentUser?._id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <article
                  className={`max-w-xs  shadow lg:max-w-md px-4 py-2 rounded-md  ${
                    msg.senderId === currentUser?._id
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {new Date(msg.createdAt).toLocaleTimeString()}
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

          {loadingUser ? (
            <LoadingSkeleton />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    user?.name.charAt(0)
                  )}
                </div>
                <div>
                  <h4 className="font-medium">{user?.username}</h4>
                  <p className="text-sm text-gray-600">{user?.name}</p>
                </div>
              </div>

              {user?.email && (
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-gray-400" />
                  <span className="text-sm">{user?.email}</span>
                </div>
              )}

              {user?.location && (
                <div className="flex items-center space-x-2">
                  <MapPin size={16} className="text-gray-400" />
                  <span className="text-sm">
                    {user?.location.city && user?.location.country
                      ? `${user.location.city}, ${user.location.country}`
                      : user?.location.country || user?.location.city}
                  </span>
                </div>
              )}

              {user?.bio && (
                <div className="flex items-start space-x-2">
                  <User size={16} className="text-gray-400 mt-0.5" />
                  <span className="text-sm">{user?.bio}</span>
                </div>
              )}

              {user?.cookingLevel && (
                <div className="flex items-center space-x-2">
                  <ChefHat size={16} className="text-gray-400" />
                  <span className="text-sm capitalize">
                    {user?.cookingLevel}
                  </span>
                </div>
              )}

              {user?.dietaryRestrictions &&
                user?.dietaryRestrictions.length > 0 && (
                  <div className="flex items-start space-x-2">
                    <Heart size={16} className="text-gray-400 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium">Dietary Restrictions:</div>
                      <div className="text-gray-600">
                        {user?.dietaryRestrictions.join(", ")}
                      </div>
                    </div>
                  </div>
                )}

              {user?.favoriteFoods && user?.favoriteFoods.length > 0 && (
                <div className="flex items-start space-x-2">
                  <Heart size={16} className="text-gray-400 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium">Favorite Foods:</div>
                    <div className="text-gray-600">
                      {user?.favoriteFoods.join(", ")}
                    </div>
                  </div>
                </div>
              )}

              {user?.cuisinePreferences &&
                user?.cuisinePreferences.length > 0 && (
                  <div className="flex items-start space-x-2">
                    <Globe size={16} className="text-gray-400 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-medium">Cuisine Preferences:</div>
                      <div className="text-gray-600">
                        {user?.cuisinePreferences.join(", ")}
                      </div>
                    </div>
                  </div>
                )}

              {user?.createdAt && (
                <div className="flex items-center space-x-2">
                  <Calendar size={16} className="text-gray-400" />
                  <span className="text-sm">
                    Member since {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default ChatPage;
