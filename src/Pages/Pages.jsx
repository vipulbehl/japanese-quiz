import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Kanji from "./Kanji";
import Result from "./Result";
import NotFound from "./NotFound";
import Logout from "./Logout";

function Pages() {
  return (
    <Routes>
      <Route path="" element={<div />} />
      <Route path="/home" element={<Home />} />
      <Route path="/logout" element={<Logout />} />
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
  );
}

export default Pages;
