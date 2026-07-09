import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fontScale: 100,
};

const accessibilitySlice = createSlice({
  name: "accessibility",
  initialState,
  reducers: {
    setFontScale(state, action) {
      state.fontScale = action.payload;
    },
  },
});

export const { setFontScale } = accessibilitySlice.actions;
export default accessibilitySlice.reducer;