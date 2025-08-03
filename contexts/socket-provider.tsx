"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { createSocketConnection } from "@/lib/socket";
import { useAuth } from "./auth-provider";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { addUnreadMessage } from "@/store/slices/notificationSlice";
interface SocketContextType {
  socket: any | null;
  isConnected: boolean;
  onlineUsers: string[];
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  onlineUsers: [],
});

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const socketRef = useRef<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useAuth();
  const userIdRef = useRef<string | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[] | []>([]);

  const dispatch = useAppDispatch();

  const currentChatId = useAppSelector(
    (state) => state.notification.currentChatId
  );

  // Browser notification support
  const requestNotificationPermission = useCallback(async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    }
    return false;
  }, []);

  // Request notification permission on mount
  useEffect(() => {
    requestNotificationPermission();
  }, [requestNotificationPermission]);

  // Show browser notification
  const showBrowserNotification = useCallback(
    (senderName: string, messageText: string) => {
      if ("Notification" in window && Notification.permission === "granted") {
        const notification = new Notification(
          `New message from ${senderName}`,
          {
            body:
              messageText.length > 100
                ? `${messageText.substring(0, 100)}...`
                : messageText,
            icon: "/default-avatar.png",
            badge: "/notification-badge.png",
            tag: `message-${senderName}`,
          }
        );

        // Auto-close after 5 seconds
        setTimeout(() => notification.close(), 5000);
      }
    },
    []
  );

  useEffect(() => {
    // Only create connection if user exists and we don't have a socket or user changed
    if (user?._id && (!socketRef.current || userIdRef.current !== user._id)) {
      // Disconnect existing socket if user changed
      if (socketRef.current && userIdRef.current !== user._id) {
        socketRef.current.disconnect();
      }

      const socket = createSocketConnection();
      socketRef.current = socket;
      userIdRef.current = user._id;

      socket.on("connect", () => {
        console.log("Socket connected");
        setIsConnected(true);
        // Register user after connection is established
        socket.emit("registerUser", user._id);
      });

      socket.on("onlineUsers", (users) => {
        setOnlineUsers(users);
      });

      socket.on("messageNotification", (notification: any) => {
        dispatch(
          addUnreadMessage({
            senderId: notification.fromUserId,
            senderName: notification.name,
            messageText: notification.message,
            timestamp: notification.timestamp,
          })
        );

        if (notification.fromUserId === currentChatId) {
          // showBrowserNotification(notification.name, notification.message);
        }
      });

      socket.on("disconnect", () => {
        console.log("Socket disconnected");
        setIsConnected(false);
      });

      socket.on("error", (error: any) => {
        console.error("Socket error:", error);
        setIsConnected(false);
      });

      socket.on("reconnect", () => {
        console.log("Socket reconnected");
        setIsConnected(true);
        socket.emit("registerUser", user._id);
      });
    }

    // Cleanup only on unmount or when user logs out
    return () => {
      if (!user?._id && socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        userIdRef.current = null;
        setIsConnected(false);
      }
    };
  }, [user?._id]);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        isConnected,
        onlineUsers,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }

  return context;
};
