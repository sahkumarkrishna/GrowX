import React, { useEffect } from 'react';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { Users, Briefcase } from 'lucide-react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { motion } from 'framer-motion';

const APPLICATION_API = import.meta.env.VITE_APPLICATION_API;

const Applicants = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API}/${params.id}/applicants`, {
          withCredentials: true,
        });
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllApplicants();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-md"
        >
          <IoMdArrowRoundBack size={24} />
          Back
        </motion.button>

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
                Applicants
                <span className="ml-2 text-lg sm:text-xl md:text-2xl text-purple-600">
                  ({applicants?.applications?.length || 0})
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-1.5 mt-1">
                <Briefcase className="h-3 w-3 sm:h-4 sm:w-4" />
                Review and manage job applications
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <ApplicantsTable />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
