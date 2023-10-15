import "./App.css";
import LoginButton from "./Components/LoginButton";
import LogoutButton from "./Components/LogoutButton";
import Profile from "./Components/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { isLoading, error } = useAuth0();
  return (
    <BrowserRouter>
      <main>
        <h1>Auth0 Login</h1>
        {error && <p>Authentication Error</p>}
        {!error && isLoading && <p>Loading...</p>}
        {!error && !isLoading && (
          <>
            <LoginButton />
            <LogoutButton />
            <Profile />
          </>
        )}
      </main>
    </BrowserRouter>
  );
};

export default App;
//App->Profile->Pages(Routes)-> Access the other functionality.
