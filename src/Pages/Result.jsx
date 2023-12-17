//This page would show the quiz result and would have a button to go back to home
import React from "react";
import { useParams, Link } from "react-router-dom";
import "../styling/Result.css";

const Result = () => {
  const { correctAnswers, incorrectAnswers } = useParams();

  return (
    <div className="resultSection">
      <div className="result-container">
        <h2>
          Results <i class="fa-solid fa-caret-down"></i>
        </h2>
        <p>
          Total Correct Answers <i class="fa-solid fa-caret-right"></i>{" "}
          {correctAnswers}
        </p>
        <p>
          Total Incorrect Answers <i class="fa-solid fa-caret-right"></i>{" "}
          {incorrectAnswers}
        </p>
        <Link to="/home">
          <button className="japanese-button back-home-button">Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Result;
