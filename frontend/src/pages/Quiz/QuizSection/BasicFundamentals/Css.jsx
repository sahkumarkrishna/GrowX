import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const quizCss = {
  beginner: [
    { question: "Which property is used to change text color?", options: ["color", "background", "font-size", "text-style"], answer: "color" },
    { question: "Which property sets the background color?", options: ["color", "background-color", "bgcolor", "backcolor"], answer: "background-color" },
    { question: "How do you make text bold?", options: ["font-weight: bold;", "text-decoration: bold;", "font-style: bold;", "text-weight: bold;"], answer: "font-weight: bold;" },
    { question: "Which property controls the space inside an element?", options: ["padding", "margin", "border", "spacing"], answer: "padding" },
    { question: "Which property controls the space outside an element?", options: ["padding", "margin", "border", "spacing"], answer: "margin" },
    { question: "Which property changes font size?", options: ["font-size", "text-size", "size", "font-style"], answer: "font-size" },
    { question: "How do you make a list not show bullets?", options: ["list-style: none;", "list-type: none;", "bullet: none;", "list-decoration: none;"], answer: "list-style: none;" },
    { question: "Which property sets the element width?", options: ["width", "size", "element-width", "max-width"], answer: "width" },
    { question: "Which property sets the element height?", options: ["height", "size", "element-height", "max-height"], answer: "height" },
    { question: "Which property is used to underline text?", options: ["text-decoration: underline;", "font-decoration: underline;", "text-style: underline;", "underline: true;"], answer: "text-decoration: underline;" },
    { question: "How do you change the background of the whole page?", options: ["body { background-color: ... }", "html { background: ... }", "page { bg: ... }", "body { color: ... }"], answer: "body { background-color: ... }" },
    { question: "Which property makes text italic?", options: ["font-style: italic;", "text-style: italic;", "font-weight: italic;", "text-transform: italic;"], answer: "font-style: italic;" },
    { question: "Which property sets border color?", options: ["border-color", "border-style", "border-width", "border-shade"], answer: "border-color" },
    { question: "How do you display an element as a block?", options: ["display: block;", "display: inline;", "display: flex;", "display: grid;"], answer: "display: block;" },
    { question: "How do you display an element inline?", options: ["display: inline;", "display: block;", "display: flex;", "display: grid;"], answer: "display: inline;" },
    { question: "Which property changes the font family?", options: ["font-family", "font-style", "text-font", "font-type"], answer: "font-family" },
    { question: "Which property controls element opacity?", options: ["opacity", "transparency", "filter", "visibility"], answer: "opacity" },
    { question: "Which property rounds element corners?", options: ["border-radius", "border-round", "corner-radius", "radius"], answer: "border-radius" },
    { question: "Which property sets element visibility?", options: ["visibility", "display", "opacity", "hidden"], answer: "visibility" },
    { question: "How do you center text?", options: ["text-align: center;", "align-text: center;", "font-align: center;", "justify-text: center;"], answer: "text-align: center;" },
  ],
  intermediate: [
    { question: "Which property is used for flex container direction?", options: ["flex-direction", "flex-align", "flex-wrap", "justify-content"], answer: "flex-direction" },
    { question: "Which property wraps flex items?", options: ["flex-wrap", "flex-flow", "flex-wrap-items", "wrap-items"], answer: "flex-wrap" },
    { question: "Which property spaces flex items along main axis?", options: ["justify-content", "align-items", "align-content", "flex-gap"], answer: "justify-content" },
    { question: "Which property spaces flex items along cross axis?", options: ["align-items", "justify-content", "align-self", "flex-direction"], answer: "align-items" },
    { question: "Which property sets grid rows?", options: ["grid-template-rows", "grid-rows", "row-template", "grid-rows-template"], answer: "grid-template-rows" },
    { question: "Which property sets grid columns?", options: ["grid-template-columns", "grid-columns", "column-template", "grid-cols-template"], answer: "grid-template-columns" },
    { question: "Which property sets spacing between grid items?", options: ["gap", "spacing", "grid-gap", "grid-spacing"], answer: "gap" },
    { question: "Which property hides overflow content?", options: ["overflow", "overflow-x", "overflow-y", "overflow-hide"], answer: "overflow" },
    { question: "Which property fixes an element at viewport?", options: ["position: fixed;", "position: absolute;", "position: sticky;", "position: relative;"], answer: "position: fixed;" },
    { question: "Which property makes element sticky?", options: ["position: sticky;", "position: relative;", "position: fixed;", "position: absolute;"], answer: "position: sticky;" },
    { question: "Which pseudo-class is for hovered elements?", options: [":hover", ":active", ":focus", ":visited"], answer: ":hover" },
    { question: "Which pseudo-class is for focused elements?", options: [":focus", ":hover", ":active", ":visited"], answer: ":focus" },
    { question: "Which pseudo-class is for first child?", options: [":first-child", ":nth-child", ":last-child", ":child"], answer: ":first-child" },
    { question: "Which property sets text overflow with ellipsis?", options: ["text-overflow: ellipsis;", "overflow-text: ellipsis;", "text-ellipsis", "ellipsis-text"], answer: "text-overflow: ellipsis;" },
    { question: "Which property sets element scroll behavior?", options: ["scroll-behavior", "overflow-scroll", "scroll-style", "scroll-mode"], answer: "scroll-behavior" },
    { question: "Which property sets line height?", options: ["line-height", "height", "font-size", "spacing"], answer: "line-height" },
    { question: "Which property sets word spacing?", options: ["word-spacing", "letter-spacing", "text-spacing", "word-gap"], answer: "word-spacing" },
    { question: "Which property sets letter spacing?", options: ["letter-spacing", "word-spacing", "text-spacing", "font-spacing"], answer: "letter-spacing" },
    { question: "Which property sets transition duration?", options: ["transition-duration", "transition-time", "animation-duration", "duration"], answer: "transition-duration" },
    { question: "Which property sets box shadow?", options: ["box-shadow", "shadow", "box-style", "shadow-box"], answer: "box-shadow" },
  ],
  advanced: [
    { question: "Which CSS property applies multiple backgrounds?", options: ["background", "background-image", "background-repeat", "background-layer"], answer: "background" },
    { question: "Which property sets clip path for element?", options: ["clip-path", "mask", "clip", "shape"], answer: "clip-path" },
    { question: "Which property sets filter effects?", options: ["filter", "effect", "image-filter", "visual-filter"], answer: "filter" },
    { question: "Which property defines custom properties (CSS variables)?", options: ["--var", "var", "custom-property", "property-var"], answer: "--var" },
    { question: "Which property applies backdrop blur?", options: ["backdrop-filter", "filter", "blur", "backdrop-blur"], answer: "backdrop-filter" },
    { question: "Which property applies CSS grid template areas?", options: ["grid-template-areas", "grid-areas", "template-areas", "grid-template"], answer: "grid-template-areas" },
    { question: "Which property makes text clamp after certain lines?", options: ["-webkit-line-clamp", "line-clamp", "text-clamp", "overflow-clamp"], answer: "-webkit-line-clamp" },
    { question: "Which property sets content visibility for optimization?", options: ["content-visibility", "visibility", "display", "overflow"], answer: "content-visibility" },
    { question: "Which property sets scroll snapping?", options: ["scroll-snap-type", "snap-scroll", "scroll-snap", "snap-type"], answer: "scroll-snap-type" },
    { question: "Which property sets perspective for 3D effects?", options: ["perspective", "transform-perspective", "3d-perspective", "perspective-origin"], answer: "perspective" },
    { question: "Which property sets mix blend mode?", options: ["mix-blend-mode", "blend-mode", "mix-mode", "blend-style"], answer: "mix-blend-mode" },
    { question: "Which property sets isolation context?", options: ["isolation", "context", "blend-isolation", "isolate"], answer: "isolation" },
    { question: "Which property enables GPU acceleration for transform?", options: ["transform: translate3d()", "transform: translate()", "transform: scale()", "transform: rotate()"], answer: "transform: translate3d()" },
    { question: "Which property sets contain layout optimization?", options: ["contain", "layout-contain", "content-contain", "optimize-layout"], answer: "contain" },
    { question: "Which property sets overscroll behavior?", options: ["overscroll-behavior", "scroll-behavior", "overflow-behavior", "scroll-overscroll"], answer: "overscroll-behavior" },
    { question: "Which pseudo-element selects first line of text?", options: ["::first-line", "::first-letter", "::before", "::after"], answer: "::first-line" },
    { question: "Which pseudo-element inserts content before element?", options: ["::before", "::after", "::first-letter", "::first-line"], answer: "::before" },
    { question: "Which pseudo-element inserts content after element?", options: ["::after", "::before", "::first-letter", "::first-line"], answer: "::after" },
    { question: "Which property sets element will-change for optimization?", options: ["will-change", "change-optimize", "optimize-change", "element-change"], answer: "will-change" },
    { question: "Which property sets grid auto flow?", options: ["grid-auto-flow", "grid-flow", "auto-flow", "grid-direction"], answer: "grid-auto-flow" },
  ],
};

export default function CssQuiz() {
  const [level, setLevel] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  // Ensure questions is always an array
  const questions = level && quizCss[level.toLowerCase()] ? quizCss[level.toLowerCase()] : [];

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
    setTimeLeft(300);
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
                🚀 Css Quiz
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