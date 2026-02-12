import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle, Star, TrendingUp, Shield, Zap, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';
import { toast } from 'sonner';

const ResumeScorer = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const ATS_API = `${import.meta.env.VITE_USER_API?.replace('/user', '/ats') || 'http://localhost:8000/api/v1/ats'}`;

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      if (droppedFile.size <= 2 * 1024 * 1024) {
        setFile(droppedFile);
      } else {
        toast.error('File size must be less than 2MB');
      }
    } else {
      toast.error('Only PDF or DOCX files are allowed');
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= 2 * 1024 * 1024) {
      setFile(selectedFile);
    } else {
      toast.error('File size must be less than 2MB');
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast.error('Please upload your resume');
      return;
    }

    setLoading(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const resumeText = e.target.result;
        const jobDescription = "General job requirements including technical skills, experience, education, and professional achievements.";
        
        const res = await axios.post(`${ATS_API}/check`, { resumeText, jobDescription }, { withCredentials: true });
        setResult(res.data.analysis);
        toast.success('Resume analyzed successfully!');
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Analysis failed');
      } finally {
        setLoading(false);
      }
    };
    reader.readAsText(file);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-rose-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              SCORE MY RESUME - FREE RESUME CHECKER
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-blue-100">
              Get expert feedback on your resume, instantly
            </p>
            <p className="text-lg text-blue-200 max-w-3xl mx-auto">
              Our free AI-powered resume checker scores your resume on key criteria recruiters and hiring managers look for. Get actionable steps to revamp your resume and land more interviews.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="max-w-4xl mx-auto px-4 -mt-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="shadow-2xl border-2 border-blue-200">
            <CardContent className="p-8">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-4 border-dashed rounded-2xl p-12 text-center transition-all ${
                  isDragging ? 'border-blue-600 bg-blue-50' : 'border-gray-300 bg-white'
                }`}
              >
                <Upload className={`w-16 h-16 mx-auto mb-4 ${isDragging ? 'text-blue-600' : 'text-gray-400'}`} />
                <h3 className="text-2xl font-bold mb-2">Drop your resume here or choose a file</h3>
                <p className="text-gray-600 mb-4">English resumes in PDF or DOCX only. Max 2MB file size.</p>
                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload">
                  <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg cursor-pointer" asChild>
                    <span>Choose File</span>
                  </Button>
                </label>
                {file && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">{file.name}</span>
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-4 flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4" />
                  100% privacy
                </p>
              </div>
              <div className="text-center mt-6">
                <Button
                  onClick={handleAnalyze}
                  disabled={loading || !file}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-12 py-6 text-lg font-bold shadow-xl"
                >
                  {loading ? 'Analyzing...' : 'Check My Resume'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Trust Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Trusted by over one million job seekers globally.</p>
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="font-bold text-lg">4.9 out of 5</span>
            <span className="text-gray-600">based on 1000+ reviews</span>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {result && (
        <section className="max-w-6xl mx-auto px-4 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Overall Score */}
            <Card className="shadow-2xl border-2 border-purple-200 mb-8">
              <CardHeader className={`bg-gradient-to-r ${getScoreBg(result.score)} text-white py-12`}>
                <div className="text-center">
                  <Award className="w-20 h-20 mx-auto mb-4" />
                  <CardTitle className="text-6xl font-black mb-2">{result.score}%</CardTitle>
                  <p className="text-2xl">Your Resume Score</p>
                </div>
              </CardHeader>
            </Card>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[
                { icon: FileText, label: 'Formatting', score: result.detailedAnalysis.formatting.score, color: 'blue' },
                { icon: CheckCircle, label: 'Content', score: result.detailedAnalysis.content.score, color: 'green' },
                { icon: Zap, label: 'Keywords', score: result.detailedAnalysis.keywords.score, color: 'purple' },
                { icon: TrendingUp, label: 'Impact', score: result.detailedAnalysis.optimization.score, color: 'orange' },
              ].map((item, idx) => (
                <Card key={idx} className={`border-2 border-${item.color}-200 bg-${item.color}-50`}>
                  <CardContent className="p-6 text-center">
                    <item.icon className={`w-10 h-10 text-${item.color}-600 mx-auto mb-3`} />
                    <div className={`text-4xl font-black text-${item.color}-700 mb-1`}>{item.score}%</div>
                    <div className="text-sm font-medium text-gray-600">{item.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Detailed Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Strengths */}
              <Card className="border-2 border-green-200 bg-green-50">
                <CardHeader className="bg-green-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-6 h-6" />
                    What's Working
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {result.detailedAnalysis.content.hasContactInfo && (
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <span>Contact information included</span>
                      </li>
                    )}
                    {result.detailedAnalysis.content.hasExperience && (
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <span>Work experience section present</span>
                      </li>
                    )}
                    {result.detailedAnalysis.keywords.technicalSkills.length > 0 && (
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <span>{result.detailedAnalysis.keywords.technicalSkills.length} technical skills found</span>
                      </li>
                    )}
                    {result.detailedAnalysis.keywords.actionVerbs.length > 0 && (
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <span>Strong action verbs used</span>
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>

              {/* Improvements */}
              <Card className="border-2 border-orange-200 bg-orange-50">
                <CardHeader className="bg-orange-600 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-6 h-6" />
                    Areas to Improve
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {result.suggestions.slice(0, 5).map((suggestion, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-orange-600 font-bold mt-0.5">→</span>
                        <span className="text-gray-700">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Keywords Found */}
            <Card className="border-2 border-blue-200 mb-8">
              <CardHeader className="bg-blue-600 text-white">
                <CardTitle>Keywords & Skills Detected</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-blue-700 mb-2">Technical Skills ({result.detailedAnalysis.keywords.technicalSkills.length})</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.detailedAnalysis.keywords.technicalSkills.map((skill, idx) => (
                        <Badge key={idx} className="bg-blue-100 text-blue-800 px-3 py-1">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-purple-700 mb-2">Action Verbs ({result.detailedAnalysis.keywords.actionVerbs.length})</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.detailedAnalysis.keywords.actionVerbs.map((verb, idx) => (
                        <Badge key={idx} className="bg-purple-100 text-purple-800 px-3 py-1">{verb}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-3xl font-bold mb-4">Ready to improve your resume?</h3>
                <p className="text-lg mb-6">Use our suggestions to optimize your resume and increase your interview chances by 3x</p>
                <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-bold">
                  Download Detailed Report
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      )}

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-black text-center mb-12">The most advanced resume checker, powered by AI</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: 'ATS Compatibility', desc: 'Ensure your resume passes applicant tracking systems' },
            { icon: TrendingUp, title: 'Impact Analysis', desc: 'Evaluate the strength of your achievements and word choice' },
            { icon: Award, title: 'Expert Feedback', desc: 'Get insights from hiring managers at top companies' },
          ].map((feature, idx) => (
            <Card key={idx} className="border-2 border-gray-200 hover:border-blue-400 transition-all">
              <CardContent className="p-6 text-center">
                <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResumeScorer;
