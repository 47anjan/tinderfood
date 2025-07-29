import { configureStore } from "@reduxjs/toolkit";
import connectionReducer from "./slices/connectionSlice";
import notificationReducer from "./slices/notificationSlice";
import globalReducer from "./slices/globalSlice";

export const store = configureStore({
  reducer: {
    connections: connectionReducer,
    notification: notificationReducer,
    global: globalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
