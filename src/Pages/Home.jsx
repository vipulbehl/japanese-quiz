//Home page this will have the level selector and the number of questions for the quiz
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styling/Home.css";

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

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="cover">
      <div className="question-section-holder">
        {/* <button  onClick={handleLogout}>Logout</button> */}
        <h4 className="home-headings">Select your level:</h4>
        <div className="select-level">
          {levels.map((level) => (
            <button
              className="japanese-button"
              key={level}
              onClick={() => selectLevel(level)}
            >
              {level}
            </button>
          ))}
        </div>
        <div className="getKanjiSection">
          <div className="question-secion">
            <h4 className="home-headings">Questions to take in Quiz: </h4>
            <input
              type="text"
              id="kanjiNumber"
              name="kanjiNumber"
              onChange={extractNumber}
              onKeyDown={hitEntertoProceed}
              value={kanjiNumber}
            />
          </div>
          <div className="quiz-type">
            <h4 className="home-headings">
              What type of Quiz would you like to take?
            </h4>
            <div className="quiz-type-buttons">
              {quizes.map((quiz) => (
                <button
                  className="japanese-button"
                  key={quiz}
                  onClick={() => selectQuizType(quiz)}
                >
                  {quiz}
                </button>
              ))}
            </div>
          </div>
          <div className="lets-go-section">
            <button
              className="japanese-button"
              onClick={startQuiz}
              disabled={kanjiNumber > 80}
            >
              Let's Go
            </button>
          </div>
          {showWarning && (
            <p className="warning-message">
              Studies have shown taking a maximum of 80 questions at once
              optimizes quiz output for the learner.
            </p>
          )}
        </div>
      </div>
      <div className="quizSettings">
        <div className="settings-holder">
          <h4 className="home-headings make-bold-settings">
            Current Quiz Settings
          </h4>

          <p>
            <i class="fa-solid fa-caret-right">
              <span className="make-bold-settings"> Grade:</span>
            </i>{" "}
            {selectedLevel}
          </p>
          <p>
            <i class="fa-solid fa-caret-right">
              <span className="make-bold-settings">
                {" "}
                Number of Quiz Questions:
              </span>
            </i>{" "}
            {kanjiNumber}
          </p>
          <p>
            <i class="fa-solid fa-caret-right">
              <span className="make-bold-settings"> Quiz Type: </span>
            </i>{" "}
            {quizType}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
