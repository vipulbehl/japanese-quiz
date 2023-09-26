# Japanese Quiz Project

Kanji Section ->
---------------- Quiz Data via API Section ----------------
Select the level Grade-1 to Grade-8
Hit the API to get specific selected grade's kanji
Retrive the Kanji in random order from the respective grade response
Hit the API which will give the information of the kanji
Retrive the Kanji Character, Onyomi & Kunyomi readings and show that
Learner will have an input field where the meaning can be typed (lowecase and include matching as multiple meanings are there)

---------------- Kanji Feature ----------------
Select Grade
Select Words to practice within the grade
Kanji would be displayed along with Onyomi and Kunyomi Readings 


Certainly! Here's your code split into three separate components: `Home`, `Kanji`, and `Result`, with the necessary state management:

**Home.jsx:**

```jsx
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Home = ({ onLevelSelect, onKanjiNumberSelect }) => {
  const [selectedLevel, setSelectedLevel] = useState("grade-1");
  const [kanjiNumber, setKanjiNumber] = useState(1);
  const history = useHistory();

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  const handleKanjiNumberSelect = (event) => {
    setKanjiNumber(event.target.value);
  };

  const startQuiz = () => {
    onLevelSelect(selectedLevel);
    onKanjiNumberSelect(kanjiNumber);
    history.push("/kanji");
  };

  return (
    <div>
      <div className="select-level">
        {levels.map((level) => (
          <button key={level} onClick={() => handleLevelSelect(level)}>
            {level}
          </button>
        ))}
      </div>
      <div className="getKanjiSection">
        <input
          type="text"
          id="kanjiNumber"
          name="kanjiNumber"
          onChange={handleKanjiNumberSelect}
          value={kanjiNumber}
        />
        <button onClick={startQuiz}>Let's Go</button>
      </div>
    </div>
  );
};

export default Home;
```

**Kanji.jsx:**

```jsx
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Kanji = ({ selectedLevel, kanjiNumber }) => {
  const [kanjiData, setKanjiData] = useState([]);
  const [extractedKanji, setExtractedKanji] = useState([]);
  const [currentKanjiIndex, setCurrentKanjiIndex] = useState([]);
  const [userKanjiInput, setUserKanjiInput] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const history = useHistory();

  // Fetch kanji data based on selectedLevel
  useEffect(() => {
    const getKanjiData = async () => {
      const data = await fetch(`https://kanjiapi.dev/v1/kanji/${selectedLevel}`);
      const kanjis = await data.json();
      setKanjiData(kanjis);
    };

    getKanjiData();
  }, [selectedLevel]);

  useEffect(() => {
    if (kanjiData.length > 0) {
      const extracted = [];
      for (let i = 0; i < kanjiNumber; i++) {
        const randomIndex = Math.floor(Math.random() * kanjiData.length);
        const randomIndexKanji = kanjiData[randomIndex];
        const singleData = await fetch(
          `https://kanjiapi.dev/v1/kanji/${randomIndexKanji}`
        );
        const singleKanji = await singleData.json();
        extracted.push(singleKanji);
      }
      setExtractedKanji(extracted);
    }
  }, [kanjiNumber, kanjiData]);

  const extractUserKanjiInput = (event) => {
    setUserKanjiInput(event.target.value);
  };

  const checkAndShowNextKanji = () => {
    const userMeaning = userKanjiInput.trim().toLowerCase();
    const actualMeanings = extractedKanji[currentKanjiIndex].meanings.map(
      (meaning) => meaning.toLowerCase()
    );

    if (actualMeanings.includes(userMeaning)) {
      setIsCorrect(true);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIsCorrect(false);
      setIncorrectAnswers(incorrectAnswers + 1);
    }

    // Delay for 5 seconds and then proceed to the next kanji
    setTimeout(() => {
      if (currentKanjiIndex < extractedKanji.length - 1) {
        setCurrentKanjiIndex(currentKanjiIndex + 1);
        setIsCorrect(null);
        setUserKanjiInput("");
      } else {
        // Last kanji, show results
        setShowResults(true);
      }
    }, 5000);
  };

  return (
    <div>
      <h1>Kanji Quiz</h1>
      {extractedKanji.length > 0 && (
        <div>
          <h2>Extracted Kanji</h2>
          <p>{extractedKanji[currentKanjiIndex].kanji}</p>
          <p>Onyomi Readings :</p>
          <p>{extractedKanji[currentKanjiIndex].on_readings.join(", ")}</p>
          <p>Kunyomi Readings :</p>
          <p>{extractedKanji[currentKanjiIndex].kun_readings.join(", ")}</p>
          <p>Kanji Meaning :</p>
          <p>{extractedKanji[currentKanjiIndex].meanings.join(", ")}</p>
          <div className="checkKanji">
            <input
              type="text"
              id="kanjiInput"
              name="kanjiInput"
              onChange={extractUserKanjiInput}
              placeholder="Kanji Meaning..."
              value={userKanjiInput}
            />
          </div>
          <div className="quizMiniResult">
            {isCorrect != null && <p>{isCorrect ? 'Correct!' : 'Incorrect'}</p>}
            {currentKanjiIndex < extractedKanji.length && (
              <button onClick={checkAndShowNextKanji}>Check and Proceed</button>
            )}

            {showResults && (
              <div className="resultsSection">
                <h2>Results</h2>
                <p>Total Correct Answers: {correctAnswers}</p>
                <p>Total Incorrect Answers: {incorrectAnswers}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Kanji;
```

**Result.jsx:**

```jsx
import React from "react";



const Result = ({ correctAnswers, incorrectAnswers }) => {
  return (
    <div>
      <h1>Results</h1>
      <p>Total Correct Answers: {correctAnswers}</p>
      <p>Total Incorrect Answers: {incorrectAnswers}</p>
    </div>
  );
};

export default Result;
```

Now you have three separate components: `Home`, `Kanji`, and `Result`, each with its own logic and state management. You can integrate these components into your application and set up routing to navigate between them as needed.

