//This page would show the quiz result and would have a button to go back to home
import React from "react";
import { useParams, Link } from "react-router-dom";

const Result = () => {
  const { correctAnswers, incorrectAnswers } = useParams();

  return (
    <div className="resultSection">
      <h1>Results</h1>
      <p>Total Correct Answers: {correctAnswers}</p>
      <p>Total Incorrect Answers: {incorrectAnswers}</p>
      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
};

export default Result;
