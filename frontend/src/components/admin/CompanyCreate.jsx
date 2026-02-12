import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { Building2, Sparkles } from 'lucide-react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { motion } from 'framer-motion'

const COMPANY_API = import.meta.env.VITE_COMPANY_API;

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    if (!companyName || companyName.trim() === '') {
      toast.error('Please enter a company name');
      return;
    }

    try {
      const res = await axios.post(`${COMPANY_API}/register`, { companyName: companyName.trim() }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to create company");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-3 sm:px-4 py-8">
      <div className='w-full max-w-2xl'>
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

        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-gray-200 p-6 sm:p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-xl mb-4">
              <Building2 className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
            </div>
            <h1 className='font-extrabold text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-2'>
              Create Your Company
            </h1>
            <p className='text-gray-600 text-sm sm:text-base flex items-center justify-center gap-2'>
              <Sparkles className="h-4 w-4 text-purple-600" />
              What would you like to name your company?
            </p>
          </div>

          {/* Input */}
          <div className='space-y-3'>
            <Label htmlFor="companyName" className="text-gray-700 font-semibold text-sm sm:text-base">Company Name</Label>
            <Input
              id="companyName"
              type="text"
              className="h-12 sm:h-14 border-2 focus:border-blue-500 rounded-xl text-base"
              placeholder="e.g. Microsoft, Google, Amazon"
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <p className="text-xs text-gray-500">You can change this later in settings</p>
          </div>

          {/* Buttons */}
          <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-8'>
            <Button
              variant="outline"
              className="w-full sm:w-1/2 h-11 sm:h-12 rounded-xl border-2 font-semibold"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </Button>
            <Button
              className="w-full sm:w-1/2 h-11 sm:h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-semibold shadow-lg"
              onClick={registerNewCompany}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyCreate;
