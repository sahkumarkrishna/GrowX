import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';
import { toast } from 'sonner';

const AdminQuizzes = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const QUIZ_API = `${import.meta.env.VITE_USER_API?.replace('/user', '/quiz') || 'http://localhost:8000/api/v1/quiz'}`;

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get(`${QUIZ_API}/all`);
      setQuizzes(res.data.quizzes || []);
    } catch (error) {
      toast.error('Failed to fetch quizzes');
    }
  };

  const handleEdit = async (quiz) => {
    navigate(`/admin/quizzes/edit/${quiz._id}`);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this quiz?')) return;
    try {
      await axios.delete(`${QUIZ_API}/${id}`, { withCredentials: true });
      toast.success('Quiz deleted successfully 🗑️');
      fetchQuizzes();
    } catch (error) {
      toast.error('Failed to delete quiz');
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4">
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

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Manage Quizzes</h1>
            <p className="text-gray-600 mt-2">Create and manage quiz questions</p>
          </div>
          <Button onClick={() => navigate('/admin/quizzes/create')} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Quiz
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz, idx) => (
            <motion.div key={quiz._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} whileHover={{ y: -5, scale: 1.02 }}>
              <Card className="h-full hover:shadow-2xl transition-all border-2 border-purple-100">
                <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                  <CardTitle className="text-lg">{quiz.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{quiz.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex gap-2">
                      <Badge className="bg-purple-100 text-purple-800">{quiz.level}</Badge>
                      <Badge variant="outline">{quiz.category}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">📝 {quiz.questions?.length || 0} questions</p>
                    <p className="text-sm text-gray-600">⏱️ {quiz.timeLimit} minutes</p>
                    <p className="text-sm text-gray-600">🏆 {quiz.totalMarks} marks</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white flex-1" onClick={() => handleEdit(quiz)}>
                      <Edit className="w-4 h-4 mr-1" /> Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(quiz._id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminQuizzes;
