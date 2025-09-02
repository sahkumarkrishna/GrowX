import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const quizBootstrap = {
  beginner: [
    { question: "What is Bootstrap primarily used for?", options: ["Styling websites", "Backend development", "Database management", "API creation"], answer: "Styling websites" },
    { question: "Which language is required for Bootstrap?", options: ["HTML, CSS, JS", "Python", "Java", "C++"], answer: "HTML, CSS, JS" },
    { question: "Which class adds a button style?", options: [".btn", ".button", ".btn-style", ".button-style"], answer: ".btn" },
    { question: "Which class makes text bold?", options: [".text-bold", ".fw-bold", ".font-bold", ".text-weight"], answer: ".fw-bold" },
    { question: "Which class makes an image responsive?", options: [".img-responsive", ".img-fluid", ".responsive-img", ".img-adapt"], answer: ".img-fluid" },
    { question: "Which component provides navigation links?", options: ["Navbar", "Button", "Card", "Form"], answer: "Navbar" },
    { question: "Which class adds spacing?", options: [".m-3", ".p-3", "Both A and B", ".space"], answer: "Both A and B" },
    { question: "Which class adds rounded corners?", options: [".rounded", ".circle", ".border-radius", ".corners"], answer: ".rounded" },
    { question: "Which class aligns text to center?", options: [".text-center", ".center-text", ".align-center", ".text-middle"], answer: ".text-center" },
    { question: "Which version of Bootstrap introduced Flexbox?", options: ["Bootstrap 3", "Bootstrap 4", "Bootstrap 2", "Bootstrap 5"], answer: "Bootstrap 4" },
    { question: "Which class creates a card component?", options: [".card", ".panel", ".box", ".container"], answer: ".card" },
    { question: "Which class creates a responsive grid?", options: [".row", ".grid", ".container", ".col"], answer: ".row" },
    { question: "Which class sizes columns in Bootstrap grid?", options: [".col-4", ".col-md-4", "Both A and B", ".grid-col"], answer: "Both A and B" },
    { question: "Which class makes text italic?", options: [".italic", ".text-italic", ".fst-italic", ".text-slant"], answer: ".fst-italic" },
    { question: "Which class hides an element?", options: [".d-none", ".hidden", ".invisible", ".hide"], answer: ".d-none" },
    { question: "Which class makes elements inline?", options: [".d-inline", ".inline", ".display-inline", ".d-inline-block"], answer: ".d-inline" },
    { question: "Which class creates alerts?", options: [".alert", ".notify", ".message", ".alert-box"], answer: ".alert" },
    { question: "Which class creates badges?", options: [".badge", ".label", ".tag", ".marker"], answer: ".badge" },
    { question: "Which class adds shadows?", options: [".shadow", ".box-shadow", ".shadow-md", ".shadow-lg"], answer: ".shadow" },
    { question: "Which class creates a modal?", options: [".modal", ".popup", ".dialog", ".window"], answer: ".modal" },
  ],

  intermediate: [
    { question: "Which class makes an image circular?", options: [".rounded-circle", ".circle", ".img-circle", ".img-round"], answer: ".rounded-circle" },
    { question: "Which class makes a button disabled?", options: [".disabled", ".btn-disabled", ".btn:disabled", ".inactive"], answer: ".disabled" },
    { question: "Which class adds a dropdown menu?", options: [".dropdown", ".drop", ".menu", ".dropdown-menu"], answer: ".dropdown" },
    { question: "Which class positions elements relative?", options: [".position-relative", ".pos-rel", ".relative", ".rel"], answer: ".position-relative" },
    { question: "Which class positions elements absolutely?", options: [".position-absolute", ".pos-abs", ".absolute", ".abs"], answer: ".position-absolute" },
    { question: "Which class changes navbar color?", options: [".bg-primary", ".navbar-color", ".navbar-bg", ".bg-navbar"], answer: ".bg-primary" },
    { question: "Which class creates a list group?", options: [".list-group", ".list", ".group-list", ".list-box"], answer: ".list-group" },
    { question: "Which class adds tooltips?", options: [".tooltip", ".title", ".hover-text", ".tip"], answer: ".tooltip" },
    { question: "Which class makes a modal scrollable?", options: [".modal-dialog-scrollable", ".scrollable-modal", ".modal-scroll", ".modal-scrollable"], answer: ".modal-dialog-scrollable" },
    { question: "Which class makes a navbar sticky?", options: [".sticky-top", ".navbar-sticky", ".sticky", ".navbar-top"], answer: ".sticky-top" },
    { question: "Which class adds responsive table?", options: [".table-responsive", ".responsive-table", ".table-adapt", ".table-fluid"], answer: ".table-responsive" },
    { question: "Which class adds rounded borders to buttons?", options: [".rounded-pill", ".btn-rounded", ".btn-pill", ".rounded-btn"], answer: ".rounded-pill" },
    { question: "Which class changes text color to primary?", options: [".text-primary", ".text-color-primary", ".text-blue", ".color-primary"], answer: ".text-primary" },
    { question: "Which class creates pagination?", options: [".pagination", ".pager", ".page-list", ".page-nav"], answer: ".pagination" },
    { question: "Which class offsets columns?", options: [".offset-md-2", ".col-offset", ".col-md-offset", ".offset"], answer: ".offset-md-2" },
    { question: "Which class makes images responsive in card?", options: [".card-img-top", ".card-img", ".img-top", ".img-card"], answer: ".card-img-top" },
    { question: "Which class collapses navbar?", options: [".navbar-collapse", ".collapse", ".navbar-toggler", ".navbar-hidden"], answer: ".navbar-collapse" },
    { question: "Which class aligns navbar items to right?", options: [".ms-auto", ".ml-auto", ".justify-content-end", ".me-auto"], answer: ".ms-auto" },
    { question: "Which class changes table hover effect?", options: [".table-hover", ".table-striped", ".table-active", ".table-border"], answer: ".table-hover" },
    { question: "Which class adds breadcrumb navigation?", options: [".breadcrumb", ".bread", ".nav-breadcrumb", ".breadcrumbs"], answer: ".breadcrumb" },
  ],

  advanced: [
    { question: "Which class creates responsive embeds?", options: [".ratio", ".embed-responsive", ".embed", ".responsive-embed"], answer: ".ratio" },
    { question: "Which class adds responsive utility spacing?", options: [".m-md-3", ".p-md-3", ".spacing-md", ".g-md-3"], answer: ".m-md-3" },
    { question: "Which class creates toast notifications?", options: [".toast", ".alert", ".notify", ".notification"], answer: ".toast" },
    { question: "Which class creates offcanvas sidebar?", options: [".offcanvas", ".sidebar", ".offcanvas-sidebar", ".offcanvas-body"], answer: ".offcanvas" },
    { question: "Which class vertically centers text?", options: [".align-middle", ".text-middle", ".align-center", ".text-center"], answer: ".align-middle" },
    { question: "Which class hides scrollbar?", options: [".overflow-hidden", ".scroll-hidden", ".no-scroll", ".hide-scroll"], answer: ".overflow-hidden" },
    { question: "Which class adds responsive gutters?", options: [".g-3", ".gutters", ".gx-3", ".gy-3"], answer: ".g-3" },
    { question: "Which class fixes footer to bottom?", options: [".fixed-bottom", ".sticky-bottom", ".bottom-fixed", ".footer-fixed"], answer: ".fixed-bottom" },
    { question: "Which class adds gradient backgrounds?", options: [".bg-gradient", ".gradient-bg", ".bg-primary-gradient", ".bg-primary"], answer: ".bg-gradient" },
    { question: "Which class makes navbar transparent?", options: [".bg-transparent", ".navbar-transparent", ".transparent", ".nav-transparent"], answer: ".bg-transparent" },
    { question: "Which class aligns items vertically in flex?", options: [".align-items-center", ".align-center", ".items-center", ".center-flex"], answer: ".align-items-center" },
    { question: "Which class aligns items horizontally in flex?", options: [".justify-content-center", ".justify-center", ".center-content", ".items-center"], answer: ".justify-content-center" },
    { question: "Which class creates responsive modals?", options: [".modal-dialog-scrollable", ".modal-responsive", ".modal-lg", ".modal-xl"], answer: ".modal-dialog-scrollable" },
    { question: "Which class makes text wrap in flex?", options: [".flex-wrap", ".text-wrap", ".wrap-flex", ".flex-text"], answer: ".flex-wrap" },
    { question: "Which class makes columns order responsive?", options: [".order-md-1", ".order-1", ".col-order", ".order-column"], answer: ".order-md-1" },
    { question: "Which class adds responsive display utilities?", options: [".d-md-block", ".display-md", ".display-block-md", ".d-block-md"], answer: ".d-md-block" },
    { question: "Which class adds border utilities?", options: [".border", ".border-all", ".border-utils", ".b-all"], answer: ".border" },
    { question: "Which class rounds modal corners?", options: [".rounded", ".rounded-lg", ".modal-rounded", ".modal-corners"], answer: ".rounded-lg" },
    { question: "Which class handles responsive flex column?", options: [".flex-column", ".flex-md-column", ".flex-col", ".flex-column-md"], answer: ".flex-md-column" },
    { question: "Which class adds responsive gap between flex items?", options: [".gap-3", ".g-3", ".gap-md-3", ".gx-3"], answer: ".g-3" },
  ],
};
 export default function BootstrapQuiz () {
  const [level, setLevel] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  // Ensure questions is always an array
  const questions = level && quizBootstrap[level.toLowerCase()] ? quizBootstrap[level.toLowerCase()] : [];

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem("quizState"));
    if (savedState) {
      setLevel(savedState.level);
      setCurrent(savedState.current);
      setScore(savedState.score);
      setAnswers(savedState.answers || []);
      setTimeLeft(savedState.timeLeft);
    }
  }, []);

  useEffect(() => {
    if (level) {
      localStorage.setItem(
        "quizState",
        JSON.stringify({ level, current, score, answers, timeLeft })
      );
    }
  }, [level, current, score, answers, timeLeft]);

  useEffect(() => {
    if (level && current < questions.length && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, level, current, questions.length]);

  const handleAnswer = () => {
    if (!questions[current]) return; // safeguard

    const updatedAnswers = [...answers];
    updatedAnswers[current] = selected;

    if (selected === questions[current].answer) {
      setScore(score + 1);
    }

    setAnswers(updatedAnswers);
    setSelected("");
    setCurrent(current + 1);
  };

  const handleLevelSelect = (lvl) => {
    setLevel(lvl);
    setCurrent(0);
    setScore(0);
    setSelected("");
    setAnswers([]);
    setTimeLeft(600);
  };

  const handleReset = () => {
    setLevel(null);
    setCurrent(0);
    setScore(0);
    setSelected("");
    setAnswers([]);
    setTimeLeft(0);
    localStorage.removeItem("quizState");
  };

  const progressPct = questions.length > 0 ? Math.round((current / questions.length) * 100) : 0;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 50%, #a18cd1 100%)" }}
    >
      {!level ? (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="p-6 shadow-2xl bg-white rounded-3xl border border-gray-200">
            <CardHeader>
              <CardTitle className="text-center text-3xl font-bold text-gray-800">
                🚀 Bootstrap Quiz
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row justify-center gap-4 mt-6">
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg"
                onClick={() => handleLevelSelect("Beginner")}
              >
                Beginner
              </Button>
              <Button
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded-lg"
                onClick={() => handleLevelSelect("Intermediate")}
              >
                Intermediate
              </Button>
              <Button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg"
                onClick={() => handleLevelSelect("Advanced")}
              >
                Advanced
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <Card className="p-6 shadow-2xl bg-white rounded-3xl w-full max-w-2xl border border-gray-200">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold text-gray-800">{level} Quiz</CardTitle>
              <span className="text-sm text-gray-600 font-medium">
                ⏱ {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
              </span>
            </div>
            <Progress value={progressPct} className="mt-3 h-3 rounded-full" />
          </CardHeader>
          <CardContent>
            {timeLeft <= 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="text-center">
                <h2 className="text-xl font-bold text-gray-800">
                  Time’s up! ⏳ Your Score: {score}/{questions.length}
                </h2>
                <Button
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg"
                  onClick={handleReset}
                >
                  Restart Quiz
                </Button>
              </motion.div>
            ) : current < questions.length && questions[current] ? (
              <motion.div key={current} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <h2 className="text-lg font-semibold mb-2 text-gray-800">
                  Q{current + 1}. {questions[current].question}
                </h2>
                <Separator className="my-3" />
                <div className="space-y-3">
                  {questions[current].options.map((opt, i) => (
                    <motion.div key={i} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Button
                        variant={selected === opt ? "default" : "outline"}
                        className={`w-full justify-start px-4 py-2 rounded-lg font-medium ${selected === opt
                          ? "bg-blue-500 text-white shadow-md"
                          : "bg-white text-gray-800 border border-gray-300"
                        }`}
                        onClick={() => setSelected(opt)}
                      >
                        {opt}
                      </Button>
                    </motion.div>
                  ))}
                </div>
                <Button
                  onClick={handleAnswer}
                  disabled={!selected}
                  className="mt-5 w-full bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg"
                >
                  {current === questions.length - 1 ? "Finish" : "Next"}
                </Button>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
                  🎉 Quiz Finished! Your Score: {score}/{questions.length}
                </h2>
                <div className="space-y-4">
                  {questions.map((q, i) => {
                    const userAns = answers[i];
                    const isCorrect = userAns === q.answer;
                    return (
                      <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-4 border rounded-lg shadow-md bg-gray-50">
                        <p className="font-semibold text-gray-800">Q{i + 1}. {q.question}</p>
                        <p className={isCorrect ? "text-green-600" : "text-red-600"}>
                          Your Answer: {userAns || "Not Answered"}
                        </p>
                        {!isCorrect && <p className="text-green-600">Correct Answer: {q.answer}</p>}
                      </motion.div>
                    );
                  })}
                </div>
                <div className="text-center mt-6">
                  <Button className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg" onClick={handleReset}>
                    Restart Quiz
                  </Button>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}