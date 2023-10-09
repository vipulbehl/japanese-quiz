import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // const [loginError, setLoginError] = useState("");
  const [errorExist, setErrorExist] = useState(false);
  const handleLogin = () => {
    // Retrieve user data from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      // Redirect to home page upon successful login
      navigate(`/home`);
    } else {
      // setEmailError("Incorrect Credentials");
      setErrorExist(true);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errorExist && <p>Incorrect Credentials</p>}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
