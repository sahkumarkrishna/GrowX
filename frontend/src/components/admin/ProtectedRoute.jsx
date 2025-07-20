import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "recruiter") {
      navigate("/");
    }
  }, [user, navigate]); // <- add dependencies

  if (!user || user.role !== "recruiter") {
    return null; // optionally show a loader or fallback UI
  }

  return <>{children}</>;
};

export default ProtectedRoute;
