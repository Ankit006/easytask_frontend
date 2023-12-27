import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitalState {
  isLoggedin: boolean;
}

const initialState: InitalState = {
  isLoggedin: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedin: (state, action: PayloadAction<boolean>) => {
      state.isLoggedin = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setIsLoggedin } = authSlice.actions;
