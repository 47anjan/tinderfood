import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";

export interface UseUnreadNotificationsReturn {
  totalUnreadCount: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  unreadNotifications: Record<string, any>;
  getUnreadCountForSender: (senderId: string) => number;
  addUnreadMessage: (params: {
    senderId: string;
    senderName: string;
    messageText: string;
    timestamp?: number;
  }) => void;
  markAsRead: (senderId: string) => void;
  setActiveChat: (chatId: string | null) => void;
  getCurrentChatId: () => string | null;
  clearAllNotifications: () => void;
}

export const useUnreadNotifications = (): UseUnreadNotificationsReturn => {
  const dispatch = useAppDispatch();
  const totalUnreadCount = useAppSelector(
    (state) => state.notification.totalUnreadCount
  );
  const unreadNotifications = useAppSelector(
    (state) => state.notification.unreadNotifications
  );
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

  // Get unread count for a specific sender
  const getUnreadCountForSender = (senderId: string) => {
    return unreadNotifications[senderId]?.unreadCount || 0;
  };

  // Add unread message
  const addUnreadMessageHandler = useCallback(
    (params: {
      senderId: string;
      senderName: string;
      messageText: string;
      timestamp?: number;
    }) => {
      const { senderId, senderName, messageText, timestamp } = params;

      dispatch(
        addUnreadMessage({
          senderId,
          senderName,
          messageText,
          timestamp: timestamp || Date.now(),
        })
      );

      // Show browser notification if user is not in the current chat
      if (currentChatId !== senderId) {
        showBrowserNotification(senderName, messageText);
      }
    },
    [dispatch, currentChatId, showBrowserNotification]
  );

  // Mark messages as read
  const markAsReadHandler = useCallback(
    (senderId: string) => {
      dispatch(markAsRead(senderId));
    },
    [dispatch]
  );

  // Set active chat
  const setActiveChat = useCallback(
    (chatId: string | null) => {
      dispatch(setCurrentChat(chatId));
    },
    [dispatch]
  );

  // Get current chat ID
  const getCurrentChatId = useCallback(() => {
    return currentChatId;
  }, [currentChatId]);

  // Clear all notifications
  const clearAllNotifications = useCallback(() => {
    dispatch(clearAll());
  }, [dispatch]);

  // Request notification permission on mount
  useEffect(() => {
    requestNotificationPermission();
  }, [requestNotificationPermission]);

  return {
    totalUnreadCount,
    unreadNotifications,
    getUnreadCountForSender,
    addUnreadMessage: addUnreadMessageHandler,
    markAsRead: markAsReadHandler,
    setActiveChat,
    getCurrentChatId,
    clearAllNotifications,
  };
};
