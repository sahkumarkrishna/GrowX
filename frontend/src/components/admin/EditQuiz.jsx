import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, X, Upload, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { IoMdArrowRoundBack } from 'react-icons/io';
import axios from 'axios';
import { toast } from 'sonner';
import AdminLayout from './AdminLayout';

const CATEGORIES = ["HTML","CSS","JavaScript","TypeScript","React","Angular","Vue","Node.js","Express","Django","Spring Boot","Flask","MongoDB","MySQL","PostgreSQL","Firebase","Python","Java","C","C++","Go","Rust","React Native","Flutter","Swift","Kotlin","Git","GitHub","Docker","Kubernetes","AWS","Azure","GCP","DSA","System Design","OOP","Database Design","Other"];
const OPTION_LABELS = ['A','B','C','D','E','F','G','H'];
const BLANK_QUESTION = () => ({ questionText:'', options:[{optionText:''},{optionText:''},{optionText:''},{optionText:''}], correctAnswer:0, marks:1, difficulty:'Easy' });

const EditQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileRef  = useRef(null);

  const [loading,      setLoading]      = useState(true);
  const [saving,       setSaving]       = useState(false);
  const [imageFile,    setImageFile]    = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [formData, setFormData] = useState({
    title:'', description:'', category:'', level:'Beginner', timeLimit:10, questions:[]
  });

  const QUIZ_API = import.meta.env.VITE_USER_API?.replace('/user','/quiz') || 'http://localhost:8000/api/v1/quiz';

  useEffect(() => { fetchQuiz(); }, [id]);

  const fetchQuiz = async () => {
    try {
      const res = await axios.get(`${QUIZ_API}/${id}`);
      const q = res.data.quiz;
      setFormData({ title:q.title, description:q.description, category:q.category, level:q.level, timeLimit:q.timeLimit, questions:q.questions });
      setImagePreview(q.categoryImage || '');
    } catch {
      toast.error('Failed to load quiz');
      navigate('/admin/quizzes');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('title',       formData.title);
      fd.append('description', formData.description);
      fd.append('category',    formData.category);
      fd.append('level',       formData.level);
      fd.append('timeLimit',   formData.timeLimit);
      fd.append('questions',   JSON.stringify(formData.questions));
      if (imageFile) fd.append('file', imageFile);

      await axios.put(`${QUIZ_API}/${id}`, fd, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Quiz updated successfully ✅');
      navigate('/admin/quizzes');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update quiz');
    } finally {
      setSaving(false);
    }
  };

  // ── question helpers ──
  const set = (fn) => setFormData(prev => ({ ...prev, questions: fn(prev.questions) }));
  const addQuestion    = ()        => set(qs => [...qs, BLANK_QUESTION()]);
  const removeQuestion = (qi)      => set(qs => qs.filter((_,i) => i !== qi));
  const updateQ        = (qi,k,v)  => set(qs => { const n=[...qs]; n[qi]={...n[qi],[k]:v}; return n; });
  const addOption      = (qi)      => set(qs => { const n=[...qs]; n[qi].options.push({optionText:''}); return n; });
  const removeOption   = (qi,oi)   => set(qs => {
    const n=[...qs];
    n[qi].options = n[qi].options.filter((_,i)=>i!==oi);
    if (n[qi].correctAnswer >= n[qi].options.length) n[qi].correctAnswer = 0;
    return n;
  });
  const updateOption   = (qi,oi,v) => set(qs => { const n=[...qs]; n[qi].options[oi].optionText=v; return n; });

  if (loading) return (
    <AdminLayout>
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600" />
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <Card className="shadow-2xl border-2 border-purple-200">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <CardTitle className="text-2xl">✏️ Edit Quiz</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Basic Info */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Quiz Title *</label>
                  <Input placeholder="Enter quiz title" value={formData.title} required
                    onChange={e => setFormData(p=>({...p,title:e.target.value}))}
                    className="border-2 focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                  <Textarea placeholder="Enter quiz description" rows={3} value={formData.description}
                    onChange={e => setFormData(p=>({...p,description:e.target.value}))}
                    className="border-2 focus:border-purple-500" />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category Image</label>
                  <label className="flex items-center gap-4 p-4 border-2 border-dashed border-purple-200 hover:border-purple-500 rounded-2xl cursor-pointer bg-purple-50/50 hover:bg-purple-50 transition-all group">
                    {imagePreview ? (
                      <img src={imagePreview} alt="preview" className="w-16 h-16 object-cover rounded-xl" />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-purple-100 flex items-center justify-center">
                        <Upload size={24} className="text-purple-500" />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-gray-700 group-hover:text-purple-600 transition-colors">
                        {imageFile ? imageFile.name : 'Click to change image'}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">PNG · JPG · WEBP</p>
                    </div>
                    {imageFile && <CheckCircle2 size={20} className="text-emerald-500 ml-auto" />}
                    <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Meta */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category *</label>
                  <select value={formData.category} required
                    onChange={e => setFormData(p=>({...p,category:e.target.value}))}
                    className="w-full px-3 py-2 border-2 rounded-lg focus:border-purple-500 outline-none">
                    <option value="">Select Category</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Level *</label>
                  <select value={formData.level}
                    onChange={e => setFormData(p=>({...p,level:e.target.value}))}
                    className="w-full px-3 py-2 border-2 rounded-lg focus:border-purple-500 outline-none">
                    <option value="Beginner">🟢 Beginner</option>
                    <option value="Intermediate">🟡 Intermediate</option>
                    <option value="Advanced">🔴 Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Time Limit (min) *</label>
                  <Input type="number" min="1" value={formData.timeLimit} required
                    onChange={e => setFormData(p=>({...p,timeLimit:parseInt(e.target.value)}))}
                    className="border-2 focus:border-purple-500" />
                </div>
              </div>

              {/* Questions */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800">📝 Questions</h3>
                  <Button type="button" onClick={addQuestion} variant="outline"
                    className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50">
                    <Plus className="w-4 h-4 mr-2" /> Add Question
                  </Button>
                </div>

                {formData.questions.map((q, qi) => (
                  <Card key={qi} className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-bold text-purple-700">Question {qi + 1}</h4>
                      {formData.questions.length > 1 && (
                        <Button type="button" onClick={() => removeQuestion(qi)} variant="ghost" size="sm" className="text-red-500">
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="space-y-4">
                      <Textarea placeholder="Enter your question here" value={q.questionText} required
                        onChange={e => updateQ(qi,'questionText',e.target.value)}
                        className="border-2 focus:border-purple-500" />

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Difficulty</label>
                          <select value={q.difficulty} onChange={e => updateQ(qi,'difficulty',e.target.value)}
                            className="w-full px-3 py-2 border-2 rounded-lg focus:border-purple-500 outline-none">
                            <option value="Easy">😊 Easy</option>
                            <option value="Medium">😐 Medium</option>
                            <option value="Hard">😰 Hard</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Marks</label>
                          <Input type="number" min="1" value={q.marks}
                            onChange={e => updateQ(qi,'marks',parseInt(e.target.value))}
                            className="border-2 focus:border-purple-500" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <label className="block text-sm font-bold text-gray-700">Options (select correct)</label>
                          <Button type="button" onClick={() => addOption(qi)} variant="outline" size="sm" className="text-xs">
                            <Plus className="w-3 h-3 mr-1" /> Add Option
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {q.options.map((opt, oi) => (
                            <div key={oi} className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                                {OPTION_LABELS[oi]}
                              </div>
                              <Input placeholder={`Option ${OPTION_LABELS[oi]}`} value={opt.optionText} required
                                onChange={e => updateOption(qi,oi,e.target.value)}
                                className="flex-1 border-2 focus:border-purple-500" />
                              <input type="radio" name={`correct-${qi}`} checked={q.correctAnswer===oi}
                                onChange={() => updateQ(qi,'correctAnswer',oi)}
                                className="w-5 h-5 cursor-pointer accent-green-600" title="Mark as correct" />
                              {q.options.length > 2 && (
                                <Button type="button" onClick={() => removeOption(qi,oi)} variant="ghost" size="sm" className="text-red-500">
                                  <X className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">✅ Select the radio button to mark the correct answer</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Button type="submit" disabled={saving}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg py-6">
                {saving ? 'Saving...' : '💾 Update Quiz'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default EditQuiz;
