import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { MessageInitialState, SetReceiver } from "../../utils/types";

const initialState: MessageInitialState = {
  messages: [],
  currentChat: {
    messages: [],
    receiverEmail: "",
    blocked: false,
    receiverName: "",
    receiverNumber: "",
  },
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    getOneUserMessagesSuccess: (state, action) => {
      state.currentChat.messages = action.payload;
    },
    setReceiver: (state, action: PayloadAction<SetReceiver>) => {
      state.currentChat.receiverEmail = action.payload.receiverEmail;
      state.currentChat.blocked = action.payload.blocked;
      state.currentChat.receiverName = action.payload.receiverName;
      state.currentChat.receiverNumber = action.payload.receiverNumber;
    },
    deleteChat: (state) => {
      state.currentChat.messages = [];
    },
  },
});

export const { getOneUserMessagesSuccess, setReceiver, deleteChat } =
  messagesSlice.actions;
export const messagesSelector = (state: RootState) =>
  state.messages.currentChat;
export default messagesSlice.reducer;
