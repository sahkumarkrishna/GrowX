import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const quizHtml = {
    beginner: [
        { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "High Text Markup Language"], answer: "Hyper Text Markup Language" },
        { question: "Which tag is used to create a hyperlink?", options: ["<a>", "<link>", "<href>", "<hyperlink>"], answer: "<a>" },
        { question: "Which tag is used for inserting an image?", options: ["<img>", "<image>", "<pic>", "<src>"], answer: "<img>" },
        { question: "What is the correct HTML element for the largest heading?", options: ["<h6>", "<heading>", "<h1>", "<head>"], answer: "<h1>" },
        { question: "Which attribute is used to specify an alternate text for an image?", options: ["alt", "title", "src", "longdesc"], answer: "alt" },
        { question: "Which tag is used to create a paragraph?", options: ["<p>", "<para>", "<text>", "<paragraph>"], answer: "<p>" },
        { question: "Which tag is used to define a list item?", options: ["<li>", "<ul>", "<ol>", "<list>"], answer: "<li>" },
        { question: "Which tag is used for an unordered list?", options: ["<ul>", "<ol>", "<li>", "<list>"], answer: "<ul>" },
        { question: "Which tag is used for an ordered list?", options: ["<ol>", "<ul>", "<li>", "<list>"], answer: "<ol>" },
        { question: "Which tag is used to define a table row?", options: ["<tr>", "<td>", "<th>", "<table>"], answer: "<tr>" },
        { question: "Which tag defines a table header cell?", options: ["<th>", "<td>", "<tr>", "<thead>"], answer: "<th>" },
        { question: "Which tag defines a standard table cell?", options: ["<td>", "<th>", "<tr>", "<table>"], answer: "<td>" },
        { question: "Which attribute specifies the URL of a link?", options: ["href", "src", "link", "url"], answer: "href" },
        { question: "Which tag is used for bold text?", options: ["<b>", "<strong>", "<bold>", "<em>"], answer: "<b>" },
        { question: "Which tag is used for italic text?", options: ["<i>", "<italic>", "<em>", "<it>"], answer: "<i>" },
        { question: "Which tag is used to create a line break?", options: ["<br>", "<lb>", "<break>", "<hr>"], answer: "<br>" },
        { question: "Which tag is used to add a horizontal line?", options: ["<hr>", "<line>", "<hl>", "<break>"], answer: "<hr>" },
        { question: "Which element is used to define the title of the document?", options: ["<title>", "<head>", "<h1>", "<header>"], answer: "<title>" },
        { question: "Which tag is used to create a form?", options: ["<form>", "<input>", "<fieldset>", "<label>"], answer: "<form>" },
        { question: "Which attribute defines the method of form submission?", options: ["method", "action", "type", "submit"], answer: "method" },
    ],

    intermediate: [
        { question: "Which attribute is used to open a link in a new tab?", options: ["target='_blank'", "href", "rel", "newtab"], answer: "target='_blank'" },
        { question: "Which input type creates a checkbox?", options: ["checkbox", "radio", "text", "button"], answer: "checkbox" },
        { question: "Which input type creates a radio button?", options: ["radio", "checkbox", "text", "button"], answer: "radio" },
        { question: "Which tag is used to define a section in HTML5?", options: ["<section>", "<div>", "<article>", "<main>"], answer: "<section>" },
        { question: "Which tag is used to define navigation links?", options: ["<nav>", "<menu>", "<ul>", "<header>"], answer: "<nav>" },
        { question: "Which tag defines an article in HTML5?", options: ["<article>", "<section>", "<div>", "<aside>"], answer: "<article>" },
        { question: "Which attribute specifies an image path for a link?", options: ["src", "href", "link", "path"], answer: "src" },
        { question: "Which tag is used for HTML5 audio?", options: ["<audio>", "<sound>", "<music>", "<media>"], answer: "<audio>" },
        { question: "Which tag is used for HTML5 video?", options: ["<video>", "<movie>", "<media>", "<clip>"], answer: "<video>" },
        { question: "Which element provides a tooltip when hovered?", options: ["title", "alt", "tooltip", "hover"], answer: "title" },
        { question: "Which tag is used to group related form elements?", options: ["<fieldset>", "<form>", "<group>", "<input>"], answer: "<fieldset>" },
        { question: "Which tag provides a caption for a table?", options: ["<caption>", "<title>", "<th>", "<label>"], answer: "<caption>" },
        { question: "Which input type allows selection of a date?", options: ["date", "datetime", "calendar", "time"], answer: "date" },
        { question: "Which attribute is used to disable an input field?", options: ["disabled", "readonly", "lock", "block"], answer: "disabled" },
        { question: "Which tag is used for HTML5 canvas?", options: ["<canvas>", "<drawing>", "<paint>", "<graphic>"], answer: "<canvas>" },
        { question: "Which input type allows file upload?", options: ["file", "upload", "document", "data"], answer: "file" },
        { question: "Which attribute specifies a placeholder text in input?", options: ["placeholder", "hint", "label", "value"], answer: "placeholder" },
        { question: "Which input type allows password entry?", options: ["password", "text", "hidden", "secure"], answer: "password" },
        { question: "Which tag is used for semantic footer content?", options: ["<footer>", "<bottom>", "<section>", "<aside>"], answer: "<footer>" },
        { question: "Which attribute specifies that a field is required?", options: ["required", "mandatory", "validate", "check"], answer: "required" },
    ],

    advanced: [
        { question: "Which HTML5 attribute enables drag-and-drop?", options: ["draggable", "drag", "drop", "moveable"], answer: "draggable" },
        { question: "Which attribute specifies a custom data attribute?", options: ["data-*", "custom", "attr", "dataset"], answer: "data-*" },
        { question: "Which HTML5 tag is used for search forms?", options: ["<search>", "<form>", "<input>", "<query>"], answer: "<search>" },
        { question: "Which tag is used to embed external content like PDFs?", options: ["<embed>", "<object>", "<iframe>", "<link>"], answer: "<embed>" },
        { question: "Which attribute is used for responsive images?", options: ["srcset", "sizes", "responsive", "media"], answer: "srcset" },
        { question: "Which tag represents the main content of a document?", options: ["<main>", "<body>", "<section>", "<article>"], answer: "<main>" },
        { question: "Which tag is used to define an aside content?", options: ["<aside>", "<section>", "<div>", "<sidebar>"], answer: "<aside>" },
        { question: "Which element is used to display a progress bar?", options: ["<progress>", "<bar>", "<meter>", "<loading>"], answer: "<progress>" },
        { question: "Which HTML5 tag is used to display output from a script?", options: ["<output>", "<result>", "<display>", "<span>"], answer: "<output>" },
        { question: "Which tag is used for marking text that has relevance?", options: ["<mark>", "<highlight>", "<important>", "<strong>"], answer: "<mark>" },
        { question: "Which tag is used to define a details disclosure widget?", options: ["<details>", "<summary>", "<info>", "<dialog>"], answer: "<details>" },
        { question: "Which tag provides a summary for a <details> element?", options: ["<summary>", "<caption>", "<info>", "<title>"], answer: "<summary>" },
        { question: "Which attribute is used for context menus?", options: ["contextmenu", "menu", "popup", "option"], answer: "contextmenu" },
        { question: "Which HTML5 tag allows for time input?", options: ["<time>", "<date>", "<datetime>", "<calendar>"], answer: "<time>" },
        { question: "Which tag is used to define a meter gauge?", options: ["<meter>", "<gauge>", "<progress>", "<measure>"], answer: "<meter>" },
        { question: "Which attribute is used for autofocus?", options: ["autofocus", "focus", "auto", "selected"], answer: "autofocus" },
        { question: "Which tag is used to define a template?", options: ["<template>", "<script>", "<div>", "<section>"], answer: "<template>" },
        { question: "Which attribute specifies the relationship between a link and the current document?", options: ["rel", "href", "link", "type"], answer: "rel" },
        { question: "Which HTML5 element is used for embedding audio controls without plugins?", options: ["<audio>", "<sound>", "<music>", "<media>"], answer: "<audio>" },
        { question: "Which element defines a navigation section for a set of links?", options: ["<nav>", "<menu>", "<ul>", "<section>"], answer: "<nav>" },
        { question: "Which HTML5 tag is used to define a figure with a caption?", options: ["<figure>", "<figcaption>", "<image>", "<div>"], answer: "<figure>" },
    ],
};

export default function HtmlQuiz() {
  const [level, setLevel] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  // Ensure questions is always an array
  const questions = level && quizHtml[level.toLowerCase()] ? quizHtml[level.toLowerCase()] : [];

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
                🚀 HTML Quiz
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