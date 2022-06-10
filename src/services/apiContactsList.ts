import { firestore } from "../firebase";
import { DocumentData } from "firebase/firestore";
import {
  AddContactPayload,
  ContactsList,
  UpdateContactPayload,
} from "../utils/types";
import { v4 } from "uuid";

export const fetchContacts = async (email: string | null) => {
  const querySnapshot = await firestore
    .collection("contacts")
    .where("email", "==", email)
    .get();

  if (querySnapshot.empty) {
    return [];
  } else {
    const response = querySnapshot.docs.map(
      (doc: { data: () => DocumentData }) => {
        return doc.data();
      }
    );
    return response[0].contacts;
  }
};

export const addNewContact = async ({
  contactDetails,
  email,
  contactsList,
}: AddContactPayload) => {
  const querySnapshot = await firestore
    .collection("contacts")
    .where("email", "==", email)
    .get();
  if (querySnapshot.empty) {
    firestore.collection("contacts").add({
      contacts: [{ ...contactDetails, id: v4() }],
      email,
    });
  } else {
    querySnapshot.forEach(
      (doc: {
        ref: {
          update: (contacts: { contacts: ContactsList }) => DocumentData;
        };
      }) =>
        doc.ref.update({
          contacts: [...contactsList, { ...contactDetails, id: v4() }],
        })
    );
  }

  return await fetchContacts(email);
};

export const deleteOneContact = async ({
  contactId,
  email,
  contactsList,
}: UpdateContactPayload) => {
  const querySnapshot = await firestore
    .collection("contacts")
    .where("email", "==", email)
    .get();

  const updatedContactsList = contactsList.filter(
    (contact) => contact.id !== contactId
  );

  querySnapshot.forEach(
    (doc: {
      ref: {
        update: (contacts: { contacts: ContactsList }) => DocumentData;
      };
    }) =>
      doc.ref.update({
        contacts: [...updatedContactsList],
      })
  );
  return await fetchContacts(email);
};

export const editOneContact = async ({
  contactDetails,
  email,
  contactsList,
}: AddContactPayload) => {
  const querySnapshot = await firestore
    .collection("contacts")
    .where("email", "==", email)
    .get();

  const updatedContactsList = contactsList.map((contact) => {
    if (contact.id === contactDetails.id) {
      return {
        ...contactDetails,
      };
    }
    return contact;
  });

  querySnapshot.forEach(
    (doc: {
      ref: {
        update: (contacts: { contacts: ContactsList }) => DocumentData;
      };
    }) =>
      doc.ref.update({
        contacts: [...updatedContactsList],
      })
  );
  return await fetchContacts(email);
};
