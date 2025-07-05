"use client";

import { useState, useEffect } from "react";
import { Search, AlertCircle, User as UserIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { BASE_URL } from "@/lib/constants";
import { UserConnection } from "@/lib/types";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [friends, setFriends] = useState<UserConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  // Fetch friends data and convert to chat format
  useEffect(() => {
    const getFriends = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${BASE_URL}/api/user/connections`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch friends: ${response.status} ${response.statusText}`
          );
        }

        const friends: UserConnection[] = await response.json();

        setFriends(friends);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
        console.error("Error fetching friends:", err);
      } finally {
        setLoading(false);
      }
    };

    getFriends();
  }, []);

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return `${Math.floor(diffInHours / 24)}d ago`;
    }
  };

  const handleChatSelect = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  const getCurrentChatId = () => {
    const match = pathname.match(/^\/chat\/(.+)$/);
    return match ? match[1] : null;
  };

  const currentChatId = getCurrentChatId();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Chat List */}
      <div className="w-80 bg-white border-r border-gray-300 flex flex-col">
        <div className="p-4 border-b border-gray-300">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              placeholder="Search friends..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Loading State */}
          {loading && (
            <div className="p-4">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="p-4 border-b border-gray-200 animate-pulse"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle size={32} className="text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                Something went wrong
              </h3>
              <p className="text-gray-600 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Friends List */}
          {!loading && !error && (
            <>
              {filteredFriends.map((chat) => (
                <button
                  key={chat._id}
                  className={`w-full cursor-pointer text-left p-4 border-b  hover:bg-gray-50 transition-colors border-y-gray-300 ${
                    currentChatId === chat._id
                      ? "bg-blue-50 border-l-4 border-blue-500"
                      : ""
                  }`}
                  onClick={() => handleChatSelect(chat._id)}
                >
                  <div className="flex items-center space-x-3">
                    {/* Avatar */}
                    <div className="relative">
                      {chat.avatar ? (
                        <img
                          src={chat.avatar}
                          alt={chat.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-gray-600 font-medium">
                            {chat.name.charAt(0)}
                          </span>
                        </div>
                      )}

                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium text-sm truncate">
                          {chat.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatTime(Date.now())}
                        </div>
                      </div>

                      {/* <div className="text-xs text-gray-500 truncate">
                        {chat.messages.length > 0
                          ? chat.messages[chat.messages.length - 1].content
                          : "Start a conversation"}
                      </div> */}
                      <div className="text-xs text-gray-500 truncate">
                        @{chat.username}
                      </div>
                    </div>
                  </div>
                </button>
              ))}

              {/* Empty State */}
              {filteredFriends.length === 0 && !loading && (
                <div className="text-center py-16 px-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserIcon size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    No friends found
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {searchQuery
                      ? "Try adjusting your search"
                      : "Connect with friends to start chatting"}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {children}
    </div>
  );
}
