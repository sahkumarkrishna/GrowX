import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const quizFirebase = {
  beginner: [
    { question: "What is Firebase primarily used for?", options: ["Backend as a Service", "Frontend Framework", "Database Only", "CSS Library"], answer: "Backend as a Service" },
    { question: "Which Firebase service stores JSON-like data?", options: ["Realtime Database", "Cloud Firestore", "Storage", "Hosting"], answer: "Realtime Database" },
    { question: "Which Firebase service hosts static websites?", options: ["Hosting", "Storage", "Firestore", "Authentication"], answer: "Hosting" },
    { question: "Which Firebase service manages user login?", options: ["Authentication", "Firestore", "Realtime Database", "Hosting"], answer: "Authentication" },
    { question: "Which Firebase service stores large files like images?", options: ["Storage", "Firestore", "Realtime Database", "Functions"], answer: "Storage" },
    { question: "Which Firebase service allows sending notifications?", options: ["Cloud Messaging", "Hosting", "Authentication", "Firestore"], answer: "Cloud Messaging" },
    { question: "Firebase is owned by which company?", options: ["Google", "Microsoft", "Amazon", "Facebook"], answer: "Google" },
    { question: "Which language is primarily used for Firebase Cloud Functions?", options: ["JavaScript", "Python", "Java", "C++"], answer: "JavaScript" },
    { question: "Which Firebase service provides analytics for apps?", options: ["Analytics", "Crashlytics", "Firestore", "Hosting"], answer: "Analytics" },
    { question: "Which Firebase service helps detect app crashes?", options: ["Crashlytics", "Analytics", "Firestore", "Hosting"], answer: "Crashlytics" },
    { question: "Which Firebase service is NoSQL?", options: ["Realtime Database", "MySQL", "PostgreSQL", "MongoDB"], answer: "Realtime Database" },
    { question: "Which Firebase product is used for serverless computing?", options: ["Cloud Functions", "Firestore", "Hosting", "Authentication"], answer: "Cloud Functions" },
    { question: "Which Firebase service allows structured querying?", options: ["Firestore", "Realtime Database", "Storage", "Hosting"], answer: "Firestore" },
    { question: "Firebase free tier is also called?", options: ["Spark Plan", "Flame Plan", "Blaze Plan", "Starter Plan"], answer: "Spark Plan" },
    { question: "Which service is used for deploying apps?", options: ["Hosting", "Firestore", "Authentication", "Storage"], answer: "Hosting" },
    { question: "Which Firebase service supports offline capabilities?", options: ["Firestore", "MySQL", "Realtime Database", "Storage"], answer: "Firestore" },
    { question: "Which service uses tokens for authentication?", options: ["Authentication", "Firestore", "Storage", "Hosting"], answer: "Authentication" },
    { question: "Firebase Cloud Messaging is used for?", options: ["Push Notifications", "Data Storage", "Authentication", "Hosting"], answer: "Push Notifications" },
    { question: "Firestore supports which type of database?", options: ["NoSQL", "SQL", "Graph", "Time-Series"], answer: "NoSQL" },
    { question: "Firebase Realtime Database uses?", options: ["JSON", "XML", "SQL", "CSV"], answer: "JSON" },
  ],

  intermediate: [
    { question: "Which Firebase service provides server-side logic?", options: ["Cloud Functions", "Firestore", "Hosting", "Authentication"], answer: "Cloud Functions" },
    { question: "Which Firebase service allows multi-region replication?", options: ["Firestore", "Realtime Database", "Storage", "Hosting"], answer: "Firestore" },
    { question: "Which Firebase service is better for structured queries?", options: ["Firestore", "Realtime Database", "Storage", "Hosting"], answer: "Firestore" },
    { question: "Firebase Firestore uses which kind of database?", options: ["Document-Oriented", "Relational", "Graph", "Key-Value"], answer: "Document-Oriented" },
    { question: "Which Firebase service provides crash reporting for iOS and Android?", options: ["Crashlytics", "Analytics", "Hosting", "Authentication"], answer: "Crashlytics" },
    { question: "Which Firebase service allows callable functions from client apps?", options: ["Cloud Functions", "Firestore", "Realtime Database", "Hosting"], answer: "Cloud Functions" },
    { question: "Which Firebase service uses security rules for access control?", options: ["Firestore", "Hosting", "Authentication", "Storage"], answer: "Firestore" },
    { question: "Which Firebase plan supports pay-as-you-go?", options: ["Blaze Plan", "Spark Plan", "Flame Plan", "Starter Plan"], answer: "Blaze Plan" },
    { question: "Which Firebase service is suitable for real-time chat apps?", options: ["Realtime Database", "Firestore", "Storage", "Hosting"], answer: "Realtime Database" },
    { question: "Firebase Hosting supports which protocols?", options: ["HTTPS", "HTTP", "FTP", "SSH"], answer: "HTTPS" },
    { question: "Which service allows scheduling server-side tasks?", options: ["Cloud Functions with Pub/Sub", "Firestore", "Storage", "Hosting"], answer: "Cloud Functions with Pub/Sub" },
    { question: "Which service provides event-driven functions?", options: ["Cloud Functions", "Firestore", "Hosting", "Authentication"], answer: "Cloud Functions" },
    { question: "Firebase Authentication supports which methods?", options: ["Email/Password, Google, Facebook, Phone", "Only Email/Password", "Only Google", "Only Phone"], answer: "Email/Password, Google, Facebook, Phone" },
    { question: "Which Firebase service can integrate with Google Analytics?", options: ["All Firebase services", "Only Firestore", "Only Hosting", "Only Cloud Functions"], answer: "All Firebase services" },
    { question: "Which service supports offline data persistence on mobile?", options: ["Firestore", "Realtime Database", "Storage", "Hosting"], answer: "Firestore" },
    { question: "Firebase Realtime Database triggers can be used in?", options: ["Cloud Functions", "Firestore", "Hosting", "Storage"], answer: "Cloud Functions" },
    { question: "Which service supports custom authentication tokens?", options: ["Authentication", "Firestore", "Storage", "Hosting"], answer: "Authentication" },
    { question: "Firebase Firestore documents are stored in?", options: ["Collections", "Tables", "Rows", "Buckets"], answer: "Collections" },
    { question: "Which service provides user analytics like active users?", options: ["Analytics", "Firestore", "Authentication", "Hosting"], answer: "Analytics" },
    { question: "Firebase Storage uses which underlying service?", options: ["Google Cloud Storage", "Firestore", "Realtime Database", "Hosting"], answer: "Google Cloud Storage" },
  ],

  advanced: [
    { question: "Which Firebase service provides serverless computing for backend logic?", options: ["Cloud Functions", "Firestore", "Hosting", "Authentication"], answer: "Cloud Functions" },
    { question: "Which Firebase service allows multi-region replication and strong consistency?", options: ["Firestore", "Realtime Database", "Storage", "Hosting"], answer: "Firestore" },
    { question: "Which Firebase security rules language is used for Firestore?", options: ["Firebase Security Rules", "JSON Rules", "YAML Rules", "SQL Rules"], answer: "Firebase Security Rules" },
    { question: "Cloud Functions can be triggered by which events?", options: ["HTTP, Firestore, Realtime Database, Auth, Analytics", "Only HTTP", "Only Firestore", "Only Analytics"], answer: "HTTP, Firestore, Realtime Database, Auth, Analytics" },
    { question: "Which service integrates Firebase ML Kit?", options: ["Cloud Functions", "Firestore", "Storage", "Hosting"], answer: "Cloud Functions" },
    { question: "Which Firebase feature supports A/B testing?", options: ["Remote Config", "Firestore", "Storage", "Hosting"], answer: "Remote Config" },
    { question: "Which Firebase service is NoSQL document database?", options: ["Firestore", "Realtime Database", "Storage", "Hosting"], answer: "Firestore" },
    { question: "Firebase Authentication can use which token standard?", options: ["JWT", "OAuth1", "SAML", "XML"], answer: "JWT" },
    { question: "Which service helps in monitoring performance of mobile apps?", options: ["Performance Monitoring", "Analytics", "Firestore", "Hosting"], answer: "Performance Monitoring" },
    { question: "Which Firebase service supports offline writes?", options: ["Firestore", "Realtime Database", "Storage", "Hosting"], answer: "Firestore" },
    { question: "Which Firebase service allows dynamic configuration without redeploy?", options: ["Remote Config", "Firestore", "Storage", "Hosting"], answer: "Remote Config" },
    { question: "Which Firebase service can detect app crashes and non-fatal errors?", options: ["Crashlytics", "Analytics", "Firestore", "Hosting"], answer: "Crashlytics" },
    { question: "Firebase Cloud Messaging can target which platforms?", options: ["iOS, Android, Web", "Only iOS", "Only Android", "Only Web"], answer: "iOS, Android, Web" },
    { question: "Which Firebase database supports hierarchical data?", options: ["Realtime Database", "Firestore", "Storage", "Hosting"], answer: "Realtime Database" },
    { question: "Which Firebase service allows logging custom events?", options: ["Analytics", "Firestore", "Storage", "Hosting"], answer: "Analytics" },
    { question: "Cloud Firestore documents have which unique identifier?", options: ["Document ID", "Primary Key", "Row ID", "Unique Key"], answer: "Document ID" },
    { question: "Which Firebase service allows versioning and rollback for configurations?", options: ["Remote Config", "Firestore", "Storage", "Hosting"], answer: "Remote Config" },
    { question: "Which Firebase service supports scheduled functions?", options: ["Cloud Functions with Pub/Sub", "Firestore", "Storage", "Hosting"], answer: "Cloud Functions with Pub/Sub" },
    { question: "Which Firebase product helps with personalized app experiences?", options: ["Remote Config", "Firestore", "Hosting", "Storage"], answer: "Remote Config" },
    { question: "Which Firebase service integrates with BigQuery for data analysis?", options: ["Analytics", "Firestore", "Storage", "Hosting"], answer: "Analytics" },
  ],
};

export default function FirebaseQuiz () {
  const [level, setLevel] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  // Ensure questions is always an array
  const questions = level && quizFirebase[level.toLowerCase()] ? quizFirebase[level.toLowerCase()] : [];

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
                🚀 Firebase Quiz
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