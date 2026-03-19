import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, X, Upload, CheckCircle2, Brain, Clock, Tag, FileText, Sparkles, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { toast } from 'sonner';
import AdminLayout from './AdminLayout';

const CATEGORIES = ["HTML","CSS","JavaScript","TypeScript","React","Angular","Vue","Node.js","Express","Django","Spring Boot","Flask","MongoDB","MySQL","PostgreSQL","Firebase","Python","Java","C","C++","Go","Rust","React Native","Flutter","Swift","Kotlin","Git","GitHub","Docker","Kubernetes","AWS","Azure","GCP","DSA","System Design","OOP","Database Design","Other"];
const OPTION_LABELS = ['A','B','C','D','E','F','G','H'];
const BLANK_Q = () => ({ questionText:'', options:[{optionText:''},{optionText:''},{optionText:''},{optionText:''}], correctAnswer:0, marks:1, difficulty:'Easy' });

const DIFF_COLORS = { Easy: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-300' }, Medium: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300' }, Hard: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' } };

const CreateQuiz = () => {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title:'', description:'', category:'', level:'Beginner', timeLimit:10, questions:[BLANK_Q()] });

  const QUIZ_API = import.meta.env.VITE_QUIZ_API || 'http://localhost:8000/api/v1/quiz';

  const handleImageChange = e => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.category) return toast.error('Please select a category');
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('title', formData.title);
      fd.append('description', formData.description);
      fd.append('category', formData.category);
      fd.append('level', formData.level);
      fd.append('timeLimit', formData.timeLimit);
      fd.append('questions', JSON.stringify(formData.questions));
      if (imageFile) fd.append('file', imageFile);
      await axios.post(`${QUIZ_API}/create`, fd, { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Quiz created successfully!');
      navigate('/admin/all-quizzes');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create quiz');
    } finally { setLoading(false); }
  };

  const setQ = fn => setFormData(p => ({ ...p, questions: fn(p.questions) }));
  const addQ = () => setQ(qs => [...qs, BLANK_Q()]);
  const removeQ = qi => setQ(qs => qs.filter((_,i) => i !== qi));
  const updateQ = (qi,k,v) => setQ(qs => { const n=[...qs]; n[qi]={...n[qi],[k]:v}; return n; });
  const addOpt = qi => setQ(qs => { const n=[...qs]; n[qi].options.push({optionText:''}); return n; });
  const removeOpt = (qi,oi) => setQ(qs => { const n=[...qs]; n[qi].options=n[qi].options.filter((_,i)=>i!==oi); if(n[qi].correctAnswer>=n[qi].options.length) n[qi].correctAnswer=0; return n; });
  const updateOpt = (qi,oi,v) => setQ(qs => { const n=[...qs]; n[qi].options[oi].optionText=v; return n; });

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">

        {/* Hero Banner */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-56 h-56 bg-white opacity-5 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-5 rounded-full -ml-12 -mb-12" />
            <div className="relative flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl flex-shrink-0">
                <Brain className="h-9 w-9 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">Admin Panel</span>
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">{formData.questions.length} Question{formData.questions.length !== 1 ? 's' : ''}</span>
                </div>
                <h1 className="text-3xl font-black text-white mb-1">Create New Quiz</h1>
                <p className="text-purple-200 text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />Build engaging quizzes for your platform
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Basic Info Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
              <div className="px-8 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-violet-50 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">Quiz Information</p>
                  <p className="text-xs text-gray-500">Basic details about your quiz</p>
                </div>
              </div>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-gray-700 font-bold text-sm">Quiz Title *</Label>
                    <Input placeholder="e.g. Advanced JavaScript Concepts" value={formData.title} required
                      onChange={e => setFormData(p=>({...p,title:e.target.value}))}
                      className="h-12 border-2 border-gray-200 focus:border-violet-500 rounded-xl bg-gray-50 focus:bg-white transition-all" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-gray-700 font-bold text-sm">Description</Label>
                    <Textarea placeholder="Describe what this quiz covers..." rows={3} value={formData.description}
                      onChange={e => setFormData(p=>({...p,description:e.target.value}))}
                      className="border-2 border-gray-200 focus:border-violet-500 rounded-xl bg-gray-50 focus:bg-white transition-all resize-none" />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-bold text-sm flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-violet-600" />Category *
                    </Label>
                    <select value={formData.category} required onChange={e => setFormData(p=>({...p,category:e.target.value}))}
                      className="w-full h-12 px-4 border-2 border-gray-200 focus:border-violet-500 rounded-xl bg-gray-50 focus:bg-white outline-none transition-all text-sm font-medium text-gray-700">
                      <option value="">Select Category</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  {/* Level */}
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-bold text-sm flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-violet-600" />Difficulty Level *
                    </Label>
                    <select value={formData.level} onChange={e => setFormData(p=>({...p,level:e.target.value}))}
                      className="w-full h-12 px-4 border-2 border-gray-200 focus:border-violet-500 rounded-xl bg-gray-50 focus:bg-white outline-none transition-all text-sm font-medium text-gray-700">
                      <option value="Beginner">🟢 Beginner</option>
                      <option value="Intermediate">🟡 Intermediate</option>
                      <option value="Advanced">🔴 Advanced</option>
                    </select>
                  </div>

                  {/* Time Limit */}
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-bold text-sm flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-violet-600" />Time Limit (minutes) *
                    </Label>
                    <Input type="number" min="1" value={formData.timeLimit} required
                      onChange={e => setFormData(p=>({...p,timeLimit:parseInt(e.target.value)}))}
                      className="h-12 border-2 border-gray-200 focus:border-violet-500 rounded-xl bg-gray-50 focus:bg-white transition-all" />
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label className="text-gray-700 font-bold text-sm flex items-center gap-2">
                      <Upload className="w-3.5 h-3.5 text-violet-600" />Category Image
                    </Label>
                    <label className="flex items-center gap-3 h-12 px-4 border-2 border-dashed border-gray-200 hover:border-violet-400 rounded-xl cursor-pointer bg-gray-50 hover:bg-violet-50 transition-all group">
                      {imagePreview
                        ? <img src={imagePreview} className="w-8 h-8 object-cover rounded-lg" />
                        : <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center"><Upload className="w-4 h-4 text-violet-500" /></div>}
                      <span className="text-sm text-gray-500 group-hover:text-violet-600 transition-colors truncate">
                        {imageFile ? imageFile.name : 'Click to upload image'}
                      </span>
                      {imageFile && <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-auto flex-shrink-0" />}
                      <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Questions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">Questions</p>
                  <p className="text-xs text-gray-500">{formData.questions.length} question{formData.questions.length !== 1 ? 's' : ''} added</p>
                </div>
              </div>
              <Button type="button" onClick={addQ}
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg h-10 px-5 rounded-xl">
                <Plus className="w-4 h-4 mr-2" />Add Question
              </Button>
            </div>

            <div className="space-y-4">
              {formData.questions.map((q, qi) => {
                const dc = DIFF_COLORS[q.difficulty] || DIFF_COLORS.Easy;
                return (
                  <Card key={qi} className="border-0 shadow-lg rounded-3xl overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-violet-500 to-purple-600" />
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-black text-sm shadow-md">
                            {qi + 1}
                          </div>
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${dc.bg} ${dc.text} ${dc.border}`}>
                            {q.difficulty}
                          </span>
                          <span className="text-xs text-gray-500 font-medium">{q.marks} mark{q.marks !== 1 ? 's' : ''}</span>
                        </div>
                        {formData.questions.length > 1 && (
                          <Button type="button" onClick={() => removeQ(qi)} variant="ghost" size="sm"
                            className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl">
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      <Textarea placeholder="Enter your question here..." value={q.questionText} required
                        onChange={e => updateQ(qi,'questionText',e.target.value)}
                        className="border-2 border-gray-200 focus:border-violet-500 rounded-xl bg-gray-50 focus:bg-white transition-all resize-none mb-4" rows={2} />

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="space-y-1.5">
                          <Label className="text-xs font-bold text-gray-600">Difficulty</Label>
                          <select value={q.difficulty} onChange={e => updateQ(qi,'difficulty',e.target.value)}
                            className="w-full h-10 px-3 border-2 border-gray-200 focus:border-violet-500 rounded-xl bg-gray-50 outline-none text-sm font-medium text-gray-700">
                            <option value="Easy">😊 Easy</option>
                            <option value="Medium">😐 Medium</option>
                            <option value="Hard">😰 Hard</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-xs font-bold text-gray-600">Marks</Label>
                          <Input type="number" min="1" value={q.marks}
                            onChange={e => updateQ(qi,'marks',parseInt(e.target.value))}
                            className="h-10 border-2 border-gray-200 focus:border-violet-500 rounded-xl bg-gray-50 focus:bg-white transition-all" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs font-bold text-gray-600">Options — select correct answer</Label>
                          <Button type="button" onClick={() => addOpt(qi)} variant="outline" size="sm"
                            className="h-7 text-xs border-violet-300 text-violet-600 hover:bg-violet-50 rounded-lg">
                            <Plus className="w-3 h-3 mr-1" />Add
                          </Button>
                        </div>
                        {q.options.map((opt, oi) => (
                          <div key={oi} className="flex items-center gap-2">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 transition-all ${q.correctAnswer === oi ? 'bg-emerald-500 text-white shadow-md' : 'bg-gray-100 text-gray-500'}`}>
                              {OPTION_LABELS[oi]}
                            </div>
                            <Input placeholder={`Option ${OPTION_LABELS[oi]}`} value={opt.optionText} required
                              onChange={e => updateOpt(qi,oi,e.target.value)}
                              className={`flex-1 h-10 border-2 rounded-xl transition-all text-sm ${q.correctAnswer === oi ? 'border-emerald-400 bg-emerald-50 focus:border-emerald-500' : 'border-gray-200 bg-gray-50 focus:border-violet-500 focus:bg-white'}`} />
                            <button type="button" onClick={() => updateQ(qi,'correctAnswer',oi)}
                              className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${q.correctAnswer === oi ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300 hover:border-emerald-400'}`}>
                              {q.correctAnswer === oi && <CheckCircle2 className="w-4 h-4 text-white" />}
                            </button>
                            {q.options.length > 2 && (
                              <button type="button" onClick={() => removeOpt(qi,oi)}
                                className="w-7 h-7 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 transition-all flex-shrink-0">
                                <X className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        ))}
                        <p className="text-xs text-gray-400 mt-1">Click the circle to mark the correct answer</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.div>

          {/* Submit */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Button type="submit" disabled={loading}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-lg font-bold shadow-xl hover:shadow-2xl transition-all">
              {loading
                ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Creating Quiz...</>
                : <><Sparkles className="mr-2 h-5 w-5" />Create Quiz</>}
            </Button>
          </motion.div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateQuiz;
