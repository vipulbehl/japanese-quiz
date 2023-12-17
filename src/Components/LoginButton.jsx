import { useAuth0 } from "@auth0/auth0-react";
import "../styling/Base.css";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <button className="japanese-button" onClick={() => loginWithRedirect()}>
        Sign In
      </button>
    )
  );
};

export default LoginButton;
