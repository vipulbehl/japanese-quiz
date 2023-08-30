import { useEffect, useState } from "react";

// const { Kanjiapi } = require("kanjiapi-wrapper");

const Kanji = () => {
  const [kanjiData, setkanjiData] = useState([]);
  const [singleKanjiData, setSingleKanjiData] = useState([]);

  // Display the Grade 1 kanji characters
  const getKanjiData = async () => {
    const data = await fetch(`https://kanjiapi.dev/v1/kanji/grade-1`);
    const kanjis = await data.json();
    setkanjiData(kanjis);
    console.log(kanjis);
    //It is JSON Array
    getSingleKanji();
  };

  //Randomly select one kanji from this list, store it somewhere, then hit the API https://kanjiapi.dev/v1/kanji/{the-kanji-retrived}
  const getSingleKanji = async () => {
    const randomIndex = Math.floor(Math.random() * kanjiData.length);
    console.log(randomIndex);
    const randomIndexKanji = kanjiData[randomIndex];
    console.log(randomIndexKanji);
    // Simply console log the response retrived from the API
    const singleData = await fetch(`https://kanjiapi.dev/v1/kanji/出`);
    const singleKanji = await singleData.json();
    setSingleKanjiData(singleKanji);
    console.log(singleKanji);
  };

  useEffect(() => {
    getKanjiData();
  }, []);

  return (
    <ul>
      {kanjiData.map((kanji, index) => {
        return <li key={index}>{kanji}</li>;
      })}
    </ul>
  );
};

export default Kanji;
