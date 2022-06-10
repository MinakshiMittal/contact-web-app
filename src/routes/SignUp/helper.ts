import { ChangeEvent } from "react";
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from "../../utils/helper";
import { SignUpCredentials } from "../../utils/types";

type SignUpPayload = {
  signUpCredentials: SignUpCredentials;
  setSignUpCredentials: (signUpCredentials: SignUpCredentials) => void;
  errors: SignUpCredentials;
  setErrors: (errors: SignUpCredentials) => void;
};

export const validateSignUpForm = (
  signUpCredentials: SignUpCredentials,
  setErrors: (errors: SignUpCredentials) => void
) => {
  const { name, email, password, confirmPassword } = signUpCredentials;

  const nameError = validateName(name);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  const confirmPasswordError = validateConfirmPassword(
    password,
    confirmPassword
  );

  setErrors({
    name: nameError,
    email: emailError,
    password: passwordError,
    confirmPassword: confirmPasswordError,
  });

  return nameError === "" &&
    emailError === "" &&
    passwordError === "" &&
    confirmPasswordError === ""
    ? true
    : false;
};

export const signUpChangeHandler = (
  event: ChangeEvent<HTMLInputElement>,
  signUpPayload: SignUpPayload
) => {
  const { id, value } = event.target;
  const { signUpCredentials, setSignUpCredentials } = signUpPayload;
  setSignUpCredentials({ ...signUpCredentials, [id]: value });
};
