import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const quizAngular = {
  beginner: [
    { question: "What is Angular?", options: ["Library", "Framework", "Language", "IDE"], answer: "Framework" },
    { question: "Which language is primarily used in Angular?", options: ["JavaScript", "TypeScript", "Python", "Java"], answer: "TypeScript" },
    { question: "Which directive is used for two-way binding?", options: ["ngModel", "ngBind", "ngClick", "ngFor"], answer: "ngModel" },
    { question: "Which CLI command creates a new Angular project?", options: ["ng new", "ng create", "npm start", "angular new"], answer: "ng new" },
    { question: "Which decorator defines a component?", options: ["@Component", "@NgModule", "@Injectable", "@Directive"], answer: "@Component" },
    { question: "Which file defines root module in Angular?", options: ["app.module.ts", "main.ts", "app.component.ts", "index.ts"], answer: "app.module.ts" },
    { question: "Which directive is used for conditional rendering?", options: ["*ngIf", "*ngFor", "*ngSwitch", "*ngShow"], answer: "*ngIf" },
    { question: "Which directive is used for loops?", options: ["*ngFor", "*ngIf", "*ngSwitch", "*ngModel"], answer: "*ngFor" },
    { question: "Which hook runs after component initialization?", options: ["ngOnInit", "ngAfterViewInit", "ngOnDestroy", "constructor"], answer: "ngOnInit" },
    { question: "Which binding sets attribute dynamically?", options: ["[attr]", "[class]", "[style]", "[value]"], answer: "[attr]" },
    { question: "Which CLI command serves the app locally?", options: ["ng serve", "npm start", "ng start", "angular serve"], answer: "ng serve" },
    { question: "Which module is mandatory for forms?", options: ["FormsModule", "ReactiveFormsModule", "HttpClientModule", "BrowserModule"], answer: "FormsModule" },
    { question: "Which decorator injects services?", options: ["@Injectable", "@Component", "@Directive", "@NgModule"], answer: "@Injectable" },
    { question: "Which pipe formats date values?", options: ["date", "uppercase", "lowercase", "currency"], answer: "date" },
    { question: "Which binding sets event listeners?", options: ["(event)", "[event]", "{event}", "#event"], answer: "(event)" },
    { question: "Which file contains environment configurations?", options: ["environment.ts", "app.module.ts", "main.ts", "index.html"], answer: "environment.ts" },
    { question: "Which CLI command generates a component?", options: ["ng generate component", "ng new component", "ng create component", "ng add component"], answer: "ng generate component" },
    { question: "Which module provides HTTP features?", options: ["HttpClientModule", "BrowserModule", "FormsModule", "ReactiveFormsModule"], answer: "HttpClientModule" },
    { question: "Which property binds HTML content?", options: ["[innerHTML]", "[textContent]", "[value]", "[ngModel]"], answer: "[innerHTML]" },
    { question: "Which operator subscribes to observables?", options: ["subscribe()", "map()", "filter()", "pipe()"], answer: "subscribe()" },
  ],

  intermediate: [
    { question: "Which decorator defines a service?", options: ["@Injectable", "@Component", "@NgModule", "@Directive"], answer: "@Injectable" },
    { question: "Which hook runs after component's view initialized?", options: ["ngAfterViewInit", "ngOnInit", "ngAfterContentInit", "ngDoCheck"], answer: "ngAfterViewInit" },
    { question: "Which directive dynamically adds/removes classes?", options: ["ngClass", "ngStyle", "ngIf", "ngFor"], answer: "ngClass" },
    { question: "Which operator transforms observable data?", options: ["map", "filter", "reduce", "scan"], answer: "map" },
    { question: "Which directive switches templates?", options: ["ngSwitch", "ngIf", "ngFor", "ngTemplate"], answer: "ngSwitch" },
    { question: "Which module is used for reactive forms?", options: ["ReactiveFormsModule", "FormsModule", "HttpClientModule", "BrowserModule"], answer: "ReactiveFormsModule" },
    { question: "Which operator filters observable data?", options: ["filter", "map", "scan", "reduce"], answer: "filter" },
    { question: "Which hook detects changes manually?", options: ["ngDoCheck", "ngOnInit", "ngAfterViewInit", "ngAfterContentChecked"], answer: "ngDoCheck" },
    { question: "Which pipe transforms text to uppercase?", options: ["uppercase", "lowercase", "titlecase", "slice"], answer: "uppercase" },
    { question: "Which service handles route navigation?", options: ["Router", "ActivatedRoute", "Location", "NgZone"], answer: "Router" },
    { question: "Which CLI command generates a service?", options: ["ng generate service", "ng create service", "ng new service", "ng add service"], answer: "ng generate service" },
    { question: "Which decorator injects component dependencies?", options: ["@Inject", "@Component", "@NgModule", "@Directive"], answer: "@Inject" },
    { question: "Which hook runs before view checked?", options: ["ngAfterViewChecked", "ngAfterViewInit", "ngOnInit", "ngDoCheck"], answer: "ngAfterViewChecked" },
    { question: "Which decorator defines routes in a module?", options: ["RouterModule.forRoot()", "NgModule", "Component", "Directive"], answer: "RouterModule.forRoot()" },
    { question: "Which lifecycle hook is called before destroying component?", options: ["ngOnDestroy", "ngOnInit", "ngAfterViewInit", "ngDoCheck"], answer: "ngOnDestroy" },
    { question: "Which decorator allows content projection?", options: ["@ContentChild", "@ViewChild", "@Input", "@Output"], answer: "@ContentChild" },
    { question: "Which method unsubscribes observables automatically?", options: ["async pipe", "subscribe()", "map()", "filter()"], answer: "async pipe" },
    { question: "Which directive conditionally displays templates?", options: ["*ngIf", "*ngFor", "*ngSwitch", "*ngClass"], answer: "*ngIf" },
    { question: "Which decorator allows parent to child communication?", options: ["@Input", "@Output", "@ViewChild", "@ContentChild"], answer: "@Input" },
    { question: "Which directive binds events to DOM elements?", options: ["(event)", "[property]", "#ref", "*ngFor"], answer: "(event)" },
  ],

  advanced: [
    { question: "Which operator combines multiple observables?", options: ["merge", "map", "filter", "switchMap"], answer: "merge" },
    { question: "Which service lazy loads modules?", options: ["LoadChildren", "Router", "HttpClient", "NgModule"], answer: "LoadChildren" },
    { question: "Which decorator accesses child component instance?", options: ["@ViewChild", "@ContentChild", "@Input", "@Output"], answer: "@ViewChild" },
    { question: "Which hook runs after content initialization?", options: ["ngAfterContentInit", "ngOnInit", "ngAfterViewInit", "ngDoCheck"], answer: "ngAfterContentInit" },
    { question: "Which pipe filters arrays dynamically?", options: ["custom pipe", "uppercase", "date", "currency"], answer: "custom pipe" },
    { question: "Which operator cancels previous observable on new emission?", options: ["switchMap", "mergeMap", "concatMap", "exhaustMap"], answer: "switchMap" },
    { question: "Which service manages dependency injection tokens?", options: ["Injector", "NgModule", "Component", "Directive"], answer: "Injector" },
    { question: "Which decorator accesses projected content?", options: ["@ContentChild", "@ViewChild", "@Input", "@Output"], answer: "@ContentChild" },
    { question: "Which strategy optimizes change detection?", options: ["OnPush", "Default", "Manual", "None"], answer: "OnPush" },
    { question: "Which directive renders templates dynamically?", options: ["ngTemplateOutlet", "*ngIf", "*ngFor", "*ngSwitch"], answer: "ngTemplateOutlet" },
    { question: "Which hook runs after every check of projected content?", options: ["ngAfterContentChecked", "ngAfterViewInit", "ngOnInit", "ngDoCheck"], answer: "ngAfterContentChecked" },
    { question: "Which decorator listens to custom events?", options: ["@Output", "@Input", "@ViewChild", "@ContentChild"], answer: "@Output" },
    { question: "Which pipe transforms currency values?", options: ["currency", "date", "uppercase", "slice"], answer: "currency" },
    { question: "Which operator concatenates observables in order?", options: ["concatMap", "mergeMap", "switchMap", "exhaustMap"], answer: "concatMap" },
    { question: "Which decorator accesses multiple children?", options: ["@ViewChildren", "@ViewChild", "@ContentChild", "@Input"], answer: "@ViewChildren" },
    { question: "Which lifecycle hook detects changes manually?", options: ["ngDoCheck", "ngOnInit", "ngAfterViewInit", "ngAfterContentInit"], answer: "ngDoCheck" },
    { question: "Which pipe formats numbers?", options: ["number", "currency", "date", "slice"], answer: "number" },
    { question: "Which service handles route guards?", options: ["CanActivate", "HttpClient", "Router", "NgModule"], answer: "CanActivate" },
    { question: "Which decorator accesses content children arrays?", options: ["@ContentChildren", "@ContentChild", "@ViewChild", "@ViewChildren"], answer: "@ContentChildren" },
    { question: "Which strategy avoids unnecessary DOM updates?", options: ["ChangeDetectionStrategy.OnPush", "Default", "Manual", "None"], answer: "ChangeDetectionStrategy.OnPush" },
  ],
};

export default function AngularQuiz () {
  const [level, setLevel] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  // Ensure questions is always an array
  const questions = level && quizAngular[level.toLowerCase()] ? quizAngular[level.toLowerCase()] : [];

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
                🚀 Angular Quiz
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