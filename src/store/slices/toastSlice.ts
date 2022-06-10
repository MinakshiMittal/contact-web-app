import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ToastInitialState } from "../../utils/types";

const initialState: ToastInitialState = {
  showToast: false,
  successMessage: "",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<string>) => {
      state.showToast = true;
      state.successMessage = action.payload;
    },
    hideToast: (state) => {
      state.showToast = false;
      state.successMessage = "";
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;
export const toastSelector = (state: RootState) => state.toast;
export default toastSlice.reducer;
