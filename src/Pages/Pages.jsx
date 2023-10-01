import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Kanji from "./Kanji";
import Result from "./Result";
import NotFound from "./NotFound";

function Pages() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route path="/kanji" element={<Kanji />} /> */}
        <Route
          path="/kanji/:selectedLevel/:kanjiNumber/:quizType"
          element={<Kanji />}
        />
        <Route
          path="/result/:correctAnswers/:incorrectAnswers"
          element={<Result />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default Pages;
