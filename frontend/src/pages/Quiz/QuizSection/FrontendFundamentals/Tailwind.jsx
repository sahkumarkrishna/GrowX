import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const quizTailwind = {
  beginner: [
    { question: "Which Tailwind class sets text color to red?", options: ["text-red-500", "text-color-red", "color-red", "red-text"], answer: "text-red-500" },
    { question: "Which class adds padding of 4 units?", options: ["p-4", "padding-4", "pad-4", "padd-4"], answer: "p-4" },
    { question: "Which class sets margin top to 8?", options: ["mt-8", "margin-top-8", "m-top-8", "margin-t-8"], answer: "mt-8" },
    { question: "Which class sets background color to blue-200?", options: ["bg-blue-200", "background-blue-200", "b-blue-200", "bgcolor-blue-200"], answer: "bg-blue-200" },
    { question: "Which class makes text bold?", options: ["font-bold", "text-bold", "bold", "fw-bold"], answer: "font-bold" },
    { question: "Which class centers text?", options: ["text-center", "center-text", "text-align-center", "align-center"], answer: "text-center" },
    { question: "Which class makes element full width?", options: ["w-full", "width-full", "full-width", "width-100"], answer: "w-full" },
    { question: "Which class rounds corners?", options: ["rounded", "border-radius", "rounded-corners", "radius"], answer: "rounded" },
    { question: "Which class applies flex display?", options: ["flex", "d-flex", "display-flex", "flexbox"], answer: "flex" },
    { question: "Which class sets height to 16 units?", options: ["h-16", "height-16", "ht-16", "hgt-16"], answer: "h-16" },
    { question: "Which class adds shadow?", options: ["shadow", "box-shadow", "shadow-md", "shadow-lg"], answer: "shadow" },
    { question: "Which class hides an element?", options: ["hidden", "d-none", "invisible", "display-none"], answer: "hidden" },
    { question: "Which class sets text size to 2xl?", options: ["text-2xl", "font-2xl", "text-xl", "text-lg"], answer: "text-2xl" },
    { question: "Which class applies uppercase text?", options: ["uppercase", "text-uppercase", "font-upper", "text-upper"], answer: "uppercase" },
    { question: "Which class adds gap between flex items?", options: ["gap-4", "g-4", "space-4", "flex-gap-4"], answer: "gap-4" },
    { question: "Which class aligns items to center vertically?", options: ["items-center", "align-center", "justify-center", "items-middle"], answer: "items-center" },
    { question: "Which class justifies content horizontally?", options: ["justify-center", "content-center", "justify-items", "align-justify"], answer: "justify-center" },
    { question: "Which class sets max width to medium?", options: ["max-w-md", "max-width-md", "max-w-medium", "max-width-m"], answer: "max-w-md" },
    { question: "Which class applies rounded full (circle)?", options: ["rounded-full", "circle", "full-rounded", "rounded-circle"], answer: "rounded-full" },
    { question: "Which class sets z-index to 10?", options: ["z-10", "z-index-10", "index-10", "layer-10"], answer: "z-10" },
  ],

  intermediate: [
    { question: "Which class sets background opacity?", options: ["bg-opacity-50", "opacity-bg-50", "bg-opacity", "bg-opacity-5"], answer: "bg-opacity-50" },
    { question: "Which class sets text opacity?", options: ["text-opacity-75", "opacity-text-75", "txt-opacity", "text-op-75"], answer: "text-opacity-75" },
    { question: "Which class applies border?", options: ["border", "b-1", "border-all", "b-all"], answer: "border" },
    { question: "Which class sets border color to gray-300?", options: ["border-gray-300", "border-color-gray-300", "border-gray", "border-300"], answer: "border-gray-300" },
    { question: "Which class sets hover background color?", options: ["hover:bg-blue-500", "hover-color-blue", "bg-hover-blue", "hover-blue"], answer: "hover:bg-blue-500" },
    { question: "Which class sets focus ring?", options: ["focus:ring-2", "focus-ring", "ring-focus-2", "focus-ring-2"], answer: "focus:ring-2" },
    { question: "Which class sets gap on large screens?", options: ["lg:gap-6", "gap-lg-6", "gap-6-lg", "gap-6"], answer: "lg:gap-6" },
    { question: "Which class sets text color on hover?", options: ["hover:text-red-500", "text-hover-red", "hover-red", "hover-color-red"], answer: "hover:text-red-500" },
    { question: "Which class hides element on small screens?", options: ["sm:hidden", "hidden-sm", "d-sm-none", "sm:invisible"], answer: "sm:hidden" },
    { question: "Which class shows element only on medium screens?", options: ["md:block", "block-md", "md:show", "show-md"], answer: "md:block" },
    { question: "Which class applies rounded-lg corners?", options: ["rounded-lg", "rounded-large", "lg-rounded", "corners-lg"], answer: "rounded-lg" },
    { question: "Which class sets flex direction to column?", options: ["flex-col", "flex-column", "column-flex", "flex-c"], answer: "flex-col" },
    { question: "Which class sets min-height to screen?", options: ["min-h-screen", "h-screen", "min-height-screen", "screen-height"], answer: "min-h-screen" },
    { question: "Which class applies backdrop blur?", options: ["backdrop-blur", "blur-backdrop", "blur-bg", "bg-blur"], answer: "backdrop-blur" },
    { question: "Which class sets ring color?", options: ["ring-blue-500", "ring-color-blue", "ring-bg-blue", "ring"], answer: "ring-blue-500" },
    { question: "Which class sets divide between flex items?", options: ["divide-x", "divide-flex", "divide-items", "divide-between"], answer: "divide-x" },
    { question: "Which class sets transition duration?", options: ["duration-300", "transition-300", "transition-d", "dur-300"], answer: "duration-300" },
    { question: "Which class applies text truncation?", options: ["truncate", "text-truncate", "overflow-ellipsis", "text-clip"], answer: "truncate" },
    { question: "Which class sets grid columns to 3?", options: ["grid-cols-3", "cols-3", "grid-3", "grid-column-3"], answer: "grid-cols-3" },
    { question: "Which class sets object fit to cover?", options: ["object-cover", "fit-cover", "object-fill", "cover-object"], answer: "object-cover" },
  ],

  advanced: [
    { question: "Which class applies backdrop brightness?", options: ["backdrop-brightness-75", "brightness-backdrop", "backdrop-light", "backdrop-bright"], answer: "backdrop-brightness-75" },
    { question: "Which class applies ring offset?", options: ["ring-offset-4", "ring-offset", "offset-ring", "ring-offset-2"], answer: "ring-offset-4" },
    { question: "Which class sets grid template rows?", options: ["grid-rows-3", "rows-3", "grid-row-3", "grid-template-rows-3"], answer: "grid-rows-3" },
    { question: "Which class sets text gradient?", options: ["bg-clip-text text-transparent bg-gradient-to-r", "text-gradient", "gradient-text", "text-bg-gradient"], answer: "bg-clip-text text-transparent bg-gradient-to-r" },
    { question: "Which class sets skew transformation?", options: ["skew-x-12", "transform-skew", "skew-12", "skew-x"], answer: "skew-x-12" },
    { question: "Which class sets rotate transformation?", options: ["rotate-45", "transform-rotate-45", "rotate", "rotate-90"], answer: "rotate-45" },
    { question: "Which class sets scale transform?", options: ["scale-110", "transform-scale-110", "scale", "scale-100"], answer: "scale-110" },
    { question: "Which class sets transition property to all?", options: ["transition-all", "all-transition", "transition", "all"], answer: "transition-all" },
    { question: "Which class applies pointer events none?", options: ["pointer-events-none", "no-pointer", "pointer-none", "events-none"], answer: "pointer-events-none" },
    { question: "Which class applies overscroll behavior?", options: ["overscroll-auto", "overscroll", "scroll-auto", "overscroll-none"], answer: "overscroll-auto" },
    { question: "Which class applies line-clamp?", options: ["line-clamp-3", "text-clamp", "clamp-3", "line-3"], answer: "line-clamp-3" },
    { question: "Which class applies content visibility?", options: ["content-visible", "visible-content", "content-hidden", "visible"], answer: "content-visible" },
    { question: "Which class applies aspect ratio 16/9?", options: ["aspect-video", "aspect-16-9", "ratio-16-9", "aspect-16by9"], answer: "aspect-video" },
    { question: "Which class applies pointer cursor?", options: ["cursor-pointer", "pointer", "cursor", "pointer-cursor"], answer: "cursor-pointer" },
    { question: "Which class applies line-height?", options: ["leading-6", "line-height-6", "lh-6", "leading"], answer: "leading-6" },
    { question: "Which class sets max-height?", options: ["max-h-64", "max-height-64", "h-max-64", "maxh-64"], answer: "max-h-64" },
    { question: "Which class sets min-width?", options: ["min-w-full", "min-width-full", "w-min-full", "minw-full"], answer: "min-w-full" },
    { question: "Which class sets flex grow?", options: ["flex-grow", "grow", "flex-grow-1", "grow-1"], answer: "flex-grow" },
    { question: "Which class sets flex shrink?", options: ["flex-shrink", "shrink", "flex-shrink-1", "shrink-1"], answer: "flex-shrink" },
    { question: "Which class sets list style none?", options: ["list-none", "no-list", "list-style-none", "list-off"], answer: "list-none" },
  ],
};
export default function TailwindQuiz () {
  const [level, setLevel] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  // Ensure questions is always an array
  const questions = level && quizTailwind[level.toLowerCase()] ? quizTailwind[level.toLowerCase()] : [];

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
                🚀 Tailwind Quiz
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