//Home page this will have the level selector and the number of questions for the quiz
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const levels = [
  "grade-1",
  "grade-2",
  "grade-3",
  "grade-4",
  "grade-5",
  "grade-6",
  "grade-8",
  "all",
];

const quizes = ["Kanji To Meaning", "Meaning To Kanji"];

const Home = () => {
  const [selectedLevel, setSelectedLevel] = useState("grade-1");
  const [kanjiNumber, setKanjiNumber] = useState(1);
  const [quizType, setQuizType] = useState("Kanji To Meaning");
  const [showWarning, setShowWarning] = useState(false);

  const navigate = useNavigate();

  const selectLevel = (level) => {
    console.log("Level is set in Home Page as :", level);
    setSelectedLevel(level);
  };

  const extractNumber = (event) => {
    setKanjiNumber(event.target.value);
    console.log("value is:", event.target.value);

    if (event.target.value > 80) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  };

  const startQuiz = () => {
    console.log("Selected Level:", selectedLevel);
    if (kanjiNumber > 80) {
      return;
    }
    navigate(`/kanji/${selectedLevel}/${kanjiNumber}/${quizType}`);
  };

  const selectQuizType = (quiz) => {
    setQuizType(quiz);
  };

  // This is just to get the correct Quiz Type in Console
  useEffect(() => {
    console.log("Type of quiz :", quizType);
  }, [quizType]);

  const hitEntertoProceed = (event) => {
    //it triggers by pressing the enter key
    if (event.keyCode === 13) {
      startQuiz();
    }
  };

  return (
    <div>
      <div className="select-level">
        {levels.map((level) => (
          <button key={level} onClick={() => selectLevel(level)}>
            {level}
          </button>
        ))}
      </div>
      <div className="getKanjiSection">
        <input
          type="text"
          id="kanjiNumber"
          name="kanjiNumber"
          onChange={extractNumber}
          onKeyDown={hitEntertoProceed}
          value={kanjiNumber}
        />
        <div className="quiz-type">
          {quizes.map((quiz) => (
            <button key={quiz} onClick={() => selectQuizType(quiz)}>
              {quiz}
            </button>
          ))}
        </div>
        {showWarning && (
          <p className="warning-message">
            Studies have shown taking a maximum of 80 questions at once
            optimizes quiz output for the learner.
          </p>
        )}
        <button onClick={startQuiz} disabled={kanjiNumber > 80}>
          Let's Go
        </button>
        <div className="quizSettings">
          <h3>Current Quiz Settings</h3>
          <p>Grade:{selectedLevel}</p>
          <p>Number of Quiz Questions: {kanjiNumber}</p>
          <p>Quiz Type : {quizType}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
