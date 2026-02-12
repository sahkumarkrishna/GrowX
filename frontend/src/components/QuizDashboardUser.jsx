import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Award, Clock, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import axios from 'axios';

const QuizDashboardUser = () => {
  const navigate = useNavigate();
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const RESULT_API = `${import.meta.env.VITE_USER_API?.replace('/user', '/quiz-result') || 'http://localhost:8000/api/v1/quiz-result'}`;

  useEffect(() => {
    fetchQuizResults();
  }, []);

  const fetchQuizResults = async () => {
    try {
      const res = await axios.get(`${RESULT_API}/user`, { withCredentials: true });
      setQuizResults(res.data.results || []);
    } catch (error) {
      console.error('Failed to fetch quiz results');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryStats = () => {
    const categoryMap = {};
    quizResults.forEach(result => {
      const cat = result?.quiz?.category || 'Other';
      if (!categoryMap[cat]) {
        categoryMap[cat] = { total: 0, count: 0, best: 0 };
      }
      categoryMap[cat].total += result.percentage;
      categoryMap[cat].count += 1;
      categoryMap[cat].best = Math.max(categoryMap[cat].best, result.percentage);
    });
    
    return Object.entries(categoryMap).map(([category, data]) => ({
      category,
      average: Math.round(data.total / data.count),
      attempts: data.count,
      best: data.best
    })).sort((a, b) => b.average - a.average);
  };

  const categoryStats = getCategoryStats();

  return (
    <div className="space-y-8">
      {/* Category Performance Section */}
      {categoryStats.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Award className="w-6 h-6" />
                Performance by Category
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryStats.map((stat, idx) => (
                  <motion.div
                    key={stat.category}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-2 border-indigo-100 rounded-lg p-4 bg-gradient-to-br from-indigo-50 to-purple-50 hover:shadow-lg transition-all"
                  >
                    <h3 className="font-bold text-lg mb-3 text-indigo-900">{stat.category}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Average:</span>
                        <Badge className={stat.average >= 70 ? 'bg-green-100 text-green-800' : stat.average >= 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
                          {stat.average}%
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Best Score:</span>
                        <span className="font-bold text-indigo-600">{stat.best}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Attempts:</span>
                        <span className="font-semibold text-gray-700">{stat.attempts}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Quiz Results Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Brain className="w-6 h-6" />
              Quiz Results ({quizResults?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
              </div>
            ) : !quizResults || quizResults.length === 0 ? (
              <div className="text-center py-12">
                <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No quiz attempts yet</p>
                <Button onClick={() => navigate('/quiz-dashboard')} className="mt-4 bg-purple-600">
                  Take a Quiz
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {quizResults.map((result) => (
                  <motion.div
                    key={result._id}
                    whileHover={{ scale: 1.02 }}
                    className="border-2 border-purple-100 rounded-lg p-4 hover:shadow-lg transition-all bg-gradient-to-br from-purple-50 to-pink-50"
                  >
                    <h3 className="font-bold text-lg mb-2">{result?.quiz?.title}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Score:</span>
                        <span className="font-bold text-purple-600 text-xl">{result.score}/{result.totalMarks}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Percentage:</span>
                        <Badge className={result.percentage >= 70 ? 'bg-green-100 text-green-800' : result.percentage >= 40 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
                          {result.percentage}%
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {Math.floor(result.timeTaken / 60)}m {result.timeTaken % 60}s
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {new Date(result.createdAt).toLocaleDateString()}
                      </div>
                      <Badge variant="outline" className="mt-2">{result?.quiz?.category}</Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default QuizDashboardUser;
