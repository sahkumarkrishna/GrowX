import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
const quizC = {
  beginner: [
    { question: "Who developed the C programming language?", options: ["Dennis Ritchie", "Bjarne Stroustrup", "James Gosling", "Ken Thompson"], answer: "Dennis Ritchie" },
    { question: "Which file extension is used for C source files?", options: [".c", ".cpp", ".java", ".cs"], answer: ".c" },
    { question: "Which function is used to print output in C?", options: ["printf()", "cout", "echo", "print()"], answer: "printf()" },
    { question: "Which header file is required for printf() and scanf()?", options: ["stdio.h", "stdlib.h", "string.h", "math.h"], answer: "stdio.h" },
    { question: "Which symbol is used to end a statement in C?", options: [";", ":", ".", ","], answer: ";" },
    { question: "What is the default return type of main() if not specified?", options: ["int", "void", "float", "char"], answer: "int" },
    { question: "Which operator is used for assignment in C?", options: ["=", "==", "+", "-"], answer: "=" },
    { question: "Which data type is used for integers?", options: ["int", "float", "char", "double"], answer: "int" },
    { question: "Which operator is used to get the remainder of a division?", options: ["%", "/", "*", "^"], answer: "%" },
    { question: "Which function reads input from the user?", options: ["scanf()", "gets()", "read()", "input()"], answer: "scanf()" },
    { question: "Which loop is guaranteed to execute at least once?", options: ["do-while", "for", "while", "foreach"], answer: "do-while" },
    { question: "Which keyword is used to return a value from a function?", options: ["return", "break", "exit", "goto"], answer: "return" },
    { question: "Which symbol is used for single-line comments?", options: ["//", "/* */", "#", "--"], answer: "//" },
    { question: "Which function is used to terminate a program?", options: ["exit()", "stop()", "terminate()", "end()"], answer: "exit()" },
    { question: "Which header file contains exit() function?", options: ["stdlib.h", "stdio.h", "string.h", "math.h"], answer: "stdlib.h" },
    { question: "Which keyword is used to define a constant value?", options: ["const", "#define", "static", "final"], answer: "const" },
    { question: "Which of the following is a valid variable name?", options: ["myVar1", "1myVar", "my-Var", "my Var"], answer: "myVar1" },
    { question: "Which operator is used for comparison?", options: ["==", "=", "!=", "<"], answer: "==" },
    { question: "Which data type stores a single character?", options: ["char", "string", "int", "float"], answer: "char" },
    { question: "Which function is used to calculate string length?", options: ["strlen()", "strlength()", "size()", "length()"], answer: "strlen()" },
  ],

  intermediate: [
    { question: "Which keyword is used for creating a structure?", options: ["struct", "class", "record", "object"], answer: "struct" },
    { question: "Which operator is used for bitwise AND?", options: ["&", "|", "^", "~"], answer: "&" },
    { question: "Which memory allocation function allocates contiguous memory?", options: ["malloc()", "calloc()", "realloc()", "alloc()"], answer: "malloc()" },
    { question: "Which function frees allocated memory?", options: ["free()", "delete()", "remove()", "clear()"], answer: "free()" },
    { question: "Which header file contains malloc() and free()?", options: ["stdlib.h", "stdio.h", "string.h", "math.h"], answer: "stdlib.h" },
    { question: "Which operator is used for pointer dereferencing?", options: ["*", "&", "->", "%"], answer: "*" },
    { question: "Which operator gets the address of a variable?", options: ["&", "*", "%", "@"], answer: "&" },
    { question: "Which keyword is used to define a union?", options: ["union", "struct", "enum", "class"], answer: "union" },
    { question: "Which keyword defines an enumerated type?", options: ["enum", "struct", "union", "type"], answer: "enum" },
    { question: "Which operator accesses structure members through a pointer?", options: ["->", ".", "*", "&"], answer: "->" },
    { question: "Which function is used to compare two strings?", options: ["strcmp()", "strcomp()", "strncmp()", "strcmpi()"], answer: "strcmp()" },
    { question: "Which function copies one string to another?", options: ["strcpy()", "strcopy()", "strncpy()", "copystr()"], answer: "strcpy()" },
    { question: "Which function concatenates two strings?", options: ["strcat()", "strappend()", "concat()", "strmerge()"], answer: "strcat()" },
    { question: "Which operator shifts bits to the left?", options: ["<<", ">>", ">>>", "><"], answer: "<<" },
    { question: "Which operator shifts bits to the right?", options: [">>", "<<", ">>>", "><"], answer: ">>" },
    { question: "Which keyword defines a type alias?", options: ["typedef", "typealias", "alias", "define"], answer: "typedef" },
    { question: "Which operator performs bitwise XOR?", options: ["^", "&", "|", "~"], answer: "^" },
    { question: "Which function compares n characters of strings?", options: ["strncmp()", "strcmp()", "strncomp()", "strncmpi()"], answer: "strncmp()" },
    { question: "Which header file contains string manipulation functions?", options: ["string.h", "stdlib.h", "stdio.h", "math.h"], answer: "string.h" },
    { question: "Which operator performs logical OR?", options: ["||", "&&", "|", "&"], answer: "||" },
  ],

  advanced: [
    { question: "Which function reallocates memory to a new size?", options: ["realloc()", "malloc()", "calloc()", "free()"], answer: "realloc()" },
    { question: "Which keyword is used for volatile variables?", options: ["volatile", "static", "register", "extern"], answer: "volatile" },
    { question: "Which operator is used for conditional expressions?", options: ["?", "if", "switch", ":"], answer: "?" },
    { question: "Which keyword prevents a variable from being modified?", options: ["const", "static", "volatile", "register"], answer: "const" },
    { question: "Which operator performs bitwise NOT?", options: ["~", "!", "^", "&"], answer: "~" },
    { question: "Which keyword defines an external variable?", options: ["extern", "static", "register", "volatile"], answer: "extern" },
    { question: "Which keyword declares a variable stored in CPU register?", options: ["register", "static", "volatile", "extern"], answer: "register" },
    { question: "Which header file defines malloc(), calloc(), realloc()?", options: ["stdlib.h", "string.h", "stdio.h", "math.h"], answer: "stdlib.h" },
    { question: "Which function converts string to integer?", options: ["atoi()", "atof()", "strtoi()", "strtoint()"], answer: "atoi()" },
    { question: "Which function converts string to float?", options: ["atof()", "atoi()", "strtof()", "strtofloat()"], answer: "atof()" },
    { question: "Which header file contains math functions?", options: ["math.h", "stdlib.h", "stdio.h", "string.h"], answer: "math.h" },
    { question: "Which function calculates the square root?", options: ["sqrt()", "power()", "square()", "root()"], answer: "sqrt()" },
    { question: "Which function returns the absolute value?", options: ["abs()", "fabs()", "absolute()", "mod()"], answer: "abs()" },
    { question: "Which operator combines bits using OR?", options: ["|", "&", "^", "~"], answer: "|" },
    { question: "Which keyword defines a static variable?", options: ["static", "const", "volatile", "extern"], answer: "static" },
    { question: "Which function sets memory with a value?", options: ["memset()", "memcpy()", "memmove()", "memsetval()"], answer: "memset()" },
    { question: "Which function copies memory area?", options: ["memcpy()", "memmove()", "memset()", "memcopy()"], answer: "memcpy()" },
    { question: "Which function moves memory area?", options: ["memmove()", "memcpy()", "memset()", "memreplace()"], answer: "memmove()" },
    { question: "Which operator checks bitwise AND result?", options: ["&", "|", "^", "~"], answer: "&" },
    { question: "Which keyword prevents compiler optimization for a variable?", options: ["volatile", "const", "static", "register"], answer: "volatile" },
  ],
};
export default function CQuiz () {
  const [level, setLevel] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  // Ensure questions is always an array
  const questions = level && quizC[level.toLowerCase()] ? quizC[level.toLowerCase()] : [];

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
                🚀 C Quiz
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