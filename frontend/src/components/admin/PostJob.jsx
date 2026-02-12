import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Loader2, Briefcase, MapPin, DollarSign, Users, Clock, Building2, FileText, Sparkles } from 'lucide-react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { motion } from 'framer-motion';

const JOB_API = import.meta.env.VITE_JOB_API;

const PostJob = () => {
  const [input, setInput] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experience: '',
    position: 0,
    companyId: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleCompanySelect = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany?._id || '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.companyId) {
      toast.error("Please select a company.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API}/post`, input, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/jobs');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error posting job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 bg-white text-gray-800 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-md hover:shadow-lg"
        >
          <IoMdArrowRoundBack size={22} />
          Back
        </motion.button>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 shadow-xl mb-4">
            <Briefcase className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Post a New Job
          </h2>
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-600" />
            Fill in the details to create a job posting
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-bold text-sm flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-purple-600" />
                Job Title
              </Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={handleInputChange}
                placeholder="e.g. Senior Frontend Developer"
                className="h-12 border-2 focus:border-purple-500 rounded-xl text-base"
                required
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-bold text-sm flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                Location
              </Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={handleInputChange}
                placeholder="e.g. New York, Remote"
                className="h-12 border-2 focus:border-blue-500 rounded-xl text-base"
                required
              />
            </div>

            {/* Salary */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-bold text-sm flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                Salary Range
              </Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={handleInputChange}
                placeholder="e.g. $80k - $120k"
                className="h-12 border-2 focus:border-green-500 rounded-xl text-base"
                required
              />
            </div>

            {/* Job Type */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-bold text-sm flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-600" />
                Job Type
              </Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={handleInputChange}
                placeholder="e.g. Full-time, Part-time"
                className="h-12 border-2 focus:border-orange-500 rounded-xl text-base"
                required
              />
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-bold text-sm flex items-center gap-2">
                <FileText className="h-4 w-4 text-indigo-600" />
                Experience Level
              </Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={handleInputChange}
                placeholder="e.g. 3-5 years"
                className="h-12 border-2 focus:border-indigo-500 rounded-xl text-base"
                required
              />
            </div>

            {/* Positions */}
            <div className="space-y-2">
              <Label className="text-gray-700 font-bold text-sm flex items-center gap-2">
                <Users className="h-4 w-4 text-pink-600" />
                No. of Positions
              </Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={handleInputChange}
                placeholder="e.g. 2"
                className="h-12 border-2 focus:border-pink-500 rounded-xl text-base"
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2 space-y-2">
              <Label className="text-gray-700 font-bold text-sm">Job Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={handleInputChange}
                placeholder="Brief description of the role and responsibilities"
                className="h-12 border-2 focus:border-blue-500 rounded-xl text-base"
                required
              />
            </div>

            {/* Requirements */}
            <div className="md:col-span-2 space-y-2">
              <Label className="text-gray-700 font-bold text-sm">Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={handleInputChange}
                placeholder="e.g. React, Node.js, TypeScript (comma separated)"
                className="h-12 border-2 focus:border-purple-500 rounded-xl text-base"
                required
              />
            </div>

            {/* Company Select */}
            {companies.length > 0 && (
              <div className="md:col-span-2 space-y-2">
                <Label className="text-gray-700 font-bold text-sm flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-indigo-600" />
                  Select Company
                </Label>
                <Select onValueChange={handleCompanySelect}>
                  <SelectTrigger className="w-full h-12 border-2 focus:border-indigo-500 rounded-xl text-base">
                    <SelectValue placeholder="Choose a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company.name.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            {loading ? (
              <Button disabled className="w-full h-14 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-lg font-bold shadow-xl">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Posting Job...
              </Button>
            ) : (
              <Button 
                type="submit" 
                className="w-full h-14 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-lg font-bold shadow-xl hover:shadow-2xl transition-all"
              >
                <Briefcase className="mr-2 h-5 w-5" />
                Post New Job
              </Button>
            )}
          </div>

          {/* Warning Message */}
          {companies.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl"
            >
              <p className="text-sm text-center text-red-600 font-semibold">
                ⚠️ Please register a company first before posting jobs.
              </p>
            </motion.div>
          )}
        </motion.form>
      </div>
    </div>
  );
};

export default PostJob;
