import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { IoMdArrowRoundBack } from 'react-icons/io';
import axios from 'axios';
import { toast } from 'sonner';

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    categoryImage: '',
    level: 'Beginner',
    timeLimit: 10,
    questions: [{ questionText: '', options: [{ optionText: '' }, { optionText: '' }, { optionText: '' }, { optionText: '' }], correctAnswer: 0, marks: 1, difficulty: 'Easy' }]
  });

  const QUIZ_API = `${import.meta.env.VITE_USER_API?.replace('/user', '/quiz') || 'http://localhost:8000/api/v1/quiz'}`;
  const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const categories = ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Angular", "Vue", "Node.js", "Express", "Django", "Spring Boot", "Flask", "MongoDB", "MySQL", "PostgreSQL", "Firebase", "Python", "Java", "C", "C++", "Go", "Rust", "React Native", "Flutter", "Swift", "Kotlin", "Git", "GitHub", "Docker", "Kubernetes", "AWS", "Azure", "GCP", "DSA", "System Design", "OOP", "Database Design", "Other"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${QUIZ_API}/create`, formData, { withCredentials: true });
      toast.success('Quiz created successfully ✅');
      navigate('/admin/quizzes');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create quiz');
    }
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { questionText: '', options: [{ optionText: '' }, { optionText: '' }, { optionText: '' }, { optionText: '' }], correctAnswer: 0, marks: 1, difficulty: 'Easy' }]
    });
  };

  const removeQuestion = (qIdx) => {
    const newQuestions = formData.questions.filter((_, idx) => idx !== qIdx);
    setFormData({ ...formData, questions: newQuestions });
  };

  const addOption = (qIdx) => {
    const newQuestions = [...formData.questions];
    newQuestions[qIdx].options.push({ optionText: '' });
    setFormData({ ...formData, questions: newQuestions });
  };

  const removeOption = (qIdx, oIdx) => {
    const newQuestions = [...formData.questions];
    newQuestions[qIdx].options = newQuestions[qIdx].options.filter((_, idx) => idx !== oIdx);
    if (newQuestions[qIdx].correctAnswer >= newQuestions[qIdx].options.length) {
      newQuestions[qIdx].correctAnswer = 0;
    }
    setFormData({ ...formData, questions: newQuestions });
  };

  const updateQuestion = (qIdx, field, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[qIdx][field] = value;
    setFormData({ ...formData, questions: newQuestions });
  };

  const updateOption = (qIdx, oIdx, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[qIdx].options[oIdx].optionText = value;
    setFormData({ ...formData, questions: newQuestions });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          onClick={() => navigate('/admin/quizzes')}
          className="mb-6 flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-md"
        >
          <IoMdArrowRoundBack size={24} />
          Back
        </motion.button>

        <Card className="shadow-2xl border-2 border-purple-200">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <CardTitle className="text-2xl">✨ Create New Quiz</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Quiz Title *</label>
                  <Input
                    placeholder="Enter quiz title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="border-2 focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                  <Textarea
                    placeholder="Enter quiz description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="border-2 focus:border-purple-500"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category Image *</label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData({ ...formData, categoryImage: reader.result });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="border-2 focus:border-purple-500"
                  />
                  {formData.categoryImage && (
                    <img src={formData.categoryImage} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded-lg" />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border-2 rounded-lg focus:border-purple-500 outline-none"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Level *</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-3 py-2 border-2 rounded-lg focus:border-purple-500 outline-none"
                  >
                    <option value="Beginner">🟢 Beginner</option>
                    <option value="Intermediate">🟡 Intermediate</option>
                    <option value="Advanced">🔴 Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Time Limit (min) *</label>
                  <Input
                    type="number"
                    min="1"
                    placeholder="10"
                    value={formData.timeLimit}
                    onChange={(e) => setFormData({ ...formData, timeLimit: parseInt(e.target.value) })}
                    className="border-2 focus:border-purple-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800">📝 Questions</h3>
                  <Button type="button" onClick={addQuestion} variant="outline" className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50">
                    <Plus className="w-4 h-4 mr-2" /> Add Question
                  </Button>
                </div>
                
                {formData.questions.map((q, qIdx) => (
                  <Card key={qIdx} className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-bold text-purple-700">Question {qIdx + 1}</h4>
                      {formData.questions.length > 1 && (
                        <Button type="button" onClick={() => removeQuestion(qIdx)} variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Question Text *</label>
                        <Textarea
                          placeholder="Enter your question here"
                          value={q.questionText}
                          onChange={(e) => updateQuestion(qIdx, 'questionText', e.target.value)}
                          className="border-2 focus:border-purple-500"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Difficulty</label>
                          <select
                            value={q.difficulty}
                            onChange={(e) => updateQuestion(qIdx, 'difficulty', e.target.value)}
                            className="w-full px-3 py-2 border-2 rounded-lg focus:border-purple-500 outline-none"
                          >
                            <option value="Easy">😊 Easy</option>
                            <option value="Medium">😐 Medium</option>
                            <option value="Hard">😰 Hard</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Marks</label>
                          <Input
                            type="number"
                            min="1"
                            value={q.marks}
                            onChange={(e) => updateQuestion(qIdx, 'marks', parseInt(e.target.value))}
                            className="border-2 focus:border-purple-500"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <label className="block text-sm font-bold text-gray-700">Options (Select correct answer)</label>
                          <Button type="button" onClick={() => addOption(qIdx)} variant="outline" size="sm" className="text-xs">
                            <Plus className="w-3 h-3 mr-1" /> Add Option
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {q.options.map((opt, oIdx) => (
                            <div key={oIdx} className="flex items-center gap-2">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-sm flex-shrink-0">
                                {optionLabels[oIdx]}
                              </div>
                              <Input
                                placeholder={`Option ${optionLabels[oIdx]}`}
                                value={opt.optionText}
                                onChange={(e) => updateOption(qIdx, oIdx, e.target.value)}
                                className="flex-1 border-2 focus:border-purple-500"
                                required
                              />
                              <div className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name={`correct-${qIdx}`}
                                  checked={q.correctAnswer === oIdx}
                                  onChange={() => updateQuestion(qIdx, 'correctAnswer', oIdx)}
                                  className="w-5 h-5 cursor-pointer accent-green-600"
                                  title="Mark as correct answer"
                                />
                                {q.options.length > 2 && (
                                  <Button type="button" onClick={() => removeOption(qIdx, oIdx)} variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                                    <X className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">✅ Select the radio button to mark the correct answer</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-lg py-6">
                ✨ Create Quiz
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateQuiz;
