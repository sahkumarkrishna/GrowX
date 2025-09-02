import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const quizGitHub = {
  beginner: [
    { question: "What is GitHub primarily used for?", options: ["Version control", "Graphic design", "Database management", "Hosting websites only"], answer: "Version control" },
    { question: "Which command is used to clone a repository?", options: ["git clone", "git copy", "git pull", "git fetch"], answer: "git clone" },
    { question: "Which file is used to ignore certain files from Git?", options: [".gitignore", "ignore.txt", ".gitexclude", "gitignore.txt"], answer: ".gitignore" },
    { question: "Which command stages changes for commit?", options: ["git add", "git commit", "git push", "git init"], answer: "git add" },
    { question: "Which command commits changes with a message?", options: ["git commit -m", "git add -m", "git push -m", "git merge -m"], answer: "git commit -m" },
    { question: "Which command initializes a new Git repository?", options: ["git init", "git start", "git create", "git new"], answer: "git init" },
    { question: "What is the default branch name in GitHub?", options: ["main", "master", "primary", "default"], answer: "main" },
    { question: "Which command shows the current status of a repository?", options: ["git status", "git show", "git log", "git branch"], answer: "git status" },
    { question: "Which command lists all branches?", options: ["git branch", "git list", "git show", "git log"], answer: "git branch" },
    { question: "GitHub is a platform for hosting?", options: ["Git repositories", "Websites only", "Databases", "APIs"], answer: "Git repositories" },
    { question: "Which command updates local repository with remote changes?", options: ["git pull", "git push", "git fetch", "git merge"], answer: "git pull" },
    { question: "Which command uploads local changes to remote?", options: ["git push", "git commit", "git add", "git clone"], answer: "git push" },
    { question: "Which file contains the repository’s history?", options: [".git", ".gitignore", "README.md", "LICENSE"], answer: ".git" },
    { question: "Which service allows collaborative coding on GitHub?", options: ["Pull Requests", "Issues", "Actions", "Pages"], answer: "Pull Requests" },
    { question: "Which file typically contains project information?", options: ["README.md", "LICENSE", ".gitignore", "CONTRIBUTING.md"], answer: "README.md" },
    { question: "Which command fetches changes from remote without merging?", options: ["git fetch", "git pull", "git merge", "git clone"], answer: "git fetch" },
    { question: "Which command merges branches?", options: ["git merge", "git pull", "git push", "git add"], answer: "git merge" },
    { question: "Which command shows commit history?", options: ["git log", "git status", "git show", "git diff"], answer: "git log" },
    { question: "GitHub can be used for?", options: ["Version control, collaboration, and CI/CD", "Only version control", "Only hosting websites", "Only file storage"], answer: "Version control, collaboration, and CI/CD" },
    { question: "Which GitHub feature allows issue tracking?", options: ["Issues", "Projects", "Actions", "Pages"], answer: "Issues" },
  ],

  intermediate: [
    { question: "What does forking a repository do?", options: ["Creates a personal copy", "Deletes original repo", "Merges two repos", "Clones the repo"], answer: "Creates a personal copy" },
    { question: "Which Git command undoes the last commit but keeps changes?", options: ["git reset --soft", "git revert", "git reset --hard", "git checkout"], answer: "git reset --soft" },
    { question: "Which command creates a new branch?", options: ["git branch branch-name", "git create branch-name", "git new branch-name", "git checkout branch-name"], answer: "git branch branch-name" },
    { question: "Which command switches to another branch?", options: ["git checkout branch-name", "git switch branch-name", "git change branch-name", "git merge branch-name"], answer: "git checkout branch-name" },
    { question: "GitHub Actions are used for?", options: ["CI/CD automation", "Version control", "Issue tracking", "Forking"], answer: "CI/CD automation" },
    { question: "Which GitHub feature schedules workflows?", options: ["Actions", "Projects", "Pages", "Security"], answer: "Actions" },
    { question: "Which Git command discards changes in working directory?", options: ["git checkout -- file", "git reset file", "git add file", "git commit file"], answer: "git checkout -- file" },
    { question: "Which GitHub feature helps with project management?", options: ["Projects", "Issues", "Actions", "Pages"], answer: "Projects" },
    { question: "What is a Pull Request?", options: ["Proposing changes to a repository", "Deleting a branch", "Cloning a repo", "Merging a branch automatically"], answer: "Proposing changes to a repository" },
    { question: "Which command shows difference between commits?", options: ["git diff", "git log", "git status", "git show"], answer: "git diff" },
    { question: "Which Git command removes a file from staging?", options: ["git reset HEAD file", "git rm file", "git checkout file", "git add file"], answer: "git reset HEAD file" },
    { question: "Which GitHub feature stores secrets for workflows?", options: ["Secrets", "Actions", "Pages", "Projects"], answer: "Secrets" },
    { question: "Which command discards all local changes?", options: ["git reset --hard", "git reset --soft", "git checkout", "git revert"], answer: "git reset --hard" },
    { question: "Which GitHub feature allows automated code review?", options: ["Actions", "Issues", "Projects", "Pages"], answer: "Actions" },
    { question: "Which command deletes a branch locally?", options: ["git branch -d branch-name", "git branch -r branch-name", "git delete branch-name", "git remove branch-name"], answer: "git branch -d branch-name" },
    { question: "Which GitHub feature protects main branch from direct pushes?", options: ["Branch Protection Rules", "Actions", "Pages", "Projects"], answer: "Branch Protection Rules" },
    { question: "Which command renames a local branch?", options: ["git branch -m old new", "git rename old new", "git checkout -b new", "git move old new"], answer: "git branch -m old new" },
    { question: "Which command sets upstream branch for push?", options: ["git push --set-upstream origin branch", "git push origin branch", "git branch --set-upstream", "git remote add origin"], answer: "git push --set-upstream origin branch" },
    { question: "GitHub Pages can host which type of site?", options: ["Static", "Dynamic", "Serverless APIs", "Database"], answer: "Static" },
    { question: "Which Git command discards untracked files?", options: ["git clean -f", "git reset", "git checkout", "git rm"], answer: "git clean -f" },
  ],

  advanced: [
    { question: "Which Git command reverts a commit without changing history?", options: ["git revert", "git reset", "git checkout", "git commit --amend"], answer: "git revert" },
    { question: "Which Git command rewrites commit history?", options: ["git rebase", "git merge", "git cherry-pick", "git reset"], answer: "git rebase" },
    { question: "Which GitHub feature scans repositories for vulnerabilities?", options: ["Security", "Actions", "Projects", "Pages"], answer: "Security" },
    { question: "Which Git command applies changes from another branch?", options: ["git cherry-pick", "git merge", "git rebase", "git pull"], answer: "git cherry-pick" },
    { question: "Which GitHub feature allows dependency updates automatically?", options: ["Dependabot", "Actions", "Pages", "Projects"], answer: "Dependabot" },
    { question: "Which command stashes changes temporarily?", options: ["git stash", "git reset", "git commit", "git checkout"], answer: "git stash" },
    { question: "Which command applies stashed changes?", options: ["git stash apply", "git stash pop", "git stash show", "git stash drop"], answer: "git stash apply" },
    { question: "Which command rebases current branch onto another branch?", options: ["git rebase branch", "git merge branch", "git cherry-pick branch", "git reset branch"], answer: "git rebase branch" },
    { question: "Which GitHub feature allows workflow for CI/CD?", options: ["Actions", "Projects", "Pages", "Security"], answer: "Actions" },
    { question: "Which Git command sets configuration globally?", options: ["git config --global", "git config --local", "git config --system", "git config --file"], answer: "git config --global" },
    { question: "Which GitHub feature enables code scanning?", options: ["Security", "Actions", "Projects", "Pages"], answer: "Security" },
    { question: "Which Git command merges with no fast-forward?", options: ["git merge --no-ff", "git merge --ff", "git rebase", "git cherry-pick"], answer: "git merge --no-ff" },
    { question: "Which command rewrites the last commit message?", options: ["git commit --amend", "git commit --reset", "git commit --edit", "git commit --redo"], answer: "git commit --amend" },
    { question: "Which Git command removes a remote?", options: ["git remote remove origin", "git remote delete origin", "git remote rm origin", "All of the above"], answer: "All of the above" },
    { question: "GitHub Actions workflows are written in?", options: ["YAML", "JSON", "XML", "Markdown"], answer: "YAML" },
    { question: "Which Git command shows remote URLs?", options: ["git remote -v", "git remote show", "git remote list", "git remote url"], answer: "git remote -v" },
    { question: "Which GitHub feature allows self-hosted runners?", options: ["Actions", "Projects", "Pages", "Security"], answer: "Actions" },
    { question: "Which command discards staged changes but keeps local edits?", options: ["git reset", "git revert", "git checkout", "git stash"], answer: "git reset" },
    { question: "Which Git command prunes deleted remote branches?", options: ["git remote prune origin", "git fetch --prune", "git pull --prune", "git branch -d"], answer: "git remote prune origin" },
    { question: "Which GitHub feature manages code review approvals?", options: ["Branch Protection Rules", "Actions", "Projects", "Pages"], answer: "Branch Protection Rules" },
  ],
};
export default function GitHubQuiz () {
  const [level, setLevel] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  // Ensure questions is always an array
  const questions = level && quizGitHub[level.toLowerCase()] ? quizGitHub[level.toLowerCase()] : [];

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
                🚀 GitHub Quiz
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