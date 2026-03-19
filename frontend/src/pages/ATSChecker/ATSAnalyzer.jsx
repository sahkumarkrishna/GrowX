import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Briefcase, CheckCircle, XCircle, Lightbulb,
  TrendingUp, Zap, Target, Shield, BarChart3, Sparkles
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { toast } from 'sonner';

const ATS_API = import.meta.env.VITE_USER_API?.replace('/user', '/ats') || 'http://localhost:8000/api/v1/ats';

/* ── Score Ring ──────────────────────────────────────────────── */
const ScoreRing = ({ score }) => {
  const r = 60, c = 2 * Math.PI * r;
  const color = score >= 75 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444';
  const label = score >= 75 ? 'Excellent' : score >= 50 ? 'Average' : 'Needs Work';
  return (
    <div className="flex flex-col items-center">
      <svg width="160" height="160" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r={r} fill="none" stroke="#1e293b" strokeWidth="12" />
        <circle cx="80" cy="80" r={r} fill="none" stroke={color} strokeWidth="12"
          strokeDasharray={c} strokeDashoffset={c - (score / 100) * c}
          strokeLinecap="round" transform="rotate(-90 80 80)"
          style={{ transition: 'stroke-dashoffset 1.4s ease' }} />
        <text x="80" y="74" textAnchor="middle" fill="white" fontSize="32" fontWeight="900">{score}</text>
        <text x="80" y="94" textAnchor="middle" fill="#94a3b8" fontSize="12">out of 100</text>
      </svg>
      <span className="text-sm font-semibold mt-1" style={{ color }}>{label}</span>
    </div>
  );
};

/* ── Sub-score pill ──────────────────────────────────────────── */
const ScorePill = ({ label, value, icon: Icon, color, bg }) => (
  <div className={`flex flex-col items-center p-4 rounded-2xl border ${bg}`}>
    <Icon size={20} style={{ color }} className="mb-1" />
    <span className="text-2xl font-black" style={{ color }}>{value}%</span>
    <span className="text-xs text-slate-400 mt-0.5">{label}</span>
  </div>
);

/* ── Keyword chip ────────────────────────────────────────────── */
const Chip = ({ text, variant }) => {
  const styles = {
    green: 'bg-green-500/15 text-green-300 border-green-500/30',
    red: 'bg-red-500/15 text-red-300 border-red-500/30',
    blue: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    purple: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  };
  return <span className={`px-2.5 py-1 rounded-full text-xs border ${styles[variant]}`}>{text}</span>;
};

