import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Loader from "./Loader";

export default function ProtectedRoute({ children, anonymousAllowed = false }) {
  const location = useLocation();
  const from = location.state?.from || "/";
  const { isLoggedIn, isAuthChecked } = useContext(CurrentUserContext);
  if (!isAuthChecked) return <Loader />;
  if (anonymousAllowed) {
    return isLoggedIn ? <Navigate to={from} replace /> : children;
  }

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
