import { createSlice } from "@reduxjs/toolkit";

const storedToken = localStorage.getItem("token");
const initialState = {
  token: storedToken ? storedToken : "",
};

export const slice = createSlice({
  name: "common",
  initialState,
  reducers: {
    changeToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { changeToken } = slice.actions;

export default slice.reducer;
