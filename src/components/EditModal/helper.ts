import { ChangeEvent } from "react";
import { ContactDetails } from "../../utils/types";

export const dataChangeHandler = (
  event: ChangeEvent<HTMLInputElement>,
  credentials: ContactDetails,
  setCredentials: (credentials: ContactDetails) => void
) => {
  const { id, value } = event.target;
  setCredentials({ ...credentials, [id]: value });
};
