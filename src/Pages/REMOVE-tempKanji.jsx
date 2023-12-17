// import { useEffect, useState, useRef } from "react";

// // const { Kanjiapi } = require("kanjiapi-wrapper");

// const Kanji = () => {
//   const [kanjiData, setkanjiData] = useState([]);
//   const [singleKanjiData, setSingleKanjiData] = useState([]);
//   const [kanjiNumber, setKanjiNumber] = useState(1);

//   // Display the Grade 1 kanji characters
//   const getKanjiData = async () => {
//     const data = await fetch(`https://kanjiapi.dev/v1/kanji/grade-1`);
//     const kanjis = await data.json();
//     setkanjiData(kanjis);
//     console.log(kanjis);
//     //It is JSON Array
//     if (kanjis.length > 0) getSingleKanji();
//   };

//   //Randomly select one kanji from this list, store it somewhere, then hit the API https://kanjiapi.dev/v1/kanji/{the-kanji-retrived}
//   const getSingleKanji = async () => {
//     const randomIndex = Math.floor(Math.random() * kanjiData.length);
//     console.log(randomIndex);
//     const randomIndexKanji = kanjiData[randomIndex];
//     console.log(randomIndexKanji);
//     const singleData = await fetch(
//       `https://kanjiapi.dev/v1/kanji/${randomIndexKanji}`
//     );
//     const singleKanji = await singleData.json();
//     setSingleKanjiData(singleKanji);
//     console.log(singleKanji);
//   };

//   const extractNumber = (event) => {
//     setKanjiNumber(event.target.value);
//     console.log("value is:", event.target.value);
//   };

//   useEffect(() => {
//     getKanjiData();
//   }, []);

//   const getListStoreKanji = async () => {};

//   return (
//     <div>
//       <div className="getKanjiSection">
//         {/* Take the value from input -> Generate that many random values->On Clicking next [those values should iterate]
//         10->Store these 10 values somewhere/ Generate at rendering -> On Clicking next a new value should be there-> This should happen for 9 more times*/}
//         <input
//           type="text"
//           id="kanjiNumber"
//           name="kanjiNumber"
//           onChange={extractNumber}
//           value={kanjiNumber}
//         />
//         {/* Do for just grade-1 later select other grades */}
//         <button onClick={getListStoreKanji}>Let's Go</button>
//         {/* <button onClick={extractNumber}>Practice</button> */}
//         {/* <button onClick={getSingleKanji}>Generate Kanji</button> */}
//         <h1>{singleKanjiData.kanji}</h1> <br />
//         {/* Join is causing and error due to which the initial rendering is not completed successfully */}
//         {singleKanjiData.kun_readings ? (
//           <>Kunyomi Readings: {singleKanjiData.kun_readings.join(", ")}</>
//         ) : null}
//         <br />
//         {singleKanjiData.kun_readings ? (
//           <>Onyomi Readings: {singleKanjiData.on_readings.join(", ")}</>
//         ) : null}
//         <br />
//       </div>
//     </div>
//   );
// };

// export default Kanji;
import React, { useEffect, useState } from "react";

const Kanji = () => {
  const [kanjiData, setKanjiData] = useState([]);
  const [kanjiNumber, setKanjiNumber] = useState(1);
  const [extractedKanji, setExtractedKanji] = useState([]);

  const getKanjiData = async () => {
    const data = await fetch(`https://kanjiapi.dev/v1/kanji/grade-1`);
    const kanjis = await data.json();
    setKanjiData(kanjis);
  };

  const extractNumber = (event) => {
    setKanjiNumber(event.target.value);
  };

  useEffect(() => {
    getKanjiData();
  }, []);

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
    } else {
      alert(
        "Invalid input. Please enter a number between 1 and the available kanji characters."
      );
    }
  };

  return (
    <div>
      <div className="getKanjiSection">
        <input
          type="number"
          id="kanjiNumber"
          name="kanjiNumber"
          onChange={extractNumber}
          value={kanjiNumber}
        />
        <button onClick={getListStoreKanji}>Let's Go</button>
      </div>
      <div className="extractedKanjiSection">
        <h2>Extracted Kanji</h2>
        <ul>
          {extractedKanji.map((kanjiCharacter, index) => (
            <li key={index}>{kanjiCharacter.kanji}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Kanji;
