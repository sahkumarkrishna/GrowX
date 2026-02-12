import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Clock, Award, BookOpen, Play, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';
import { toast } from 'sonner';

const QuizDashboard = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ category: '', level: '', search: '' });

  const categories = ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Angular", "Vue", "Node.js", "Express", "Django", "Spring Boot", "Flask", "MongoDB", "MySQL", "PostgreSQL", "Firebase", "Python", "Java", "C", "C++", "Go", "Rust", "React Native", "Flutter", "Swift", "Kotlin", "Git", "GitHub", "Docker", "Kubernetes", "AWS", "Azure", "GCP", "DSA", "System Design", "OOP", "Database Design", "Other"];

  const QUIZ_API = `${import.meta.env.VITE_USER_API?.replace('/user', '/quiz') || 'http://localhost:8000/api/v1/quiz'}`;

  useEffect(() => {
    fetchQuizzes();
  }, []);

  useEffect(() => {
    filterQuizzes();
  }, [filter, quizzes]);

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get(`${QUIZ_API}/all`);
      setQuizzes(res.data.quizzes || []);
    } catch (error) {
      toast.error('Failed to fetch quizzes');
    } finally {
      setLoading(false);
    }
  };

  const filterQuizzes = () => {
    let filtered = quizzes;
    
    if (filter.category) {
      filtered = filtered.filter(q => q.category === filter.category);
    }
    
    if (filter.level) {
      filtered = filtered.filter(q => q.level === filter.level);
    }
    
    if (filter.search) {
      filtered = filtered.filter(q => 
        q.title.toLowerCase().includes(filter.search.toLowerCase()) ||
        q.description.toLowerCase().includes(filter.search.toLowerCase()) ||
        q.category.toLowerCase().includes(filter.search.toLowerCase())
      );
    }
    
    setFilteredQuizzes(filtered);
  };

  const getLevelColor = (level) => {
    const colors = {
      Beginner: 'bg-green-100 text-green-800',
      Intermediate: 'bg-yellow-100 text-yellow-800',
      Advanced: 'bg-red-100 text-red-800',
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4 -mt-16">
      <div className="max-w-7xl mx-auto">
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

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Quiz Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Test your knowledge with interactive quizzes</p>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl p-6 mb-8 border-2 border-purple-100">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-bold text-gray-800">Filter Quizzes</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search quizzes..."
                value={filter.search}
                onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 outline-none transition-all"
              />
            </div>
            <select
              value={filter.category}
              onChange={(e) => setFilter({ ...filter, category: e.target.value })}
              className="px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 outline-none transition-all"
            >
              <option value="">All Categories</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <select
              value={filter.level}
              onChange={(e) => setFilter({ ...filter, level: e.target.value })}
              className="px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 outline-none transition-all"
            >
              <option value="">All Levels</option>
              <option value="Beginner">🟢 Beginner</option>
              <option value="Intermediate">🟡 Intermediate</option>
              <option value="Advanced">🔴 Advanced</option>
            </select>
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto"></div>
          </div>
        ) : filteredQuizzes.length === 0 ? (
          <Card className="p-12 text-center shadow-xl">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No quizzes found</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz, idx) => (
              <motion.div
                key={quiz._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 border-purple-100 overflow-hidden">
                  {quiz.categoryImage && (
                    <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center p-6">
                      <img 
                        src={quiz.categoryImage} 
                        alt={quiz.category}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                    <CardTitle className="text-xl">{quiz.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-4 line-clamp-2 min-h-[3rem]">{quiz.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Clock className="w-4 h-4 text-indigo-600" />
                        <span className="font-medium">{quiz.timeLimit} minutes</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Award className="w-4 h-4 text-yellow-600" />
                        <span className="font-medium">{quiz.totalMarks} marks</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <BookOpen className="w-4 h-4 text-purple-600" />
                        <span className="font-medium">{quiz.questions?.length || 0} questions</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mb-4 flex-wrap">
                      <Badge className={getLevelColor(quiz.level)}>{quiz.level}</Badge>
                      <Badge variant="outline" className="border-purple-300 text-purple-700">{quiz.category}</Badge>
                    </div>

                    <Button
                      onClick={() => navigate(`/quiz/${quiz._id}`)}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Quiz
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizDashboard;
