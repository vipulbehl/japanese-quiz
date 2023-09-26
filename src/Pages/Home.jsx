//Home page this will have the level selector and the number of questions for the quiz
import React, { useState } from "react";
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

const Home = () => {
  const [selectedLevel, setSelectedLevel] = useState("grade-1");
  const [kanjiNumber, setKanjiNumber] = useState(1);
  const navigate = useNavigate();

  const selectLevel = (level) => {
    console.log("Level is set in Home Page as :", level);
    setSelectedLevel(level);
  };

  const extractNumber = (event) => {
    setKanjiNumber(event.target.value);
    console.log("value is:", event.target.value);
  };

  const startQuiz = () => {
    console.log("Selected Level:", selectedLevel);
    // navigate("/kanji", { state: { selectedLevel, kanjiNumber } });
    navigate(`/kanji/${selectedLevel}/${kanjiNumber}`);
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
          value={kanjiNumber}
        />
        <button onClick={startQuiz}>Let's Go</button>
      </div>
    </div>
  );
};

export default Home;
