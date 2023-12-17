import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import validator from "validator";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    //Reset previous Errors
    setNameError("");
    setEmailError("");
    setPasswordError("");

    let hasError = false;

    if (name.trim().length === 0) {
      setNameError("Name is required");
      hasError = true;
    }

    if (email.trim().length === 0) {
      setEmailError("Email is required");
      hasError = true;
    } else {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!email.match(emailRegex)) {
        setEmailError("Please enter a valid email address.");
        hasError = true;
      }
    }

    if (password.trim().length === 0) {
      setPasswordError("Password is Required");
      hasError = true;
    } else {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!password.match(passwordRegex)) {
        setPasswordError(
          "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number."
        );
        hasError = true;
      }
    }

    if (hasError) {
      return;
    }

    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));
    navigate(`/home`);
  };

  const isButtonEnabled = name.trim() && email.trim() && password.trim();

  return (
    <div>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {nameError && <span className="warning-message">{nameError}</span>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {emailError && <span className="warning-message">{emailError}</span>}

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {passwordError && (
        <span className="warning-message">{passwordError}</span>
      )}

      <button disabled={!isButtonEnabled} onClick={handleSignUp}>
        Sign Up
      </button>
      <Link to="/login">
        <button>Already a user? Login</button>
      </Link>
    </div>
  );
};

export default Signup;
