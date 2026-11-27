import { createSlice } from "@reduxjs/toolkit";

// "Have we finished asking the backend whether someone is logged in?"
// Until this is true, a null user means "don't know yet", NOT "logged out".
const authSlice = createSlice({
  name: "auth",
  initialState: { checked: false },
  reducers: {
    markAuthChecked: (state) => {
      state.checked = true;
    },
  },
});

export const { markAuthChecked } = authSlice.actions;
export default authSlice.reducer;
