import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const quizSpringBoot = {
  beginner: [
    { question: "What is Spring Boot?", options: ["A Java framework", "A Spring-based framework to simplify Java apps", "A database", "A web server"], answer: "A Spring-based framework to simplify Java apps" },
    { question: "Which annotation is used to create a Spring Boot application?", options: ["@SpringBootApplication", "@SpringApplication", "@BootApplication", "@SpringApp"], answer: "@SpringBootApplication" },
    { question: "What is the default port of Spring Boot?", options: ["8080", "3000", "8000", "5000"], answer: "8080" },
    { question: "Which file contains Spring Boot configurations?", options: ["application.properties", "config.json", "settings.xml", "config.yaml"], answer: "application.properties" },
    { question: "Which embedded server is default in Spring Boot?", options: ["Tomcat", "Jetty", "Undertow", "Glassfish"], answer: "Tomcat" },
    { question: "Which annotation marks a REST controller?", options: ["@RestController", "@Controller", "@Service", "@Repository"], answer: "@RestController" },
    { question: "Which annotation maps HTTP GET requests?", options: ["@GetMapping", "@PostMapping", "@RequestMapping", "@Mapping"], answer: "@GetMapping" },
    { question: "Which annotation maps HTTP POST requests?", options: ["@PostMapping", "@GetMapping", "@RequestMapping", "@Mapping"], answer: "@PostMapping" },
    { question: "What is Spring Boot starter?", options: ["Pre-configured dependencies", "A server", "Database connection", "Java SDK"], answer: "Pre-configured dependencies" },
    { question: "Which annotation injects dependencies?", options: ["@Autowired", "@Inject", "@Dependency", "@Resource"], answer: "@Autowired" },
    { question: "Which annotation marks a service class?", options: ["@Service", "@Controller", "@Repository", "@Component"], answer: "@Service" },
    { question: "Which annotation marks a repository class?", options: ["@Repository", "@Service", "@Controller", "@Component"], answer: "@Repository" },
    { question: "Which annotation marks a configuration class?", options: ["@Configuration", "@Config", "@Bean", "@Settings"], answer: "@Configuration" },
    { question: "Which annotation creates a Bean?", options: ["@Bean", "@Component", "@Service", "@Repository"], answer: "@Bean" },
    { question: "Spring Boot automatically configures beans based on?", options: ["classpath", "server", "database", "JVM"], answer: "classpath" },
    { question: "Which annotation is used for path variables?", options: ["@PathVariable", "@RequestParam", "@QueryParam", "@RequestBody"], answer: "@PathVariable" },
    { question: "Which annotation is used for request parameters?", options: ["@RequestParam", "@PathVariable", "@RequestBody", "@Param"], answer: "@RequestParam" },
    { question: "Which annotation binds HTTP request body to object?", options: ["@RequestBody", "@RequestParam", "@PathVariable", "@Body"], answer: "@RequestBody" },
    { question: "Which annotation handles exceptions globally?", options: ["@ControllerAdvice", "@ExceptionHandler", "@RestController", "@Service"], answer: "@ControllerAdvice" },
    { question: "Which command runs a Spring Boot application?", options: ["mvn spring-boot:run", "mvn run", "java -jar app.jar", "gradle bootRun"], answer: "mvn spring-boot:run" },
  ],

  intermediate: [
    { question: "Which annotation maps HTTP PUT requests?", options: ["@PutMapping", "@PostMapping", "@GetMapping", "@RequestMapping"], answer: "@PutMapping" },
    { question: "Which annotation maps HTTP DELETE requests?", options: ["@DeleteMapping", "@PostMapping", "@GetMapping", "@RequestMapping"], answer: "@DeleteMapping" },
    { question: "Which file can be used instead of application.properties?", options: ["application.yml", "config.json", "settings.xml", "bootstrap.properties"], answer: "application.yml" },
    { question: "Which Spring Boot feature reduces boilerplate code?", options: ["Auto-Configuration", "Dependency Injection", "Aspect Oriented Programming", "MVC"], answer: "Auto-Configuration" },
    { question: "Which dependency is used for Spring Data JPA?", options: ["spring-boot-starter-data-jpa", "spring-boot-starter-web", "spring-boot-starter-security", "spring-boot-starter-test"], answer: "spring-boot-starter-data-jpa" },
    { question: "Which annotation defines a Spring Boot main method?", options: ["@SpringBootApplication", "@SpringBootMain", "@MainApplication", "@BootApp"], answer: "@SpringBootApplication" },
    { question: "Which annotation is used for scheduled tasks?", options: ["@Scheduled", "@Task", "@Cron", "@Timing"], answer: "@Scheduled" },
    { question: "Which annotation enables scheduling in Spring Boot?", options: ["@EnableScheduling", "@Scheduled", "@EnableTask", "@Task"], answer: "@EnableScheduling" },
    { question: "Which annotation is used to handle custom exceptions?", options: ["@ExceptionHandler", "@ControllerAdvice", "@RestController", "@Service"], answer: "@ExceptionHandler" },
    { question: "Which method returns HTTP status code in ResponseEntity?", options: ["getStatusCode()", "statusCode()", "getStatus()", "status()"], answer: "getStatusCode()" },
    { question: "Which annotation maps multiple HTTP methods?", options: ["@RequestMapping", "@GetMapping", "@PostMapping", "@DeleteMapping"], answer: "@RequestMapping" },
    { question: "Which annotation marks a class as a Spring component?", options: ["@Component", "@Service", "@Repository", "@Controller"], answer: "@Component" },
    { question: "Which Spring Boot module helps with security?", options: ["spring-boot-starter-security", "spring-boot-starter-web", "spring-boot-starter-data-jpa", "spring-boot-starter-test"], answer: "spring-boot-starter-security" },
    { question: "Which annotation enables Spring Boot configuration properties?", options: ["@EnableConfigurationProperties", "@ConfigurationProperties", "@ConfigProperties", "@Properties"], answer: "@EnableConfigurationProperties" },
    { question: "Which method is used to build RESTful responses?", options: ["ResponseEntity.ok()", "Response.ok()", "HttpResponse.build()", "ResponseBuilder.build()"], answer: "ResponseEntity.ok()" },
    { question: "Which annotation maps a controller to a specific path?", options: ["@RequestMapping", "@ControllerMapping", "@PathMapping", "@Route"], answer: "@RequestMapping" },
    { question: "Which annotation enables caching in Spring Boot?", options: ["@EnableCaching", "@Cacheable", "@CacheConfig", "@Cache"], answer: "@EnableCaching" },
    { question: "Which annotation marks a field to be cached?", options: ["@Cacheable", "@CachePut", "@CacheEvict", "@Cache"], answer: "@Cacheable" },
    { question: "Which annotation removes cache entries?", options: ["@CacheEvict", "@Cacheable", "@CachePut", "@CacheRemove"], answer: "@CacheEvict" },
    { question: "Which annotation is used for transactional methods?", options: ["@Transactional", "@Transaction", "@Commit", "@Rollback"], answer: "@Transactional" },
  ],

  advanced: [
    { question: "Which annotation enables Spring Boot actuator?", options: ["@EnableActuator", "@Actuator", "@EnableMonitoring", "@Management"], answer: "@EnableActuator" },
    { question: "Which Spring Boot feature monitors application metrics?", options: ["Actuator", "Admin", "Dashboard", "Metrics"], answer: "Actuator" },
    { question: "Which annotation is used to create a custom Spring Boot starter?", options: ["@SpringBootConfiguration", "@Configuration", "@Component", "@Bean"], answer: "@SpringBootConfiguration" },
    { question: "Which profile is active by default?", options: ["default", "dev", "prod", "test"], answer: "default" },
    { question: "Which annotation loads properties into a bean?", options: ["@ConfigurationProperties", "@PropertySource", "@Value", "@EnableProperties"], answer: "@ConfigurationProperties" },
    { question: "Which annotation is used for REST API versioning?", options: ["@RequestMapping", "@GetMapping", "@Version", "@ApiVersion"], answer: "@RequestMapping" },
    { question: "Which annotation supports asynchronous execution?", options: ["@Async", "@Threaded", "@Concurrent", "@Parallel"], answer: "@Async" },
    { question: "Which annotation enables asynchronous processing?", options: ["@EnableAsync", "@Async", "@EnableThreading", "@AsyncProcessing"], answer: "@EnableAsync" },
    { question: "Which annotation defines a Spring Boot filter?", options: ["@Component", "@Filter", "@WebFilter", "@Bean"], answer: "@Component" },
    { question: "Which method schedules tasks with cron expressions?", options: ["@Scheduled(cron = ...)", "@Cron", "@Task(cron = ...)", "@Timing(cron = ...)"], answer: "@Scheduled(cron = ...)" },
    { question: "Which annotation enables Spring Boot web sockets?", options: ["@EnableWebSocket", "@WebSocket", "@EnableSocket", "@Socket"], answer: "@EnableWebSocket" },
    { question: "Which annotation marks a controller for WebSocket endpoints?", options: ["@ServerEndpoint", "@WebSocketController", "@RestController", "@Controller"], answer: "@ServerEndpoint" },
    { question: "Which annotation handles cross-origin requests?", options: ["@CrossOrigin", "@CORS", "@Origin", "@CorsConfig"], answer: "@CrossOrigin" },
    { question: "Which annotation handles request headers?", options: ["@RequestHeader", "@HeaderParam", "@Headers", "@Header"], answer: "@RequestHeader" },
    { question: "Which annotation handles request cookies?", options: ["@CookieValue", "@RequestCookie", "@CookieParam", "@Cookie"], answer: "@CookieValue" },
    { question: "Which annotation validates method parameters?", options: ["@Valid", "@Validated", "@Validate", "@Check"], answer: "@Valid" },
    { question: "Which annotation enables method-level validation?", options: ["@Validated", "@Valid", "@Check", "@EnableValidation"], answer: "@Validated" },
    { question: "Which annotation handles application events?", options: ["@EventListener", "@ApplicationEvent", "@EventHandler", "@Listener"], answer: "@EventListener" },
    { question: "Which annotation handles asynchronous events?", options: ["@AsyncEventListener", "@EventListener", "@Async", "@EnableAsync"], answer: "@AsyncEventListener" },
    { question: "Which annotation handles error messages globally?", options: ["@ControllerAdvice", "@ExceptionHandler", "@RestController", "@Service"], answer: "@ControllerAdvice" },
  ],
};
export default function SpringBootQuiz () {
  const [level, setLevel] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  // Ensure questions is always an array
  const questions = level && quizSpringBoot[level.toLowerCase()] ? quizSpringBoot[level.toLowerCase()] : [];

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
                🚀 SpringBoot Quiz
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