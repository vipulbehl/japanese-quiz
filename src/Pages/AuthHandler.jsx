// AuthHandler.jsx
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Components/LoginButton";
import LogoutButton from "../Components/LogoutButton";
import Profile from "../Components/Profile";

const AuthHandler = () => {
  const { isLoading, error } = useAuth0();

  return (
    <>
      <LoginButton />
      <LogoutButton />
      <Profile />
    </>
  );
};

export default AuthHandler;
