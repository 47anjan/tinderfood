import { BASE_URL } from "@/lib/constants";
import { UserConnection } from "@/lib/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface ConnectionState {
  connections: UserConnection[];
  loading: boolean;
  error: string | null;
}

const initialState: ConnectionState = {
  connections: [],
  loading: false,
  error: null,
};

export const fetchConnections = createAsyncThunk(
  "connections/fetchConnections",
  async () => {
    const response = await fetch(`${BASE_URL}/api/user/connections`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return response.json();
  }
);

export const connectionSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConnections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConnections.fulfilled, (state, action) => {
        state.loading = false;
        state.connections = action.payload;
      })
      .addCase(fetchConnections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

export const { clearError } = connectionSlice.actions;
export default connectionSlice.reducer;
