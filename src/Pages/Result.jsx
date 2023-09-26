//This page would show the quiz result and would have a button to go back to home
import React from "react";
import { useLocation } from "react-router-dom";

const Result = ({ correctAnswers, incorrectAnswers }) => {
  return (
    <div className="resultSection">
      <h1>Results</h1>
      <p>Total Correct Answers: {correctAnswers}</p>
      <p>Total Incorrect Answers: {incorrectAnswers}</p>
    </div>
  );
};

export default Result;
