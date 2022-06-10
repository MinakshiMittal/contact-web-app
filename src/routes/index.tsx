import { Routes, Route } from "react-router-dom";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { Home } from "./Home";
import { PrivateRoute } from "../components";
import { AllMessages } from "./AllMessages";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/all-messages"
        element={
          <PrivateRoute>
            <AllMessages />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default MyRoutes;
