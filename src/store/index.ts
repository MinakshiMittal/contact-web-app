import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import userReducer from "./slices/userSlice";
import loadingReducer from "./slices/loadingSlice";
import errorReducer from "./slices/errorSlice";
import toastReducer from "./slices/toastSlice";
import rootSaga from "./sagas";
import contactsListReducer from "./slices/contactsListSlice";
import messagesReducer from "./slices/messagesSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
    error: errorReducer,
    toast: toastReducer,
    contactsList: contactsListReducer,
    messages: messagesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
