import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UnreadNotification {
  senderId: string;
  senderName: string;
  unreadCount: number;
  lastMessageText: string;
  timestamp: number;
}

interface NotificationState {
  unreadNotifications: Record<string, UnreadNotification>;
  totalUnreadCount: number;
  currentChatId: string | null;
}

const initialState: NotificationState = {
  unreadNotifications: {},
  totalUnreadCount: 0,
  currentChatId: null,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addUnreadMessage: (
      state,
      action: PayloadAction<{
        senderId: string;
        senderName: string;
        messageText: string;
        timestamp: number;
      }>
    ) => {
      const { senderId, senderName, messageText, timestamp } = action.payload;

      if (senderId === state.currentChatId) return;

      if (state.unreadNotifications[senderId]) {
        // Increment existing notification
        state.unreadNotifications[senderId].unreadCount += 1;
        state.unreadNotifications[senderId].lastMessageText = messageText;
        state.unreadNotifications[senderId].timestamp = timestamp;
      } else {
        // Create new notification
        state.unreadNotifications[senderId] = {
          senderId,
          senderName,
          unreadCount: 1,
          lastMessageText: messageText,
          timestamp,
        };
      }
      state.totalUnreadCount += 1;
    },

    markAsRead: (state, action: PayloadAction<string>) => {
      const senderId = action.payload;

      if (state.unreadNotifications[senderId]) {
        // Subtract the unread count from total
        const unreadCount = state.unreadNotifications[senderId].unreadCount;
        state.totalUnreadCount -= unreadCount;

        // Remove the notification
        delete state.unreadNotifications[senderId];
      }
    },

    markAllAsRead: (state) => {
      state.unreadNotifications = {};
      state.totalUnreadCount = 0;
    },

    setCurrentChat: (state, action: PayloadAction<string | null>) => {
      state.currentChatId = action.payload;

      // Auto-mark as read when entering a chat
      if (action.payload && state.unreadNotifications[action.payload]) {
        const unreadCount =
          state.unreadNotifications[action.payload].unreadCount;
        state.totalUnreadCount -= unreadCount;
        delete state.unreadNotifications[action.payload];
      }
    },
  },
});

export const { addUnreadMessage, markAsRead, markAllAsRead, setCurrentChat } =
  notificationSlice.actions;

export default notificationSlice.reducer;
