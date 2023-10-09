import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Kanji from "./Kanji";
import Result from "./Result";
import NotFound from "./NotFound";
import Signup from "./Signup";
import Login from "./Login";

function Pages() {
  return (
    <Router>
      <Routes>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
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
