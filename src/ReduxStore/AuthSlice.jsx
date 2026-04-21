import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const email = localStorage.getItem("email");
const isUserLoggedIn = !!token;

const initialState = {
  token: token ? token : null,
  email: email ? email : null,
  isUserLoggedIn: isUserLoggedIn,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, email } = action.payload;
      state.token = token;
      state.email = email;
      state.isUserLoggedIn = true;
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
    },
    removeCredentials: (state) => {
      state.token = null;
      state.isUserLoggedIn = false;
      state.email = null;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;