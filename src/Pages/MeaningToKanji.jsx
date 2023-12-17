import React from "react";
import "../styling/KanjiToMeaning.css";
const MeaningToKanji = ({
  extractedKanji,
  currentKanjiIndex,
  extractUserKanjiInput,
  hitEntertoProceedMeaning,
  userKanjiInput,
  isCorrect,
  checkAndShowNextMeaning,
  inputBlank,
  markIncorrectOnSkip,
  disableSkip,
  disableCheck,
}) => {
  return (
    <div className="extractedKanjiSection">
      {extractedKanji.length > 0 && (
        <div className="quiz-container">
          <div className="kanji-api-details">
            {console.log(extractedKanji)}
            <p className="quiz-question">
              Kanji's Meaning <i class="fa-solid fa-caret-down"></i>
            </p>
            <p className="quiz-jp-meaning">
              {extractedKanji[currentKanjiIndex].meanings.join(", ")}
            </p>
            {/* <p>Kanji</p>
            <p>{extractedKanji[currentKanjiIndex].kanji}</p> */}
          </div>
          <div className="checkKanji">
            <input
              type="text"
              id="kanjiInput"
              name="kanjiInput"
              lang="ja"
              onChange={extractUserKanjiInput}
              onKeyDown={hitEntertoProceedMeaning}
              placeholder="Type the Kanji..."
              value={userKanjiInput}
            />
          </div>
          {inputBlank && (
            <p className="blank-input-message">Input cannot be blank!</p>
          )}
          <div className="quizMiniResult">
            {isCorrect != null && (
              <p className={isCorrect ? "correct-answer" : "incorrect-answer"}>
                {isCorrect ? "Correct!" : "Incorrect"}
              </p>
            )}
            {isCorrect == false && (
              <p className="corrected-answer">
                <strong>
                  Correct Answer is <i class="fa-solid fa-caret-right"></i>
                </strong>
                {" " + extractedKanji[currentKanjiIndex].kanji}
              </p>
            )}
            <div className="quiz-submission-type">
              {currentKanjiIndex < extractedKanji.length && (
                <button
                  className="japanese-button"
                  onClick={checkAndShowNextMeaning}
                  disabled={disableCheck}
                >
                  Check and Proceed
                </button>
              )}
              {
                <button
                  className="japanese-button"
                  onClick={markIncorrectOnSkip}
                  disabled={disableSkip}
                >
                  Skip
                </button>
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeaningToKanji;
