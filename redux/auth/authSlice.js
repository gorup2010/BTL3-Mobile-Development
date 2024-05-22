import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    token: "",
    id: "",
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.id = action.payload.id;
      id = state.id.toString();
      AsyncStorage.setItem("CtimeToken", state.token);
      AsyncStorage.setItem("CtimeId", id);
    },

    logout(state, action) {
      state.isAuthenticated = false;
      state.token = "";
      state.id = "";
      
      AsyncStorage.removeItem("CtimeToken");
      AsyncStorage.removeItem("CtimeId");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
