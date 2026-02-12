import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Bookmark, MapPin, Briefcase, Clock, Users, DollarSign, Calendar, Building2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const JOB_API_END_POINT = import.meta.env.VITE_JOB_API;
const APPLICATION_API_END_POINT = import.meta.env.VITE_APPLICATION_API;
const SAVED_JOB_API = `${import.meta.env.VITE_USER_API?.replace('/user', '/saved-job') || 'http://localhost:8000/api/v1/saved-job'}`;

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);

  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const [isSaved, setIsSaved] = useState(false);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const saveJobHandler = async () => {
    try {
      if (isSaved) {
        await axios.delete(`${SAVED_JOB_API}/unsave/${jobId}`, { withCredentials: true });
        setIsSaved(false);
        toast.success('Job removed from saved');
      } else {
        await axios.post(`${SAVED_JOB_API}/save`, { jobId }, { withCredentials: true });
        setIsSaved(true);
        toast.success('Job saved successfully');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to save job');
    }
  };

  const checkIfSaved = async () => {
    try {
      const res = await axios.get(`${SAVED_JOB_API}/user`, { withCredentials: true });
      const saved = res.data.savedJobs?.some(item => item.job._id === jobId);
      setIsSaved(saved);
    } catch (error) {
      console.error('Failed to check saved status');
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSingleJob();
    checkIfSaved();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-md"
        >
          <ArrowLeft size={20} />
          Back
        </motion.button>

        {/* Company Header Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="shadow-2xl border-2 border-purple-100 mb-6">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <Avatar className="w-24 h-24 border-4 border-purple-200">
                  <AvatarImage src={singleJob?.company?.logo} />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-100 to-pink-100">
                    {singleJob?.company?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h1 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                        {singleJob?.title || 'Job Title'}
                      </h1>
                      <div className="flex items-center gap-2 text-gray-600 mb-3">
                        <Building2 className="w-5 h-5" />
                        <span className="text-lg font-semibold">{singleJob?.company?.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{singleJob?.location || 'India'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-4">
                    <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
                      <Briefcase className="w-3 h-3 mr-1" />
                      {singleJob?.position || 1} Position{singleJob?.position > 1 ? 's' : ''}
                    </Badge>
                    <Badge className="bg-orange-100 text-orange-800 px-3 py-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {singleJob?.jobType || 'Full-Time'}
                    </Badge>
                    <Badge className="bg-green-100 text-green-800 px-3 py-1">
                      <DollarSign className="w-3 h-3 mr-1" />
                      ₹{singleJob?.salary || 0} LPA
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800 px-3 py-1">
                      <Users className="w-3 h-3 mr-1" />
                      {singleJob?.applications?.length || 0} Applicants
                    </Badge>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={saveJobHandler}
                      variant="outline"
                      className={`rounded-xl px-6 py-2 border-2 transition-all ${
                        isSaved ? 'bg-amber-50 border-amber-500 text-amber-600 hover:bg-amber-100' : 'hover:border-amber-500'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 mr-2 ${isSaved ? 'fill-amber-600' : ''}`} />
                      {isSaved ? 'Saved' : 'Save Job'}
                    </Button>
                    <Button
                      onClick={isApplied ? null : applyJobHandler}
                      disabled={isApplied}
                      className={`rounded-xl px-8 py-2 font-bold shadow-lg transition-all ${
                        isApplied
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:shadow-xl'
                      } text-white`}
                    >
                      {isApplied ? '✓ Already Applied' : 'Apply Now'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Job Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-xl border-2 border-purple-100">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <CardTitle className="text-xl">Job Description</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {singleJob?.description || 'No description provided'}
                  </p>
                </div>

                {singleJob?.requirements && singleJob.requirements.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Requirements</h3>
                    <div className="flex flex-wrap gap-2">
                      {singleJob.requirements.map((req, idx) => (
                        <Badge key={idx} variant="outline" className="px-3 py-1 border-purple-300 text-purple-700">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow-xl border-2 border-purple-100">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <CardTitle className="text-xl">Job Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <Briefcase className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-600 font-semibold">Experience</p>
                      <p className="text-sm font-bold text-gray-800">{singleJob?.experience || 0} years</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <DollarSign className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-600 font-semibold">Salary</p>
                      <p className="text-sm font-bold text-gray-800">₹{singleJob?.salary} LPA</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <Users className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-600 font-semibold">Total Applicants</p>
                      <p className="text-sm font-bold text-gray-800">{singleJob?.applications?.length || 0}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-600 font-semibold">Posted On</p>
                      <p className="text-sm font-bold text-gray-800">
                        {singleJob?.createdAt ? new Date(singleJob.createdAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-pink-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-pink-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-600 font-semibold">Location</p>
                      <p className="text-sm font-bold text-gray-800">{singleJob?.location || 'India'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
