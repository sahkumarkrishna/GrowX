import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const quizMySQL = {
  beginner: [
    { question: "What does SQL stand for?", options: ["Structured Query Language", "Simple Query Language", "Sequential Query Language", "Standard Question Language"], answer: "Structured Query Language" },
    { question: "Which command is used to create a new database?", options: ["CREATE DATABASE db_name;", "NEW DATABASE db_name;", "MAKE DATABASE db_name;", "ADD DATABASE db_name;"], answer: "CREATE DATABASE db_name;" },
    { question: "Which command selects a database to use?", options: ["USE db_name;", "SELECT db_name;", "CHOOSE db_name;", "OPEN db_name;"], answer: "USE db_name;" },
    { question: "Which command shows all databases?", options: ["SHOW DATABASES;", "LIST DATABASES;", "SHOW DBS;", "SELECT DATABASES;"], answer: "SHOW DATABASES;" },
    { question: "Which command creates a table?", options: ["CREATE TABLE table_name (...);", "NEW TABLE table_name (...);", "MAKE TABLE table_name (...);", "ADD TABLE table_name (...);"], answer: "CREATE TABLE table_name (...);" },
    { question: "Which command deletes a table?", options: ["DROP TABLE table_name;", "DELETE TABLE table_name;", "REMOVE TABLE table_name;", "CLEAR TABLE table_name;"], answer: "DROP TABLE table_name;" },
    { question: "Which command inserts a record into a table?", options: ["INSERT INTO table_name (...) VALUES (...);", "ADD INTO table_name (...);", "INSERT RECORD table_name (...);", "CREATE RECORD table_name (...);"], answer: "INSERT INTO table_name (...) VALUES (...);" },
    { question: "Which command retrieves data from a table?", options: ["SELECT * FROM table_name;", "GET * FROM table_name;", "FETCH * FROM table_name;", "SHOW * FROM table_name;"], answer: "SELECT * FROM table_name;" },
    { question: "Which command deletes all records from a table?", options: ["DELETE FROM table_name;", "REMOVE ALL FROM table_name;", "CLEAR table_name;", "DROP table_name;"], answer: "DELETE FROM table_name;" },
    { question: "Which command updates a record?", options: ["UPDATE table_name SET column=value WHERE condition;", "MODIFY table_name SET column=value;", "CHANGE table_name SET column=value;", "ALTER table_name SET column=value;"], answer: "UPDATE table_name SET column=value WHERE condition;" },
    { question: "Which clause is used to filter records?", options: ["WHERE", "HAVING", "FILTER", "CONDITION"], answer: "WHERE" },
    { question: "Which keyword sorts the result?", options: ["ORDER BY", "SORT BY", "GROUP BY", "ARRANGE BY"], answer: "ORDER BY" },
    { question: "Which keyword groups rows that have the same values?", options: ["GROUP BY", "ORDER BY", "HAVING", "COLLECT BY"], answer: "GROUP BY" },
    { question: "Which clause filters groups?", options: ["HAVING", "WHERE", "FILTER", "GROUP"], answer: "HAVING" },
    { question: "Which symbol is used for a wildcard in LIKE?", options: ["%", "_", "*", "#"], answer: "%" },
    { question: "Which command shows the structure of a table?", options: ["DESCRIBE table_name;", "SHOW STRUCTURE table_name;", "TABLE INFO table_name;", "EXPLAIN table_name;"], answer: "DESCRIBE table_name;" },
    { question: "Which data type stores text up to 255 characters?", options: ["VARCHAR", "TEXT", "CHAR", "STRING"], answer: "VARCHAR" },
    { question: "Which data type stores whole numbers?", options: ["INT", "FLOAT", "CHAR", "DECIMAL"], answer: "INT" },
    { question: "Which command removes a database?", options: ["DROP DATABASE db_name;", "DELETE DATABASE db_name;", "REMOVE DATABASE db_name;", "CLEAR DATABASE db_name;"], answer: "DROP DATABASE db_name;" },
    { question: "Which symbol is used to terminate a SQL statement?", options: [";", ":", ".", ","], answer: ";" },
  ],

  intermediate: [
    { question: "Which keyword combines results of two SELECT queries?", options: ["UNION", "JOIN", "MERGE", "COMBINE"], answer: "UNION" },
    { question: "Which JOIN returns only matching rows?", options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN"], answer: "INNER JOIN" },
    { question: "Which JOIN returns all rows from the left table?", options: ["LEFT JOIN", "INNER JOIN", "RIGHT JOIN", "FULL JOIN"], answer: "LEFT JOIN" },
    { question: "Which JOIN returns all rows from the right table?", options: ["RIGHT JOIN", "INNER JOIN", "LEFT JOIN", "FULL JOIN"], answer: "RIGHT JOIN" },
    { question: "Which JOIN returns all rows from both tables?", options: ["FULL OUTER JOIN", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN"], answer: "FULL OUTER JOIN" },
    { question: "Which function counts number of rows?", options: ["COUNT()", "SUM()", "TOTAL()", "NUMBER()"], answer: "COUNT()" },
    { question: "Which function returns maximum value?", options: ["MAX()", "HIGHEST()", "TOP()", "BIGGEST()"], answer: "MAX()" },
    { question: "Which function returns minimum value?", options: ["MIN()", "LOWEST()", "SMALLEST()", "BOTTOM()"], answer: "MIN()" },
    { question: "Which function calculates average?", options: ["AVG()", "MEAN()", "AVERAGE()", "CALC()"], answer: "AVG()" },
    { question: "Which function calculates total sum?", options: ["SUM()", "ADD()", "TOTAL()", "PLUS()"], answer: "SUM()" },
    { question: "Which statement adds a primary key?", options: ["ALTER TABLE table_name ADD PRIMARY KEY (column);", "ALTER TABLE table_name SET PRIMARY KEY (column);", "ALTER TABLE table_name CREATE PRIMARY KEY (column);", "ALTER TABLE table_name NEW PRIMARY KEY (column);"], answer: "ALTER TABLE table_name ADD PRIMARY KEY (column);" },
    { question: "Which statement adds a foreign key?", options: ["ALTER TABLE table_name ADD FOREIGN KEY (column) REFERENCES other_table(column);", "ALTER TABLE table_name CREATE FOREIGN KEY ...", "ALTER TABLE table_name SET FOREIGN KEY ...", "ALTER TABLE table_name NEW FOREIGN KEY ..."], answer: "ALTER TABLE table_name ADD FOREIGN KEY (column) REFERENCES other_table(column);" },
    { question: "Which command renames a table?", options: ["RENAME TABLE old_name TO new_name;", "ALTER TABLE old_name RENAME TO new_name;", "UPDATE TABLE old_name TO new_name;", "CHANGE TABLE old_name TO new_name;"], answer: "RENAME TABLE old_name TO new_name;" },
    { question: "Which keyword removes duplicates from results?", options: ["DISTINCT", "UNIQUE", "REMOVE DUPLICATES", "ONLY"], answer: "DISTINCT" },
    { question: "Which statement changes a column's datatype?", options: ["ALTER TABLE table_name MODIFY column_name new_datatype;", "ALTER TABLE table_name CHANGE column_name new_datatype;", "UPDATE TABLE column_name new_datatype;", "MODIFY TABLE column_name new_datatype;"], answer: "ALTER TABLE table_name MODIFY column_name new_datatype;" },
    { question: "Which clause is used with GROUP BY to filter groups?", options: ["HAVING", "WHERE", "FILTER", "GROUP"], answer: "HAVING" },
    { question: "Which keyword is used to limit the number of results?", options: ["LIMIT", "TOP", "MAX", "COUNT"], answer: "LIMIT" },
    { question: "Which clause orders results in descending order?", options: ["ORDER BY column DESC;", "ORDER BY column ASC;", "SORT BY column DESC;", "SORT BY column ASC;"], answer: "ORDER BY column DESC;" },
    { question: "Which clause orders results in ascending order?", options: ["ORDER BY column ASC;", "ORDER BY column DESC;", "SORT BY column ASC;", "SORT BY column DESC;"], answer: "ORDER BY column ASC;" },
    { question: "Which operator searches for a pattern in a column?", options: ["LIKE", "MATCH", "SEARCH", "PATTERN"], answer: "LIKE" },
  ],

  advanced: [
    { question: "Which statement starts a transaction?", options: ["START TRANSACTION;", "BEGIN;", "BEGIN TRANSACTION;", "START;"], answer: "START TRANSACTION;" },
    { question: "Which statement commits a transaction?", options: ["COMMIT;", "SAVE;", "APPLY;", "EXECUTE;"], answer: "COMMIT;" },
    { question: "Which statement rolls back a transaction?", options: ["ROLLBACK;", "UNDO;", "REVERT;", "CANCEL;"], answer: "ROLLBACK;" },
    { question: "Which keyword is used for inner queries?", options: ["SUBQUERY", "INNER QUERY", "NESTED SELECT", "INNER SELECT"], answer: "SUBQUERY" },
    { question: "Which keyword enforces referential integrity?", options: ["FOREIGN KEY", "PRIMARY KEY", "UNIQUE", "CHECK"], answer: "FOREIGN KEY" },
    { question: "Which storage engine supports transactions in MySQL?", options: ["InnoDB", "MyISAM", "MEMORY", "CSV"], answer: "InnoDB" },
    { question: "Which clause merges the results of two queries?", options: ["UNION", "JOIN", "MERGE", "COMBINE"], answer: "UNION" },
    { question: "Which clause merges the results of two queries removing duplicates?", options: ["UNION", "UNION ALL", "JOIN", "MERGE"], answer: "UNION" },
    { question: "Which statement creates an index?", options: ["CREATE INDEX idx_name ON table_name(column);", "ADD INDEX idx_name ON table_name(column);", "ALTER TABLE ADD INDEX...", "INDEX CREATE idx_name..."], answer: "CREATE INDEX idx_name ON table_name(column);" },
    { question: "Which statement drops an index?", options: ["DROP INDEX idx_name ON table_name;", "DELETE INDEX idx_name;", "REMOVE INDEX idx_name;", "ALTER TABLE table_name DROP INDEX idx_name;"], answer: "DROP INDEX idx_name ON table_name;" },
    { question: "Which command shows the query execution plan?", options: ["EXPLAIN SELECT ...;", "PLAN SELECT ...;", "SHOW QUERY PLAN;", "DESCRIBE SELECT ...;"], answer: "EXPLAIN SELECT ...;" },
    { question: "Which clause performs a self join?", options: ["FROM table1 t1 JOIN table1 t2 ON t1.col = t2.col;", "FROM table1 JOIN table2 ON ...", "SELF JOIN table1 ...", "JOIN SELF ..."], answer: "FROM table1 t1 JOIN table1 t2 ON t1.col = t2.col;" },
    { question: "Which command backs up a MySQL database?", options: ["mysqldump", "mysqlbackup", "backupdb", "dumpdb"], answer: "mysqldump" },
    { question: "Which command restores a MySQL database?", options: ["mysql -u user -p db_name < file.sql", "restoredb", "mysqlrestore", "mysql import"], answer: "mysql -u user -p db_name < file.sql" },
    { question: "Which type of join returns unmatched rows with NULL?", options: ["OUTER JOIN", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN"], answer: "OUTER JOIN" },
    { question: "Which clause filters on aggregate values?", options: ["HAVING", "WHERE", "GROUP BY", "ORDER BY"], answer: "HAVING" },
    { question: "Which command enables foreign key checks?", options: ["SET FOREIGN_KEY_CHECKS = 1;", "ENABLE FK;", "CHECK FOREIGN KEY;", "FOREIGN KEY ON;"], answer: "SET FOREIGN_KEY_CHECKS = 1;" },
    { question: "Which command disables foreign key checks?", options: ["SET FOREIGN_KEY_CHECKS = 0;", "DISABLE FK;", "FOREIGN KEY OFF;", "CHECK FOREIGN KEY = 0;"], answer: "SET FOREIGN_KEY_CHECKS = 0;" },
    { question: "Which command shows all active processes?", options: ["SHOW PROCESSLIST;", "SHOW ACTIVE;", "SHOW CONNECTIONS;", "LIST PROCESSES;"], answer: "SHOW PROCESSLIST;" },
    { question: "Which keyword enforces unique values in a column?", options: ["UNIQUE", "PRIMARY", "CHECK", "INDEX"], answer: "UNIQUE" },
  ],
};
export default function MySQLQuiz () {
  const [level, setLevel] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  // Ensure questions is always an array
  const questions = level &&  quizMySQL[level.toLowerCase()] ? quizMySQL[level.toLowerCase()] : [];

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
                🚀 MySQL Quiz
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