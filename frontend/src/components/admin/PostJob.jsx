import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Loader2, Briefcase, MapPin, DollarSign, Users, Clock, Building2, FileText, Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import AdminLayout from './AdminLayout';

const JOB_API = import.meta.env.VITE_JOB_API;

const Field = ({ label, icon: Icon, iconColor, children }) => (
  <div className="space-y-2">
    <Label className="text-gray-700 font-bold text-sm flex items-center gap-2">
      <span className={`w-5 h-5 rounded-md flex items-center justify-center bg-opacity-10`} style={{ background: `${iconColor}18` }}>
        <Icon className="w-3.5 h-3.5" style={{ color: iconColor }} />
      </span>
      {label}
    </Label>
    {children}
  </div>
);

const PostJob = () => {
  const [input, setInput] = useState({ title: '', description: '', requirements: '', salary: '', location: '', jobType: '', experience: '', position: 0, companyId: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector(s => s.company);

  const handleInputChange = e => setInput({ ...input, [e.target.name]: e.target.value });
  const handleCompanySelect = value => {
    const c = companies.find(c => c.name.toLowerCase() === value);
    setInput({ ...input, companyId: c?._id || '' });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!input.companyId) return toast.error('Please select a company.');
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API}/post`, input, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
      if (res.data.success) { toast.success(res.data.message); navigate('/admin/jobs'); }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Error posting job');
    } finally { setLoading(false); }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">

        {/* Hero Banner */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-56 h-56 bg-white opacity-5 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-5 rounded-full -ml-12 -mb-12" />
            <div className="relative flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl flex-shrink-0">
                <Briefcase className="h-9 w-9 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">Admin Panel</span>
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">New Posting</span>
                </div>
                <h1 className="text-3xl font-black text-white mb-1">Post a New Job</h1>
                <p className="text-green-200 text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />Fill in the details to create a job posting
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

          {/* Form Header */}
          <div className="px-8 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-emerald-50 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-md">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">Job Details</p>
              <p className="text-xs text-gray-500">All fields marked are required</p>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Field label="Job Title" icon={Briefcase} iconColor="#8b5cf6">
                <Input name="title" value={input.title} onChange={handleInputChange}
                  placeholder="e.g. Senior Frontend Developer"
                  className="h-12 border-2 border-gray-200 focus:border-emerald-500 rounded-xl bg-gray-50 focus:bg-white transition-all" required />
              </Field>

              <Field label="Location" icon={MapPin} iconColor="#3b82f6">
                <Input name="location" value={input.location} onChange={handleInputChange}
                  placeholder="e.g. New York, Remote"
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl bg-gray-50 focus:bg-white transition-all" required />
              </Field>

              <Field label="Salary (₹)" icon={DollarSign} iconColor="#10b981">
                <Input name="salary" value={input.salary} onChange={handleInputChange}
                  placeholder="e.g. 80000"
                  className="h-12 border-2 border-gray-200 focus:border-emerald-500 rounded-xl bg-gray-50 focus:bg-white transition-all" required />
              </Field>

              <Field label="Job Type" icon={Clock} iconColor="#f59e0b">
                <Input name="jobType" value={input.jobType} onChange={handleInputChange}
                  placeholder="e.g. Full-time, Part-time, Remote"
                  className="h-12 border-2 border-gray-200 focus:border-amber-500 rounded-xl bg-gray-50 focus:bg-white transition-all" required />
              </Field>

              <Field label="Experience Level" icon={FileText} iconColor="#6366f1">
                <Input name="experience" value={input.experience} onChange={handleInputChange}
                  placeholder="e.g. 3-5 years"
                  className="h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl bg-gray-50 focus:bg-white transition-all" required />
              </Field>

              <Field label="No. of Positions" icon={Users} iconColor="#ec4899">
                <Input type="number" name="position" value={input.position} onChange={handleInputChange}
                  placeholder="e.g. 2"
                  className="h-12 border-2 border-gray-200 focus:border-pink-500 rounded-xl bg-gray-50 focus:bg-white transition-all" required />
              </Field>

              <div className="md:col-span-2">
                <Field label="Job Description" icon={FileText} iconColor="#3b82f6">
                  <Input name="description" value={input.description} onChange={handleInputChange}
                    placeholder="Brief description of the role and responsibilities"
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl bg-gray-50 focus:bg-white transition-all" required />
                </Field>
              </div>

              <div className="md:col-span-2">
                <Field label="Requirements" icon={Sparkles} iconColor="#8b5cf6">
                  <Input name="requirements" value={input.requirements} onChange={handleInputChange}
                    placeholder="e.g. React, Node.js, TypeScript (comma separated)"
                    className="h-12 border-2 border-gray-200 focus:border-purple-500 rounded-xl bg-gray-50 focus:bg-white transition-all" required />
                </Field>
              </div>

              {companies.length > 0 && (
                <div className="md:col-span-2">
                  <Field label="Select Company" icon={Building2} iconColor="#6366f1">
                    <Select onValueChange={handleCompanySelect}>
                      <SelectTrigger className="w-full h-12 border-2 border-gray-200 focus:border-indigo-500 rounded-xl bg-gray-50 text-base">
                        <SelectValue placeholder="Choose a company" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {companies.map(c => (
                            <SelectItem key={c._id} value={c.name.toLowerCase()}>
                              <div className="flex items-center gap-2">
                                {c.logo && <img src={c.logo} className="w-5 h-5 rounded object-cover" />}
                                {c.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
              )}
            </div>

            {companies.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-2xl mb-6">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-600 font-semibold">Please register a company first before posting jobs.</p>
              </motion.div>
            )}

            <Button type="submit" disabled={loading}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-lg font-bold shadow-xl hover:shadow-2xl transition-all">
              {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Posting Job...</> : <><Briefcase className="mr-2 h-5 w-5" />Post New Job</>}
            </Button>
          </div>
        </motion.form>
      </div>
    </AdminLayout>
  );
};

export default PostJob;
