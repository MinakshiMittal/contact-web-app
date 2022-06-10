import { takeLatest, put, fork, call, StrictEffect } from "redux-saga/effects";
import {
  googleSignIn,
  userSignUp,
  userLogin,
  editProfile,
  addAnotherAccountAPI,
} from "../../services/apiUserLogin";
import { setError } from "../slices/errorSlice";
import { hideLoading, showLoading } from "../slices/loadingSlice";
import {
  getGoogleSignIn,
  getUserLogin,
  getUserSignUp,
  getUserSuccess,
  setOtherAccounts,
  setOtherAccountsSuccess,
  updateProfile,
} from "../slices/userSlice";
import history from "../../utils/history";
import { showToast } from "../slices/toastSlice";
import {
  AddAnotherAccountPayload,
  LoginPayload,
  SignUpPayload,
  UpdateProfilePayload,
  User,
  // UserInitialState,
} from "../../utils/types";

type AddAnotherAccount = {
  type: string;
  payload: AddAnotherAccountPayload;
};

function* getGoogleSignInAsync(): Generator<StrictEffect> {
  try {
    yield put(showLoading("google signin started.."));
    const response = yield call(googleSignIn);
    if (response) {
      yield put(getUserSuccess(response as { user: User }));
      yield put(setOtherAccountsSuccess(response as { users: string[] }));
      yield put(setOtherAccounts);
      yield put(hideLoading());
      history.replace("/");
      yield put(showToast("Successfully signed in.."));
    }
  } catch (error) {
    yield put(hideLoading());
    yield put(setError("google signin failed..."));
  }
}

function* getUserLoginAsync({
  payload,
}: LoginPayload): Generator<StrictEffect> {
  try {
    yield put(showLoading("login started.."));
    const response = yield call(userLogin, payload);
    if (response) {
      yield put(getUserSuccess(response));
      yield put(hideLoading());
      history.replace("/");
      yield put(showToast("Successfully logged in.."));
    }
  } catch (error) {
    yield put(hideLoading());
    yield put(setError("Login failed. Enter email and password correctly!"));
  }
}

function* getUserSignUpAsync({
  payload,
}: SignUpPayload): Generator<StrictEffect> {
  try {
    yield put(showLoading("sign up started.."));
    const response = yield call(userSignUp, payload);
    if (response) {
      yield put(getUserSuccess(response));
      yield put(hideLoading());
      history.replace("/");
      yield put(showToast("Successfully signed up.."));
    }
  } catch (error) {
    yield put(hideLoading());
    yield put(setError("Sign Up failed. Make sure you enter a unique email!"));
  }
}

function* updateProfileAsync({
  payload,
}: UpdateProfilePayload): Generator<StrictEffect> {
  try {
    const response = yield call(editProfile, payload);
    yield put(getUserSuccess(response));
  } catch (error) {
    yield put(setError("Could not update profile.Try again later!"));
  }
}

function* setOtherAccountsAsync({
  payload,
}: AddAnotherAccount): Generator<StrictEffect> {
  try {
    yield put(showLoading("Adding another account.."));

    const response = yield call(addAnotherAccountAPI, payload);
    yield put(hideLoading());
    console.log("acc saga", response);
    yield put(
      setOtherAccountsSuccess({ users: response } as AddAnotherAccountPayload)
    );
  } catch (error) {
    yield put(
      setError("This account is already added. Try with another account!")
    );
    yield put(hideLoading());
  }
}

function* watchUserSignUp() {
  yield takeLatest(getUserSignUp.type, getUserSignUpAsync);
}

function* watchUserLogin() {
  yield takeLatest(getUserLogin.type, getUserLoginAsync);
}

function* watchGoogleSignIn() {
  yield takeLatest(getGoogleSignIn.type, getGoogleSignInAsync);
}

function* watchUpdateProfile() {
  yield takeLatest(updateProfile.type, updateProfileAsync);
}

function* watchSetOtherAccounts() {
  yield takeLatest(setOtherAccounts.type, setOtherAccountsAsync);
}

export const userSagas = [
  fork(watchGoogleSignIn),
  fork(watchUserLogin),
  fork(watchUserSignUp),
  fork(watchUpdateProfile),
  fork(watchSetOtherAccounts),
];
