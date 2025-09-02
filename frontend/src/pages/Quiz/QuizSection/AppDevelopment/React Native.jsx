import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const quizReactNative = {
  beginner: [
    { question: "What is React Native primarily used for?", options: ["Web Apps", "Mobile Apps", "Desktop Apps", "Games"], answer: "Mobile Apps" },
    { question: "Which language is primarily used in React Native?", options: ["JavaScript", "TypeScript", "Python", "Java"], answer: "JavaScript" },
    { question: "Which component is used to display text?", options: ["<Text>", "<View>", "<TextInput>", "<ScrollView>"], answer: "<Text>" },
    { question: "Which component is used for layout and styling?", options: ["<View>", "<Text>", "<Image>", "<Button>"], answer: "<View>" },
    { question: "Which component is used to display images?", options: ["<Image>", "<Text>", "<View>", "<ScrollView>"], answer: "<Image>" },
    { question: "Which component creates a scrollable container?", options: ["<ScrollView>", "<FlatList>", "<View>", "<TextInput>"], answer: "<ScrollView>" },
    { question: "Which hook is used for state management?", options: ["useState", "useEffect", "useRef", "useContext"], answer: "useState" },
    { question: "Which hook is used for side effects?", options: ["useEffect", "useState", "useRef", "useMemo"], answer: "useEffect" },
    { question: "Which component is used for user input?", options: ["<TextInput>", "<Text>", "<Button>", "<View>"], answer: "<TextInput>" },
    { question: "Which component creates a button?", options: ["<Button>", "<TouchableOpacity>", "<Pressable>", "<View>"], answer: "<Button>" },
    { question: "Which component handles touch events?", options: ["<TouchableOpacity>", "<Text>", "<View>", "<ScrollView>"], answer: "<TouchableOpacity>" },
    { question: "Which layout system does React Native use?", options: ["Flexbox", "Grid", "CSS Grid", "Absolute"], answer: "Flexbox" },
    { question: "Which file typically serves as entry point?", options: ["index.js", "App.js", "main.js", "app.jsx"], answer: "index.js" },
    { question: "Which command runs the app on Android?", options: ["npx react-native run-android", "npm start android", "yarn android", "react-native android"], answer: "npx react-native run-android" },
    { question: "Which command runs the app on iOS?", options: ["npx react-native run-ios", "npm start ios", "yarn ios", "react-native ios"], answer: "npx react-native run-ios" },
    { question: "Which component is used for lists?", options: ["<FlatList>", "<ScrollView>", "<View>", "<Text>"], answer: "<FlatList>" },
    { question: "Which component handles gestures?", options: ["PanResponder", "TouchableOpacity", "<Button>", "<View>"], answer: "PanResponder" },
    { question: "Which platform APIs can React Native access?", options: ["Camera, Location, Sensors", "Only Camera", "Only Sensors", "None"], answer: "Camera, Location, Sensors" },
    { question: "Which component wraps entire app for safe area?", options: ["<SafeAreaView>", "<View>", "<ScrollView>", "<Text>"], answer: "<SafeAreaView>" },
    { question: "Which file stores app styles?", options: [".js or .ts", ".css", ".scss", ".html"], answer: ".js or .ts" },
  ],

  intermediate: [
    { question: "Which navigation library is popular in React Native?", options: ["React Navigation", "React Router", "Angular Router", "Vue Router"], answer: "React Navigation" },
    { question: "Which component optimizes large lists?", options: ["<FlatList>", "<ScrollView>", "<SectionList>", "<VirtualList>"], answer: "<FlatList>" },
    { question: "Which lifecycle method replaces componentDidMount in functional components?", options: ["useEffect", "useState", "useRef", "useMemo"], answer: "useEffect" },
    { question: "Which component handles multiple sections in a list?", options: ["<SectionList>", "<FlatList>", "<ScrollView>", "<View>"], answer: "<SectionList>" },
    { question: "Which prop updates component only when necessary?", options: ["shouldComponentUpdate", "componentDidUpdate", "render", "useState"], answer: "shouldComponentUpdate" },
    { question: "Which API fetches remote data?", options: ["fetch", "axios", "XMLHttpRequest", "All of the above"], answer: "All of the above" },
    { question: "Which component improves performance of large images?", options: ["<ImageBackground>", "<FastImage>", "<Image>", "<View>"], answer: "<FastImage>" },
    { question: "Which hook caches values between renders?", options: ["useMemo", "useState", "useEffect", "useRef"], answer: "useMemo" },
    { question: "Which component is used for modal dialogs?", options: ["<Modal>", "<Dialog>", "<Alert>", "<Popup>"], answer: "<Modal>" },
    { question: "Which hook persists values without causing re-render?", options: ["useRef", "useState", "useEffect", "useMemo"], answer: "useRef" },
    { question: "Which gesture handler library is widely used?", options: ["react-native-gesture-handler", "react-native-gestures", "react-gestures", "gesture-react-native"], answer: "react-native-gesture-handler" },
    { question: "Which component handles safe scrolling insets?", options: ["<KeyboardAvoidingView>", "<ScrollView>", "<FlatList>", "<View>"], answer: "<KeyboardAvoidingView>" },
    { question: "Which library is used for animations?", options: ["react-native-reanimated", "React Motion", "GSAP", "Anime.js"], answer: "react-native-reanimated" },
    { question: "Which method updates state based on previous state?", options: ["setState(prev => ...)", "setState()", "useState()", "useReducer()"], answer: "setState(prev => ...)" },
    { question: "Which method detects device orientation?", options: ["Dimensions.get('window')", "Screen.getOrientation()", "Device.getOrientation()", "Window.getOrientation()"], answer: "Dimensions.get('window')" },
    { question: "Which library provides vector icons?", options: ["react-native-vector-icons", "react-icons", "react-native-icons", "vector-icons"], answer: "react-native-vector-icons" },
    { question: "Which hook manages global state effectively?", options: ["useContext", "useState", "useReducer", "Redux"], answer: "useContext" },
    { question: "Which component wraps gestures for animated scroll?", options: ["Animated.ScrollView", "ScrollView", "FlatList", "View"], answer: "Animated.ScrollView" },
    { question: "Which CLI command updates React Native version?", options: ["npx react-native upgrade", "npm update react-native", "yarn upgrade react-native", "react-native update"], answer: "npx react-native upgrade" },
    { question: "Which component handles multiple screen stacks?", options: ["Stack.Navigator", "Tab.Navigator", "Drawer.Navigator", "View"], answer: "Stack.Navigator" },
  ],

  advanced: [
    { question: "Which method improves FlatList rendering performance?", options: ["keyExtractor", "getItemLayout", "initialNumToRender", "All of the above"], answer: "All of the above" },
    { question: "Which hook handles animations declaratively?", options: ["useAnimatedStyle", "useState", "useEffect", "useRef"], answer: "useAnimatedStyle" },
    { question: "Which library enables native module integration?", options: ["react-native-bridge", "react-native-native", "react-native-modules", "react-native-link"], answer: "react-native-bridge" },
    { question: "Which method manages offline storage?", options: ["AsyncStorage", "Redux Persist", "MMKV Storage", "All of the above"], answer: "All of the above" },
    { question: "Which hook animates values over time?", options: ["useSharedValue", "useState", "useEffect", "useRef"], answer: "useSharedValue" },
    { question: "Which component handles gestures in complex animations?", options: ["PanGestureHandler", "TouchableOpacity", "Button", "View"], answer: "PanGestureHandler" },
    { question: "Which method measures component layout?", options: ["onLayout", "measure()", "getBoundingClientRect()", "Dimensions"], answer: "onLayout" },
    { question: "Which hook handles gesture-based animations?", options: ["useAnimatedGestureHandler", "useState", "useEffect", "useRef"], answer: "useAnimatedGestureHandler" },
    { question: "Which prop optimizes list rendering with complex items?", options: ["windowSize", "initialNumToRender", "removeClippedSubviews", "All of the above"], answer: "All of the above" },
    { question: "Which library helps with performance profiling?", options: ["react-native-performance", "React Profiler", "React DevTools", "All of the above"], answer: "All of the above" },
    { question: "Which animation type is native-driven?", options: ["useNativeDriver", "useJSDriver", "useAnimatedDriver", "useDriver"], answer: "useNativeDriver" },
    { question: "Which method accesses native modules?", options: ["NativeModules", "NativeAPI", "ReactNativeModules", "ModulesNative"], answer: "NativeModules" },
    { question: "Which method debounces touch events?", options: ["InteractionManager.runAfterInteractions", "setTimeout", "requestAnimationFrame", "useDebounce"], answer: "InteractionManager.runAfterInteractions" },
    { question: "Which prop handles accessibility roles?", options: ["accessibilityRole", "role", "ariaRole", "accessRole"], answer: "accessibilityRole" },
    { question: "Which library provides gesture-based animations?", options: ["react-native-reanimated", "react-spring", "framer-motion", "anime.js"], answer: "react-native-reanimated" },
    { question: "Which hook measures device orientation changes?", options: ["useDimensions", "useState", "useEffect", "useOrientation"], answer: "useDimensions" },
    { question: "Which component is optimized for horizontal scrolling?", options: ["FlatList horizontal", "ScrollView horizontal", "View horizontal", "SectionList horizontal"], answer: "FlatList horizontal" },
    { question: "Which library provides high-performance navigation?", options: ["react-navigation", "react-native-navigation", "react-router-native", "react-native-router"], answer: "react-native-navigation" },
    { question: "Which method updates state asynchronously?", options: ["setState()", "useState()", "forceUpdate()", "updateState()"], answer: "setState()" },
    { question: "Which method batches multiple state updates?", options: ["unstable_batchedUpdates", "setState()", "useState()", "forceUpdate()"], answer: "unstable_batchedUpdates" },
  ],
};
export default function ReactNativeQuiz () {
  const [level, setLevel] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  // Ensure questions is always an array
  const questions = level && quizReactNative[level.toLowerCase()] ? quizReactNative[level.toLowerCase()] : [];

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
                🚀 ReactNative Quiz
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