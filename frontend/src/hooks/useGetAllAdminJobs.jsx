import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setAllAdminJobs } from '@/redux/jobSlice';

const JOB_API_END_POINT = import.meta.env.VITE_JOB_API;

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.error('Error fetching admin jobs:', error);
      }
    };

    fetchAllAdminJobs();
  }, [dispatch]); // Add dispatch as dependency
};

export default useGetAllAdminJobs;
