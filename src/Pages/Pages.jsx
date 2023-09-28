import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Kanji from "./Kanji";
import Result from "./Result";

function Pages() {
  return (
    <Router>
      <Routes>
        <Route exact path="/:home?" element={<Home />} />
        {/* <Route path="/kanji" element={<Kanji />} /> */}
        <Route path="/kanji/:selectedLevel/:kanjiNumber" element={<Kanji />} />
        <Route
          path="/result/:correctAnswers/:incorrectAnswers"
          element={<Result />}
        />
      </Routes>
    </Router>
  );
}

export default Pages;
