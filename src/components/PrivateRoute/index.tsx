import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { userSelector } from "../../store/slices/userSlice";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const user = useSelector(userSelector);

  if (!user.user.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
