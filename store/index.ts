import { configureStore } from "@reduxjs/toolkit";
import connectionReducer from "./slices/connectionSlice";
import notificationReducer from "./slices/notificationSlice";

export const store = configureStore({
  reducer: {
    connections: connectionReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
