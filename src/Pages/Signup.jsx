import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = () => {
    // Validate and save the user data to local storage
    if (name && email && password) {
      const user = { name, email, password };
      localStorage.setItem("user", JSON.stringify(user));
      navigate(`/home`);
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button onClick={handleSignUp}>Sign Up</button>
      <Link to="/login">
        <button>Already a user? Login</button>
      </Link>
    </div>
  );
};

export default Signup;
