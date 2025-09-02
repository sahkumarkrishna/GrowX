import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const quizFlutter = {
  beginner: [
    { question: "Which language is used to develop Flutter apps?", options: ["Dart", "JavaScript", "Java", "Kotlin"], answer: "Dart" },
    { question: "Flutter is primarily used for?", options: ["Web Apps", "Mobile Apps", "Desktop Apps", "All of the above"], answer: "All of the above" },
    { question: "Which widget displays text in Flutter?", options: ["Text", "Container", "Column", "Row"], answer: "Text" },
    { question: "Which widget is used for layout?", options: ["Container", "Text", "Button", "Image"], answer: "Container" },
    { question: "Which widget displays images?", options: ["Image", "Text", "Container", "Row"], answer: "Image" },
    { question: "Which widget creates a scrollable list?", options: ["ListView", "Column", "Row", "Stack"], answer: "ListView" },
    { question: "Which method runs when Flutter app starts?", options: ["main()", "start()", "init()", "runApp()"], answer: "main()" },
    { question: "Which function inflates the widget tree?", options: ["runApp()", "main()", "build()", "initState()"], answer: "runApp()" },
    { question: "Which widget handles user input?", options: ["TextField", "Text", "Container", "Button"], answer: "TextField" },
    { question: "Which widget creates buttons?", options: ["ElevatedButton", "Text", "Container", "Column"], answer: "ElevatedButton" },
    { question: "Which layout system does Flutter use?", options: ["Widget tree", "Flexbox", "Grid", "Stack"], answer: "Widget tree" },
    { question: "Which widget positions children absolutely?", options: ["Stack", "Column", "Row", "Container"], answer: "Stack" },
    { question: "Which widget scrolls content vertically?", options: ["SingleChildScrollView", "ListView", "GridView", "Column"], answer: "SingleChildScrollView" },
    { question: "Which widget organizes children horizontally?", options: ["Row", "Column", "Stack", "Container"], answer: "Row" },
    { question: "Which widget organizes children vertically?", options: ["Column", "Row", "Stack", "Container"], answer: "Column" },
    { question: "Which method updates the state of a widget?", options: ["setState()", "updateState()", "refresh()", "rebuild()"], answer: "setState()" },
    { question: "Which widget wraps app for material design?", options: ["MaterialApp", "CupertinoApp", "WidgetsApp", "App"], answer: "MaterialApp" },
    { question: "Which widget wraps for Cupertino design?", options: ["CupertinoApp", "MaterialApp", "WidgetsApp", "App"], answer: "CupertinoApp" },
    { question: "Which widget is used for padding?", options: ["Padding", "Margin", "Container", "Spacer"], answer: "Padding" },
    { question: "Which widget detects gestures?", options: ["GestureDetector", "Listener", "Touchable", "TapWidget"], answer: "GestureDetector" },
  ],

  intermediate: [
    { question: "Which widget is used for scrollable grids?", options: ["GridView", "ListView", "Column", "Row"], answer: "GridView" },
    { question: "Which method is called before build?", options: ["initState()", "dispose()", "didUpdateWidget()", "build()"], answer: "initState()" },
    { question: "Which method cleans up resources?", options: ["dispose()", "initState()", "build()", "didChangeDependencies()"], answer: "dispose()" },
    { question: "Which widget is used for flexible layouts?", options: ["Expanded", "Flexible", "Container", "SizedBox"], answer: "Expanded" },
    { question: "Which widget makes children scrollable with slivers?", options: ["CustomScrollView", "ListView", "GridView", "SingleChildScrollView"], answer: "CustomScrollView" },
    { question: "Which widget animates properties over time?", options: ["AnimatedContainer", "Container", "Transform", "Stack"], answer: "AnimatedContainer" },
    { question: "Which widget creates tabs?", options: ["TabBar", "BottomNavigationBar", "TabView", "TabController"], answer: "TabBar" },
    { question: "Which class manages animation values?", options: ["AnimationController", "Animation", "Ticker", "CurvedAnimation"], answer: "AnimationController" },
    { question: "Which widget handles multiple screen stacks?", options: ["Navigator", "PageView", "TabBar", "Stack"], answer: "Navigator" },
    { question: "Which widget manages async data?", options: ["FutureBuilder", "StreamBuilder", "AsyncBuilder", "Both A and B"], answer: "Both A and B" },
    { question: "Which widget builds widgets lazily?", options: ["ListView.builder", "GridView.builder", "Both A and B", "Column.builder"], answer: "Both A and B" },
    { question: "Which widget displays a snack bar?", options: ["ScaffoldMessenger", "SnackBar", "MaterialApp", "Scaffold"], answer: "ScaffoldMessenger" },
    { question: "Which widget scrolls content horizontally?", options: ["SingleChildScrollView", "ListView", "GridView", "Row"], answer: "SingleChildScrollView" },
    { question: "Which widget adapts to device screen size?", options: ["MediaQuery", "LayoutBuilder", "Flexible", "Expanded"], answer: "MediaQuery" },
    { question: "Which widget observes app lifecycle?", options: ["WidgetsBindingObserver", "StatefulWidget", "StatelessWidget", "NavigatorObserver"], answer: "WidgetsBindingObserver" },
    { question: "Which widget provides themes?", options: ["Theme", "MaterialApp", "CupertinoApp", "InheritedWidget"], answer: "Theme" },
    { question: "Which widget wraps for platform adaptive design?", options: ["PlatformWidget", "CupertinoApp", "MaterialApp", "AdaptiveWidget"], answer: "PlatformWidget" },
    { question: "Which widget allows stacking with alignment?", options: ["Stack + Align", "Row + Align", "Column + Align", "Container + Align"], answer: "Stack + Align" },
    { question: "Which widget handles gestures with callbacks?", options: ["GestureDetector", "Listener", "InkWell", "All of the above"], answer: "All of the above" },
    { question: "Which widget listens to streams?", options: ["StreamBuilder", "FutureBuilder", "InheritedWidget", "Observer"], answer: "StreamBuilder" },
  ],

  advanced: [
    { question: "Which widget is optimized for large data lists?", options: ["ListView.builder", "ListView", "Column", "GridView"], answer: "ListView.builder" },
    { question: "Which widget allows hero animations?", options: ["Hero", "AnimatedContainer", "AnimatedBuilder", "Transform"], answer: "Hero" },
    { question: "Which method creates custom animations?", options: ["AnimationController", "Tween", "CurvedAnimation", "All of the above"], answer: "All of the above" },
    { question: "Which widget allows flexible scrollable headers?", options: ["SliverAppBar", "AppBar", "CustomScrollView", "FlexibleSpaceBar"], answer: "SliverAppBar" },
    { question: "Which class provides curves for animation?", options: ["Curves", "AnimationController", "Tween", "Ticker"], answer: "Curves" },
    { question: "Which method schedules frame callbacks?", options: ["SchedulerBinding.instance.addPostFrameCallback", "WidgetsBinding.instance", "AnimationController.forward", "Future.delayed"], answer: "SchedulerBinding.instance.addPostFrameCallback" },
    { question: "Which widget handles nested navigation?", options: ["Navigator 2.0", "Navigator 1.0", "PageView", "Router"], answer: "Navigator 2.0" },
    { question: "Which widget measures layout size dynamically?", options: ["LayoutBuilder", "MediaQuery", "Container", "IntrinsicWidth"], answer: "LayoutBuilder" },
    { question: "Which widget rebuilds on InheritedWidget change?", options: ["InheritedWidget + Consumer", "StatelessWidget", "StatefulWidget", "Provider"], answer: "InheritedWidget + Consumer" },
    { question: "Which package manages state globally?", options: ["Provider", "Bloc", "Riverpod", "All of the above"], answer: "All of the above" },
    { question: "Which widget applies custom clipping?", options: ["ClipPath", "ClipRect", "ClipOval", "All of the above"], answer: "All of the above" },
    { question: "Which widget interpolates animations?", options: ["Tween", "AnimationController", "CurvedAnimation", "All of the above"], answer: "All of the above" },
    { question: "Which class synchronizes animation frames?", options: ["Ticker", "AnimationController", "SchedulerBinding", "WidgetsBinding"], answer: "Ticker" },
    { question: "Which widget adapts to platform theme?", options: ["PlatformAdaptiveWidget", "CupertinoApp", "MaterialApp", "Theme"], answer: "PlatformAdaptiveWidget" },
    { question: "Which method handles touch gestures efficiently?", options: ["GestureArena", "GestureDetector", "Listener", "InkWell"], answer: "GestureArena" },
    { question: "Which widget overlays content?", options: ["Stack", "Overlay", "Container", "Positioned"], answer: "Overlay" },
    { question: "Which widget enables animations along a curve?", options: ["CurvedAnimation", "Tween", "AnimationController", "All of the above"], answer: "CurvedAnimation" },
    { question: "Which widget rebuilds when Provider state changes?", options: ["Consumer", "Selector", "Builder", "All of the above"], answer: "All of the above" },
    { question: "Which widget optimizes large grid performance?", options: ["GridView.builder", "GridView", "ListView.builder", "Column"], answer: "GridView.builder" },
  ],
};
export default function FlutterQuiz () {
  const [level, setLevel] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  // Ensure questions is always an array
  const questions = level && quizFlutter[level.toLowerCase()] ? quizFlutter[level.toLowerCase()] : [];

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
                🚀 Flutter Quiz
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