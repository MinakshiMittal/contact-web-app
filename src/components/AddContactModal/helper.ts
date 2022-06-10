import { ChangeEvent } from "react";
import { ContactDetails } from "../../utils/types";

export const addContactChangeHandler = (
  event: ChangeEvent<HTMLInputElement>,
  credentials: ContactDetails,
  setCredentials: (credentials: ContactDetails) => void
) => {
  const { id, value } = event.target;
  setCredentials({ ...credentials, [id]: value });
};
