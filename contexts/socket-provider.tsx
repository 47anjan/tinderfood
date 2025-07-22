"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { createContext, useContext, useEffect, useRef, ReactNode } from "react";
import { createSocketConnection } from "@/lib/socket";

interface SocketContextType {
  socket: any | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const socketRef = useRef<any>(null);
  const isConnectedRef = useRef(false);

  useEffect(() => {
    // Create socket connection only once
    if (!socketRef.current) {
      const socket = createSocketConnection();
      socketRef.current = socket;

      socket.on("connect", () => {
        isConnectedRef.current = true;
        console.log("Socket connected");
      });

      socket.on("disconnect", () => {
        isConnectedRef.current = false;
        console.log("Socket disconnected");
      });

      socket.on("error", (error) => {
        console.error("Socket error:", error);
      });
    }

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        isConnectedRef.current = false;
      }
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        isConnected: isConnectedRef.current,
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
