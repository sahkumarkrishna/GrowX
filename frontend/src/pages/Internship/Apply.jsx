import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Phone, BookOpen, GraduationCap, Briefcase,
  Linkedin, Github, MessageSquare, Send, CheckCircle,
  Clock, Award, X, Globe, MapPin, Layers, Upload, FileText
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const CATEGORIES = [
  "Software Development", "Web Development", "Android Development", "Cybersecurity",
  "UI/UX Design", "Cloud Computing", "Data Science", "Machine Learning",
  "Java Full Stack Developer", "Python Full Stack Developer", "JS Full Stack Developer",
  "DevOps", "AI/ML with Python", "Blockchain Developer", "Game Development",
];
const YEARS     = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate", "Post Graduate"];
const COURSES   = ["B.Tech", "BCA", "MCA", "B.Sc", "M.Tech", "MBA", "BBA", "Other"];
const LEVELS    = ["Beginner", "Intermediate", "Advanced"];
const DURATIONS = ["1 Month", "2 Months", "3 Months", "6 Months"];

const INIT = {
  fullName: '', email: '', phone: '', gender: '',
  college: '', course: '', year: '', city: '', state: '',
  category: '', experience: '', duration: '',
  linkedin: '', github: '', portfolio: '', message: '',
};

const API = import.meta.env.VITE_USER_API?.replace('/user', '/internship') || 'http://localhost:8000/api/v1/internship';
const inp = "w-full border-2 border-gray-200 focus:border-blue-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors bg-white";

