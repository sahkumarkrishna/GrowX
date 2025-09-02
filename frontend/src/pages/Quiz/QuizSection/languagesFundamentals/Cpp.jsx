import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const quizCPP = {
  beginner: [
    { question: "Who developed C++?", options: ["Bjarne Stroustrup", "Dennis Ritchie", "James Gosling", "Ken Thompson"], answer: "Bjarne Stroustrup" },
    { question: "Which file extension is used for C++ source files?", options: [".cpp", ".c", ".java", ".cs"], answer: ".cpp" },
    { question: "Which operator is used for scope resolution?", options: ["::", ":", ".", "->"], answer: "::" },
    { question: "Which function is used to print output in C++?", options: ["cout", "printf()", "echo", "print()"], answer: "cout" },
    { question: "Which header file is required for cout and cin?", options: ["iostream", "stdio.h", "conio.h", "stdlib.h"], answer: "iostream" },
    { question: "Which keyword is used to define a class?", options: ["class", "struct", "object", "record"], answer: "class" },
    { question: "Which access specifier allows members to be accessed anywhere?", options: ["public", "private", "protected", "friend"], answer: "public" },
    { question: "Which access specifier restricts members to the same class?", options: ["private", "public", "protected", "friend"], answer: "private" },
    { question: "Which data type stores decimal numbers?", options: ["float", "int", "char", "bool"], answer: "float" },
    { question: "Which operator is used for assignment?", options: ["=", "==", "+", "-"], answer: "=" },
    { question: "Which operator adds two numbers?", options: ["+", "-", "*", "/"], answer: "+" },
    { question: "Which keyword defines a constant value?", options: ["const", "static", "final", "readonly"], answer: "const" },
    { question: "Which keyword is used to define a function outside the class?", options: ["void", "int", "float", "none"], answer: "none" },
    { question: "Which operator checks equality?", options: ["==", "=", "!=", "<"], answer: "==" },
    { question: "Which keyword is used for inheritance?", options: ["public", "private", "protected", "all of the above"], answer: "all of the above" },
    { question: "Which loop executes at least once?", options: ["do-while", "for", "while", "foreach"], answer: "do-while" },
    { question: "Which operator is used for pointer dereferencing?", options: ["*", "&", "->", "^"], answer: "*" },
    { question: "Which operator gets the address of a variable?", options: ["&", "*", "%", "@"], answer: "&" },
    { question: "Which function reads input from the user?", options: ["cin", "scanf()", "gets()", "input()"], answer: "cin" },
    { question: "Which keyword is used to terminate a function?", options: ["return", "exit", "stop", "end"], answer: "return" },
  ],

  intermediate: [
    { question: "Which operator performs bitwise AND in C++?", options: ["&", "|", "^", "~"], answer: "&" },
    { question: "Which keyword defines a virtual function?", options: ["virtual", "override", "abstract", "inline"], answer: "virtual" },
    { question: "Which STL container stores elements in key-value pairs?", options: ["map", "vector", "list", "set"], answer: "map" },
    { question: "Which container stores unique elements only?", options: ["set", "map", "vector", "list"], answer: "set" },
    { question: "Which container allows random access by index?", options: ["vector", "list", "set", "map"], answer: "vector" },
    { question: "Which operator is used for dynamic memory allocation?", options: ["new", "malloc", "alloc", "calloc"], answer: "new" },
    { question: "Which operator is used to deallocate memory?", options: ["delete", "free", "dealloc", "remove"], answer: "delete" },
    { question: "Which function compares two strings in C++?", options: ["strcmp()", "compare()", "strcomp()", "strncmp()"], answer: "strcmp()" },
    { question: "Which keyword defines a type alias in C++?", options: ["typedef", "alias", "type", "define"], answer: "typedef" },
    { question: "Which operator performs bitwise XOR?", options: ["^", "&", "|", "~"], answer: "^" },
    { question: "Which function copies one string to another?", options: ["strcpy()", "strcopy()", "strncpy()", "copystr()"], answer: "strcpy()" },
    { question: "Which operator accesses structure/class members through a pointer?", options: ["->", ".", "*", "&"], answer: "->" },
    { question: "Which keyword defines an abstract class?", options: ["abstract", "virtual", "interface", "pure virtual"], answer: "pure virtual" },
    { question: "Which operator shifts bits left?", options: ["<<", ">>", ">>>", "><"], answer: "<<" },
    { question: "Which operator shifts bits right?", options: [">>", "<<", ">>>", "><"], answer: ">>" },
    { question: "Which header file contains math functions?", options: ["cmath", "stdio.h", "string", "cstdlib"], answer: "cmath" },
    { question: "Which function calculates square root in C++?", options: ["sqrt()", "pow()", "square()", "root()"], answer: "sqrt()" },
    { question: "Which container stores elements in sequence but allows O(1) insert/remove at front?", options: ["deque", "vector", "list", "map"], answer: "deque" },
    { question: "Which function gets length of string?", options: ["length()", "strlen()", "size()", "count()"], answer: "length()" },
    { question: "Which keyword defines a namespace?", options: ["namespace", "using", "scope", "module"], answer: "namespace" },
  ],

  advanced: [
    { question: "Which function reallocates dynamic memory in C++?", options: ["realloc()", "new", "delete", "malloc"], answer: "realloc()" },
    { question: "Which operator is used for member pointer access?", options: ["->*", "->", ".", "&"], answer: "->*" },
    { question: "Which keyword prevents compiler optimization for a variable?", options: ["volatile", "const", "static", "register"], answer: "volatile" },
    { question: "Which keyword defines a template class?", options: ["template", "generic", "class", "typename"], answer: "template" },
    { question: "Which operator performs bitwise NOT?", options: ["~", "!", "^", "&"], answer: "~" },
    { question: "Which operator is used for conditional expressions?", options: ["?", "if", "switch", ":"], answer: "?" },
    { question: "Which keyword defines an inline function?", options: ["inline", "fast", "static", "const"], answer: "inline" },
    { question: "Which container is implemented as a red-black tree?", options: ["map", "vector", "list", "set"], answer: "map" },
    { question: "Which operator combines bits using OR?", options: ["|", "&", "^", "~"], answer: "|" },
    { question: "Which function copies memory area?", options: ["memcpy()", "memmove()", "memset()", "memcopy()"], answer: "memcpy()" },
    { question: "Which function moves memory area?", options: ["memmove()", "memcpy()", "memset()", "memreplace()"], answer: "memmove()" },
    { question: "Which function sets memory with a value?", options: ["memset()", "memcpy()", "memmove()", "memsetval()"], answer: "memset()" },
    { question: "Which operator checks logical AND?", options: ["&&", "||", "&", "|"], answer: "&&" },
    { question: "Which keyword defines a static member of a class?", options: ["static", "const", "volatile", "extern"], answer: "static" },
    { question: "Which keyword defines a friend function?", options: ["friend", "static", "extern", "inline"], answer: "friend" },
    { question: "Which operator accesses base class members in multiple inheritance?", options: ["::", ".", "->", ".*"], answer: "::" },
    { question: "Which keyword defines a pure virtual function?", options: ["virtual", "abstract", "=0", "interface"], answer: "=0" },
    { question: "Which header file contains vector container?", options: ["vector", "list", "map", "set"], answer: "vector" },
    { question: "Which operator overloads addition for objects?", options: ["operator+", "operator-", "operator*", "operator/"], answer: "operator+" },
    { question: "Which exception handling keyword is used to throw an exception?", options: ["throw", "catch", "try", "finally"], answer: "throw" },
  ],
};

export default function CPPQuiz () {
  const [level, setLevel] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  // Ensure questions is always an array
  const questions = level && quizCPP[level.toLowerCase()] ? quizCPP[level.toLowerCase()] : [];

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
                🚀 C++ Quiz
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