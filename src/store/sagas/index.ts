import { all } from "redux-saga/effects";
import { contactsListSagas } from "./contactsListSaga";
// import { messagesSagas } from "./messagesSagas";
import { toastSagas } from "./toastSagas";
import { userSagas } from "./userSagas";

export default function* sagas() {
  yield all([
    ...userSagas,
    ...toastSagas,
    ...contactsListSagas,
    // ...messagesSagas,
  ]);
}
