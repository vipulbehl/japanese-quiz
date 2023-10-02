import React from "react";

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
}) => {
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
                onKeyDown={hitEntertoProceedKanji}
                placeholder="Kanji Meaning..."
                value={userKanjiInput}
              />
            </div>
            {inputBlank && (
              <p className="warning-message">Input cannot be blank!</p>
            )}
            <div className="quizMiniResult">
              {isCorrect != null && (
                <p>{isCorrect ? "Correct!" : "Incorrect"}</p>
              )}
              {<button onClick={markIncorrectOnSkip}>Skip</button>}
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

export default KanjiToMeaning;
