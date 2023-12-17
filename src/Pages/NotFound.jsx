import React from "react";
import { Link } from "react-router-dom";
import "../styling/Error.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="error-conatiner">
        <h2>Error! </h2>
        <p>The page you are looking for doesn't exist...</p>
        <Link to="">
          <button className="japanese-button not-found-button">
            Go back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
