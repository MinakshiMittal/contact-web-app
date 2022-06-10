import {createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { LoadingInitialState } from "../../utils/types";

const initialState: LoadingInitialState = {
  loading: false,
  loadingMessage: "",
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    showLoading: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.loadingMessage = action.payload;
    },
    hideLoading: (state) => {
      state.loading = false;
      state.loadingMessage = "";
    },
  },
});

export const { showLoading, hideLoading } = loadingSlice.actions;
export const loadingSelector = (state: RootState) => state.loading;
export default loadingSlice.reducer;
