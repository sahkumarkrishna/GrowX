import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Briefcase, CheckCircle, XCircle, Lightbulb, TrendingUp, Award, FileCheck, Eye, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';
import { toast } from 'sonner';

const ATSAnalyzer = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const ATS_API = `${import.meta.env.VITE_USER_API?.replace('/user', '/ats') || 'http://localhost:8000/api/v1/ats'}`;

  const handleAnalyze = async () => {
    if (!resumeText || !jobDescription) {
      toast.error('Please provide both resume and job description');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${ATS_API}/check`, { resumeText, jobDescription }, { withCredentials: true });
      setResult(res.data.analysis);
      toast.success('Analysis completed!');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 70) return 'from-green-500 to-emerald-500';
    if (score >= 50) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <h1 className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            ATS Resume Checker
          </h1>
          <p className="text-gray-600 text-lg">Optimize your resume to pass Applicant Tracking Systems</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Card className="shadow-xl border-2 border-blue-100">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Your Resume
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Textarea
                  placeholder="Paste your resume text here..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="min-h-[300px] border-2 focus:border-blue-500"
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Card className="shadow-xl border-2 border-purple-100">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Job Description
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Textarea
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[300px] border-2 focus:border-purple-500"
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="text-center mb-8">
          <Button
            onClick={handleAnalyze}
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-12 py-6 text-lg font-bold shadow-xl"
          >
            {loading ? 'Analyzing...' : 'Analyze Resume'}
          </Button>
        </div>

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Overall Score */}
            <Card className="shadow-2xl border-2 border-purple-200 mb-6">
              <CardHeader className={`bg-gradient-to-r ${getScoreBg(result.score)} text-white`}>
                <CardTitle className="text-center text-4xl flex items-center justify-center gap-3">
                  <Award className="w-10 h-10" />
                  Overall ATS Score: {result.score}%
                </CardTitle>
              </CardHeader>
            </Card>

            {/* Detailed Scores */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardContent className="p-4 text-center">
                  <FileCheck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-700">{result.detailedAnalysis.formatting.score}%</div>
                  <div className="text-sm text-gray-600">Formatting</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-green-200 bg-green-50">
                <CardContent className="p-4 text-center">
                  <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-700">{result.detailedAnalysis.content.score}%</div>
                  <div className="text-sm text-gray-600">Content</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-purple-200 bg-purple-50">
                <CardContent className="p-4 text-center">
                  <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-700">{result.detailedAnalysis.keywords.score}%</div>
                  <div className="text-sm text-gray-600">Keywords</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-orange-200 bg-orange-50">
                <CardContent className="p-4 text-center">
                  <Eye className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-700">{result.detailedAnalysis.readability.score}%</div>
                  <div className="text-sm text-gray-600">Readability</div>
                </CardContent>
              </Card>
              <Card className="border-2 border-pink-200 bg-pink-50">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-pink-700">{result.detailedAnalysis.optimization.score}%</div>
                  <div className="text-sm text-gray-600">Optimization</div>
                </CardContent>
              </Card>
            </div>

            {/* Content Analysis */}
            <Card className="shadow-xl border-2 border-indigo-200 mb-6">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <CardTitle>Content Analysis</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { label: 'Contact Info', value: result.detailedAnalysis.content.hasContactInfo },
                    { label: 'Summary', value: result.detailedAnalysis.content.hasSummary },
                    { label: 'Experience', value: result.detailedAnalysis.content.hasExperience },
                    { label: 'Education', value: result.detailedAnalysis.content.hasEducation },
                    { label: 'Skills', value: result.detailedAnalysis.content.hasSkills },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      {item.value ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Keywords Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-700">Technical Skills ({result.detailedAnalysis.keywords.technicalSkills.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {result.detailedAnalysis.keywords.technicalSkills.map((skill, idx) => (
                      <Badge key={idx} className="bg-blue-100 text-blue-800">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-purple-200 bg-purple-50">
                <CardHeader>
                  <CardTitle className="text-purple-700">Soft Skills ({result.detailedAnalysis.keywords.softSkills.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {result.detailedAnalysis.keywords.softSkills.map((skill, idx) => (
                      <Badge key={idx} className="bg-purple-100 text-purple-800">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-700">Action Verbs ({result.detailedAnalysis.keywords.actionVerbs.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {result.detailedAnalysis.keywords.actionVerbs.map((verb, idx) => (
                      <Badge key={idx} className="bg-green-100 text-green-800">{verb}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Matched vs Missing Keywords */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card className="border-2 border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="w-5 h-5" />
                    Matched Keywords ({result.matchedKeywords.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
                    {result.matchedKeywords.slice(0, 50).map((keyword, idx) => (
                      <Badge key={idx} className="bg-green-100 text-green-800">{keyword}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-700">
                    <XCircle className="w-5 h-5" />
                    Missing Keywords ({result.missingKeywords.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
                    {result.missingKeywords.map((keyword, idx) => (
                      <Badge key={idx} className="bg-red-100 text-red-800">{keyword}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Suggestions */}
            <Card className="border-2 border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-700">
                  <Lightbulb className="w-5 h-5" />
                  Improvement Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-yellow-600 font-bold">•</span>
                      <span className="text-gray-700">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ATSAnalyzer;
