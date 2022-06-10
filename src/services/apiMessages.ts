import { db } from "../firebase";
import { GetMessagesPayload, SendMessagePayload } from "../utils/types";

export const trimEmail = (email: string) => {
  return email.split("@")[0];
};

export const setUserAPI = async ({
  email,
  receiverEmail,
}: GetMessagesPayload) => {
  db.ref(`/chats/${trimEmail(email)}/`).set({
    myId: trimEmail(email),
  });
  db.ref(`/chats/${trimEmail(receiverEmail)}/`).set({
    myId: trimEmail(receiverEmail),
  });
  db.ref(`/chats/${trimEmail(email)}/${trimEmail(receiverEmail)}/blocked/`).set(
    {
      blocked: false,
    }
  );
  db.ref(`/chats/${trimEmail(receiverEmail)}/${trimEmail(email)}/blocked/`).set(
    {
      blocked: false,
    }
  );
};

export const sendMessageAPI = async ({
  email,
  receiverEmail,
  message,
  blocked,
}: SendMessagePayload) => {
  // if (email === receiverEmail) {
  //   console.log("true");
  //   await db
  //     .ref(
  //       `/chats/${trimEmail(email)}/${trimEmail(receiverEmail)}/${Date.now()}/`
  //     )
  //     .set({
  //       message,
  //       status: "sent",
  //       createdAt: Date.now(),
  //     });
  // }
  // if (email !== receiverEmail) {
  //   console.log("not same");
    await db
      .ref(
        `/chats/${trimEmail(email)}/${trimEmail(receiverEmail)}/${Date.now()}/`
      )
      .set({
        message,
        status: "sent",
        createdAt: Date.now(),
      });
    await db
      .ref(
        `/chats/${trimEmail(receiverEmail)}/${trimEmail(email)}/${Date.now()}/`
      )
      .set({
        message,
        receiverId: "received",
        createdAt: Date.now(),
      });
  // }
  // db.ref(`/chats/${trimEmail(receiverEmail)}/${trimEmail(email)}/blocked`).on(
  //   "value",
  //   async (snapshot) => {
  //     if (snapshot.exists()) {
  //       const blocked = snapshot.val();
  // else if (blocked && email !== receiverEmail) {
  //   console.log("blocked and not same");
  //   await db
  //     .ref(
  //       `/chats/${trimEmail(email)}/${trimEmail(receiverEmail)}/${Date.now()}/`
  //     )
  //     .set({
  //       message,
  //       status: "sent",
  //       createdAt: Date.now(),
  //     });
  // } else if (!blocked && email !== receiverEmail) {
  //   console.log("not blocked not same");
  //   await db
  //     .ref(
  //       `/chats/${trimEmail(email)}/${trimEmail(receiverEmail)}/${Date.now()}/`
  //     )
  //     .set({
  //       message,
  //       status: "sent",
  //       createdAt: Date.now(),
  //     });
  //   await db
  //     .ref(
  //       `/chats/${trimEmail(receiverEmail)}/${trimEmail(email)}/${Date.now()}/`
  //     )
  //     .set({
  //       message,
  //       receiverId: "received",
  //       createdAt: Date.now(),
  //     });
  // }
  // }
  //   }
  // );
};
