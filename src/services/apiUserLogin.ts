import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleAuthProvider } from "../firebase";
import {
  AddAnotherAccountPayload,
  LoginCredentials,
  SignUpCredentials,
  User,
} from "../utils/types";
import { firestore } from "../firebase";
import { DocumentData } from "firebase/firestore";

const googleSignIn = async () => {
  const response = await signInWithPopup(auth, googleAuthProvider);
  const credential = GoogleAuthProvider.credentialFromResult(response);
  const newCredential = GoogleAuthProvider.credential(credential?.idToken);
  const userCredentail = await signInWithCredential(auth, newCredential);
  const user = userCredentail.user;

  if (user) {
    const querySnapshot = await firestore
      .collection("users")
      .where("email", "==", user.email)
      .get();

    if (querySnapshot.empty) {
      await firestore.collection("users").add({
        email: user.email,
        name: user.displayName,
        number: "",
        whatsApp: "",
        company: "",
        users: [],
      });
    } else {
      const response = querySnapshot.docs.map(
        (doc: { data: () => DocumentData }) => {
          return doc.data();
        }
      );
      console.log("gsi", response[0]);
      return response[0];
    }
  }
  return {
    user: {
      email: user.email,
      name: user.displayName,
      number: "",
      whatsApp: "",
      company: "",
    },
    users: [],
  };
};

export const addAnotherAccountAPI = async ({
  email,
  users,
}: AddAnotherAccountPayload) => {
  const response = await signInWithPopup(auth, googleAuthProvider);
  const credential = GoogleAuthProvider.credentialFromResult(response);
  const newCredential = GoogleAuthProvider.credential(credential?.idToken);
  const userCredentail = await signInWithCredential(auth, newCredential);
  const user = userCredentail.user;

  if (user && user.email !== email) {
    const querySnapshotAnotherAccount = await firestore
      .collection("users")
      .where("email", "==", user.email)
      .get();

    if (querySnapshotAnotherAccount.empty) {
      await firestore.collection("users").add({
        email: user.email,
        name: user.displayName,
        number: "",
        whatsApp: "",
        company: "",
        users: [],
      });
    }

    const querySnapshot = await firestore
      .collection("users")
      .where("email", "==", email)
      .get();

    const response = querySnapshot.docs.map(
      (doc: { data: () => DocumentData }) => {
        return doc.data();
      }
    );

    const accountExists = response[0].users.filter(
      (account: string) => account === user.email
    );

    if (accountExists.length > 0) {
      throw new Error();
    } else {
      querySnapshot.forEach((doc) =>
        doc.ref.update({
          users: [...response[0].users, user.email],
        })
      );
      return [...response[0].users, user.email];
    }
  }
};

const userLogin = async (loginCredentials: LoginCredentials) => {
  const { email, password } = loginCredentials;
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  if (user) {
    const querySnapshot = await firestore
      .collection("users")
      .where("email", "==", email)
      .get();
    const response = querySnapshot.docs.map(
      (doc: { data: () => DocumentData }) => {
        return doc.data();
      }
    );
    console.log("login", response[0]);
    return response[0];
  }
};

const userSignUp = async (signUpCredentials: SignUpCredentials) => {
  const { email, password, name } = signUpCredentials;
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  if (user) {
    await firestore.collection("users").add({
      email,
      name,
      number: "",
      whatsApp: "",
      company: "",
      profileURL: "",
      users: [],
    });
  }
  return { email, name, number: "", whatsApp: "", company: "", profileURL: "" };
};

export const editProfile = async (updatedData: User) => {
  const { name, email, number, whatsApp, company, profileURL } = updatedData;
  (
    await firestore
      .collection("users")
      .where("email", "==", updatedData.email)
      .get()
  ).forEach(
    (doc: {
      ref: {
        update: (doc: User) => DocumentData;
      };
    }) => doc.ref.update({ name, email, number, whatsApp, company, profileURL })
  );
  return await fetchData(updatedData.email);
};

const fetchData = async (email: string) => {
  const querySnapshot = await firestore
    .collection("users")
    .where("email", "==", email)
    .get();

  const response = querySnapshot.docs.map(
    (doc: { data: () => DocumentData }) => {
      return doc.data();
    }
  );
  return response[0];
};

export { googleSignIn, userSignUp, userLogin };
