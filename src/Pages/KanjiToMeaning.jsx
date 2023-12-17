import React from "react";
import "../styling/KanjiToMeaning.css";

const KanjiToMeaning = ({
  extractedKanji,
  currentKanjiIndex,
  extractUserKanjiInput,
  hitEntertoProceedKanji,
  userKanjiInput,
  isCorrect,
  checkAndShowNextKanji,
  inputBlank,
  markIncorrectOnSkip,
  disableSkip,
  disableCheck,
}) => {
  return (
    <div>
      <div className="extractedKanjiSection">
        {extractedKanji.length > 0 && (
          <div className="quiz-container">
            {console.log(extractedKanji)}
            <div className="kanji-api-details">
              <div className="quiz-kanji-holder">
                <p className="quiz-question">
                  Kanji <i class="fa-solid fa-caret-down"></i>
                </p>
                <p className="quiz-jp-reading">
                  {extractedKanji[currentKanjiIndex].kanji}
                </p>
              </div>
              <div className="onyomi-section">
                <p className="quiz-question">
                  Onyomi Readings <i class="fa-solid fa-caret-down"></i>
                </p>
                <p>
                  {extractedKanji[currentKanjiIndex].on_readings.join(", ")}
                </p>
              </div>
              <div className="kunyomi-section">
                <p className="quiz-question">
                  Kunyomi Readings <i class="fa-solid fa-caret-down"></i>
                </p>
                <p className="quiz-jp-reading">
                  {extractedKanji[currentKanjiIndex].kun_readings.join(", ")}
                </p>
              </div>
              {/* <p>Kanji Meaning :</p>
              <p className="quiz-jp-reading">
                {extractedKanji[currentKanjiIndex].meanings.join(", ")}
              </p> */}
            </div>
            <div className="checkKanji">
              <input
                type="text"
                id="kanjiInput"
                name="kanjiInput"
                onChange={extractUserKanjiInput}
                onKeyDown={hitEntertoProceedKanji}
                placeholder="Enter Kanji's Meaning..."
                value={userKanjiInput}
              />
            </div>
            {inputBlank && (
              <p className="blank-input-message">Input cannot be blank!</p>
            )}
            <div className="quizMiniResult">
              {isCorrect != null && (
                <p
                  className={isCorrect ? "correct-answer" : "incorrect-answer"}
                >
                  {isCorrect ? "Correct!" : "Incorrect"}
                </p>
              )}
              {isCorrect === false && (
                <p className="corrected-answer">
                  <strong>
                    Correct Answer is <i class="fa-solid fa-caret-right"></i>
                  </strong>
                  {" " + extractedKanji[currentKanjiIndex].meanings.join(", ")}
                </p>
              )}
              <div className="quiz-submission-type">
                {currentKanjiIndex < extractedKanji.length && (
                  <button
                    className="japanese-button"
                    onClick={checkAndShowNextKanji}
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
    </div>
  );
};

export default KanjiToMeaning;
