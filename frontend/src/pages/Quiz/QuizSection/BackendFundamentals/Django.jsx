import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const quizDjango = {
  beginner: [
    { question: "What is Django?", options: ["A Python web framework", "A JavaScript library", "A database", "A CSS framework"], answer: "A Python web framework" },
    { question: "Which language is Django written in?", options: ["Python", "Java", "C++", "Ruby"], answer: "Python" },
    { question: "Which command creates a new Django project?", options: ["django-admin startproject", "django startproject", "python startproject", "django createproject"], answer: "django-admin startproject" },
    { question: "Which command creates a new Django app?", options: ["python manage.py startapp", "django-admin startapp", "django createapp", "python startapp"], answer: "python manage.py startapp" },
    { question: "Which file contains URL routing in a Django project?", options: ["urls.py", "views.py", "models.py", "settings.py"], answer: "urls.py" },
    { question: "Which file defines database models?", options: ["models.py", "views.py", "urls.py", "admin.py"], answer: "models.py" },
    { question: "Which file defines views in Django?", options: ["views.py", "models.py", "urls.py", "settings.py"], answer: "views.py" },
    { question: "Which template engine is used by default?", options: ["Django Template Language", "Jinja2", "Mako", "Twig"], answer: "Django Template Language" },
    { question: "Which command runs the Django development server?", options: ["python manage.py runserver", "django runserver", "python runserver", "manage.py startserver"], answer: "python manage.py runserver" },
    { question: "Which Django file contains project settings?", options: ["settings.py", "urls.py", "models.py", "views.py"], answer: "settings.py" },
    { question: "Which command applies database migrations?", options: ["python manage.py migrate", "python manage.py makemigrations", "django migrate", "python migrate"], answer: "python manage.py migrate" },
    { question: "Which command creates migration files?", options: ["python manage.py makemigrations", "python manage.py migrate", "django makemigrations", "python migrate"], answer: "python manage.py makemigrations" },
    { question: "Which decorator makes a view require login?", options: ["@login_required", "@require_login", "@auth_required", "@user_login"], answer: "@login_required" },
    { question: "Which file registers models in admin panel?", options: ["admin.py", "models.py", "views.py", "urls.py"], answer: "admin.py" },
    { question: "Which database is default in Django?", options: ["SQLite", "PostgreSQL", "MySQL", "MongoDB"], answer: "SQLite" },
    { question: "Which ORM is used in Django?", options: ["Django ORM", "SQLAlchemy", "Peewee", "MongoEngine"], answer: "Django ORM" },
    { question: "Which template tag outputs variable content?", options: ["{{ variable }}", "{% variable %}", "{{% variable %}}", "{% var %}"], answer: "{{ variable }}" },
    { question: "Which Django module handles static files?", options: ["django.contrib.staticfiles", "django.static", "staticfiles", "django.staticfiles"], answer: "django.contrib.staticfiles" },
    { question: "Which file handles WSGI configuration?", options: ["wsgi.py", "asgi.py", "urls.py", "settings.py"], answer: "wsgi.py" },
    { question: "Which function renders templates in Django?", options: ["render()", "render_template()", "template_render()", "show()"], answer: "render()" },
  ],

  intermediate: [
    { question: "Which decorator allows a view to handle multiple HTTP methods?", options: ["@require_http_methods", "@http_methods", "@allow_methods", "@methods"], answer: "@require_http_methods" },
    { question: "Which setting defines allowed hosts?", options: ["ALLOWED_HOSTS", "HOSTS", "DEBUG_HOSTS", "PERMITTED_HOSTS"], answer: "ALLOWED_HOSTS" },
    { question: "Which Django module handles authentication?", options: ["django.contrib.auth", "django.auth", "django.authentication", "auth"], answer: "django.contrib.auth" },
    { question: "Which annotation defines a custom admin action?", options: ["@admin.action", "@admin_action", "@action", "@register_action"], answer: "@admin.action" },
    { question: "Which method retrieves all objects from a model?", options: ["Model.objects.all()", "Model.get_all()", "Model.query()", "Model.all()"], answer: "Model.objects.all()" },
    { question: "Which method retrieves a single object by primary key?", options: ["Model.objects.get(pk=...)", "Model.get(pk=...)", "Model.objects.find(pk=...)", "Model.find(pk=...)"], answer: "Model.objects.get(pk=...)" },
    { question: "Which annotation marks a model field as unique?", options: ["unique=True", "unique_field=True", "@unique", "primary_key=True"], answer: "unique=True" },
    { question: "Which Django setting enables debug mode?", options: ["DEBUG = True", "DEBUG_MODE = True", "IS_DEBUG = True", "DEBUG_ON = True"], answer: "DEBUG = True" },
    { question: "Which middleware handles sessions?", options: ["django.contrib.sessions.middleware.SessionMiddleware", "SessionMiddleware", "django.sessions.middleware", "django.middleware.session"], answer: "django.contrib.sessions.middleware.SessionMiddleware" },
    { question: "Which Django model field stores email?", options: ["EmailField", "CharField", "TextField", "EmailInput"], answer: "EmailField" },
    { question: "Which function reverses URLs by name?", options: ["reverse()", "url_reverse()", "reverse_url()", "get_url()"], answer: "reverse()" },
    { question: "Which annotation registers a custom template filter?", options: ["@register.filter", "@filter.register", "@template.filter", "@register_template"], answer: "@register.filter" },
    { question: "Which annotation registers a custom template tag?", options: ["@register.simple_tag", "@tag.register", "@register.tag", "@simple_tag"], answer: "@register.simple_tag" },
    { question: "Which setting defines the time zone?", options: ["TIME_ZONE", "ZONE", "TIME", "TIMEZONE"], answer: "TIME_ZONE" },
    { question: "Which method filters querysets?", options: ["Model.objects.filter()", "Model.filter()", "Model.objects.where()", "Model.where()"], answer: "Model.objects.filter()" },
    { question: "Which Django module is used for forms?", options: ["django.forms", "django.form", "django.forms.models", "django.forms.widgets"], answer: "django.forms" },
    { question: "Which annotation marks a model method as callable from admin?", options: ["@admin.display", "@admin.method", "@display", "@callable"], answer: "@admin.display" },
    { question: "Which class is used for model forms?", options: ["forms.ModelForm", "forms.Form", "forms.Model", "forms.BaseForm"], answer: "forms.ModelForm" },
    { question: "Which class is used for standard forms?", options: ["forms.Form", "forms.ModelForm", "forms.BaseForm", "forms.StandardForm"], answer: "forms.Form" },
    { question: "Which setting defines static files URL?", options: ["STATIC_URL", "STATICFILES_URL", "URL_STATIC", "STATIC_PATH"], answer: "STATIC_URL" },
  ],

  advanced: [
    { question: "Which command starts a Django shell?", options: ["python manage.py shell", "django shell", "python shell", "manage.py shell"], answer: "python manage.py shell" },
    { question: "Which annotation sets database constraints on model fields?", options: ["constraints=[...]", "validators=[...]", "@constraint", "@db_constraint"], answer: "constraints=[...]" },
    { question: "Which annotation ensures a field is validated?", options: ["validators=[...]", "validations=[...]", "@validate", "@check"], answer: "validators=[...]" },
    { question: "Which method prefetches related objects?", options: ["prefetch_related()", "select_related()", "related_objects()", "fetch_related()"], answer: "prefetch_related()" },
    { question: "Which method optimizes foreign key lookups?", options: ["select_related()", "prefetch_related()", "foreign_key()", "optimize_fk()"], answer: "select_related()" },
    { question: "Which Django module handles caching?", options: ["django.core.cache", "django.cache", "django.caching", "django.core.caching"], answer: "django.core.cache" },
    { question: "Which decorator caches views?", options: ["@cache_page", "@cached_view", "@view_cache", "@cache"], answer: "@cache_page" },
    { question: "Which annotation defines a custom management command?", options: ["BaseCommand", "Command", "@command", "@management"], answer: "BaseCommand" },
    { question: "Which class handles asynchronous views?", options: ["AsyncView", "View", "AsyncHandler", "AsyncController"], answer: "AsyncView" },
    { question: "Which Django class handles WebSocket connections?", options: ["channels.consumer.AsyncConsumer", "WebSocketHandler", "AsyncWebSocket", "DjangoWebSocket"], answer: "channels.consumer.AsyncConsumer" },
    { question: "Which decorator validates CSRF tokens?", options: ["@csrf_protect", "@csrf", "@csrf_token", "@protect_csrf"], answer: "@csrf_protect" },
    { question: "Which decorator exempts views from CSRF?", options: ["@csrf_exempt", "@csrf_skip", "@csrf_ignore", "@csrf_off"], answer: "@csrf_exempt" },
    { question: "Which annotation enables signals?", options: ["@receiver", "@signal", "@connect", "@listen"], answer: "@receiver" },
    { question: "Which Django setting configures logging?", options: ["LOGGING", "LOGGER", "LOG_SETTINGS", "LOG_CONFIG"], answer: "LOGGING" },
    { question: "Which module handles database migrations?", options: ["django.db.migrations", "django.migrations", "django.db.migrate", "django.migrate"], answer: "django.db.migrations" },
    { question: "Which method rolls back transactions?", options: ["rollback()", "transaction.rollback()", "db.rollback()", "reset_transaction()"], answer: "rollback()" },
    { question: "Which module handles signals?", options: ["django.dispatch", "django.signals", "django.events", "django.notify"], answer: "django.dispatch" },
    { question: "Which annotation marks a method as a post-save signal?", options: ["@receiver(post_save, sender=Model)", "@post_save", "@signal.postsave", "@save_receiver"], answer: "@receiver(post_save, sender=Model)" },
    { question: "Which annotation marks a method as a pre-save signal?", options: ["@receiver(pre_save, sender=Model)", "@pre_save", "@signal.presave", "@save_receiver"], answer: "@receiver(pre_save, sender=Model)" },
    { question: "Which setting defines database routers?", options: ["DATABASE_ROUTERS", "DB_ROUTERS", "ROUTER", "DATABASE_ROUTE"], answer: "DATABASE_ROUTERS" },
  ],
};
export default function DjangoQuiz () {
  const [level, setLevel] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  // Ensure questions is always an array
  const questions = level && quizDjango[level.toLowerCase()] ? quizDjango[level.toLowerCase()] : [];

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
                🚀 Django Quiz
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