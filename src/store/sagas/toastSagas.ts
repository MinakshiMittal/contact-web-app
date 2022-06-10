import { delay, fork, put, StrictEffect, takeLatest } from "redux-saga/effects";
import { hideToast, showToast } from "../slices/toastSlice";

function* hideToastDelay() {
  yield delay(3000);
  yield put(hideToast());
}

function* watchHideToast(): Generator<StrictEffect> {
  yield takeLatest(showToast.type, hideToastDelay);
}

export const toastSagas = [fork(watchHideToast)];
