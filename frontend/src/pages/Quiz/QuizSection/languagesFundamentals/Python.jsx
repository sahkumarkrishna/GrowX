import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const quizPython = {
  beginner: [
    { question: "Who developed Python?", options: ["Guido van Rossum", "Dennis Ritchie", "James Gosling", "Bjarne Stroustrup"], answer: "Guido van Rossum" },
    { question: "Which data type is used to store text?", options: ["str", "int", "float", "bool"], answer: "str" },
    { question: "Which symbol is used for comments in Python?", options: ["#", "//", "/*", "<!--"], answer: "#" },
    { question: "Which keyword is used to define a function?", options: ["def", "function", "fun", "define"], answer: "def" },
    { question: "Which operator is used for exponentiation?", options: ["**", "^", "*", "//"], answer: "**" },
    { question: "Which function outputs data to the console?", options: ["print()", "input()", "echo()", "console.log()"], answer: "print()" },
    { question: "Which keyword is used to create a class?", options: ["class", "def", "object", "struct"], answer: "class" },
    { question: "Which symbol is used for floor division?", options: ["//", "/", "%", "**"], answer: "//" },
    { question: "Which data type is used for True/False values?", options: ["bool", "int", "str", "float"], answer: "bool" },
    { question: "Which keyword is used to handle exceptions?", options: ["try", "catch", "except", "handle"], answer: "try" },
    { question: "Which function takes user input?", options: ["input()", "get()", "read()", "scan()"], answer: "input()" },
    { question: "Which operator checks equality?", options: ["==", "=", "!=", "<"], answer: "==" },
    { question: "Which loop executes at least once?", options: ["for", "while", "do-while", "foreach"], answer: "for" },
    { question: "Which method adds an element to a list?", options: ["append()", "add()", "insert()", "push()"], answer: "append()" },
    { question: "Which keyword is used for conditional statements?", options: ["if", "when", "case", "select"], answer: "if" },
    { question: "Which function returns the length of a list?", options: ["len()", "size()", "length()", "count()"], answer: "len()" },
    { question: "Which operator performs modulo?", options: ["%", "/", "*", "//"], answer: "%" },
    { question: "Which keyword defines a constant in Python?", options: ["No direct keyword", "const", "final", "static"], answer: "No direct keyword" },
    { question: "Which keyword is used to exit a loop?", options: ["break", "exit", "stop", "return"], answer: "break" },
    { question: "Which keyword is used to skip current iteration?", options: ["continue", "pass", "skip", "next"], answer: "continue" },
  ],

  intermediate: [
    { question: "Which data type is immutable?", options: ["tuple", "list", "dict", "set"], answer: "tuple" },
    { question: "Which operator is used for logical AND?", options: ["and", "&", "&&", "||"], answer: "and" },
    { question: "Which method removes an element from a list?", options: ["remove()", "delete()", "pop()", "discard()"], answer: "remove()" },
    { question: "Which function converts string to integer?", options: ["int()", "str()", "float()", "parseInt()"], answer: "int()" },
    { question: "Which function converts integer to string?", options: ["str()", "int()", "float()", "toString()"], answer: "str()" },
    { question: "Which keyword defines an abstract class?", options: ["abc.ABC", "abstract", "interface", "virtual"], answer: "abc.ABC" },
    { question: "Which collection stores unique elements?", options: ["set", "list", "tuple", "dict"], answer: "set" },
    { question: "Which module is used for regular expressions?", options: ["re", "regex", "pyregex", "pattern"], answer: "re" },
    { question: "Which keyword defines a generator function?", options: ["yield", "return", "generate", "next"], answer: "yield" },
    { question: "Which method removes last element from list?", options: ["pop()", "remove()", "del()", "discard()"], answer: "pop()" },
    { question: "Which operator performs bitwise OR?", options: ["|", "&", "^", "~"], answer: "|" },
    { question: "Which method returns index of element in list?", options: ["index()", "find()", "position()", "locate()"], answer: "index()" },
    { question: "Which keyword is used to import modules?", options: ["import", "include", "require", "using"], answer: "import" },
    { question: "Which function rounds a number to nearest integer?", options: ["round()", "ceil()", "floor()", "truncate()"], answer: "round()" },
    { question: "Which exception occurs for accessing invalid index?", options: ["IndexError", "KeyError", "ValueError", "TypeError"], answer: "IndexError" },
    { question: "Which method returns number of occurrences in list?", options: ["count()", "length()", "size()", "occurrences()"], answer: "count()" },
    { question: "Which keyword is used for context managers?", options: ["with", "using", "context", "manage"], answer: "with" },
    { question: "Which keyword defines a module-level docstring?", options: ["\"\"\"", "//", "#", "'''"], answer: "\"\"\"" },
    { question: "Which operator checks inequality?", options: ["!=", "!==", "==", "="], answer: "!=" },
    { question: "Which built-in function returns type of object?", options: ["type()", "class()", "typeof()", "instance()"], answer: "type()" },
  ],

  advanced: [
    { question: "Which function is used to dynamically execute code?", options: ["eval()", "exec()", "run()", "execute()"], answer: "exec()" },
    { question: "Which method is used for deep copy?", options: ["copy.deepcopy()", "copy()", "deepcopy()", "clone()"], answer: "copy.deepcopy()" },
    { question: "Which function converts iterable to list?", options: ["list()", "tuple()", "set()", "dict()"], answer: "list()" },
    { question: "Which module is used for date and time?", options: ["datetime", "time", "calendar", "dateutil"], answer: "datetime" },
    { question: "Which method encodes string to bytes?", options: ["encode()", "decode()", "toBytes()", "bytes()"], answer: "encode()" },
    { question: "Which method decodes bytes to string?", options: ["decode()", "encode()", "fromBytes()", "toString()"], answer: "decode()" },
    { question: "Which decorator is used for class methods?", options: ["@classmethod", "@staticmethod", "@property", "@abstractmethod"], answer: "@classmethod" },
    { question: "Which keyword defines a metaclass?", options: ["metaclass", "class", "type", "meta"], answer: "metaclass" },
    { question: "Which module provides high-performance arrays?", options: ["numpy", "array", "pandas", "scipy"], answer: "numpy" },
    { question: "Which method serializes object to JSON?", options: ["json.dumps()", "json.load()", "json.serialize()", "json.toJson()"], answer: "json.dumps()" },
    { question: "Which method deserializes JSON to object?", options: ["json.loads()", "json.parse()", "json.deserialize()", "json.fromJson()"], answer: "json.loads()" },
    { question: "Which module is used for multithreading?", options: ["threading", "multiprocessing", "asyncio", "concurrent"], answer: "threading" },
    { question: "Which function creates anonymous functions?", options: ["lambda", "def", "function", "anon"], answer: "lambda" },
    { question: "Which module handles HTTP requests?", options: ["requests", "http", "urllib", "axios"], answer: "requests" },
    { question: "Which built-in function returns iterable of index and value?", options: ["enumerate()", "zip()", "range()", "items()"], answer: "enumerate()" },
    { question: "Which module is used for data serialization?", options: ["pickle", "marshal", "json", "shelve"], answer: "pickle" },
    { question: "Which method removes whitespaces from string ends?", options: ["strip()", "trim()", "rstrip()", "lstrip()"], answer: "strip()" },
    { question: "Which keyword defines a coroutine function?", options: ["async", "await", "def", "coroutine"], answer: "async" },
    { question: "Which module handles mathematical operations?", options: ["math", "cmath", "numpy", "numbers"], answer: "math" },
    { question: "Which module handles CSV files?", options: ["csv", "pandas", "json", "xlsx"], answer: "csv" },
  ],
};
export default function PythonQuiz () {
  const [level, setLevel] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  // Ensure questions is always an array
  const questions = level && quizPython[level.toLowerCase()] ? quizPython[level.toLowerCase()] : [];

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
                🚀 Python Quiz
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