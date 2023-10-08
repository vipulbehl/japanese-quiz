//Kanji Page is the quiz page
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import KanjiToMeaning from "./KanjiToMeaning";
import MeaningToKanji from "./MeaningToKanji";

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
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [skipButtonDisabled, setSkipButtonDisabled] = useState(false);
  const [inputBlank, setInputBlank] = useState(false);
  const [disableSkip, setDisableSkip] = useState(false);
  const [disableCheck, setDisableCheck] = useState(false);

  const { selectedLevel, kanjiNumber, quizType } = useParams();

  const navigate = useNavigate();

  // Dynamic API calling as per the level selected
  const getKanjiData = async (level) => {
    console.log("Selected Level:", level);
    const data = await fetch(`https://kanjiapi.dev/v1/kanji/${level}`);
    const kanjis = await data.json();
    setKanjiData(kanjis);
    console.log(kanjis);
    //Setting these variables to 0 since every time the components
    //Redirects from result to home and then to Kanji this should be 0 otherwise the results would be cumilate
    newCorrectAnswers = 0;
    newIncorrectAnswers = 0;
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
    console.log("User Kanji Input is : ", event.target.value);
  };

  const checkAndShowNextKanji = () => {
    //To prevent multiple clicks for Check and Proceed
    //Initially false -> Get into the func -> Becomes true ->
    //Everytime on click stays true (unclickable) ->
    //After 3 seconeds gets back to false(clickable) ->
    //Also after 3 seconds the kanji changes

    if (buttonDisabled) {
      return;
    }

    // Check if the input is blank
    if (userKanjiInput.trim() === "") {
      setInputBlank(true);
      return; // Don't proceed further
    }

    // Disable the button
    setButtonDisabled(true);

    //Disable Skip if Check and Proceed is clicked
    setDisableSkip(true);

    // Reset the input blank flag
    setInputBlank(false);

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

    //   // Delay for 5 seconds and then proceed to the next kanji
    setTimeout(() => {
      if (currentKanjiIndex < extractedKanji.length - 1) {
        setCurrentKanjiIndex(currentKanjiIndex + 1);
        setIsCorrect(null);
        setUserKanjiInput("");
      } else {
        navigate(`/result/${newCorrectAnswers}/${newIncorrectAnswers}`);
      }
      setButtonDisabled(false);
      setDisableSkip(false);
    }, 3000);
  };

  const checkAndShowNextMeaning = () => {
    //To prevent multiple clicks for Check and Proceed
    //Initially false -> Get into the func -> Becomes true ->
    //Everytime on click stays true (unclickable) ->
    //After 3 seconeds gets back to false(clickable) ->
    //Also after 3 seconds the kanji changes

    if (buttonDisabled) {
      return;
    }

    // Check if the input is blank
    if (userKanjiInput.trim() === "") {
      setInputBlank(true);
      return; // Don't proceed further
    }

    // Disable the button
    setButtonDisabled(true);

    //Disable Skip if Check and Proceed is clicked
    setDisableSkip(true);

    // Reset the input blank flag
    setInputBlank(false);

    const userMeaning = userKanjiInput.normalize("NFC");
    const actualMeanings =
      extractedKanji[currentKanjiIndex].kanji.normalize("NFC");
    console.log(userMeaning);
    console.log(typeof userMeaning);
    console.log(typeof actualMeanings);
    if (actualMeanings == userMeaning) {
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
      setButtonDisabled(false);
      setDisableSkip(false);
    }, 3000);
  };

  const hitEntertoProceedKanji = (event) => {
    //it triggers by pressing the enter key
    if (event.keyCode === 13) {
      checkAndShowNextKanji();
    }
  };

  const hitEntertoProceedMeaning = (event) => {
    //it triggers by pressing the enter key
    if (event.keyCode === 13) {
      checkAndShowNextMeaning();
    }
  };

  const markIncorrectOnSkip = () => {
    if (skipButtonDisabled) {
      return;
    }

    setSkipButtonDisabled(true);

    setIsCorrect(false);

    //Disbale Check and Proceed if Skip is clicked
    setDisableCheck(true);

    //Clears our the strings "Input cannot be blank!" when skip is clicked after check & proceed is clicked with blank input
    setInputBlank(false);

    ++newIncorrectAnswers;
    setIncorrectAnswers(newIncorrectAnswers);
    console.log("Incorrect Count", newIncorrectAnswers);
    setTimeout(() => {
      if (currentKanjiIndex < extractedKanji.length - 1) {
        setCurrentKanjiIndex(currentKanjiIndex + 1);
        setIsCorrect(null);
        setUserKanjiInput("");
      } else {
        navigate(`/result/${newCorrectAnswers}/${newIncorrectAnswers}`);
      }
      setSkipButtonDisabled(false);
      setDisableCheck(false);
    }, 3000);
  };

  //Need to add contion rendering as per the Type of Quiz Selected
  return (
    <div>
      {quizType === "Kanji To Meaning" ? (
        <KanjiToMeaning
          extractedKanji={extractedKanji}
          currentKanjiIndex={currentKanjiIndex}
          extractUserKanjiInput={extractUserKanjiInput}
          hitEntertoProceedKanji={hitEntertoProceedKanji}
          userKanjiInput={userKanjiInput}
          isCorrect={isCorrect}
          checkAndShowNextKanji={checkAndShowNextKanji}
          inputBlank={inputBlank}
          markIncorrectOnSkip={markIncorrectOnSkip}
          disableSkip={disableSkip}
          disableCheck={disableCheck}
        />
      ) : (
        <MeaningToKanji
          extractedKanji={extractedKanji}
          currentKanjiIndex={currentKanjiIndex}
          extractUserKanjiInput={extractUserKanjiInput}
          hitEntertoProceedMeaning={hitEntertoProceedMeaning}
          userKanjiInput={userKanjiInput}
          isCorrect={isCorrect}
          checkAndShowNextMeaning={checkAndShowNextMeaning}
          inputBlank={inputBlank}
          markIncorrectOnSkip={markIncorrectOnSkip}
          disableSkip={disableSkip}
          disableCheck={disableCheck}
        />
      )}
    </div>
  );
};

export default Kanji;
