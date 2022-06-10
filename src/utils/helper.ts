import { ContactDetails } from "./types";

export const validateEmail = (email: string) => {
  let error = "";
  if (!email) {
    error = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    error = "Invalid email";
  }
  return error;
};

export const validateName = (name: string) => {
  let error = "";

  if (!name) {
    error = "Name is required!";
  }
  return error;
};

export const validatePassword = (password: string) => {
  let error = "";

  if (!password) {
    error = "Password required!";
  } else if (password.length < 8) {
    error = "Password should be atleast 8 characters long!";
  }

  return error;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
) => {
  let error = "";
  if (!confirmPassword) {
    error = "Password required!";
  } else if (password !== confirmPassword) {
    error = "Passwords did not match";
  } else if (confirmPassword.length < 8) {
    error = "Password should be atleast 8 characters long!";
  }
  return error;
};

export const validatePhoneNumber = (number: string) => {
  let error = "";
  if (!number) {
    error = "Phone Number is required";
  } else if (number.length !== 10) {
    error = "Enter the number correctly. 10 digits required!";
  }
  return error;
};

export const validateContactForm = (
  contactDetails: ContactDetails,
  setErrors: (errors: ContactDetails) => void
) => {
  const { email, name, whatsApp, number, company } = contactDetails;
  const emailError = validateEmail(email);
  const nameError = validateName(name);
  const numberError = validatePhoneNumber(number);
  const whatsAppError = whatsApp ? validatePhoneNumber(whatsApp) : "";
  const companyError = company ? validateName(name) : "";
  setErrors({
    name: nameError,
    email: emailError,
    number: numberError,
    whatsApp: whatsAppError,
    company: companyError,
    profileURL: "",
  });
  return nameError === "" &&
    emailError === "" &&
    numberError === "" &&
    whatsAppError === "" &&
    companyError === ""
    ? true
    : false;
};
