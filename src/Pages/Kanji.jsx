//Kanji Page is the quiz page
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useLocation } from "react-router-dom";

const Kanji = () => {
  const [kanjiData, setKanjiData] = useState([]);
  const [extractedKanji, setExtractedKanji] = useState([]);
  const [currentKanjiIndex, setCurrentKanjiIndex] = useState(0);
  const [userKanjiInput, setUserKanjiInput] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [showResults, setShowResults] = useState(false);
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
        navigate("/result", { state: { correctAnswers, incorrectAnswers } });
        // setShowResults(true);
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

              {/* {showResults && (
                <div className="resultsSection">
                  <h2>Results</h2>
                  <p>Correct Answers: {correctAnswers}</p>
                  <p>Incorrect Answers: {incorrectAnswers}</p>
                </div>
              )} */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Kanji;

//To Do
/*



*DONE*
-> Now I want to have the input field where the user will input the meaning of the kanji character, and on click of Next button  

*DONE*
-> If the user click on Check and Proceed the value from the input field would be compared from the meaning of the API, if matches any element in the list
show correct otherwise show incorrect 
  --> This is be shown for 5s and after that next kanji should be shown
  -->Comparision should be done in such a way all the elements in the array should be compared in case insesitive way

*/