const Field = ({ label, required, icon: Icon, children }) => (
  <div>
    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 flex items-center gap-1">
      {Icon && <Icon size={11} />} {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const SectionHead = ({ color, icon: Icon, title }) => (
  <div className="flex items-center gap-2 mb-4">
    <div className={`w-7 h-7 rounded-lg ${color} flex items-center justify-center`}>
      <Icon size={14} className="text-white" />
    </div>
    <h4 className="font-black text-gray-800 text-sm uppercase tracking-wide">{title}</h4>
  </div>
);

export default function Apply() {
  const [open, setOpen]       = useState(false);
  const [done, setDone]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm]       = useState(INIT);
  const [resume, setResume]   = useState(null);
  const [errors, setErrors]   = useState({});
  const fileRef               = useRef();

  const set = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const REQUIRED = [
    'fullName','email','phone','gender',
    'college','course','year','city','state',
    'category','experience','duration',
    'linkedin','github','message',
  ];

  const validate = () => {
    const errs = {};
    REQUIRED.forEach(k => { if (!form[k]?.trim()) errs[k] = 'Required'; });
    if (!resume) errs.resume = 'Resume is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async e => {
    e.preventDefault();
    if (!validate()) { toast.error('Please fill all required fields'); return; }
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append('resume', resume);
      await axios.post(`${API}/apply`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setDone(true);
      toast.success('🎉 Application submitted successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  const close = () => { setOpen(false); setDone(false); setForm(INIT); setResume(null); setErrors({}); };
  const b = k => errors[k] ? 'border-red-400' : 'border-gray-200 focus:border-blue-500';
  const er = k => errors[k] ? <p className="text-red-500 text-xs mt-1">{errors[k]}</p> : null;

  const benefits = [
    { icon: CheckCircle, text: "Quick application" },
    { icon: Clock,       text: "Response within 48 hours" },
    { icon: Award,       text: "Certificate upon completion" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-20 mb-10">
      {/* CTA Banner */}
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
        <div className="relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Submit your details and get started with your internship journey. Join 50+ interns already transforming their careers.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full border border-white/20">
                <b.icon size={18} /><span className="text-sm font-medium">{b.text}</span>
              </motion.div>
            ))}
          </div>
          <motion.button onClick={() => setOpen(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:bg-yellow-300 hover:text-blue-700 transition-all">
            🚀 Apply Now <Send size={22} />
          </motion.button>
          <p className="mt-6 text-sm text-blue-200">No application fee • Free certificate • Flexible schedule</p>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={close}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-hidden flex flex-col"
              onClick={ev => ev.stopPropagation()}>

              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-5 flex items-center justify-between shrink-0">
                <div>
                  <h3 className="text-xl font-black text-white">Internship Application</h3>
                  <p className="text-blue-200 text-xs mt-0.5">Fill in your details below — all fields marked * are required</p>
                </div>
                <button onClick={close} className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="overflow-y-auto flex-1 px-8 py-6">
                <AnimatePresence mode="wait">
                  {done ? (
                    <motion.div key="done" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-5">
                        <CheckCircle size={48} className="text-green-500" />
                      </div>
                      <h4 className="text-2xl font-black text-gray-800 mb-2">Application Submitted! 🎉</h4>
                      <p className="text-gray-500 text-sm max-w-xs mb-6">Your application has been received. We'll get back to you within 48 hours.</p>
                      <button onClick={close} className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-sm shadow-lg hover:shadow-xl transition-all">
                        Close
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={submit} className="space-y-6">

                      {/* Personal */}
                      <div>
                        <SectionHead color="bg-blue-600" icon={User} title="Personal Information" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Field label="Full Name" required icon={User}>
                            <input name="fullName" value={form.fullName} onChange={set} placeholder="John Doe" className={`${inp} ${b('fullName')}`} />
                            {er('fullName')}
                          </Field>
                          <Field label="Email Address" required icon={Mail}>
                            <input name="email" type="email" value={form.email} onChange={set} placeholder="john@example.com" className={`${inp} ${b('email')}`} />
                            {er('email')}
                          </Field>
                          <Field label="Phone Number" required icon={Phone}>
                            <input name="phone" value={form.phone} onChange={set} placeholder="+91 9876543210" className={`${inp} ${b('phone')}`} />
                            {er('phone')}
                          </Field>
                        </div>
                        <div className="mt-4">
                          <Field label="Gender" required>
                            <div className="flex gap-3">
                              {['Male', 'Female', 'Other'].map(g => (
                                <label key={g} className={`flex-1 flex items-center justify-center py-3 rounded-xl border-2 cursor-pointer text-sm font-semibold transition-all
                                  ${form.gender === g ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-500 hover:border-blue-300'}`}>
                                  <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={set} className="hidden" />{g}
                                </label>
                              ))}
                            </div>
                            {er('gender')}
                          </Field>
                        </div>
                      </div>

                      <div className="border-t border-gray-100" />

                      {/* Academic */}
                      <div>
                        <SectionHead color="bg-purple-600" icon={GraduationCap} title="Academic Information" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Field label="College / University" required icon={GraduationCap}>
                            <input name="college" value={form.college} onChange={set} placeholder="Your college name" className={`${inp} ${b('college')}`} />
                            {er('college')}
                          </Field>
                          <Field label="Course" required icon={BookOpen}>
                            <select name="course" value={form.course} onChange={set} className={`${inp} cursor-pointer ${b('course')}`}>
                              <option value="">Select course</option>
                              {COURSES.map(c => <option key={c}>{c}</option>)}
                            </select>
                            {er('course')}
                          </Field>
                          <Field label="Year of Study" required>
                            <select name="year" value={form.year} onChange={set} className={`${inp} cursor-pointer ${b('year')}`}>
                              <option value="">Select year</option>
                              {YEARS.map(y => <option key={y}>{y}</option>)}
                            </select>
                            {er('year')}
                          </Field>
                          <Field label="City" required icon={MapPin}>
                            <input name="city" value={form.city} onChange={set} placeholder="Your city" className={`${inp} ${b('city')}`} />
                            {er('city')}
                          </Field>
                          <Field label="State" required icon={MapPin}>
                            <input name="state" value={form.state} onChange={set} placeholder="Your state" className={`${inp} ${b('state')}`} />
                            {er('state')}
                          </Field>
                        </div>
                      </div>

                      <div className="border-t border-gray-100" />

                      {/* Internship */}
                      <div>
                        <SectionHead color="bg-indigo-600" icon={Briefcase} title="Internship Details" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Field label="Internship Category" required icon={Briefcase}>
                            <select name="category" value={form.category} onChange={set} className={`${inp} cursor-pointer ${b('category')}`}>
                              <option value="">Select category</option>
                              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                            </select>
                            {er('category')}
                          </Field>
                          <Field label="Experience Level" required icon={Layers}>
                            <select name="experience" value={form.experience} onChange={set} className={`${inp} cursor-pointer ${b('experience')}`}>
                              <option value="">Select level</option>
                              {LEVELS.map(l => <option key={l}>{l}</option>)}
                            </select>
                            {er('experience')}
                          </Field>
                        </div>
                        <div className="mt-4">
                          <Field label="Preferred Duration" required>
                            <div className="flex flex-wrap gap-3">
                              {DURATIONS.map(d => (
                                <label key={d} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 cursor-pointer text-sm font-semibold transition-all
                                  ${form.duration === d ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-500 hover:border-blue-300'}`}>
                                  <input type="radio" name="duration" value={d} checked={form.duration === d} onChange={set} className="hidden" />{d}
                                </label>
                              ))}
                            </div>
                            {er('duration')}
                          </Field>
                        </div>
                      </div>

                      <div className="border-t border-gray-100" />

                      {/* Profile & Resume */}
                      <div>
                        <SectionHead color="bg-emerald-600" icon={Globe} title="Profile & Resume" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Field label="LinkedIn Profile" required icon={Linkedin}>
                            <input name="linkedin" value={form.linkedin} onChange={set} placeholder="linkedin.com/in/yourname" className={`${inp} ${b('linkedin')}`} />
                            {er('linkedin')}
                          </Field>
                          <Field label="GitHub Profile" required icon={Github}>
                            <input name="github" value={form.github} onChange={set} placeholder="github.com/yourname" className={`${inp} ${b('github')}`} />
                            {er('github')}
                          </Field>
                          <Field label="Portfolio / Website" icon={Globe}>
                            <input name="portfolio" value={form.portfolio} onChange={set} placeholder="yourportfolio.com (optional)" className={inp} />
                          </Field>
                        </div>

                        {/* Resume Upload */}
                        <div className="mt-4">
                          <Field label="Upload Resume" required icon={FileText}>
                            <div
                              onClick={() => fileRef.current.click()}
                              className={`w-full border-2 border-dashed rounded-xl px-4 py-5 flex flex-col items-center justify-center cursor-pointer transition-all
                                ${errors.resume ? 'border-red-400 bg-red-50' : resume ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'}`}>
                              <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden"
                                onChange={e => { setResume(e.target.files[0]); setErrors(p => ({ ...p, resume: '' })); }} />
                              {resume ? (
                                <div className="flex items-center gap-2 text-green-700">
                                  <FileText size={20} />
                                  <span className="text-sm font-semibold truncate max-w-xs">{resume.name}</span>
                                  <button type="button" onClick={ev => { ev.stopPropagation(); setResume(null); }}
                                    className="ml-1 text-red-400 hover:text-red-600"><X size={14} /></button>
                                </div>
                              ) : (
                                <>
                                  <Upload size={24} className="text-gray-400 mb-2" />
                                  <p className="text-sm font-semibold text-gray-600">Click to upload resume</p>
                                  <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX — max 5MB</p>
                                </>
                              )}
                            </div>
                            {er('resume')}
                          </Field>
                        </div>

                        <div className="mt-4">
                          <Field label="Why do you want this internship?" required icon={MessageSquare}>
                            <textarea name="message" value={form.message} onChange={set} rows={4}
                              placeholder="Tell us about your motivation, goals, and what you hope to achieve..."
                              className={`${inp} resize-none ${b('message')}`} />
                            {er('message')}
                          </Field>
                        </div>
                      </div>

                      <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                        {loading
                          ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />Submitting...</>
                          : <><Send size={18} />Submit Application</>}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
