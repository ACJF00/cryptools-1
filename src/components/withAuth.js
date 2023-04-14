import React from "react";
import { useNavigate } from "react-router-dom";

function withAuth(Component) {
  return function WithAuth(props) {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    if (!token) {
      // Redirect the user to the login page if no token is present
      navigate("/login");
      return null;
    }

    return <Component {...props} />;
  };
}

export default withAuth;
