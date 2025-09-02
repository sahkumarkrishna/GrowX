import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const quizJava = {
  beginner: [
    { question: "Who developed Java?", options: ["James Gosling", "Bjarne Stroustrup", "Dennis Ritchie", "Guido van Rossum"], answer: "James Gosling" },
    { question: "Which company originally developed Java?", options: ["Sun Microsystems", "Microsoft", "IBM", "Oracle"], answer: "Sun Microsystems" },
    { question: "Which file extension is used for Java source files?", options: [".java", ".class", ".js", ".cpp"], answer: ".java" },
    { question: "Which keyword is used to define a class in Java?", options: ["class", "struct", "object", "module"], answer: "class" },
    { question: "Which method is the entry point of a Java program?", options: ["main()", "start()", "run()", "init()"], answer: "main()" },
    { question: "Which keyword is used to inherit a class?", options: ["extends", "implements", "inherits", "super"], answer: "extends" },
    { question: "Which operator is used for assignment?", options: ["=", "==", "+=", "-="], answer: "=" },
    { question: "Which data type stores decimal numbers?", options: ["float", "int", "char", "boolean"], answer: "float" },
    { question: "Which keyword defines a constant?", options: ["final", "const", "static", "immutable"], answer: "final" },
    { question: "Which loop executes at least once?", options: ["do-while", "for", "while", "foreach"], answer: "do-while" },
    { question: "Which operator checks equality?", options: ["==", "=", "!=", "<"], answer: "==" },
    { question: "Which access specifier allows access anywhere?", options: ["public", "private", "protected", "default"], answer: "public" },
    { question: "Which access specifier restricts access to the same class?", options: ["private", "public", "protected", "default"], answer: "private" },
    { question: "Which class is the superclass of all classes in Java?", options: ["Object", "Class", "Main", "Base"], answer: "Object" },
    { question: "Which keyword is used to define an interface?", options: ["interface", "class", "abstract", "implements"], answer: "interface" },
    { question: "Which keyword is used to handle exceptions?", options: ["try", "catch", "finally", "all of the above"], answer: "all of the above" },
    { question: "Which method converts a string to an integer?", options: ["Integer.parseInt()", "String.toInt()", "Integer.toString()", "parseInt()"], answer: "Integer.parseInt()" },
    { question: "Which operator adds two numbers?", options: ["+", "-", "*", "/"], answer: "+" },
    { question: "Which keyword prevents inheritance?", options: ["final", "static", "const", "sealed"], answer: "final" },
    { question: "Which keyword defines a static method?", options: ["static", "final", "public", "abstract"], answer: "static" },
  ],

  intermediate: [
    { question: "Which keyword is used to implement an interface?", options: ["implements", "extends", "inherits", "interface"], answer: "implements" },
    { question: "Which method is used to compare strings in Java?", options: ["equals()", "==", "compare()", "match()"], answer: "equals()" },
    { question: "Which collection stores key-value pairs?", options: ["HashMap", "ArrayList", "LinkedList", "HashSet"], answer: "HashMap" },
    { question: "Which collection stores unique elements only?", options: ["HashSet", "ArrayList", "HashMap", "LinkedList"], answer: "HashSet" },
    { question: "Which package contains basic Java classes like ArrayList?", options: ["java.util", "java.lang", "java.io", "java.sql"], answer: "java.util" },
    { question: "Which keyword defines a thread by extending?", options: ["extends Thread", "implements Runnable", "implements Thread", "extends Runnable"], answer: "extends Thread" },
    { question: "Which keyword is used to create a package?", options: ["package", "import", "module", "namespace"], answer: "package" },
    { question: "Which exception occurs when division by zero happens?", options: ["ArithmeticException", "NullPointerException", "IOException", "ClassNotFoundException"], answer: "ArithmeticException" },
    { question: "Which operator is used for bitwise AND?", options: ["&", "|", "^", "~"], answer: "&" },
    { question: "Which method is used to get length of an array?", options: ["length", "size()", "length()", "count()"], answer: "length" },
    { question: "Which method is used to sort a collection?", options: ["Collections.sort()", "sort()", "Array.sort()", "List.sort()"], answer: "Collections.sort()" },
    { question: "Which keyword prevents a method from being overridden?", options: ["final", "static", "private", "abstract"], answer: "final" },
    { question: "Which operator performs logical AND?", options: ["&&", "||", "&", "|"], answer: "&&" },
    { question: "Which method reads input from user in Java?", options: ["Scanner.nextLine()", "Input()", "read()", "get()"], answer: "Scanner.nextLine()" },
    { question: "Which exception occurs when accessing null reference?", options: ["NullPointerException", "IndexOutOfBoundsException", "ClassCastException", "ArithmeticException"], answer: "NullPointerException" },
    { question: "Which keyword is used for runtime polymorphism?", options: ["override", "virtual", "abstract", "dynamic"], answer: "override" },
    { question: "Which operator shifts bits left?", options: ["<<", ">>", ">>>", "><"], answer: "<<" },
    { question: "Which operator shifts bits right?", options: [">>", "<<", ">>>", "><"], answer: ">>" },
    { question: "Which interface is implemented for serialization?", options: ["Serializable", "Externalizable", "Cloneable", "Comparable"], answer: "Serializable" },
    { question: "Which keyword is used to define a synchronized method?", options: ["synchronized", "volatile", "static", "abstract"], answer: "synchronized" },
  ],

  advanced: [
    { question: "Which operator performs bitwise XOR?", options: ["^", "&", "|", "~"], answer: "^" },
    { question: "Which method is used to stop a thread?", options: ["stop()", "terminate()", "kill()", "end()"], answer: "stop()" },
    { question: "Which keyword defines a generic class?", options: ["<T>", "generic", "template", "type"], answer: "<T>" },
    { question: "Which exception is thrown for invalid casting?", options: ["ClassCastException", "IOException", "ArithmeticException", "ArrayIndexOutOfBoundsException"], answer: "ClassCastException" },
    { question: "Which keyword defines a volatile variable?", options: ["volatile", "static", "final", "transient"], answer: "volatile" },
    { question: "Which method is used to join two strings efficiently?", options: ["StringBuilder.append()", "concat()", "merge()", "add()"], answer: "StringBuilder.append()" },
    { question: "Which interface is used for lambda expressions?", options: ["FunctionalInterface", "Serializable", "Runnable", "Comparator"], answer: "FunctionalInterface" },
    { question: "Which method is used to clone an object?", options: ["clone()", "copy()", "duplicate()", "new()"], answer: "clone()" },
    { question: "Which exception occurs for accessing array out of bounds?", options: ["ArrayIndexOutOfBoundsException", "NullPointerException", "IOException", "ArithmeticException"], answer: "ArrayIndexOutOfBoundsException" },
    { question: "Which keyword defines a transient variable?", options: ["transient", "volatile", "static", "final"], answer: "transient" },
    { question: "Which class loader loads classes from local file system?", options: ["System ClassLoader", "Bootstrap ClassLoader", "Extension ClassLoader", "Application ClassLoader"], answer: "System ClassLoader" },
    { question: "Which class provides date and time API in Java 8?", options: ["LocalDateTime", "Date", "Calendar", "Time"], answer: "LocalDateTime" },
    { question: "Which method is used to compare two objects?", options: ["equals()", "==", "compare()", "match()"], answer: "equals()" },
    { question: "Which operator performs bitwise NOT?", options: ["~", "!", "^", "&"], answer: "~" },
    { question: "Which method is used to read a file?", options: ["BufferedReader.read()", "FileReader.read()", "Scanner.next()", "InputStream.read()"], answer: "BufferedReader.read()" },
    { question: "Which method is used to write to a file?", options: ["BufferedWriter.write()", "FileWriter.write()", "PrintWriter.write()", "All of the above"], answer: "All of the above" },
    { question: "Which class is used for multithreading?", options: ["Thread", "Runnable", "ExecutorService", "All of the above"], answer: "All of the above" },
    { question: "Which keyword defines a default method in interface?", options: ["default", "static", "abstract", "final"], answer: "default" },
    { question: "Which method converts string to uppercase?", options: ["toUpperCase()", "upper()", "toupper()", "uppercase()"], answer: "toUpperCase()" },
    { question: "Which method converts string to lowercase?", options: ["toLowerCase()", "lower()", "tolower()", "lowercase()"], answer: "toLowerCase()" },
  ],
};
export default function JavaQuiz () {
  const [level, setLevel] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  // Ensure questions is always an array
  const questions = level && quizJava[level.toLowerCase()] ? quizJava[level.toLowerCase()] : [];

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
                🚀 Java Quiz
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