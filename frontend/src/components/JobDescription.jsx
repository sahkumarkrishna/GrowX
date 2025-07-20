import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JOB_API_END_POINT = import.meta.env.VITE_JOB_API;
const APPLICATION_API_END_POINT = import.meta.env.VITE_APPLICATION_API;

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);

  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

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
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-5xl mx-auto my-10 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">{singleJob?.title || 'Job Title'}</h1>
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob?.position || 1} Position{singleJob?.position > 1 ? 's' : ''}
            </Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">
              {singleJob?.jobType || 'Full-Time'}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              ₹{singleJob?.salary || 0} LPA
            </Badge>
          </div>
        </div>

        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg px-6 py-2 ${
            isApplied ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'
          } text-white`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-lg font-semibold border-b pb-2 mb-4 text-gray-700">Job Details</h2>
        <div className="space-y-3 text-sm text-gray-800">
          <p><strong>Role:</strong> <span className="ml-2">{singleJob?.title}</span></p>
          <p><strong>Location:</strong> <span className="ml-2">{singleJob?.location || 'India'}</span></p>
          <p><strong>Description:</strong> <span className="ml-2">{singleJob?.description || 'Not provided'}</span></p>
          <p><strong>Experience Required:</strong> <span className="ml-2">{singleJob?.experience || 0} yrs</span></p>
          <p><strong>Salary:</strong> <span className="ml-2">₹{singleJob?.salary} LPA</span></p>
          <p><strong>Total Applicants:</strong> <span className="ml-2">{singleJob?.applications?.length || 0}</span></p>
          <p>
            <strong>Posted On:</strong>{' '}
            <span className="ml-2">
              {singleJob?.createdAt ? new Date(singleJob.createdAt).toLocaleDateString() : 'N/A'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
