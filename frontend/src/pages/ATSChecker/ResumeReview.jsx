import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, AlertCircle, CheckCircle, TrendingUp, Lock,
  FileText, RefreshCw, ChevronDown, ChevronUp, Zap, Target, Shield, BarChart3
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';
import { toast } from 'sonner';

const ATS_API = import.meta.env.VITE_ATS_API || 'http://localhost:8000/api/v1/ats';

/* ── Circular Score Ring ─────────────────────────────────────── */
const ScoreRing = ({ score }) => {
  const r = 54, c = 2 * Math.PI * r;
  const color = score >= 75 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444';
  return (
    <svg width="140" height="140" viewBox="0 0 140 140">
      <circle cx="70" cy="70" r={r} fill="none" stroke="#1e293b" strokeWidth="10" />
      <circle cx="70" cy="70" r={r} fill="none" stroke={color} strokeWidth="10"
        strokeDasharray={c} strokeDashoffset={c - (score / 100) * c}
        strokeLinecap="round" transform="rotate(-90 70 70)"
        style={{ transition: 'stroke-dashoffset 1.2s ease' }} />
      <text x="70" y="65" textAnchor="middle" fill="white" fontSize="28" fontWeight="800">{score}</text>
      <text x="70" y="85" textAnchor="middle" fill="#94a3b8" fontSize="11">out of 100</text>
    </svg>
  );
};

/* ── Sub-score bar ───────────────────────────────────────────── */
const SubBar = ({ label, value, icon: Icon, color }) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between text-sm">
      <span className="flex items-center gap-1.5 text-slate-300"><Icon size={13} />{label}</span>
      <span className="font-bold" style={{ color }}>{value}%</span>
    </div>
    <div className="h-1.5 rounded-full bg-slate-700">
      <motion.div className="h-full rounded-full" style={{ background: color }}
        initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.9, delay: 0.2 }} />
    </div>
  </div>
);

