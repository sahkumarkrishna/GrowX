import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const quizReact = {
  beginner: [
    { question: "What is React?", options: ["Library", "Framework", "Language", "IDE"], answer: "Library" },
    { question: "Which command creates a new React app?", options: ["npx create-react-app", "npm start", "npm install react", "react new app"], answer: "npx create-react-app" },
    { question: "Which syntax is used in React to write HTML?", options: ["JSX", "HTML", "XML", "ReactML"], answer: "JSX" },
    { question: "Which hook is used for state in functional components?", options: ["useState", "useEffect", "useContext", "useReducer"], answer: "useState" },
    { question: "How do you pass data from parent to child?", options: ["Props", "State", "Context", "Refs"], answer: "Props" },
    { question: "Which method renders JSX in class components?", options: ["render()", "display()", "show()", "return()"], answer: "render()" },
    { question: "Which keyword creates a component?", options: ["function", "component", "class", "create"], answer: "function" },
    { question: "Which prop updates are asynchronous?", options: ["setState", "props", "useState", "useEffect"], answer: "setState" },
    { question: "Which attribute is used for CSS classes in JSX?", options: ["className", "class", "style", "id"], answer: "className" },
    { question: "Which hook is used for side effects?", options: ["useEffect", "useState", "useRef", "useMemo"], answer: "useEffect" },
    { question: "Which component type has lifecycle methods?", options: ["Class Component", "Function Component", "Pure Component", "Stateless Component"], answer: "Class Component" },
    { question: "Which hook manages refs?", options: ["useRef", "useState", "useEffect", "useContext"], answer: "useRef" },
    { question: "Which hook memoizes values?", options: ["useMemo", "useCallback", "useState", "useEffect"], answer: "useMemo" },
    { question: "Which hook memoizes functions?", options: ["useCallback", "useMemo", "useState", "useEffect"], answer: "useCallback" },
    { question: "How do you prevent re-rendering?", options: ["React.memo", "useState", "useEffect", "useRef"], answer: "React.memo" },
    { question: "Which hook manages context?", options: ["useContext", "useState", "useReducer", "useEffect"], answer: "useContext" },
    { question: "Which prop passes children to a component?", options: ["children", "child", "props", "elements"], answer: "children" },
    { question: "Which file usually renders the App component?", options: ["index.js", "App.js", "main.js", "root.js"], answer: "index.js" },
    { question: "Which hook replaces componentDidMount in functional components?", options: ["useEffect", "useState", "useReducer", "useLayoutEffect"], answer: "useEffect" },
    { question: "Which type of component cannot have state?", options: ["Functional Stateless Component", "Class Component", "Stateful Component", "Pure Component"], answer: "Functional Stateless Component" },
  ],

  intermediate: [
    { question: "Which hook replaces Redux for local state management?", options: ["useReducer", "useState", "useContext", "useEffect"], answer: "useReducer" },
    { question: "Which hook runs after every render?", options: ["useEffect", "useState", "useRef", "useMemo"], answer: "useEffect" },
    { question: "Which method prevents default events?", options: ["event.preventDefault()", "event.stopPropagation()", "return false", "event.default()"], answer: "event.preventDefault()" },
    { question: "Which hook accesses DOM nodes?", options: ["useRef", "useState", "useEffect", "useContext"], answer: "useRef" },
    { question: "Which hook returns a memoized callback?", options: ["useCallback", "useMemo", "useEffect", "useState"], answer: "useCallback" },
    { question: "Which hook replaces componentDidUpdate?", options: ["useEffect", "useState", "useMemo", "useCallback"], answer: "useEffect" },
    { question: "Which hook replaces componentWillUnmount?", options: ["useEffect cleanup", "useState", "useMemo", "useCallback"], answer: "useEffect cleanup" },
    { question: "Which method optimizes expensive calculations?", options: ["useMemo", "useCallback", "useEffect", "useState"], answer: "useMemo" },
    { question: "Which attribute binds event handlers?", options: ["onClick", "onclick", "click", "handleClick"], answer: "onClick" },
    { question: "Which hook manages complex state logic?", options: ["useReducer", "useState", "useEffect", "useContext"], answer: "useReducer" },
    { question: "Which hook shares global state across components?", options: ["useContext", "useState", "useReducer", "useEffect"], answer: "useContext" },
    { question: "Which method optimizes re-rendering in lists?", options: ["key prop", "id prop", "ref prop", "name prop"], answer: "key prop" },
    { question: "Which hook replaces componentDidCatch?", options: ["Error Boundary", "useEffect", "useState", "useReducer"], answer: "Error Boundary" },
    { question: "Which hook listens to window resize events?", options: ["useEffect with event listener", "useState", "useRef", "useMemo"], answer: "useEffect with event listener" },
    { question: "Which method prevents prop drilling?", options: ["Context API", "useState", "useReducer", "useRef"], answer: "Context API" },
    { question: "Which hook delays execution until dependencies change?", options: ["useEffect", "useMemo", "useCallback", "useRef"], answer: "useEffect" },
    { question: "Which hook updates state asynchronously?", options: ["setState", "useState", "useReducer", "useEffect"], answer: "useState" },
    { question: "Which hook provides a stable value across renders?", options: ["useRef", "useState", "useMemo", "useEffect"], answer: "useRef" },
    { question: "Which hook manages form state efficiently?", options: ["useState + useEffect", "useReducer", "useForm", "useRef"], answer: "useReducer" },
    { question: "Which hook optimizes component re-renders?", options: ["React.memo", "useEffect", "useState", "useReducer"], answer: "React.memo" },
  ],

  advanced: [
    { question: "Which method lazy loads a component?", options: ["React.lazy()", "React.load()", "React.defer()", "React.suspense()"], answer: "React.lazy()" },
    { question: "Which component wraps lazy-loaded components?", options: ["Suspense", "Fragment", "Provider", "StrictMode"], answer: "Suspense" },
    { question: "Which hook shares state between unrelated components?", options: ["useContext", "useState", "useReducer", "useRef"], answer: "useContext" },
    { question: "Which hook improves performance by memoizing functions?", options: ["useCallback", "useMemo", "useRef", "useState"], answer: "useCallback" },
    { question: "Which hook memoizes computed values?", options: ["useMemo", "useCallback", "useState", "useEffect"], answer: "useMemo" },
    { question: "Which hook is used for imperative code?", options: ["useImperativeHandle", "useRef", "useEffect", "useState"], answer: "useImperativeHandle" },
    { question: "Which hook exposes ref to parent component?", options: ["useImperativeHandle", "useRef", "useEffect", "useState"], answer: "useImperativeHandle" },
    { question: "Which method optimizes deeply nested components?", options: ["React.memo + useCallback", "useState", "useReducer", "useEffect"], answer: "React.memo + useCallback" },
    { question: "Which hook avoids unnecessary re-renders for context?", options: ["useMemo + useContext", "useState", "useEffect", "useRef"], answer: "useMemo + useContext" },
    { question: "Which hook tracks previous state value?", options: ["useRef", "useState", "useEffect", "useMemo"], answer: "useRef" },
    { question: "Which hook accesses DOM outside render?", options: ["useLayoutEffect", "useEffect", "useRef", "useState"], answer: "useLayoutEffect" },
    { question: "Which hook updates layout before painting?", options: ["useLayoutEffect", "useEffect", "useRef", "useState"], answer: "useLayoutEffect" },
    { question: "Which hook ensures stable callback reference?", options: ["useCallback", "useMemo", "useRef", "useState"], answer: "useCallback" },
    { question: "Which hook ensures deep comparison for state?", options: ["useDeepCompareEffect", "useEffect", "useState", "useReducer"], answer: "useDeepCompareEffect" },
    { question: "Which hook combines reducer and context?", options: ["useReducer + useContext", "useState + useEffect", "useMemo + useRef", "useState + useContext"], answer: "useReducer + useContext" },
    { question: "Which method optimizes large lists?", options: ["Virtualization", "Pagination", "useMemo", "useCallback"], answer: "Virtualization" },
    { question: "Which hook prevents unnecessary child renders?", options: ["React.memo", "useState", "useReducer", "useEffect"], answer: "React.memo" },
    { question: "Which hook tracks component mount/unmount?", options: ["useEffect with cleanup", "useState", "useReducer", "useRef"], answer: "useEffect with cleanup" },
    { question: "Which hook manages subscriptions efficiently?", options: ["useEffect + cleanup", "useState", "useReducer", "useRef"], answer: "useEffect + cleanup" },
    { question: "Which hook ensures debounced state updates?", options: ["useDebounce", "useState", "useEffect", "useReducer"], answer: "useDebounce" },
  ],
};
export default function ReactQuiz () {
  const [level, setLevel] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  // Ensure questions is always an array
  const questions = level && quizReact[level.toLowerCase()] ? quizReact[level.toLowerCase()] : [];

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
                🚀 React Quiz
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