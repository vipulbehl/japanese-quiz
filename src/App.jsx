import "../src/styling/App.css";
// import LoginButton from "./Components/LoginButton";
// import LogoutButton from "./Components/LogoutButton";
// import Profile from "./Components/Profile";
import { BrowserRouter } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./styling/Main.css";

import AuthHandler from "./Pages/AuthHandler";

const App = () => {
  const { isLoading, error } = useAuth0();

  // return (
  //   <BrowserRouter>
  //     <main className="app-container">
  //       {<h1 className="app-heading">漢字 Quiz </h1>}
  //       {error && <p>Authentication Error</p>}
  //       {!error && isLoading && <p>Loading...</p>}
  //       {!error && !isLoading && (
  //         <>
  //           <LoginButton />
  //           <LogoutButton />
  //           <Profile />
  //         </>
  //       )}
  //     </main>
  //   </BrowserRouter>
  // );
  return (
    <BrowserRouter>
      <main className="app-container">
        {<h1 className="app-heading">漢字 Quiz </h1>}
        {error && <p>Authentication Error</p>}
        {!error && isLoading && <p>Loading...</p>}
        {!error && !isLoading && <AuthHandler />}
      </main>
    </BrowserRouter>
  );
};

export default App;
//App->Profile->Pages(Routes)-> Access the other functionality.
