// HomePage.jsx
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [isSignInClicked, setIsSignInClicked] = useState(false);

  const handleSignInClick = () => {
    // Set state to indicate that "Sign In" was clicked
    setIsSignInClicked(true);
    // Perform the authentication process
    loginWithRedirect();
  };

  return (
    <div className="homepage-container">
      <h1>Welcome to 漢字 Quiz</h1>
      <p>This is the homepage text.</p>
      {!isAuthenticated && !isSignInClicked && (
        <button onClick={handleSignInClick}>Sign In</button>
      )}
      {isAuthenticated && <Link to="/auth">Go to Auth Page</Link>}
    </div>
  );
};

export default HomePage;
