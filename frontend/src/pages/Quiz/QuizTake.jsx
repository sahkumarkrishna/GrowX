import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';
import { toast } from 'sonner';

const QuizTake = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const QUIZ_API = `${import.meta.env.VITE_QUIZ_API || 'http://localhost:8000/api/v1/quiz'}`;
  const RESULT_API = `${import.meta.env.VITE_QUIZ_RESULT_API || 'http://localhost:8000/api/v1/quiz-result'}`;

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quiz) {
      handleSubmit();
    }
  }, [timeLeft, showResult]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!showResult && quiz && timeLeft > 0) {
        e.preventDefault();
        e.returnValue = 'Your quiz progress will be lost. Are you sure you want to leave?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [showResult, quiz, timeLeft]);

  const fetchQuiz = async () => {
    try {
      const res = await axios.get(`${QUIZ_API}/${id}`);
      setQuiz(res.data.quiz);
      setTimeLeft(res.data.quiz.timeLimit * 60);
      setStartTime(Date.now());
    } catch (error) {
      toast.error('Failed to load quiz');
      navigate('/quiz-dashboard');
    }
  };

  const handleAnswer = (questionIndex, optionIndex) => {
    setAnswers({ ...answers, [questionIndex]: optionIndex });
  };

  const handleSubmit = async () => {
    let totalScore = 0;
    const resultAnswers = [];
    
    quiz.questions.forEach((q, idx) => {
      const isCorrect = answers[idx] === q.correctAnswer;
      if (isCorrect) {
        totalScore += q.marks;
      }
      resultAnswers.push({
        questionIndex: idx,
        selectedAnswer: answers[idx] ?? -1,
        isCorrect,
      });
    });
    
    setScore(totalScore);
    setShowResult(true);

    const timeTaken = Math.floor((Date.now() - startTime) / 1000);

    try {
      await axios.post(
        `${RESULT_API}/save`,
        {
          quizId: id,
          score: totalScore,
          totalMarks: quiz.totalMarks,
          answers: resultAnswers,
          timeTaken,
        },
        { withCredentials: true }
      );
      toast.success('Quiz result saved!');
    } catch (error) {
      console.error('Failed to save result:', error);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (showResult) {
    const percentage = ((score / quiz.totalMarks) * 100).toFixed(1);
    let feedback = { emoji: '', message: '', color: '' };
    
    if (percentage >= 90) {
      feedback = { emoji: '🏆', message: 'Outstanding! Perfect Performance!', color: 'text-yellow-600' };
    } else if (percentage >= 80) {
      feedback = { emoji: '🌟', message: 'Excellent Work! Keep it up!', color: 'text-green-600' };
    } else if (percentage >= 70) {
      feedback = { emoji: '👍', message: 'Good Job! Well Done!', color: 'text-blue-600' };
    } else if (percentage >= 60) {
      feedback = { emoji: '👌', message: 'Nice Try! You can do better!', color: 'text-indigo-600' };
    } else if (percentage >= 50) {
      feedback = { emoji: '💪', message: 'Keep Practicing! You\'re improving!', color: 'text-orange-600' };
    } else {
      feedback = { emoji: '📚', message: 'Don\'t Give Up! Study More!', color: 'text-red-600' };
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4 -mt-16">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center shadow-2xl border-2 border-purple-200">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
            >
              <div className="text-8xl mb-4">{feedback.emoji}</div>
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-2">Quiz Completed!</h2>
              <p className={`text-2xl font-bold mb-4 ${feedback.color}`}>{feedback.message}</p>
              
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-6">
                <p className="text-6xl font-black text-purple-600 mb-2">{score}/{quiz.totalMarks}</p>
                <p className="text-gray-700 text-xl font-semibold">
                  You scored {percentage}%
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 text-left">
                <div className="bg-white rounded-lg p-4 shadow">
                  <p className="text-sm text-gray-600">Correct Answers</p>
                  <p className="text-2xl font-bold text-green-600">{Object.values(answers).filter((ans, idx) => ans === quiz.questions[idx].correctAnswer).length}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow">
                  <p className="text-sm text-gray-600">Wrong Answers</p>
                  <p className="text-2xl font-bold text-red-600">{quiz.questions.length - Object.values(answers).filter((ans, idx) => ans === quiz.questions[idx].correctAnswer).length}</p>
                </div>
              </div>
            </motion.div>

            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate('/quiz-dashboard')} variant="outline" className="px-6">
                Back to Dashboard
              </Button>
              <Button onClick={() => window.location.reload()} className="bg-purple-600 px-6">
                Retake Quiz
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4 -mt-16">
      <div className="max-w-4xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-md"
        >
          <IoMdArrowRoundBack size={24} />
          Back
        </motion.button>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{quiz.title}</h1>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md">
            <Clock className="w-5 h-5 text-red-500" />
            <span className="font-bold text-lg">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <CardTitle>
              Question {currentQuestion + 1} of {quiz.questions.length}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <Badge>{question.difficulty}</Badge>
              <span className="text-sm text-gray-600">{question.marks} marks</span>
            </div>
            
            <h3 className="text-xl font-semibold mb-6">{question.questionText}</h3>

            <div className="space-y-3">
              {question.options.map((option, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(currentQuestion, idx)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    answers[currentQuestion] === idx
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      answers[currentQuestion] === idx ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
                    }`}>
                      {answers[currentQuestion] === idx && <div className="w-3 h-3 bg-white rounded-full"></div>}
                    </div>
                    <span>{option.optionText}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            disabled={currentQuestion === 0}
            variant="outline"
          >
            Previous
          </Button>
          
          {currentQuestion === quiz.questions.length - 1 ? (
            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
              Submit Quiz
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              className="bg-purple-600"
            >
              Next
            </Button>
          )}
        </div>

        <div className="mt-6 flex gap-2 flex-wrap justify-center">
          {quiz.questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentQuestion(idx)}
              className={`w-10 h-10 rounded-lg font-bold ${
                answers[idx] !== undefined
                  ? 'bg-purple-600 text-white'
                  : currentQuestion === idx
                  ? 'bg-purple-200 text-purple-800'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizTake;
