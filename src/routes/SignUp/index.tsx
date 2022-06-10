import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Input, Logo } from "../../components";
import { angleRight } from "../../utils/icons";
import { signUpInitialState } from "../../utils/constants";
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from "../../utils/helper";
import { useAppDispatch } from "../../store/hooks";
import { getUserSignUp } from "../../store/slices/userSlice";
import { signUpChangeHandler, validateSignUpForm } from "./helper";

export const SignUp = () => {
  const [signUpCredentials, setSignUpCredentials] = useState({
    ...signUpInitialState,
  });
  const [errors, setErrors] = useState({ ...signUpInitialState });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { name, email, password, confirmPassword } = signUpCredentials;

  const handleEmailOnBlur = () => {
    const error = validateEmail(email);
    setErrors({ ...errors, email: error });
  };

  const handleNameOnBlur = () => {
    const error = validateName(name);
    setErrors({ ...errors, name: error });
  };

  const handlePasswordOnBlur = () => {
    const error = validatePassword(password);
    setErrors({ ...errors, password: error });
  };

  const handleConfirmPasswordOnBlur = () => {
    const error = validateConfirmPassword(password, confirmPassword);
    setErrors({ ...errors, confirmPassword: error });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valid = validateSignUpForm(signUpCredentials, setErrors);
    if (valid) {
      dispatch(getUserSignUp(signUpCredentials));
    }
  };

  const signUpPayload = {
    signUpCredentials,
    setSignUpCredentials,
    errors,
    setErrors,
  };

  const handleSignUpChange = (event: ChangeEvent<HTMLInputElement>) =>
    signUpChangeHandler(event, signUpPayload);

  return (
    <div className="w-full flex flex-col sm:flex-row h-screen ">
      <div className="bg-gradient sm:w-1/3 w-full h-screen rounded-tr-[52px] rounded-bl-[52px]">
        <div className="bg-no-repeat bg-cover bg-home-page w-full h-screen flex-center flex flex-col justify-center items-center">
          <Logo />
          <p className="text-3xl text-white mt-12 font-medium">Contact Book</p>
        </div>
      </div>
      <div className="sm:w-2/3 w-full m-2 flex-col flex-center">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold text-light-black mb-2 sm:mt-6 ml-4 sm:ml-0">
              Let's Start
            </h1>
            <p className="opacity-50 mb-10 font-normal ml-4 sm:ml-0">
              Create account with email & password
            </p>
            <Input
              type="text"
              id="name"
              error={errors.name}
              placeholder="Name"
              value={name}
              onChange={handleSignUpChange}
              onBlur={handleNameOnBlur}
            />
            <Input
              type="email"
              id="email"
              error={errors.email}
              placeholder="Email"
              value={email}
              onChange={handleSignUpChange}
              onBlur={handleEmailOnBlur}
            />
            <Input
              type="password"
              id="password"
              error={errors.password}
              placeholder="Password"
              value={password}
              onChange={handleSignUpChange}
              onBlur={handlePasswordOnBlur}
            />
            <Input
              type="password"
              id="confirmPassword"
              error={errors.confirmPassword}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleSignUpChange}
              onBlur={handleConfirmPasswordOnBlur}
            />
            <div className="flex-center flex-col-reverse sm:flex-row">
              <div>
                <p className="opacity-30">Do have account!</p>
                <p
                  onClick={() => navigate("/login")}
                  className="text-transparent cursor-pointer bg-clip-text bg-gradient font-semibold mb-6 sm:mb-0"
                >
                  Login Now
                  <FontAwesomeIcon
                    className="pl-4 text-xs text-purple"
                    icon={angleRight}
                  />
                </p>
              </div>
              <Button type="submit" text="Continue" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
