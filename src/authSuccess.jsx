import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);

      navigate("/");
    } else {
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <div>
      <p>Completing sign in...</p>
    </div>
  );
};

export default AuthSuccess;
