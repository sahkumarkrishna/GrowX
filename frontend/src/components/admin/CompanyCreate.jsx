import React, { useState } from 'react'

import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const COMPANY_API = import.meta.env.VITE_COMPANY_API;

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(`${COMPANY_API}/register`, { companyName }, {
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
      toast.error("Failed to create company");
    }
  }

  return (
    <div className="min-h-screen bg-white">
   
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='my-10'>
          <h1 className='font-bold text-2xl sm:text-3xl'>Your Company Name</h1>
          <p className='text-gray-500 text-sm sm:text-base'>
            What would you like to give your company name? You can change this later.
          </p>
        </div>

        <div className='space-y-2'>
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            type="text"
            className="my-2"
            placeholder="JobHunt, Microsoft etc."
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>

        <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-4 my-10'>
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button
            className="w-full sm:w-auto"
            onClick={registerNewCompany}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CompanyCreate;
