import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const quizMaterialUI = {
  beginner: [
    { question: "Which package is used to install Material UI in React?", options: ["@mui/material", "material-ui", "mui-react", "react-material"], answer: "@mui/material" },
    { question: "Which component is used for buttons in Material UI?", options: ["Button", "Btn", "MUIButton", "Clickable"], answer: "Button" },
    { question: "Which component is used for input fields?", options: ["TextField", "Input", "FormInput", "Field"], answer: "TextField" },
    { question: "Which component creates a responsive layout container?", options: ["Container", "Layout", "Box", "GridContainer"], answer: "Container" },
    { question: "Which prop changes the variant of a Button?", options: ["variant", "type", "style", "mode"], answer: "variant" },
    { question: "Which component is used for icons?", options: ["Icon", "SvgIcon", "MaterialIcon", "IconButton"], answer: "Icon" },
    { question: "Which component wraps content with padding and background?", options: ["Paper", "Card", "Box", "Container"], answer: "Paper" },
    { question: "Which component displays card-like content?", options: ["Card", "Paper", "Panel", "Box"], answer: "Card" },
    { question: "Which component is used for headings?", options: ["Typography", "Text", "Heading", "Label"], answer: "Typography" },
    { question: "Which prop sets color for Typography?", options: ["color", "textColor", "fontColor", "variantColor"], answer: "color" },
    { question: "Which component creates an AppBar?", options: ["AppBar", "TopBar", "NavBar", "Header"], answer: "AppBar" },
    { question: "Which component provides a navigation drawer?", options: ["Drawer", "Sidebar", "Menu", "Navigation"], answer: "Drawer" },
    { question: "Which component is used for lists?", options: ["List", "ListView", "MenuList", "ItemList"], answer: "List" },
    { question: "Which component wraps multiple items for spacing?", options: ["Stack", "Box", "Grid", "Paper"], answer: "Stack" },
    { question: "Which prop in Button makes it full width?", options: ["fullWidth", "width='100%'", "block", "expand"], answer: "fullWidth" },
    { question: "Which component is used for checkboxes?", options: ["Checkbox", "Check", "InputCheckbox", "CheckBoxUI"], answer: "Checkbox" },
    { question: "Which component is used for radio buttons?", options: ["Radio", "RadioButton", "RadioUI", "RadioInput"], answer: "Radio" },
    { question: "Which component is used for sliders?", options: ["Slider", "Range", "SliderUI", "Slide"], answer: "Slider" },
    { question: "Which component is used for tooltips?", options: ["Tooltip", "Hint", "Popup", "HoverText"], answer: "Tooltip" },
    { question: "Which component is used to wrap icons inside buttons?", options: ["IconButton", "ButtonIcon", "IconWrapper", "BtnIcon"], answer: "IconButton" },
  ],

  intermediate: [
    { question: "Which component creates responsive grids?", options: ["Grid", "Container", "Box", "Flex"], answer: "Grid" },
    { question: "Which prop controls the spacing between Grid items?", options: ["spacing", "gap", "margin", "padding"], answer: "spacing" },
    { question: "Which prop defines the number of columns in Grid?", options: ["xs, sm, md, lg", "cols", "columns", "gridColumns"], answer: "xs, sm, md, lg" },
    { question: "Which component wraps forms for styling?", options: ["FormControl", "FormWrapper", "FormGroup", "FormBox"], answer: "FormControl" },
    { question: "Which prop in TextField sets the input type?", options: ["type", "inputType", "variant", "fieldType"], answer: "type" },
    { question: "Which component is used to show progress bars?", options: ["LinearProgress", "Progress", "ProgressBar", "Bar"], answer: "LinearProgress" },
    { question: "Which component shows circular loading?", options: ["CircularProgress", "ProgressCircle", "Loader", "Spin"], answer: "CircularProgress" },
    { question: "Which component creates a responsive modal?", options: ["Dialog", "Modal", "Popup", "PopupDialog"], answer: "Dialog" },
    { question: "Which component is used for tabs navigation?", options: ["Tabs", "TabPanel", "TabBar", "TabControl"], answer: "Tabs" },
    { question: "Which prop in Tabs sets the active tab?", options: ["value", "index", "active", "selected"], answer: "value" },
    { question: "Which component provides accordion behavior?", options: ["Accordion", "Collapse", "Expandable", "Toggle"], answer: "Accordion" },
    { question: "Which prop controls Accordion expanded state?", options: ["expanded", "open", "isExpanded", "active"], answer: "expanded" },
    { question: "Which component is used for breadcrumbs?", options: ["Breadcrumbs", "NavTrail", "Trail", "Breadcrumb"], answer: "Breadcrumbs" },
    { question: "Which component provides alerts?", options: ["Alert", "Snackbar", "Toast", "Notification"], answer: "Alert" },
    { question: "Which component displays temporary notifications?", options: ["Snackbar", "Toast", "Alert", "Notification"], answer: "Snackbar" },
    { question: "Which prop sets the variant of Alert?", options: ["severity", "variant", "type", "mode"], answer: "severity" },
    { question: "Which component provides a rating star system?", options: ["Rating", "Stars", "StarRating", "Rate"], answer: "Rating" },
    { question: "Which prop sets max value for Rating?", options: ["max", "value", "total", "count"], answer: "max" },
    { question: "Which prop sets the size of icons in Rating?", options: ["size", "iconSize", "fontSize", "icon"], answer: "size" },
    { question: "Which component creates chips?", options: ["Chip", "Badge", "Label", "Tag"], answer: "Chip" },
  ],

  advanced: [
    { question: "Which component allows for styled component overrides?", options: ["styled()", "makeStyles()", "sx", "theme"], answer: "styled()" },
    { question: "Which hook returns the theme object?", options: ["useTheme", "useStyles", "useMaterial", "themeHook"], answer: "useTheme" },
    { question: "Which prop allows inline styling in Material UI?", options: ["sx", "style", "inline", "css"], answer: "sx" },
    { question: "Which component is used to create a responsive AppBar?", options: ["AppBar", "Toolbar", "Header", "NavBar"], answer: "AppBar" },
    { question: "Which hook manages component state with styles?", options: ["useStyles", "useTheme", "useState", "makeStyles"], answer: "useStyles" },
    { question: "Which prop sets elevation in Paper component?", options: ["elevation", "shadow", "depth", "raise"], answer: "elevation" },
    { question: "Which component handles responsive images?", options: ["ImageList", "ImageListItem", "Avatar", "Box"], answer: "ImageList" },
    { question: "Which component provides a speed dial menu?", options: ["SpeedDial", "Dial", "ActionButton", "Menu"], answer: "SpeedDial" },
    { question: "Which prop sets the direction of Stack?", options: ["direction", "orientation", "stackDir", "align"], answer: "direction" },
    { question: "Which component provides a responsive drawer?", options: ["Drawer", "Sidebar", "NavDrawer", "SideNav"], answer: "Drawer" },
    { question: "Which prop in Drawer controls open/close state?", options: ["open", "visible", "active", "show"], answer: "open" },
    { question: "Which component provides responsive tabs with scrollable behavior?", options: ["Tabs", "ScrollableTabs", "TabPanel", "TabList"], answer: "Tabs" },
    { question: "Which prop in Button sets start icon?", options: ["startIcon", "iconStart", "leadingIcon", "iconLeft"], answer: "startIcon" },
    { question: "Which component is used for stepper navigation?", options: ["Stepper", "ProgressStepper", "StepNav", "Steps"], answer: "Stepper" },
    { question: "Which prop sets orientation in Stepper?", options: ["orientation", "direction", "layout", "axis"], answer: "orientation" },
    { question: "Which component provides popover behavior?", options: ["Popover", "Tooltip", "Dialog", "Modal"], answer: "Popover" },
    { question: "Which component is used for skeleton loading?", options: ["Skeleton", "Loader", "Placeholder", "Shimmer"], answer: "Skeleton" },
    { question: "Which component handles date picking?", options: ["DatePicker", "Calendar", "TimePicker", "DateInput"], answer: "DatePicker" },
    { question: "Which prop in Grid sets spacing between items?", options: ["spacing", "gap", "margin", "padding"], answer: "spacing" },
  ],
};
export default function MaterialUIQuiz () {
  const [level, setLevel] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  // Ensure questions is always an array
  const questions = level && quizMaterialUI[level.toLowerCase()] ? quizMaterialUI[level.toLowerCase()] : [];

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
                🚀 MaterialUI Quiz
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