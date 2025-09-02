import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
const quizJS = {
  beginner: [
    { question: "Which keyword is used to declare a variable?", options: ["var", "let", "const", "All of the above"], answer: "All of the above" },
    { question: "Which method outputs a message to the console?", options: ["console.log()", "print()", "echo()", "alert()"], answer: "console.log()" },
    { question: "Which operator is used for addition?", options: ["+", "-", "*", "/"], answer: "+" },
    { question: "Which data type is used for true/false values?", options: ["boolean", "string", "number", "object"], answer: "boolean" },
    { question: "How do you create a function?", options: ["function myFunc() {}", "func myFunc() {}", "def myFunc() {}", "function: myFunc() {}"], answer: "function myFunc() {}" },
    { question: "How do you write a single-line comment?", options: ["// comment", "/* comment */", "# comment", "<!-- comment -->"], answer: "// comment" },
    { question: "Which keyword prevents reassignment of a variable?", options: ["var", "let", "const", "static"], answer: "const" },
    { question: "Which method converts a string to a number?", options: ["Number()", "parseInt()", "parseFloat()", "All of the above"], answer: "All of the above" },
    { question: "Which array method adds an element to the end?", options: ["push()", "pop()", "shift()", "unshift()"], answer: "push()" },
    { question: "Which array method removes the last element?", options: ["pop()", "push()", "shift()", "unshift()"], answer: "pop()" },
    { question: "Which object method lists keys?", options: ["Object.keys()", "Object.values()", "Object.entries()", "Object.getKeys()"], answer: "Object.keys()" },
    { question: "Which keyword checks strict equality?", options: ["===", "==", "=", "!=="], answer: "===" },
    { question: "Which method joins array elements into a string?", options: ["join()", "split()", "concat()", "push()"], answer: "join()" },
    { question: "Which function converts JSON to object?", options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.objectify()"], answer: "JSON.parse()" },
    { question: "Which function converts object to JSON?", options: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.objectify()"], answer: "JSON.stringify()" },
    { question: "Which keyword defines a class?", options: ["class", "object", "struct", "define"], answer: "class" },
    { question: "Which event occurs when a user clicks?", options: ["onclick", "onhover", "onchange", "onload"], answer: "onclick" },
    { question: "Which loop iterates over arrays?", options: ["for", "for...of", "while", "do...while"], answer: "for...of" },
    { question: "Which method adds an element to the start of an array?", options: ["unshift()", "push()", "shift()", "pop()"], answer: "unshift()" },
    { question: "Which operator is used for exponentiation?", options: ["**", "^", "*", "pow()"], answer: "**" },
  ],

  intermediate: [
    { question: "Which method filters array elements?", options: ["filter()", "map()", "reduce()", "forEach()"], answer: "filter()" },
    { question: "Which method transforms each array element?", options: ["map()", "filter()", "reduce()", "forEach()"], answer: "map()" },
    { question: "Which method executes a function for each array element?", options: ["forEach()", "map()", "filter()", "reduce()"], answer: "forEach()" },
    { question: "Which method reduces array to a single value?", options: ["reduce()", "map()", "filter()", "forEach()"], answer: "reduce()" },
    { question: "Which keyword accesses parent scope in closures?", options: ["this", "super", "parent", "closure"], answer: "this" },
    { question: "Which keyword defines a promise?", options: ["new Promise()", "async", "await", "Promise()"], answer: "new Promise()" },
    { question: "Which keyword pauses async function?", options: ["await", "async", "yield", "pause"], answer: "await" },
    { question: "Which keyword defines asynchronous function?", options: ["async function", "function async", "await function", "function await"], answer: "async function" },
    { question: "Which operator destructures objects?", options: ["{}", "[]", "()", "<>"], answer: "{}" },
    { question: "Which operator destructures arrays?", options: ["[]", "{}", "()", "<>"], answer: "[]" },
    { question: "Which method merges arrays?", options: ["concat()", "merge()", "push()", "join()"], answer: "concat()" },
    { question: "Which method finds first element matching condition?", options: ["find()", "filter()", "map()", "reduce()"], answer: "find()" },
    { question: "Which method finds index of first matching element?", options: ["findIndex()", "indexOf()", "filter()", "map()"], answer: "findIndex()" },
    { question: "Which operator spreads array elements?", options: ["...", "...spread", "spread()", "array..."], answer: "..." },
    { question: "Which keyword checks property existence in object?", options: ["in", "has", "exists", "contains"], answer: "in" },
    { question: "Which method freezes object?", options: ["Object.freeze()", "Object.seal()", "Object.lock()", "Object.prevent()"], answer: "Object.freeze()" },
    { question: "Which method seals object?", options: ["Object.seal()", "Object.freeze()", "Object.lock()", "Object.prevent()"], answer: "Object.seal()" },
    { question: "Which method merges objects?", options: ["Object.assign()", "Object.merge()", "Object.concat()", "Object.combine()"], answer: "Object.assign()" },
    { question: "Which method returns array of object values?", options: ["Object.values()", "Object.keys()", "Object.entries()", "Object.props()"], answer: "Object.values()" },
    { question: "Which method returns array of object key-value pairs?", options: ["Object.entries()", "Object.values()", "Object.keys()", "Object.props()"], answer: "Object.entries()" },
  ],

  advanced: [
    { question: "Which keyword defines block-scoped variable?", options: ["let", "var", "const", "static"], answer: "let" },
    { question: "Which method schedules function after delay?", options: ["setTimeout()", "setInterval()", "delay()", "wait()"], answer: "setTimeout()" },
    { question: "Which method executes function repeatedly?", options: ["setInterval()", "setTimeout()", "repeat()", "loop()"], answer: "setInterval()" },
    { question: "Which method cancels setTimeout?", options: ["clearTimeout()", "clearInterval()", "cancelTimeout()", "cancelInterval()"], answer: "clearTimeout()" },
    { question: "Which method cancels setInterval?", options: ["clearInterval()", "clearTimeout()", "cancelInterval()", "cancelTimeout()"], answer: "clearInterval()" },
    { question: "Which keyword allows default parameter values?", options: ["function(a=1)", "function(a)", "function default(a=1)", "function default(a)"], answer: "function(a=1)" },
    { question: "Which keyword imports modules?", options: ["import", "require", "include", "module"], answer: "import" },
    { question: "Which keyword exports modules?", options: ["export", "import", "module", "require"], answer: "export" },
    { question: "Which method converts string to number?", options: ["parseInt()", "Number()", "Both A and B", "toNumber()"], answer: "Both A and B" },
    { question: "Which method checks if array includes element?", options: ["includes()", "indexOf()", "has()", "contains()"], answer: "includes()" },
    { question: "Which method returns last index of element?", options: ["lastIndexOf()", "indexOf()", "findIndex()", "find()"], answer: "lastIndexOf()" },
    { question: "Which keyword checks if object has property?", options: ["in", "hasOwnProperty", "exists", "contains"], answer: "hasOwnProperty" },
    { question: "Which keyword stops loop execution?", options: ["break", "continue", "return", "stop"], answer: "break" },
    { question: "Which keyword skips current iteration?", options: ["continue", "break", "return", "skip"], answer: "continue" },
    { question: "Which method converts array to string?", options: ["toString()", "join()", "concat()", "arrayString()"], answer: "toString()" },
    { question: "Which method adds/removes elements from array?", options: ["splice()", "slice()", "push()", "pop()"], answer: "splice()" },
    { question: "Which method creates shallow copy of array?", options: ["slice()", "splice()", "map()", "filter()"], answer: "slice()" },
    { question: "Which function executes immediately?", options: ["IIFE", "Async function", "Arrow function", "Callback"], answer: "IIFE" },
    { question: "Which method returns promise resolved after all promises?", options: ["Promise.all()", "Promise.race()", "Promise.any()", "Promise.resolve()"], answer: "Promise.all()" },
    { question: "Which method returns promise resolved after first promise?", options: ["Promise.race()", "Promise.all()", "Promise.any()", "Promise.resolve()"], answer: "Promise.race()" },
  ],
};
export default function JSQuiz () {
  const [level, setLevel] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  // Ensure questions is always an array
  const questions = level && quizJS[level.toLowerCase()] ? quizJS[level.toLowerCase()] : [];

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
                🚀 JavaScript Quiz
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