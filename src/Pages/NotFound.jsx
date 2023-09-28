import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>Error! </h1>
      <h2>The page you are looking for doesn't exist</h2>
      <Link to="/">
        <button>Go back to Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
