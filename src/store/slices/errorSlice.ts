import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ErrorInitialState } from "../../utils/types";

const initialState: ErrorInitialState = {
  hasErrors: false,
  errorMessage: "",
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.hasErrors = true;
      state.errorMessage = action.payload;
    },
    hideErrors: (state) => {
      state.hasErrors = false;
      state.errorMessage = "";
    },
  },
});

export const { setError, hideErrors } = errorSlice.actions;
export const errorSelector = (state: RootState) => state.error;
export default errorSlice.reducer;
