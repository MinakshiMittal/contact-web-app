import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  ContactDetails,
  ContactListsInitialState,
  ContactsList,
  UpdateContactPayload,
} from "../../utils/types";
import { v4 } from "uuid";

const initialState: ContactListsInitialState = {
  contacts: [],
};

const contactsListSlice = createSlice({
  name: "contactsList",
  initialState,
  reducers: {
    fetchContactsList: (state, action: PayloadAction<string | null>) => {},
    getContactsListSuccess: (state, action: PayloadAction<ContactsList>) => {
      state.contacts = action.payload;
    },
    addContact: {
      reducer: (state, action: PayloadAction<ContactDetails>) => {},
      prepare: (payload) => {
        return {
          payload: {
            ...payload,
            id: v4(),
          },
        };
      },
    },
    editContact: (state, action) => {},
    deleteContact: (state, action: PayloadAction<UpdateContactPayload>) => {},
  },
});

export const {
  fetchContactsList,
  getContactsListSuccess,
  addContact,
  deleteContact,
  editContact,
} = contactsListSlice.actions;
export const contactsListSelector = (state: RootState) => state.contactsList;
export default contactsListSlice.reducer;
