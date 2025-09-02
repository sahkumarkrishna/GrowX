import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const quizMongoDB = {
  beginner: [
    { question: "What type of database is MongoDB?", options: ["Relational", "NoSQL", "Graph", "Key-Value"], answer: "NoSQL" },
    { question: "Which language is primarily used to query MongoDB?", options: ["SQL", "JavaScript", "Python", "C++"], answer: "JavaScript" },
    { question: "Which command creates a new database?", options: ["use databaseName", "create database databaseName", "db.create()", "new database"], answer: "use databaseName" },
    { question: "Which command shows current database?", options: ["db", "currentDB()", "show db", "db.current()"], answer: "db" },
    { question: "Which command lists all databases?", options: ["show dbs", "list databases", "db.list()", "dbs"], answer: "show dbs" },
    { question: "Which command creates a collection?", options: ["db.createCollection('name')", "db.collection.create('name')", "db.newCollection('name')", "create.collection('name')"], answer: "db.createCollection('name')" },
    { question: "Which command inserts a single document?", options: ["db.collection.insertOne()", "db.collection.add()", "db.collection.insert()", "db.collection.addOne()"], answer: "db.collection.insertOne()" },
    { question: "Which command inserts multiple documents?", options: ["db.collection.insertMany()", "db.collection.addMany()", "db.collection.bulkInsert()", "db.collection.insertAll()"], answer: "db.collection.insertMany()" },
    { question: "Which operator checks equality?", options: ["$eq", "$equal", "$is", "$match"], answer: "$eq" },
    { question: "Which operator checks inequality?", options: ["$ne", "$neq", "$notEqual", "$neqal"], answer: "$ne" },
    { question: "Which command shows all collections in a DB?", options: ["show collections", "list collections", "db.show()", "db.collections()"], answer: "show collections" },
    { question: "Which data format does MongoDB use?", options: ["BSON", "JSON", "XML", "YAML"], answer: "BSON" },
    { question: "Which command deletes a database?", options: ["db.dropDatabase()", "db.delete()", "drop database", "db.remove()"], answer: "db.dropDatabase()" },
    { question: "Which command finds all documents in a collection?", options: ["db.collection.find()", "db.collection.get()", "db.collection.all()", "db.collection.select()"], answer: "db.collection.find()" },
    { question: "Which command updates a single document?", options: ["db.collection.updateOne()", "db.collection.update()", "db.collection.modify()", "db.collection.updateSingle()"], answer: "db.collection.updateOne()" },
    { question: "Which command updates multiple documents?", options: ["db.collection.updateMany()", "db.collection.updateAll()", "db.collection.update()", "db.collection.modifyMany()"], answer: "db.collection.updateMany()" },
    { question: "Which command deletes a single document?", options: ["db.collection.deleteOne()", "db.collection.remove()", "db.collection.delete()", "db.collection.removeOne()"], answer: "db.collection.deleteOne()" },
    { question: "Which command deletes multiple documents?", options: ["db.collection.deleteMany()", "db.collection.deleteAll()", "db.collection.removeMany()", "db.collection.removeAll()"], answer: "db.collection.deleteMany()" },
    { question: "Which command limits query results?", options: [".limit()", ".slice()", ".top()", ".max()"], answer: ".limit()" },
    { question: "Which command sorts query results?", options: [".sort()", ".order()", ".arrange()", ".sequence()"], answer: ".sort()" },
  ],

  intermediate: [
    { question: "Which MongoDB feature ensures data redundancy?", options: ["Replica Set", "Sharding", "Indexes", "Aggregation"], answer: "Replica Set" },
    { question: "Which MongoDB feature distributes data across servers?", options: ["Sharding", "Replication", "Indexing", "Views"], answer: "Sharding" },
    { question: "Which operator matches documents in aggregation?", options: ["$match", "$filter", "$find", "$where"], answer: "$match" },
    { question: "Which operator groups documents in aggregation?", options: ["$group", "$aggregate", "$collect", "$sum"], answer: "$group" },
    { question: "Which operator projects fields in aggregation?", options: ["$project", "$select", "$fields", "$show"], answer: "$project" },
    { question: "Which operator counts documents in aggregation?", options: ["$count", "$length", "$sum", "$total"], answer: "$count" },
    { question: "Which method creates an index?", options: ["db.collection.createIndex()", "db.collection.index()", "db.collection.addIndex()", "db.collection.setIndex()"], answer: "db.collection.createIndex()" },
    { question: "Which index improves query performance on multiple fields?", options: ["Compound Index", "Single Index", "Text Index", "Hashed Index"], answer: "Compound Index" },
    { question: "Which operator matches values in an array?", options: ["$in", "$array", "$contains", "$any"], answer: "$in" },
    { question: "Which operator matches values not in an array?", options: ["$nin", "$notIn", "$exclude", "$out"], answer: "$nin" },
    { question: "Which command explains query execution?", options: [".explain()", ".plan()", ".queryPlan()", ".execution()"], answer: ".explain()" },
    { question: "Which aggregation stage sorts documents?", options: ["$sort", "$order", "$arrange", "$sequence"], answer: "$sort" },
    { question: "Which aggregation stage limits documents?", options: ["$limit", "$top", "$slice", "$restrict"], answer: "$limit" },
    { question: "Which aggregation stage skips documents?", options: ["$skip", "$ignore", "$pass", "$omit"], answer: "$skip" },
    { question: "Which operator adds computed fields?", options: ["$addFields", "$compute", "$setFields", "$projectFields"], answer: "$addFields" },
    { question: "Which aggregation operator calculates sum?", options: ["$sum", "$add", "$total", "$accumulate"], answer: "$sum" },
    { question: "Which aggregation operator calculates average?", options: ["$avg", "$average", "$mean", "$calculateAvg"], answer: "$avg" },
    { question: "Which aggregation operator finds max value?", options: ["$max", "$highest", "$topValue", "$maxValue"], answer: "$max" },
    { question: "Which aggregation operator finds min value?", options: ["$min", "$lowest", "$minValue", "$bottomValue"], answer: "$min" },
    { question: "Which operator performs logical AND in queries?", options: ["$and", "$all", "$both", "$matchAll"], answer: "$and" },
  ],

  advanced: [
    { question: "Which command performs text search in MongoDB?", options: ["$text", "$search", "$findText", "$textSearch"], answer: "$text" },
    { question: "Which index type supports text search?", options: ["Text Index", "Hashed Index", "Compound Index", "Geo Index"], answer: "Text Index" },
    { question: "Which operator matches regular expressions?", options: ["$regex", "$matchRegex", "$re", "$pattern"], answer: "$regex" },
    { question: "Which method ensures write acknowledgment?", options: ["writeConcern", "acknowledgeWrite", "confirmWrite", "db.write()"], answer: "writeConcern" },
    { question: "Which method ensures read preference in replica sets?", options: ["readPreference", "readConcern", "replicaRead", "readMode"], answer: "readPreference" },
    { question: "Which aggregation stage unwinds arrays?", options: ["$unwind", "$explode", "$flatten", "$arrayExpand"], answer: "$unwind" },
    { question: "Which operator merges documents?", options: ["$merge", "$combine", "$union", "$append"], answer: "$merge" },
    { question: "Which operator writes aggregation results to a collection?", options: ["$out", "$write", "$save", "$store"], answer: "$out" },
    { question: "Which feature enables transactions in MongoDB?", options: ["Replica Sets & Sharded Clusters", "Indexes", "Aggregation", "Views"], answer: "Replica Sets & Sharded Clusters" },
    { question: "Which operator conditionally includes fields in projection?", options: ["$cond", "$if", "$case", "$switch"], answer: "$cond" },
    { question: "Which aggregation operator concatenates strings?", options: ["$concat", "$append", "$join", "$mergeStr"], answer: "$concat" },
    { question: "Which aggregation operator calculates standard deviation?", options: ["$stdDevPop", "$stdDev", "$std", "$devPop"], answer: "$stdDevPop" },
    { question: "Which operator filters array elements?", options: ["$filter", "$map", "$slice", "$matchArray"], answer: "$filter" },
    { question: "Which operator maps array elements?", options: ["$map", "$filter", "$arrayMap", "$transform"], answer: "$map" },
    { question: "Which operator converts a string to integer?", options: ["$toInt", "$convertInt", "$intCast", "$int"], answer: "$toInt" },
    { question: "Which operator converts a value to string?", options: ["$toString", "$convertStr", "$strCast", "$stringify"], answer: "$toString" },
    { question: "Which operator performs geospatial queries?", options: ["$geoWithin", "$geoQuery", "$near", "$location"], answer: "$geoWithin" },
    { question: "Which command enables sharding on a database?", options: ["sh.enableSharding('dbName')", "db.enableSharding()", "shardDB('dbName')", "db.shard()"], answer: "sh.enableSharding('dbName')" },
    { question: "Which operator is used for array element position?", options: ["$position", "$elemMatch", "$arrayIndex", "$pos"], answer: "$elemMatch" },
  ],
};

export default function MongoDBQuiz () {
  const [level, setLevel] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  // Ensure questions is always an array
  const questions = level && quizMongoDB[level.toLowerCase()] ? quizMongoDB[level.toLowerCase()] : [];

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
                🚀 MongoDB Quiz
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