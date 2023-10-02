import React from "react";

const MeaningToKanji = ({
  extractedKanji,
  currentKanjiIndex,
  extractUserKanjiInput,
  hitEntertoProceedMeaning,
  userKanjiInput,
  isCorrect,
  checkAndShowNextMeaning,
}) => {
  return (
    <div className="extractedKanjiSection">
      {extractedKanji.length > 0 && (
        <div>
          {console.log(extractedKanji)}
          <h2>Extracted Kanji's Meaning</h2>
          <p>{extractedKanji[currentKanjiIndex].meanings.join(", ")}</p>
          {/* <p>Onyomi Readings :</p>
            <p>{extractedKanji[currentKanjiIndex].on_readings.join(", ")}</p>
            <p>Kunyomi Readings :</p>
            <p>{extractedKanji[currentKanjiIndex].kun_readings.join(", ")}</p> */}
          <p>Kanji</p>
          <p>{extractedKanji[currentKanjiIndex].kanji}</p>
          <div className="checkKanji">
            <input
              type="text"
              id="kanjiInput"
              name="kanjiInput"
              lang="ja"
              onChange={extractUserKanjiInput}
              onKeyDown={hitEntertoProceedMeaning}
              placeholder="Kanji..."
              value={userKanjiInput}
            />
          </div>
          <div className="quizMiniResult">
            {isCorrect != null && <p>{isCorrect ? "Correct!" : "Incorrect"}</p>}
            {currentKanjiIndex < extractedKanji.length && (
              <button onClick={checkAndShowNextMeaning}>
                Check and Proceed
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MeaningToKanji;