/* ── Issue card ──────────────────────────────────────────────── */
const IssueCard = ({ issue, idx }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
      className="bg-slate-800/60 border border-slate-700 rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-700/40 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
            <AlertCircle size={15} className="text-orange-400" />
          </div>
          <div>
            <p className="font-semibold text-white text-sm">{issue.title}</p>
            <p className="text-xs text-slate-400">{issue.desc}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {issue.locked && <Lock size={13} className="text-slate-500" />}
          <Badge className="bg-slate-700 text-slate-300 text-xs border-0">{issue.category}</Badge>
          {open ? <ChevronUp size={15} className="text-slate-400" /> : <ChevronDown size={15} className="text-slate-400" />}
        </div>
      </button>
      <AnimatePresence>
        {open && issue.fix && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
            className="overflow-hidden">
            <div className="px-4 pb-4 pt-0">
              <div className="ml-11 p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                <p className="text-xs text-blue-300"><span className="font-semibold text-blue-400">Fix: </span>{issue.fix}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ── Main Component ──────────────────────────────────────────── */
const ResumeReview = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previousScore, setPreviousScore] = useState(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const processFile = (f) => {
    if (!f) return;
    if (f.size > 2 * 1024 * 1024) { toast.error('File must be under 2MB'); return; }
    setFile(f);
    analyze(f);
  };

  const analyze = async (f) => {
    setLoading(true); setProgress(0);
    const iv = setInterval(() => setProgress(p => p < 88 ? p + 8 : p), 220);
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        if (result) setPreviousScore(result.score);
        const res = await axios.post(`${ATS_API}/check`,
          { resumeText: e.target.result, jobDescription: 'General job requirements including technical skills, experience, education, and professional achievements.' },
          { withCredentials: true });
        setProgress(100);
        setTimeout(() => { setResult(res.data.analysis); clearInterval(iv); setLoading(false); }, 400);
        toast.success('Resume analyzed!');
      } catch (err) {
        clearInterval(iv); setLoading(false);
        toast.error(err?.response?.data?.message || 'Analysis failed');
      }
    };
    reader.readAsText(f);
  };

  /* ── Derived data ── */
  const getIssues = () => {
    if (!result) return [];
    const d = result.detailedAnalysis, issues = [];
    if (!d.content.hasContactInfo) issues.push({ title: 'Missing contact info', desc: 'Add email, phone & LinkedIn', category: 'Content', fix: 'Include: Full name, Email, Phone, LinkedIn URL' });
    if (!d.content.hasSummary) issues.push({ title: 'No professional summary', desc: 'Add a 2-3 sentence summary', category: 'Content', fix: 'Highlight experience, key skills, and career goals' });
    if (!d.content.hasExperience) issues.push({ title: 'Missing work experience', desc: 'Add work history with achievements', category: 'Content', fix: 'List: Company, Title, Dates, 3-5 achievement bullets' });
    if (!d.content.hasEducation) issues.push({ title: 'Missing education', desc: 'Include educational background', category: 'Content', fix: 'Add: Degree, Institution, Graduation year' });
    if (!d.content.hasSkills) issues.push({ title: 'No skills section', desc: 'List technical and soft skills', category: 'Skills', fix: 'Add 8-12 relevant technical and soft skills' });
    if (d.keywords.technicalSkills.length < 5) issues.push({ title: 'Insufficient technical skills', desc: `Only ${d.keywords.technicalSkills.length} found`, category: 'Skills', fix: 'Add programming languages, tools, frameworks' });
    if (d.keywords.actionVerbs.length < 8) issues.push({ title: 'Weak action verbs', desc: `Only ${d.keywords.actionVerbs.length} strong verbs`, category: 'Impact', fix: 'Use: Spearheaded, Orchestrated, Pioneered, Accelerated' });
    if (!d.optimization.hasQuantifiableAchievements) issues.push({ title: 'No quantifiable achievements', desc: 'Add numbers and metrics', category: 'Impact', fix: '"Increased sales by 25%", "Managed $2M budget"' });
    if (d.readability.wordCount < 200) issues.push({ title: 'Resume too short', desc: `Only ${d.readability.wordCount} words`, category: 'Brevity', fix: 'Expand with more details about responsibilities and impact' });
    if (d.keywords.softSkills.length < 3) issues.push({ title: 'Weak soft skills', desc: 'Add communication-related achievements', category: 'Skills', locked: true, fix: 'Include: presentations, team collaboration, client communication' });
    return issues;
  };

  const getChecks = () => {
    if (!result) return [];
    const d = result.detailedAnalysis, checks = [];
    if (d.content.hasContactInfo) checks.push({ title: 'Contact info present', desc: 'Email, phone & LinkedIn found' });
    if (d.keywords.actionVerbs.length >= 5) checks.push({ title: 'Strong action verbs', desc: `${d.keywords.actionVerbs.length} action verbs detected` });
    if (d.content.hasExperience) checks.push({ title: 'Work experience', desc: 'Experience section found' });
    if (d.content.hasEducation) checks.push({ title: 'Education included', desc: 'Education section present' });
    if (d.formatting.score >= 70) checks.push({ title: 'Good formatting', desc: 'Layout and structure looks clean' });
    if (d.keywords.technicalSkills.length > 0) checks.push({ title: 'Technical skills listed', desc: `${d.keywords.technicalSkills.length} skills found` });
    if (d.optimization.hasQuantifiableAchievements) checks.push({ title: 'Measurable results', desc: 'Quantifiable achievements present' });
    return checks;
  };

  const scoreMsg = (s) => s >= 80
    ? 'Strong resume — scores well on key recruiter checks.'
    : s >= 60 ? 'Good foundation, but several areas need improvement.'
    : 'Needs significant work to pass ATS filters.';

  const subScores = result ? [
    { label: 'Formatting', value: result.detailedAnalysis.formatting.score, icon: FileText, color: '#6366f1' },
    { label: 'Content', value: result.detailedAnalysis.content.score, icon: Shield, color: '#22c55e' },
    { label: 'Keywords', value: result.detailedAnalysis.keywords.score, icon: Zap, color: '#f59e0b' },
    { label: 'Impact', value: result.detailedAnalysis.optimization.score, icon: Target, color: '#ec4899' },
    { label: 'Readability', value: result.detailedAnalysis.readability.score, icon: BarChart3, color: '#06b6d4' },
  ] : [];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-4xl font-black bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
            Resume Review
          </h1>
          <p className="text-slate-400">Upload your resume and get instant ATS feedback</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!result ? (
            /* ── Upload Zone ── */
            <motion.div key="upload" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
              className="max-w-xl mx-auto">
              <div
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={e => { e.preventDefault(); setDragging(false); processFile(e.dataTransfer.files[0]); }}
                onClick={() => !loading && inputRef.current.click()}
                className={`relative border-2 border-dashed rounded-3xl p-16 text-center cursor-pointer transition-all duration-300
                  ${dragging ? 'border-amber-400 bg-amber-400/10' : 'border-slate-600 bg-slate-800/50 hover:border-amber-500/60 hover:bg-slate-800'}`}>

                <input ref={inputRef} type="file" accept=".pdf,.docx,.txt" className="hidden"
                  onChange={e => processFile(e.target.files[0])} />

                {loading ? (
                  <div className="space-y-5">
                    <div className="w-16 h-16 mx-auto border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
                    <p className="text-lg font-semibold text-white">Analyzing your resume…</p>
                    <p className="text-sm text-slate-400">Running 20+ checks</p>
                    <div className="max-w-xs mx-auto space-y-1">
                      <Progress value={progress} className="h-2 bg-slate-700" />
                      <p className="text-xs text-slate-500">{progress}% complete</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center">
                      <Upload size={32} className="text-amber-400" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Drop your resume here</h2>
                    <p className="text-slate-400 mb-5 text-sm">PDF, DOCX, or TXT · Max 2MB</p>
                    <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold px-8 py-3 rounded-full transition-all shadow-lg shadow-amber-500/25">
                      Choose File
                    </button>
                    {file && <p className="mt-4 text-xs text-slate-500">{file.name}</p>}
                  </>
                )}
              </div>
            </motion.div>
          ) : (
            /* ── Results ── */
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

              {/* Top bar */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-200">Your Results</h2>
                <button onClick={() => { setResult(null); setFile(null); }}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
                  <RefreshCw size={14} /> Reanalyze
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* ── Left: Score card ── */}
                <div className="space-y-4">
                  {/* Score ring */}
                  <div className="bg-slate-800/70 border border-slate-700 rounded-3xl p-6 text-center">
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">ATS Score</p>
                    <div className="flex justify-center mb-4">
                      <ScoreRing score={result.score} />
                    </div>
                    {previousScore && (
                      <div className="flex items-center justify-center gap-1 text-green-400 text-sm mb-3">
                        <TrendingUp size={14} /> +{result.score - previousScore} from last scan
                      </div>
                    )}
                    <p className="text-sm text-slate-400 leading-relaxed">{scoreMsg(result.score)}</p>
                  </div>

                  {/* Sub-scores */}
                  <div className="bg-slate-800/70 border border-slate-700 rounded-3xl p-5 space-y-3">
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Breakdown</p>
                    {subScores.map(s => <SubBar key={s.label} {...s} />)}
                  </div>

                  {/* Completed checks */}
                  <div className="bg-slate-800/70 border border-slate-700 rounded-3xl p-5">
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">What you did well</p>
                    <div className="space-y-2">
                      {getChecks().map((c, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-white">{c.title}</p>
                            <p className="text-xs text-slate-500">{c.desc}</p>
                          </div>
                        </div>
                      ))}
                      {getChecks().length === 0 && <p className="text-xs text-slate-500">No checks passed yet</p>}
                    </div>
                  </div>
                </div>

                {/* ── Right: Issues ── */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-slate-800/70 border border-slate-700 rounded-3xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-xs text-slate-500 uppercase tracking-widest">Issues to Fix</p>
                      <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">
                        {getIssues().length} found
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {getIssues().length === 0
                        ? <p className="text-sm text-slate-400 text-center py-6">🎉 No major issues found!</p>
                        : getIssues().map((issue, idx) => <IssueCard key={idx} issue={issue} idx={idx} />)
                      }
                    </div>
                  </div>

                  {/* Keywords */}
                  {result.detailedAnalysis.keywords.technicalSkills.length > 0 && (
                    <div className="bg-slate-800/70 border border-slate-700 rounded-3xl p-5">
                      <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Detected Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {result.detailedAnalysis.keywords.technicalSkills.map((s, i) => (
                          <span key={i} className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-xs">{s}</span>
                        ))}
                        {result.detailedAnalysis.keywords.softSkills.map((s, i) => (
                          <span key={i} className="px-2.5 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-full text-xs">{s}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggestions */}
                  {result.suggestions?.length > 0 && (
                    <div className="bg-slate-800/70 border border-slate-700 rounded-3xl p-5">
                      <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">AI Suggestions</p>
                      <ul className="space-y-2">
                        {result.suggestions.map((s, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                            <span className="text-amber-400 mt-0.5">→</span>{s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResumeReview;