/* ── Main ────────────────────────────────────────────────────── */
const ATSAnalyzer = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resumeText || !jobDescription) { toast.error('Please fill both fields'); return; }
    setLoading(true);
    try {
      const res = await axios.post(`${ATS_API}/check`, { resumeText, jobDescription }, { withCredentials: true });
      setResult(res.data.analysis);
      toast.success('Analysis complete!');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const d = result?.detailedAnalysis;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            ATS Resume Analyzer
          </h1>
          <p className="text-slate-400">Paste your resume and job description to get a detailed match score</p>
        </motion.div>

        {/* Input grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
          {[
            { label: 'Your Resume', icon: FileText, color: 'from-blue-600 to-indigo-600', border: 'border-blue-500/30 focus:border-blue-400',
              placeholder: 'Paste your resume text here…', value: resumeText, set: setResumeText },
            { label: 'Job Description', icon: Briefcase, color: 'from-purple-600 to-pink-600', border: 'border-purple-500/30 focus:border-purple-400',
              placeholder: 'Paste the job description here…', value: jobDescription, set: setJobDescription },
          ].map(({ label, icon: Icon, color, border, placeholder, value, set }) => (
            <motion.div key={label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/70 border border-slate-700 rounded-3xl overflow-hidden">
              <div className={`bg-gradient-to-r ${color} px-5 py-3 flex items-center gap-2`}>
                <Icon size={16} /><span className="font-semibold text-sm">{label}</span>
              </div>
              <div className="p-4">
                <Textarea placeholder={placeholder} value={value} onChange={e => set(e.target.value)}
                  className={`min-h-[260px] bg-slate-900/60 border ${border} text-slate-200 placeholder:text-slate-600 resize-none rounded-xl text-sm`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Analyze button */}
        <div className="text-center mb-8">
          <button onClick={handleAnalyze} disabled={loading}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold px-12 py-4 rounded-full text-base shadow-xl shadow-blue-500/25 transition-all">
            {loading ? (
              <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />Analyzing…</>
            ) : (
              <><Sparkles size={18} />Analyze Resume</>
            )}
          </button>
        </div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">

              {/* Score + sub-scores */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Ring */}
                <div className="bg-slate-800/70 border border-slate-700 rounded-3xl p-6 flex flex-col items-center justify-center">
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">Overall Score</p>
                  <ScoreRing score={result.score} />
                </div>

                {/* Sub-scores */}
                <div className="md:col-span-2 bg-slate-800/70 border border-slate-700 rounded-3xl p-6">
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">Score Breakdown</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    <ScorePill label="Formatting" value={d.formatting.score} icon={FileText} color="#6366f1" bg="border-indigo-500/20 bg-indigo-500/5" />
                    <ScorePill label="Content" value={d.content.score} icon={Shield} color="#22c55e" bg="border-green-500/20 bg-green-500/5" />
                    <ScorePill label="Keywords" value={d.keywords.score} icon={Zap} color="#f59e0b" bg="border-amber-500/20 bg-amber-500/5" />
                    <ScorePill label="Readability" value={d.readability.score} icon={BarChart3} color="#06b6d4" bg="border-cyan-500/20 bg-cyan-500/5" />
                    <ScorePill label="Impact" value={d.optimization.score} icon={Target} color="#ec4899" bg="border-pink-500/20 bg-pink-500/5" />
                  </div>
                </div>
              </div>

              {/* Content checklist */}
              <div className="bg-slate-800/70 border border-slate-700 rounded-3xl p-6">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">Content Checklist</p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { label: 'Contact Info', ok: d.content.hasContactInfo },
                    { label: 'Summary', ok: d.content.hasSummary },
                    { label: 'Experience', ok: d.content.hasExperience },
                    { label: 'Education', ok: d.content.hasEducation },
                    { label: 'Skills', ok: d.content.hasSkills },
                  ].map(({ label, ok }) => (
                    <div key={label} className={`flex items-center gap-2 p-3 rounded-xl border ${ok ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                      {ok ? <CheckCircle size={15} className="text-green-400 flex-shrink-0" /> : <XCircle size={15} className="text-red-400 flex-shrink-0" />}
                      <span className="text-xs font-medium text-slate-300">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Keywords */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { title: `Technical Skills (${d.keywords.technicalSkills.length})`, items: d.keywords.technicalSkills, variant: 'blue' },
                  { title: `Soft Skills (${d.keywords.softSkills.length})`, items: d.keywords.softSkills, variant: 'purple' },
                  { title: `Action Verbs (${d.keywords.actionVerbs.length})`, items: d.keywords.actionVerbs, variant: 'amber' },
                ].map(({ title, items, variant }) => (
                  <div key={title} className="bg-slate-800/70 border border-slate-700 rounded-3xl p-5">
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">{title}</p>
                    <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
                      {items.length ? items.map((s, i) => <Chip key={i} text={s} variant={variant} />) : <span className="text-xs text-slate-600">None detected</span>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Matched / Missing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-slate-800/70 border border-slate-700 rounded-3xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle size={15} className="text-green-400" />
                    <p className="text-xs text-slate-500 uppercase tracking-widest">Matched Keywords ({result.matchedKeywords.length})</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
                    {result.matchedKeywords.slice(0, 60).map((k, i) => <Chip key={i} text={k} variant="green" />)}
                  </div>
                </div>
                <div className="bg-slate-800/70 border border-slate-700 rounded-3xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <XCircle size={15} className="text-red-400" />
                    <p className="text-xs text-slate-500 uppercase tracking-widest">Missing Keywords ({result.missingKeywords.length})</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
                    {result.missingKeywords.map((k, i) => <Chip key={i} text={k} variant="red" />)}
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              {result.suggestions?.length > 0 && (
                <div className="bg-slate-800/70 border border-slate-700 rounded-3xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb size={15} className="text-amber-400" />
                    <p className="text-xs text-slate-500 uppercase tracking-widest">Improvement Suggestions</p>
                  </div>
                  <ul className="space-y-2">
                    {result.suggestions.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-amber-400 mt-0.5 flex-shrink-0">→</span>{s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ATSAnalyzer;
