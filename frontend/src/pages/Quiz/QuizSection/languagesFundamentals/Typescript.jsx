import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
const quizTS = {
  beginner: [
    { question: "Which keyword declares a variable in TypeScript?", options: ["var", "let", "const", "All of the above"], answer: "All of the above" },
    { question: "Which type is used for true/false values?", options: ["boolean", "string", "number", "any"], answer: "boolean" },
    { question: "Which type is used for text?", options: ["string", "number", "boolean", "char"], answer: "string" },
    { question: "Which type allows any value?", options: ["any", "unknown", "void", "never"], answer: "any" },
    { question: "Which keyword defines a function?", options: ["function", "func", "def", "fn"], answer: "function" },
    { question: "How do you write a single-line comment?", options: ["// comment", "/* comment */", "# comment", "<!-- comment -->"], answer: "// comment" },
    { question: "Which type represents no value?", options: ["void", "null", "undefined", "never"], answer: "void" },
    { question: "Which type represents never occurring value?", options: ["never", "void", "undefined", "null"], answer: "never" },
    { question: "Which type represents absence of value?", options: ["null", "void", "never", "any"], answer: "null" },
    { question: "Which type is for decimal numbers?", options: ["number", "int", "float", "decimal"], answer: "number" },
    { question: "Which type represents arrays?", options: ["Array<number>", "number[]", "Both A and B", "tuple"], answer: "Both A and B" },
    { question: "Which type represents multiple types?", options: ["union type", "enum", "tuple", "any"], answer: "union type" },
    { question: "Which keyword defines a class?", options: ["class", "object", "struct", "define"], answer: "class" },
    { question: "Which keyword is used for inheritance?", options: ["extends", "implements", "super", "inherit"], answer: "extends" },
    { question: "Which keyword is used to implement an interface?", options: ["implements", "extends", "interface", "use"], answer: "implements" },
    { question: "Which type represents fixed-length array?", options: ["tuple", "array", "enum", "object"], answer: "tuple" },
    { question: "Which type represents enumerated values?", options: ["enum", "tuple", "object", "array"], answer: "enum" },
    { question: "Which type represents function that returns nothing?", options: ["void", "any", "never", "null"], answer: "void" },
    { question: "Which type checks for unknown type safely?", options: ["unknown", "any", "void", "never"], answer: "unknown" },
    { question: "Which keyword prevents reassignment?", options: ["const", "let", "var", "static"], answer: "const" },
  ],

  intermediate: [
    { question: "Which keyword declares constant array?", options: ["const arr: number[]", "let arr: number[]", "var arr: number[]", "array const arr"], answer: "const arr: number[]" },
    { question: "Which keyword casts type?", options: ["as", "<>", "Both A and B", "typecast"], answer: "Both A and B" },
    { question: "Which type restricts values to specific strings?", options: ["string literal type", "enum", "any", "tuple"], answer: "string literal type" },
    { question: "Which type ensures non-null value?", options: ["non-null assertion (!)", "optional (?)", "any", "void"], answer: "non-null assertion (!)" },
    { question: "Which type defines array of objects?", options: ["Array<{name:string}>", "{name:string}[]", "Both A and B", "object[]"], answer: "Both A and B" },
    { question: "Which type represents key-value mapping?", options: ["Record<K,V>", "Map<K,V>", "object", "tuple"], answer: "Record<K,V>" },
    { question: "Which type extracts return type of function?", options: ["ReturnType<typeof fn>", "typeof fn", "fnReturnType", "inferReturn"], answer: "ReturnType<typeof fn>" },
    { question: "Which type extracts parameters of function?", options: ["Parameters<typeof fn>", "ReturnType<typeof fn>", "typeof fn", "Args<typeof fn>"], answer: "Parameters<typeof fn>" },
    { question: "Which type represents intersection of types?", options: ["&", "|", "&&", "||"], answer: "&" },
    { question: "Which type represents union of types?", options: ["|", "&", "||", "&&"], answer: "|" },
    { question: "Which keyword defines module?", options: ["module", "namespace", "package", "import"], answer: "namespace" },
    { question: "Which type ensures immutable object?", options: ["Readonly<T>", "Immutable<T>", "const", "final"], answer: "Readonly<T>" },
    { question: "Which type represents optional properties?", options: ["?", "optional", "nullable", "void"], answer: "?" },
    { question: "Which keyword ensures generic function?", options: ["<T>", "any", "type", "template"], answer: "<T>" },
    { question: "Which type ensures function never returns?", options: ["never", "void", "any", "undefined"], answer: "never" },
    { question: "Which type extracts type from array?", options: ["typeof arr[number]", "ArrayType", "ElementType", "arrType"], answer: "typeof arr[number]" },
    { question: "Which type creates literal type from array values?", options: ["as const", "literal", "readonly", "tuple"], answer: "as const" },
    { question: "Which utility type converts properties optional?", options: ["Partial<T>", "Required<T>", "Readonly<T>", "Pick<T>"], answer: "Partial<T>" },
    { question: "Which utility type converts properties required?", options: ["Required<T>", "Partial<T>", "Readonly<T>", "Pick<T>"], answer: "Required<T>" },
    { question: "Which utility type picks certain properties?", options: ["Pick<T,K>", "Omit<T,K>", "Partial<T>", "Required<T>"], answer: "Pick<T,K>" },
  ],

  advanced: [
    { question: "Which keyword restricts type to certain keys?", options: ["keyof", "in", "extends", "implements"], answer: "keyof" },
    { question: "Which utility type removes certain keys?", options: ["Omit<T,K>", "Pick<T,K>", "Exclude<T,K>", "Partial<T>"], answer: "Omit<T,K>" },
    { question: "Which type removes types from union?", options: ["Exclude<T,U>", "Pick<T,K>", "Omit<T,K>", "Extract<T,U>"], answer: "Exclude<T,U>" },
    { question: "Which type extracts types from union?", options: ["Extract<T,U>", "Exclude<T,U>", "Pick<T,K>", "Omit<T,K>"], answer: "Extract<T,U>" },
    { question: "Which type creates new type from existing with some keys?", options: ["Pick<T,K>", "Omit<T,K>", "Partial<T>", "Required<T>"], answer: "Pick<T,K>" },
    { question: "Which type omits keys from existing type?", options: ["Omit<T,K>", "Pick<T,K>", "Partial<T>", "Required<T>"], answer: "Omit<T,K>" },
    { question: "Which type makes properties readonly?", options: ["Readonly<T>", "Partial<T>", "Required<T>", "Pick<T,K>"], answer: "Readonly<T>" },
    { question: "Which type ensures all properties required?", options: ["Required<T>", "Partial<T>", "Readonly<T>", "Pick<T,K>"], answer: "Required<T>" },
    { question: "Which type represents tuple of fixed length?", options: ["[number, string]", "Array<any>", "tuple()", "object[]"], answer: "[number, string]" },
    { question: "Which type maps over keys?", options: ["mapped types", "union types", "intersection types", "literal types"], answer: "mapped types" },
    { question: "Which keyword is used to assert type?", options: ["as", "<>", "type assertion", "cast"], answer: "as" },
    { question: "Which keyword defines generic constraint?", options: ["extends", "implements", "constraint", "super"], answer: "extends" },
    { question: "Which type infers type from value?", options: ["typeof", "keyof", "infer", "as"], answer: "typeof" },
    { question: "Which type extracts inner type from promise?", options: ["Awaited<T>", "PromiseType<T>", "Resolve<T>", "Extract<T>"], answer: "Awaited<T>" },
    { question: "Which type represents unknown property names?", options: ["index signature", "any", "unknown", "keyof"], answer: "index signature" },
    { question: "Which type ensures all properties optional recursively?", options: ["DeepPartial<T>", "Partial<T>", "Readonly<T>", "Required<T>"], answer: "DeepPartial<T>" },
    { question: "Which type ensures all properties readonly recursively?", options: ["DeepReadonly<T>", "Readonly<T>", "Partial<T>", "Required<T>"], answer: "DeepReadonly<T>" },
    { question: "Which type extracts function return type?", options: ["ReturnType<typeof fn>", "Parameters<typeof fn>", "typeof fn", "inferReturn"], answer: "ReturnType<typeof fn>" },
    { question: "Which type extracts function parameter types?", options: ["Parameters<typeof fn>", "ReturnType<typeof fn>", "typeof fn", "inferParams"], answer: "Parameters<typeof fn>" },
    { question: "Which keyword defines namespace?", options: ["namespace", "module", "package", "import"], answer: "namespace" },
  ],
};
export default function TSQuiz() {
  const [level, setLevel] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  // Ensure questions is always an array
  const questions = level && quizTS[level.toLowerCase()] ? quizTS[level.toLowerCase()] : [];

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
                🚀 TypeScript Quiz
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