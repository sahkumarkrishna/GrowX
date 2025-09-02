import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const quizDocker = {
  beginner: [
    { question: "What is Docker primarily used for?", options: ["Containerization", "Database management", "Version control", "Web hosting"], answer: "Containerization" },
    { question: "Which command lists running Docker containers?", options: ["docker ps", "docker ls", "docker list", "docker run"], answer: "docker ps" },
    { question: "Which file is used to define Docker images?", options: ["Dockerfile", "docker-compose.yml", "config.json", "docker.txt"], answer: "Dockerfile" },
    { question: "Which command builds a Docker image?", options: ["docker build", "docker create", "docker run", "docker start"], answer: "docker build" },
    { question: "Which command runs a Docker container?", options: ["docker run", "docker build", "docker start", "docker init"], answer: "docker run" },
    { question: "Which command lists all Docker images?", options: ["docker images", "docker list", "docker ps", "docker show"], answer: "docker images" },
    { question: "Which command stops a running container?", options: ["docker stop", "docker kill", "docker pause", "docker end"], answer: "docker stop" },
    { question: "Which command removes a container?", options: ["docker rm", "docker rmi", "docker delete", "docker remove-image"], answer: "docker rm" },
    { question: "Which command removes an image?", options: ["docker rmi", "docker rm", "docker delete", "docker remove"], answer: "docker rmi" },
    { question: "Docker containers are based on?", options: ["Images", "Repositories", "Branches", "Files"], answer: "Images" },
    { question: "Which command shows Docker version?", options: ["docker --version", "docker version", "docker info", "docker -v"], answer: "docker --version" },
    { question: "Which command shows container logs?", options: ["docker logs", "docker info", "docker ps", "docker show"], answer: "docker logs" },
    { question: "Docker Hub is used for?", options: ["Hosting Docker images", "Storing databases", "Version control", "Running containers"], answer: "Hosting Docker images" },
    { question: "Which command removes all stopped containers?", options: ["docker container prune", "docker rm -a", "docker clean", "docker purge"], answer: "docker container prune" },
    { question: "Which command pauses a running container?", options: ["docker pause", "docker stop", "docker wait", "docker freeze"], answer: "docker pause" },
    { question: "Which command resumes a paused container?", options: ["docker unpause", "docker start", "docker resume", "docker continue"], answer: "docker unpause" },
    { question: "Which command shows detailed Docker info?", options: ["docker info", "docker inspect", "docker show", "docker details"], answer: "docker info" },
    { question: "Docker uses which technology to isolate applications?", options: ["Containers", "VMs", "Repositories", "Branches"], answer: "Containers" },
    { question: "Which command lists all containers (running and stopped)?", options: ["docker ps -a", "docker ls -a", "docker list -a", "docker show -a"], answer: "docker ps -a" },
    { question: "Which command renames a container?", options: ["docker rename", "docker mv", "docker tag", "docker modify"], answer: "docker rename" },
  ],

  intermediate: [
    { question: "Which command runs a container in detached mode?", options: ["docker run -d", "docker run -it", "docker start -d", "docker detach"], answer: "docker run -d" },
    { question: "Which command mounts a host directory into a container?", options: ["docker run -v", "docker mount", "docker link", "docker attach"], answer: "docker run -v" },
    { question: "Which command executes a command in a running container?", options: ["docker exec", "docker run", "docker attach", "docker start"], answer: "docker exec" },
    { question: "Which command shows container resource usage?", options: ["docker stats", "docker top", "docker info", "docker inspect"], answer: "docker stats" },
    { question: "Which command lists all networks?", options: ["docker network ls", "docker net list", "docker networks", "docker info"], answer: "docker network ls" },
    { question: "Which command creates a Docker volume?", options: ["docker volume create", "docker volume new", "docker create volume", "docker vol add"], answer: "docker volume create" },
    { question: "Which command lists volumes?", options: ["docker volume ls", "docker vol list", "docker volumes", "docker info"], answer: "docker volume ls" },
    { question: "Which command removes a Docker network?", options: ["docker network rm", "docker network delete", "docker net rm", "docker remove network"], answer: "docker network rm" },
    { question: "Which command inspects container configuration?", options: ["docker inspect", "docker info", "docker config", "docker details"], answer: "docker inspect" },
    { question: "Which command tags an image?", options: ["docker tag", "docker label", "docker rename", "docker mark"], answer: "docker tag" },
    { question: "Which command pushes an image to Docker Hub?", options: ["docker push", "docker upload", "docker send", "docker publish"], answer: "docker push" },
    { question: "Which command pulls an image from Docker Hub?", options: ["docker pull", "docker fetch", "docker download", "docker get"], answer: "docker pull" },
    { question: "Which file defines multi-container Docker applications?", options: ["docker-compose.yml", "Dockerfile", "docker.yml", "compose.json"], answer: "docker-compose.yml" },
    { question: "Which command starts services defined in docker-compose.yml?", options: ["docker-compose up", "docker-compose start", "docker start", "docker-compose run"], answer: "docker-compose up" },
    { question: "Which command stops services in docker-compose?", options: ["docker-compose down", "docker-compose stop", "docker stop", "docker-compose halt"], answer: "docker-compose down" },
    { question: "Which command shows running services in docker-compose?", options: ["docker-compose ps", "docker-compose status", "docker ps", "docker service ls"], answer: "docker-compose ps" },
    { question: "Which command removes unused images and containers?", options: ["docker system prune", "docker clean", "docker remove unused", "docker prune all"], answer: "docker system prune" },
    { question: "Which command sets environment variables for a container?", options: ["docker run -e", "docker set-env", "docker env", "docker config"], answer: "docker run -e" },
    { question: "Which command limits container memory usage?", options: ["docker run -m", "docker limit memory", "docker mem", "docker run --memory-limit"], answer: "docker run -m" },
    { question: "Which command shows container top processes?", options: ["docker top", "docker ps", "docker stats", "docker exec"], answer: "docker top" },
  ],

  advanced: [
    { question: "Which Docker storage driver is commonly used on Linux?", options: ["overlay2", "aufs", "devicemapper", "btrfs"], answer: "overlay2" },
    { question: "Which command connects a container to a network?", options: ["docker network connect", "docker network attach", "docker attach network", "docker connect network"], answer: "docker network connect" },
    { question: "Which command creates a service in Docker Swarm?", options: ["docker service create", "docker swarm init", "docker run -d", "docker stack deploy"], answer: "docker service create" },
    { question: "Which command scales a Docker service?", options: ["docker service scale", "docker scale", "docker service update", "docker swarm scale"], answer: "docker service scale" },
    { question: "Which command removes all unused networks?", options: ["docker network prune", "docker prune network", "docker remove network", "docker network clean"], answer: "docker network prune" },
    { question: "Which command limits CPU usage for a container?", options: ["docker run --cpus", "docker run -cpu", "docker limit cpu", "docker set-cpu"], answer: "docker run --cpus" },
    { question: "Which command deploys a stack in Docker Swarm?", options: ["docker stack deploy", "docker service deploy", "docker swarm deploy", "docker stack up"], answer: "docker stack deploy" },
    { question: "Which command updates a running service?", options: ["docker service update", "docker update service", "docker service restart", "docker service refresh"], answer: "docker service update" },
    { question: "Which command shows Docker Swarm nodes?", options: ["docker node ls", "docker swarm nodes", "docker list nodes", "docker node list"], answer: "docker node ls" },
    { question: "Which command removes a volume?", options: ["docker volume rm", "docker volume delete", "docker remove volume", "docker vol rm"], answer: "docker volume rm" },
    { question: "Which command inspects an image?", options: ["docker image inspect", "docker inspect image", "docker image info", "docker info"], answer: "docker image inspect" },
    { question: "Which command shows Docker events in real-time?", options: ["docker events", "docker logs -f", "docker monitor", "docker info -f"], answer: "docker events" },
    { question: "Which command runs a container with a specific hostname?", options: ["docker run --hostname", "docker run -h", "docker set-hostname", "docker hostname"], answer: "docker run --hostname" },
    { question: "Which command commits container changes to an image?", options: ["docker commit", "docker save", "docker export", "docker build"], answer: "docker commit" },
    { question: "Which command imports an image from a tarball?", options: ["docker import", "docker load", "docker pull", "docker add"], answer: "docker import" },
    { question: "Which command saves an image to a tarball?", options: ["docker save", "docker export", "docker backup", "docker tar"], answer: "docker save" },
    { question: "Which command shows container mount points?", options: ["docker inspect -f '{{ .Mounts }}'", "docker mounts", "docker info", "docker volumes ls"], answer: "docker inspect -f '{{ .Mounts }}'" },
    { question: "Which command limits container swap memory?", options: ["docker run --memory-swap", "docker run -s", "docker limit swap", "docker swap-limit"], answer: "docker run --memory-swap" },
    { question: "Which command updates container resource constraints?", options: ["docker update", "docker modify", "docker container update", "docker set"], answer: "docker update" },
    { question: "Which command deploys a stack using a compose file?", options: ["docker stack deploy -c", "docker-compose up", "docker stack create", "docker deploy stack"], answer: "docker stack deploy -c" },
  ],
};
export default function DockerQuiz () {
  const [level, setLevel] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  // Ensure questions is always an array
  const questions = level && quizDocker[level.toLowerCase()] ? quizDocker[level.toLowerCase()] : [];

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
                🚀 Docker Quiz
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