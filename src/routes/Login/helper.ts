import { ChangeEvent } from "react";
import { validateEmail, validatePassword } from "../../utils/helper";
import { LoginCredentials } from "../../utils/types";

export const validateLoginForm = (
  loginCredentials: LoginCredentials,
  setErrors: (errors: LoginCredentials) => void
) => {
  const { email, password } = loginCredentials;
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  setErrors({ email: emailError, password: passwordError });

  return emailError === "" && passwordError === "" ? true : false;
};

export const loginChangeHandler = (
  event: ChangeEvent<HTMLInputElement>,
  credentials: LoginCredentials,
  setCredentials: (credentials: LoginCredentials) => void
) => {
  const { id, value } = event.target;
  setCredentials({ ...credentials, [id]: value });
};
