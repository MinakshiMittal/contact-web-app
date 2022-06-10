import { call, fork, put, StrictEffect, takeLatest } from "redux-saga/effects";
import {
  addContact,
  deleteContact,
  editContact,
  fetchContactsList,
  getContactsListSuccess,
} from "../slices/contactsListSlice";
import { setError } from "../slices/errorSlice";
import {
  addNewContact,
  deleteOneContact,
  editOneContact,
  fetchContacts,
} from "../../services/apiContactsList";
import {
  AddContactPayload,
  ContactsList,
  UpdateContactPayload,
} from "../../utils/types";

type FetchContactsListPayload = {
  type: string;
  payload: string | null;
};

type AddContact = {
  type: string;
  payload: AddContactPayload;
};

type DeleteContact = {
  type: string;
  payload: UpdateContactPayload;
};

function* fetchContactsAsync({
  payload,
}: FetchContactsListPayload): Generator<StrictEffect> {
  try {
    const contactsList = yield call(fetchContacts, payload);
    yield put(
      getContactsListSuccess(
        (contactsList as ContactsList).sort((a, b) =>
          a.name.localeCompare(b.name)
        )
      )
    );
  } catch (error) {
    yield put(setError("Could not fetch contacts list. Try again later!"));
  }
}

function* addNewContactAsync({ payload }: AddContact): Generator<StrictEffect> {
  try {
    const response = yield call(addNewContact, { ...payload });
    yield put(
      getContactsListSuccess(
        (response as ContactsList).sort((a, b) => a.name.localeCompare(b.name))
      )
    );
  } catch (error) {
    yield put(setError("Could not add new contact. Try again later!"));
  }
}

function* deleteContactAsync({
  payload,
}: DeleteContact): Generator<StrictEffect> {
  try {
    const response = yield call(deleteOneContact, { ...payload });
    yield put(
      getContactsListSuccess(
        (response as ContactsList).sort((a, b) => a.name.localeCompare(b.name))
      )
    );
  } catch (error) {
    yield put(setError("Could not delete contact. Try again later!"));
  }
}

function* editContactAsync({ payload }: AddContact): Generator<StrictEffect> {
  try {
    const response = yield call(editOneContact, payload);
    yield put(
      getContactsListSuccess(
        (response as ContactsList).sort((a, b) => a.name.localeCompare(b.name))
      )
    );
  } catch (error) {
    yield put(setError("Could not edit contact. Try again later!"));
  }
}

function* watchFetchContacts() {
  yield takeLatest(fetchContactsList.type, fetchContactsAsync);
}

function* watchAddNewContact() {
  yield takeLatest(addContact.type, addNewContactAsync);
}

function* watchDeleteContact() {
  yield takeLatest(deleteContact.type, deleteContactAsync);
}

function* watchEditContact() {
  yield takeLatest(editContact.type, editContactAsync);
}

export const contactsListSagas = [
  fork(watchFetchContacts),
  fork(watchAddNewContact),
  fork(watchDeleteContact),
  fork(watchEditContact),
];
