import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const quizNodeJS = {
  beginner: [
    { question: "What is Node.js?", options: ["A programming language", "A JavaScript runtime", "A database", "A web browser"], answer: "A JavaScript runtime" },
    { question: "Which module is used to read files in Node.js?", options: ["fs", "http", "path", "os"], answer: "fs" },
    { question: "Which function starts a server in Node.js?", options: ["createServer()", "startServer()", "listen()", "runServer()"], answer: "createServer()" },
    { question: "Which object provides information about the current process?", options: ["process", "system", "os", "env"], answer: "process" },
    { question: "Which module is used to handle URLs?", options: ["url", "path", "querystring", "http"], answer: "url" },
    { question: "Which keyword is used to include modules?", options: ["require", "import", "include", "load"], answer: "require" },
    { question: "Which module provides OS-related utility methods?", options: ["os", "fs", "process", "util"], answer: "os" },
    { question: "Which module handles HTTP requests?", options: ["http", "url", "request", "network"], answer: "http" },
    { question: "Which method is used to write to a file asynchronously?", options: ["fs.writeFile()", "fs.writeSync()", "fs.createFile()", "fs.outputFile()"], answer: "fs.writeFile()" },
    { question: "Which method is used to get environment variables?", options: ["process.env", "env.get()", "process.get()", "system.env"], answer: "process.env" },
    { question: "Which method is used to join path segments?", options: ["path.join()", "path.concat()", "path.combine()", "path.add()"], answer: "path.join()" },
    { question: "Node.js is based on which JavaScript engine?", options: ["V8", "SpiderMonkey", "Chakra", "JavaScriptCore"], answer: "V8" },
    { question: "Which module provides utilities for debugging?", options: ["util", "debug", "fs", "console"], answer: "util" },
    { question: "Which method reads a file synchronously?", options: ["fs.readFileSync()", "fs.read()", "fs.readSyncFile()", "fs.openSync()"], answer: "fs.readFileSync()" },
    { question: "Which method returns the current working directory?", options: ["process.cwd()", "process.dir()", "process.path()", "os.cwd()"], answer: "process.cwd()" },
    { question: "Which method is used to create a new buffer?", options: ["Buffer.from()", "Buffer.new()", "new Buffer()", "Buffer.create()"], answer: "Buffer.from()" },
    { question: "Which module is used for events?", options: ["events", "event", "emitter", "signal"], answer: "events" },
    { question: "Which method emits an event?", options: ["emit()", "trigger()", "fire()", "dispatch()"], answer: "emit()" },
    { question: "Which method adds a listener for an event?", options: ["on()", "addListener()", "listen()", "subscribe()"], answer: "on()" },
    { question: "Which method exits the Node.js process?", options: ["process.exit()", "process.stop()", "process.end()", "exit()"], answer: "process.exit()" },
  ],

  intermediate: [
    { question: "Which module helps handle streams?", options: ["stream", "fs", "buffer", "http"], answer: "stream" },
    { question: "Which method writes data to a writable stream?", options: ["write()", "send()", "push()", "emit()"], answer: "write()" },
    { question: "Which event is emitted when readable stream ends?", options: ["end", "finish", "close", "data"], answer: "end" },
    { question: "Which module is used to create child processes?", options: ["child_process", "cluster", "process", "fork"], answer: "child_process" },
    { question: "Which method spawns a new process?", options: ["spawn()", "fork()", "exec()", "run()"], answer: "spawn()" },
    { question: "Which method executes a shell command in Node.js?", options: ["exec()", "spawn()", "run()", "shell()"], answer: "exec()" },
    { question: "Which module helps to create HTTP clients?", options: ["http", "https", "request", "axios"], answer: "http" },
    { question: "Which method parses query strings?", options: ["querystring.parse()", "url.parse()", "qs.parse()", "request.parse()"], answer: "querystring.parse()" },
    { question: "Which module helps in handling file paths?", options: ["path", "fs", "os", "url"], answer: "path" },
    { question: "Which event indicates that a stream is ready for reading?", options: ["readable", "data", "open", "ready"], answer: "readable" },
    { question: "Which module is used for creating TCP servers?", options: ["net", "http", "tcp", "socket"], answer: "net" },
    { question: "Which method ends a writable stream?", options: ["end()", "finish()", "close()", "done()"], answer: "end()" },
    { question: "Which module provides clustering capabilities?", options: ["cluster", "child_process", "worker_threads", "events"], answer: "cluster" },
    { question: "Which method returns the hostname of the OS?", options: ["os.hostname()", "os.name()", "os.host()", "process.hostname()"], answer: "os.hostname()" },
    { question: "Which module provides cryptographic functionality?", options: ["crypto", "hash", "security", "tls"], answer: "crypto" },
    { question: "Which method creates a hash object?", options: ["crypto.createHash()", "crypto.hash()", "crypto.newHash()", "crypto.makeHash()"], answer: "crypto.createHash()" },
    { question: "Which event is emitted when a child process exits?", options: ["exit", "close", "end", "finish"], answer: "exit" },
    { question: "Which method reads data from a readable stream?", options: ["read()", "pull()", "get()", "fetch()"], answer: "read()" },
    { question: "Which module provides timers?", options: ["timers", "time", "schedule", "clock"], answer: "timers" },
    { question: "Which method executes a function after a delay?", options: ["setTimeout()", "setInterval()", "setImmediate()", "process.nextTick()"], answer: "setTimeout()" },
  ],

  advanced: [
    { question: "Which module is used for worker threads?", options: ["worker_threads", "threads", "child_process", "cluster"], answer: "worker_threads" },
    { question: "Which method posts a message to a worker thread?", options: ["postMessage()", "send()", "emit()", "message()"], answer: "postMessage()" },
    { question: "Which method schedules a callback to run after I/O events?", options: ["setImmediate()", "setTimeout()", "process.nextTick()", "setInterval()"], answer: "setImmediate()" },
    { question: "Which event loop phase handles timers?", options: ["timers", "pending callbacks", "poll", "check"], answer: "timers" },
    { question: "Which module helps manage TLS/SSL?", options: ["tls", "https", "crypto", "net"], answer: "tls" },
    { question: "Which method in crypto generates random bytes?", options: ["crypto.randomBytes()", "crypto.genRandom()", "crypto.createBytes()", "crypto.secureRandom()"], answer: "crypto.randomBytes()" },
    { question: "Which module helps handle URL parsing in Node.js?", options: ["url", "querystring", "path", "http"], answer: "url" },
    { question: "Which module provides HTTP2 support?", options: ["http2", "http", "https", "net"], answer: "http2" },
    { question: "Which module allows accessing performance timings?", options: ["perf_hooks", "performance", "os", "process"], answer: "perf_hooks" },
    { question: "Which method schedules a callback to run before the next event loop?", options: ["process.nextTick()", "setImmediate()", "setTimeout()", "setInterval()"], answer: "process.nextTick()" },
    { question: "Which module provides WebSocket support?", options: ["ws", "net", "socket", "websocket"], answer: "ws" },
    { question: "Which method creates a readable stream from a string or buffer?", options: ["Readable.from()", "fs.createReadStream()", "stream.from()", "Buffer.stream()"], answer: "Readable.from()" },
    { question: "Which method converts a callback-based function to a promise-based one?", options: ["util.promisify()", "util.callback()", "util.promise()", "util.convert()"], answer: "util.promisify()" },
    { question: "Which module allows creating HTTP proxy servers?", options: ["http-proxy", "http", "net", "proxy"], answer: "http-proxy" },
    { question: "Which method terminates a TCP server?", options: ["server.close()", "server.end()", "server.stop()", "server.shutdown()"], answer: "server.close()" },
    { question: "Which module helps manage cluster workers?", options: ["cluster", "worker_threads", "child_process", "threads"], answer: "cluster" },
    { question: "Which module provides performance measurement?", options: ["perf_hooks", "os", "process", "timers"], answer: "perf_hooks" },
    { question: "Which module provides domain-based error handling?", options: ["domain", "error", "events", "exceptions"], answer: "domain" },
    { question: "Which method in streams pauses data flow?", options: ["pause()", "stop()", "halt()", "end()"], answer: "pause()" },
    { question: "Which method resumes paused streams?", options: ["resume()", "start()", "continue()", "play()"], answer: "resume()" },
  ],
};
export default function NodeJSQuiz () {
  const [level, setLevel] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  // Ensure questions is always an array
  const questions = level && quizNodeJS[level.toLowerCase()] ? quizNodeJS[level.toLowerCase()] : [];

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
                🚀 Node.js Quiz
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