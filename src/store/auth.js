import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  accessToken: "",
  refreshToken: "",
  user: {
    pk: -1,
    email: "",
    nickname: "",
  }
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
      state.user.pk = action.payload.user.pk;
      state.user.email = action.payload.user.email;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
