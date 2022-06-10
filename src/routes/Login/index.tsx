import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Logo } from "../../components";
import { angleRight, google } from "../../utils/icons";
import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { loginInitialState } from "../../utils/constants";
import { validateEmail, validatePassword } from "../../utils/helper";
import { useAppDispatch } from "../../store/hooks";
import { getGoogleSignIn, getUserLogin } from "../../store/slices/userSlice";
import { loginChangeHandler, validateLoginForm } from "./helper";

export const Login = () => {
  const [loginCredentials, setLoginCredentials] = useState({
    ...loginInitialState,
  });
  const [errors, setErrors] = useState({ ...loginInitialState });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { email, password } = loginCredentials;

  const handleEmailOnBlur = () => {
    const error = validateEmail(email);
    setErrors({ ...errors, email: error });
  };

  const handlePasswordOnBlur = () => {
    const error = validatePassword(password);
    setErrors({ ...errors, password: error });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valid = validateLoginForm(loginCredentials, setErrors);
    if (valid) {
      dispatch(getUserLogin(loginCredentials));
    }
  };

  const handleGoogleSignIn = () => {
    dispatch(getGoogleSignIn());
  };

  return (
    <div className="w-full flex flex-col sm:flex-row h-screen ">
      <div className="bg-gradient sm:w-1/3 w-full h-screen rounded-tr-[52px] rounded-bl-[52px]">
        <div className="bg-no-repeat bg-cover bg-home-page w-full h-screen flex-center flex flex-col justify-center items-center">
          <Logo />
          <p className="text-3xl text-white mt-12 font-medium">Contact Book</p>
        </div>
      </div>
      <div className="sm:w-2/3 w-full  flex-col flex-center">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold text-light-black mb-2 sm:mt-6 ml-4 sm:ml-0">
              Welcome Back
            </h1>
            <p className="opacity-50 mb-10 font-normal ml-4 sm:ml-0">
              Login with your credentials
            </p>
            <Input
              type="email"
              error={errors.email}
              placeholder="Email"
              value={email}
              id="email"
              onChange={(event) =>
                loginChangeHandler(event, loginCredentials, setLoginCredentials)
              }
              onBlur={handleEmailOnBlur}
            />
            <Input
              type="password"
              error={errors.password}
              placeholder="Password"
              value={password}
              id="password"
              onChange={(event) =>
                loginChangeHandler(event, loginCredentials, setLoginCredentials)
              }
              onBlur={handlePasswordOnBlur}
            />
            <div className="flex-center flex-col-reverse sm:flex-row">
              <div>
                <p
                  onClick={handleGoogleSignIn}
                  className="text-red-500 mb-2 border border-red-300 rounded-lg p-2 cursor-pointer"
                >
                  <FontAwesomeIcon
                    className="text-xl font-semibold mr-2"
                    icon={google}
                  />
                  Sign In with google
                </p>
                <p className="opacity-30">Don't have account!</p>
                <p
                  onClick={() => navigate("/signup")}
                  className="text-transparent cursor-pointer bg-clip-text bg-gradient font-semibold  mb-6 sm:mb-0"
                >
                  Create New
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
