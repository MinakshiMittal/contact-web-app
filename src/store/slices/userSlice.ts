import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  AddAnotherAccountPayload,
  LoginCredentials,
  SignUpCredentials,
  User,
  UserInitialState,
} from "../../utils/types";

const initialState: UserInitialState = {
  user: {
    email: "",
    name: "",
    number: "",
    whatsApp: "",
    company: "",
    isLoggedIn: false,
    profileURL: "",
  },
  otherAccounts: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserSuccess: {
      reducer: (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      },
      prepare: (payload) => {
        return {
          payload: {
            ...payload,
            isLoggedIn: true,
          },
          type: "getUserSuccess",
        };
      },
    },
    getGoogleSignIn: () => {},
    getUserSignUp: (state, action: PayloadAction<SignUpCredentials>) => {},
    getUserLogin: (state, action: PayloadAction<LoginCredentials>) => {},
    updateProfile: (state, action) => {},
    setOtherAccounts: (
      state,
      action: PayloadAction<AddAnotherAccountPayload>
    ) => {
      // console.log("other acc", action.payload.users);
      // state.otherAccounts = action.payload.users;
    },
    setOtherAccountsSuccess: (
      state,
      action: PayloadAction<AddAnotherAccountPayload>
    ) => {
      console.log("other acc", action.payload.users);
      state.otherAccounts = action.payload.users;
    },
  },
});

export const {
  getUserSuccess,
  getGoogleSignIn,
  getUserLogin,
  getUserSignUp,
  updateProfile,
  setOtherAccounts,
  setOtherAccountsSuccess,
} = userSlice.actions;
export const userSelector = (state: RootState) => state.user;
export default userSlice.reducer;
