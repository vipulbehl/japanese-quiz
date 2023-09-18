import { useEffect, useState, useRef } from "react";

const Kanji = () => {
  const [kanjiData, setkanjiData] = useState([]);
  const [kanjiNumber, setKanjiNumber] = useState(1);
  const [extractedKanji, setExtractedKanji] = useState([]);
  const [currentKanjiIndex, setCurrentKanjiIndex] = useState([]);
  const [showNextButton, setShowNextButton] = useState(false);

  // Display the Grade 1 kanji characters
  const getKanjiData = async () => {
    const data = await fetch(`https://kanjiapi.dev/v1/kanji/grade-1`);
    const kanjis = await data.json();
    setkanjiData(kanjis);
    console.log(kanjis);
    //It is JSON Array
  };

  useEffect(() => {
    getKanjiData();
  }, []);

  const extractNumber = (event) => {
    setKanjiNumber(event.target.value);
    console.log("value is:", event.target.value);
  };

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
      setShowNextButton(true);
    } else {
      alert(
        "Invalid input. Please enter a number between 1 and the available kanji characters."
      );
    }
  };

  const showNextKanji = () => {
    if (currentKanjiIndex < extractedKanji.length - 1) {
      setCurrentKanjiIndex(currentKanjiIndex + 1);
    } else {
      setShowNextButton(false);
    }
  };

  return (
    <div>
      <div className="getKanjiSection">
        <input
          type="text"
          id="kanjiNumber"
          name="kanjiNumber"
          onChange={extractNumber}
          value={kanjiNumber}
        />
        {/* Do for just grade-1 later select other grades */}
        <button onClick={getListStoreKanji}>Let's Go</button>
      </div>
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
            {showNextButton && <button onClick={showNextKanji}>Next</button>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Kanji;
