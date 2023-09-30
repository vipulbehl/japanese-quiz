//Kanji Page is the quiz page
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//Since the last quiz questions state was not being updated using setCorrectAnswers & setIncorrectAnswers because of post increment happening
//two varibales were take with pre increment, providing correctAnswers & incorrectAnswers as state 1 was not a solution since leaner cannot start with 1
let newCorrectAnswers = 0;
let newIncorrectAnswers = 0;
const Kanji = () => {
  const [kanjiData, setKanjiData] = useState([]);
  const [extractedKanji, setExtractedKanji] = useState([]);
  const [currentKanjiIndex, setCurrentKanjiIndex] = useState();
  const [userKanjiInput, setUserKanjiInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const { selectedLevel, kanjiNumber } = useParams();
  const navigate = useNavigate();

  // Dynamic API calling as per the level selected
  const getKanjiData = async (level) => {
    console.log("Selected Level:", level);
    const data = await fetch(`https://kanjiapi.dev/v1/kanji/${level}`);
    const kanjis = await data.json();
    setKanjiData(kanjis);
    console.log(kanjis);
  };

  useEffect(() => {
    console.log("Received Selected Level:", selectedLevel);
    if (selectedLevel) {
      getKanjiData(selectedLevel);
    }
  }, [selectedLevel]);

  useEffect(() => {
    getListStoreKanji();
  }, [kanjiData]);

  //stores the data for the randomly extracted number of kanjis
  const getListStoreKanji = async () => {
    if (
      !isNaN(kanjiNumber) &&
      kanjiNumber > 0 &&
      kanjiNumber <= kanjiData.length
    ) {
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
      setCurrentKanjiIndex(0);
    }
  };

  const extractUserKanjiInput = (event) => {
    setUserKanjiInput(event.target.value);
    console.log("User Kani Input is : ", event.target.value);
  };

  const checkAndShowNextKanji = () => {
    const userMeaning = userKanjiInput.trim().toLowerCase();
    const actualMeanings = extractedKanji[currentKanjiIndex].meanings.map(
      (meaning) => meaning.toLowerCase()
    );

    if (actualMeanings.includes(userMeaning)) {
      setIsCorrect(true);
      ++newCorrectAnswers;
      setCorrectAnswers(newCorrectAnswers);
      console.log("Correct Count", newCorrectAnswers);
    } else {
      setIsCorrect(false);
      ++newIncorrectAnswers;
      setIncorrectAnswers(newIncorrectAnswers);
      console.log("Incorrect Count", newIncorrectAnswers);
    }

    // Delay for 5 seconds and then proceed to the next kanji
    setTimeout(() => {
      if (currentKanjiIndex < extractedKanji.length - 1) {
        setCurrentKanjiIndex(currentKanjiIndex + 1);
        setIsCorrect(null);
        setUserKanjiInput("");
      } else {
        navigate(`/result/${newCorrectAnswers}/${newIncorrectAnswers}`);
      }
    }, 3000);
  };

  return (
    <div>
      <div className="extractedKanjiSection">
        {extractedKanji.length > 0 && (
          <div>
            {console.log(extractedKanji)}
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
              {isCorrect != null && (
                <p>{isCorrect ? "Correct!" : "Incorrect"}</p>
              )}
              {currentKanjiIndex < extractedKanji.length && (
                <button onClick={checkAndShowNextKanji}>
                  Check and Proceed
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Kanji;
