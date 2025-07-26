"use client";
import React, { useState, useEffect } from "react";
import { Bell, MessageCircle, Check, User } from "lucide-react";
import { useAppSelector } from "@/store/hooks/hooks";
import { useRouter } from "next/navigation";

interface UnreadNotificationItemProps {
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  unreadCount: number;
  lastMessageText: string;
  lastMessageTime: number;
}

const UnreadNotificationItem: React.FC<UnreadNotificationItemProps> = ({
  senderId,
  senderName,
  unreadCount,
  lastMessageText,
  lastMessageTime,
}) => {
  const router = useRouter();

  const formatTime = (timestamp: number) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours =
      (now.getTime() - messageTime.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return minutes <= 1 ? "Just now" : `${minutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return messageTime.toLocaleDateString();
    }
  };

  const truncateMessage = (text: string, maxLength: number = 50) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <div
      onClick={() => {
        router.push(`/chat/${senderId}`);
      }}
      className="flex items-start space-x-3 p-3 hover:bg-gray-50 border-b border-gray-100 cursor-pointer group"
    >
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
          <User size={16} className="text-gray-600" />
        </div>
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-900 truncate">
            {senderName}
          </h4>
          <span className="text-xs text-gray-500 flex-shrink-0">
            {formatTime(lastMessageTime)}
          </span>
        </div>
        <p className="text-sm text-gray-600 truncate ">
          {truncateMessage(lastMessageText)}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-blue-600 font-medium">
            {unreadCount} unread message{unreadCount > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Check size={14} />
      </div>
    </div>
  );
};

const UnreadNotificationPanel = () => {
  const totalUnreadCount = useAppSelector(
    (state) => state.notification.totalUnreadCount
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const unreadNotifications = useAppSelector(
    (state) => state.notification.unreadNotifications
  );

  if (Object.keys(unreadNotifications).length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        <MessageCircle size={32} className="mx-auto mb-2 text-gray-300" />
        <p className="text-sm">No unread messages</p>
      </div>
    );
  }

  const notificationList = Object.values(unreadNotifications);

  return (
    <div className="max-h-96 overflow-y-auto">
      {/* Header */}
      <div className="p-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">
            Unread Messages ({totalUnreadCount})
          </h3>
          <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
            Mark all as read
          </button>
        </div>
      </div>
      {/* Notification List */}

      <div>
        {notificationList.map((notification) => (
          <UnreadNotificationItem
            key={notification.senderId}
            senderId={notification.senderId}
            senderName={notification.senderName}
            unreadCount={notification.unreadCount}
            lastMessageText={notification.lastMessageText}
            lastMessageTime={notification.timestamp}
          />
        ))}
      </div>
    </div>
  );
};

const NotificationBell = () => {
  const totalUnreadCount = useAppSelector(
    (state) => state.notification.totalUnreadCount
  );
  const [isOpen, setIsOpen] = useState(false);

  // Handle app visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {};

    const handleFocus = () => {};
    const handleBlur = () => {};

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className="relative p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      >
        <Bell size={20} className="text-gray-600" />
        {totalUnreadCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
            {totalUnreadCount > 99 ? "99+" : totalUnreadCount}
          </div>
        )}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Notification Panel */}
          <div className="absolute right-[-30px] top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <UnreadNotificationPanel />
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;
