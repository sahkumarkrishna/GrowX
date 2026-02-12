import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, AlertCircle, CheckCircle, XCircle, ChevronRight, Lock, TrendingUp, FileText, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import axios from 'axios';
import { toast } from 'sonner';

const ResumeReview = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previousScore, setPreviousScore] = useState(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const ATS_API = `${import.meta.env.VITE_ATS_API || 'http://localhost:8000/api/v1/ats'}`;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= 2 * 1024 * 1024) {
      setFile(selectedFile);
      handleAnalyze(selectedFile);
    } else {
      toast.error('File size must be less than 2MB');
    }
  };

  const handleAnalyze = async (uploadedFile) => {
    const fileToAnalyze = uploadedFile || file;
    if (!fileToAnalyze) return;

    setLoading(true);
    setAnalysisProgress(0);
    
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => prev < 90 ? prev + 10 : prev);
    }, 200);
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const resumeText = e.target.result;
        const jobDescription = "General job requirements including technical skills, experience, education, and professional achievements.";
        
        if (result) setPreviousScore(result.score);
        
        const res = await axios.post(`${ATS_API}/check`, { resumeText, jobDescription }, { withCredentials: true });
        setAnalysisProgress(100);
        setTimeout(() => {
          setResult(res.data.analysis);
          toast.success('Resume analyzed successfully!');
          clearInterval(progressInterval);
          setLoading(false);
        }, 500);
      } catch (error) {
        clearInterval(progressInterval);
        toast.error(error?.response?.data?.message || 'Analysis failed');
        setLoading(false);
      }
    };
    reader.readAsText(fileToAnalyze);
  };

  const getScoreMessage = (score) => {
    if (score >= 80) return "You made a good start to your resume, and it scores well on some key checks hiring managers care about.";
    if (score >= 60) return "Your resume has potential but needs improvements in several key areas.";
    return "Your resume needs significant improvements to pass ATS systems and impress recruiters.";
  };

  const getTopIssues = () => {
    if (!result) return [];
    const issues = [];
    
    // Formatting issues
    if (result.detailedAnalysis.formatting.score < 70) {
      const formattingIssues = result.detailedAnalysis.formatting.issues;
      if (formattingIssues.length > 0) {
        formattingIssues.forEach(issue => {
          issues.push({ 
            title: 'Formatting: ' + issue.split(':')[0], 
            desc: issue, 
            category: 'Brevity', 
            score: Math.round(result.detailedAnalysis.formatting.score),
            fix: getFormattingFix(issue)
          });
        });
      } else {
        issues.push({ 
          title: 'Length & depth', 
          desc: "Your resume isn't the right length or depth", 
          category: 'Brevity', 
          score: Math.round(result.detailedAnalysis.formatting.score),
          fix: 'Aim for 200-5000 characters with proper structure and line breaks'
        });
      }
    }
    
    // Content issues
    if (!result.detailedAnalysis.content.hasContactInfo) {
      issues.push({ 
        title: 'Missing contact information', 
        desc: 'Add your email, phone, and LinkedIn profile', 
        category: 'Content', 
        score: 0,
        fix: 'Include: Full name, Email, Phone number, LinkedIn URL, Location (optional)'
      });
    }
    if (!result.detailedAnalysis.content.hasSummary) {
      issues.push({ 
        title: 'No professional summary', 
        desc: 'Add a compelling 2-3 sentence summary at the top', 
        category: 'Content', 
        score: 0,
        fix: 'Write a summary highlighting your experience, key skills, and career goals'
      });
    }
    if (!result.detailedAnalysis.content.hasExperience) {
      issues.push({ 
        title: 'Missing work experience', 
        desc: 'Add your work history with achievements', 
        category: 'Content', 
        score: 0,
        fix: 'List jobs with: Company, Title, Dates, 3-5 bullet points of achievements'
      });
    }
    if (!result.detailedAnalysis.content.hasEducation) {
      issues.push({ 
        title: 'Missing education section', 
        desc: 'Include your educational background', 
        category: 'Content', 
        score: 0,
        fix: 'Add: Degree, Institution, Graduation year, GPA (if above 3.5)'
      });
    }
    if (!result.detailedAnalysis.content.hasSkills) {
      issues.push({ 
        title: 'No skills section', 
        desc: 'List your technical and soft skills', 
        category: 'Skills', 
        score: 0,
        fix: 'Create a skills section with 8-12 relevant technical and soft skills'
      });
    }
    
    // Keyword issues
    if (result.detailedAnalysis.keywords.technicalSkills.length < 5) {
      issues.push({ 
        title: 'Insufficient technical skills', 
        desc: `Only ${result.detailedAnalysis.keywords.technicalSkills.length} technical skills found`, 
        category: 'Skills', 
        score: Math.round(result.detailedAnalysis.keywords.score),
        fix: 'Add more relevant technical skills like programming languages, tools, frameworks'
      });
    }
    if (result.detailedAnalysis.keywords.softSkills.length < 3) {
      issues.push({ 
        title: 'Weak communication skills', 
        desc: 'Add more communication-related achievements', 
        category: 'Skills', 
        score: 0, 
        locked: true,
        fix: 'Include examples of: presentations, team collaboration, client communication'
      });
    }
    if (result.detailedAnalysis.keywords.softSkills.filter(s => s.includes('lead')).length === 0) {
      issues.push({ 
        title: 'No leadership demonstrated', 
        desc: 'Show leadership experience and initiative', 
        category: 'Skills', 
        score: 0, 
        locked: true,
        fix: 'Add examples of: leading projects, mentoring, managing teams, taking initiative'
      });
    }
    if (result.detailedAnalysis.keywords.actionVerbs.length < 8) {
      issues.push({ 
        title: 'Weak action verbs', 
        desc: `Only ${result.detailedAnalysis.keywords.actionVerbs.length} strong action verbs used`, 
        category: 'Impact', 
        score: Math.round(result.detailedAnalysis.keywords.score),
        fix: 'Use stronger verbs like: Spearheaded, Orchestrated, Pioneered, Transformed, Accelerated'
      });
    }
    
    // Optimization issues
    if (!result.detailedAnalysis.optimization.hasQuantifiableAchievements) {
      issues.push({ 
        title: 'No quantifiable achievements', 
        desc: 'Add numbers and metrics to show impact', 
        category: 'Impact', 
        score: 0,
        fix: 'Include metrics like: "Increased sales by 25%", "Managed $2M budget", "Led team of 10"'
      });
    }
    if (result.detailedAnalysis.optimization.keywordDensity < 10) {
      issues.push({ 
        title: 'Low keyword density', 
        desc: 'Not enough job-relevant keywords', 
        category: 'Keywords', 
        score: Math.round(result.detailedAnalysis.optimization.score),
        fix: 'Add more keywords from the job description throughout your resume'
      });
    }
    
    // Readability issues
    if (result.detailedAnalysis.readability.wordCount < 200) {
      issues.push({ 
        title: 'Resume too short', 
        desc: `Only ${result.detailedAnalysis.readability.wordCount} words - expand with more details`, 
        category: 'Brevity', 
        score: Math.round(result.detailedAnalysis.readability.score),
        fix: 'Add more details about your responsibilities, achievements, and impact'
      });
    }
    if (result.detailedAnalysis.readability.wordCount > 1000) {
      issues.push({ 
        title: 'Resume too long', 
        desc: `${result.detailedAnalysis.readability.wordCount} words - be more concise`, 
        category: 'Brevity', 
        score: Math.round(result.detailedAnalysis.readability.score),
        fix: 'Remove redundant information, focus on most recent and relevant experience'
      });
    }
    if (result.detailedAnalysis.readability.avgWordLength > 7) {
      issues.push({ 
        title: 'Complex language', 
        desc: 'Use simpler, clearer language', 
        category: 'Readability', 
        score: Math.round(result.detailedAnalysis.readability.score),
        fix: 'Replace complex words with simpler alternatives, use active voice'
      });
    }
    
    return issues;
  };

  const getFormattingFix = (issue) => {
    if (issue.includes('too short')) return 'Expand your resume to at least 200 characters with proper sections';
    if (issue.includes('too long')) return 'Reduce to under 5000 characters, focus on most relevant information';
    if (issue.includes('capitalization')) return 'Use proper capitalization for names, titles, and section headers';
    if (issue.includes('line breaks')) return 'Add more line breaks between sections for better readability';
    return 'Review and fix formatting issues';
  };

  const getCompletedChecks = () => {
    if (!result) return [];
    const checks = [];
    
    if (result.detailedAnalysis.formatting.issues.length === 0) {
      checks.push({ title: 'Dates', desc: 'Your dates are in the right format', score: 10 });
    }
    if (result.detailedAnalysis.content.hasContactInfo) {
      checks.push({ title: 'Contact info', desc: 'Contact information is present', score: 10 });
    }
    if (result.detailedAnalysis.keywords.actionVerbs.length >= 5) {
      checks.push({ title: 'Action verbs', desc: "You didn't overuse any verbs", score: 10 });
    }
    if (result.detailedAnalysis.content.hasExperience) {
      checks.push({ title: 'Work experience', desc: 'Work experience section is present', score: 10 });
    }
    if (result.detailedAnalysis.content.hasEducation) {
      checks.push({ title: 'Education', desc: 'Education section is included', score: 10 });
    }
    if (result.detailedAnalysis.formatting.score >= 70) {
      checks.push({ title: 'Page density', desc: 'Your page layout looks right', score: 10 });
    }
    if (result.detailedAnalysis.keywords.technicalSkills.length > 0) {
      checks.push({ title: 'Skills section', desc: 'Technical skills are listed', score: 10 });
    }
    if (result.detailedAnalysis.optimization.hasQuantifiableAchievements) {
      checks.push({ title: 'Measurable results', desc: 'You included quantifiable achievements', score: 10 });
    }
    
    return checks;
  };

  return (
    <div className="bg-gray-50" id="upload-section">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {!result ? (
          /* Upload Section */
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
            <Card className="shadow-lg">
              <CardContent className="p-6 sm:p-12 text-center">
                {loading ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <h3 className="text-xl sm:text-2xl font-bold">Analyzing your resume...</h3>
                    <p className="text-sm sm:text-base text-gray-600">Running 20+ checks on your resume</p>
                    <div className="max-w-md mx-auto">
                      <Progress value={analysisProgress} className="h-2" />
                      <p className="text-sm text-gray-500 mt-2">{analysisProgress}% complete</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-blue-600" />
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">Upload Your Resume</h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-6">Get instant feedback on your resume in seconds</p>
                    <input
                      type="file"
                      accept=".pdf,.docx,.txt"
                      onChange={handleFileChange}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload">
                      <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg cursor-pointer" asChild>
                        <span>Choose File</span>
                      </Button>
                    </label>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          /* Results Dashboard */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-3">
              <Card className="lg:sticky lg:top-24">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-gray-600">TOP FIXES</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {getTopIssues().slice(0, 5).map((issue, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                        <span className="text-xs sm:text-sm truncate">{issue.title}</span>
                      </div>
                      <Badge variant="outline" className="text-xs flex-shrink-0">{issue.score}</Badge>
                    </div>
                  ))}
                  {getTopIssues().length > 5 && (
                    <button className="text-xs sm:text-sm text-blue-600 hover:underline mt-2">{getTopIssues().length - 5} more issues →</button>
                  )}
                </CardContent>

                <CardHeader className="pb-3 pt-6">
                  <CardTitle className="text-sm font-semibold text-green-600">COMPLETED</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {getCompletedChecks().slice(0, 5).map((check, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-xs sm:text-sm truncate">{check.title}</span>
                      </div>
                      <Badge variant="outline" className="text-xs bg-green-50 flex-shrink-0">{check.score}</Badge>
                    </div>
                  ))}
                  {getCompletedChecks().length > 5 && (
                    <button className="text-xs sm:text-sm text-blue-600 hover:underline mt-2">{getCompletedChecks().length - 5} more checks →</button>
                  )}
                  {getCompletedChecks().length === 0 && (
                    <p className="text-xs sm:text-sm text-gray-500 py-4">No checks completed yet</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9 space-y-6">
              {/* Welcome Message */}
              <Card>
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4">Good evening, User.</h2>
                  <p className="text-sm sm:text-base text-gray-600 mb-6">Welcome to your resume review.</p>
                  
                  {/* Score Display */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 mb-6">
                    <div>
                      <div className="text-xs sm:text-sm text-gray-600 mb-2">Latest Score</div>
                      <div className="text-4xl sm:text-6xl font-black text-blue-600">{result.score}</div>
                      <div className="text-sm sm:text-base text-gray-600">out of 100</div>
                    </div>
                    {previousScore && (
                      <div>
                        <div className="text-xs sm:text-sm text-gray-600 mb-2">Previous Score</div>
                        <div className="text-2xl sm:text-4xl font-bold text-gray-400">{previousScore}</div>
                        <div className="flex items-center gap-1 text-green-600 text-xs sm:text-sm mt-1">
                          <TrendingUp className="w-4 h-4" />
                          +{result.score - previousScore} points
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">{getScoreMessage(result.score)}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs sm:text-sm mb-2">
                      <span className="font-semibold">YOUR RESUME</span>
                      <span className="text-gray-500">TOP RESUMES</span>
                    </div>
                    <Progress value={result.score} className="h-2 sm:h-3" />
                  </div>

                  {previousScore && result.score > previousScore && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 flex items-start gap-3">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-xs sm:text-sm text-green-800">
                        Your resume score has increased by ~{result.score - previousScore} points since your last upload. Excellent work on improving your resume.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* How it works */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Steps to increase your score</CardTitle>
                  <p className="text-gray-600 text-sm">Here are some recruiter checks that are bringing your score down. Click into each to learn where you went wrong and how to improve your score.</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {getTopIssues().map((issue, idx) => (
                    <div key={idx} className="border rounded-lg p-4 hover:border-blue-400 transition-all cursor-pointer bg-white">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <AlertCircle className="w-5 h-5 text-orange-500" />
                            <h3 className="font-semibold">{issue.title}</h3>
                          </div>
                          <p className="text-sm text-gray-600 ml-8 mb-2">{issue.desc}</p>
                          {issue.locked && (
                            <div className="flex items-center gap-2 ml-8 mb-2">
                              <Lock className="w-4 h-4 text-gray-400" />
                              <span className="text-xs text-gray-500">This check is only for Pro users. Upgrade to unlock this check.</span>
                            </div>
                          )}
                          {issue.fix && (
                            <div className="ml-8 mt-2 p-3 bg-blue-50 border border-blue-200 rounded">
                              <p className="text-sm text-blue-800"><strong>How to fix:</strong> {issue.fix}</p>
                            </div>
                          )}
                          <Badge variant="outline" className="ml-8 mt-2 text-xs">{issue.category}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          {!issue.locked && <Button size="sm" variant="outline">Fix</Button>}
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">Show More</Button>
                </CardContent>
              </Card>

              {/* What you did well */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">What you did well</CardTitle>
                  <p className="text-gray-600 text-sm">We ran 20+ checks on your resume. Here's a rundown of key areas you did well in - well done.</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {getCompletedChecks().length > 0 ? (
                    getCompletedChecks().slice(0, 5).map((check, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold">{check.title}</h4>
                          <p className="text-sm text-gray-600">{check.desc}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">Complete more checks to see what you're doing well.</p>
                  )}
                </CardContent>
              </Card>

              {/* Detailed Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Detailed Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-3 sm:p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm sm:text-base font-semibold">Formatting</span>
                        <span className="text-xl sm:text-2xl font-bold">{result.detailedAnalysis.formatting.score}%</span>
                      </div>
                      <Progress value={result.detailedAnalysis.formatting.score} className="h-2" />
                    </div>
                    <div className="border rounded-lg p-3 sm:p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm sm:text-base font-semibold">Content</span>
                        <span className="text-xl sm:text-2xl font-bold">{result.detailedAnalysis.content.score}%</span>
                      </div>
                      <Progress value={result.detailedAnalysis.content.score} className="h-2" />
                    </div>
                    <div className="border rounded-lg p-3 sm:p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm sm:text-base font-semibold">Keywords</span>
                        <span className="text-xl sm:text-2xl font-bold">{result.detailedAnalysis.keywords.score}%</span>
                      </div>
                      <Progress value={result.detailedAnalysis.keywords.score} className="h-2" />
                    </div>
                    <div className="border rounded-lg p-3 sm:p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm sm:text-base font-semibold">Impact</span>
                        <span className="text-xl sm:text-2xl font-bold">{result.detailedAnalysis.optimization.score}%</span>
                      </div>
                      <Progress value={result.detailedAnalysis.optimization.score} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-2">Unlock full report</h3>
                  <p className="mb-4">Get detailed insights and personalized recommendations</p>
                  <Button className="bg-white text-blue-600 hover:bg-gray-100">Upgrade to Pro</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeReview;
