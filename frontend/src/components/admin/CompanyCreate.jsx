import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { Building2, Sparkles, ArrowRight, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import AdminLayout from './AdminLayout'

const COMPANY_API = import.meta.env.VITE_COMPANY_API;

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    if (!companyName.trim()) return toast.error('Please enter a company name');
    try {
      setLoading(true);
      const res = await axios.post(`${COMPANY_API}/register`, { companyName: companyName.trim() }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/companies/${res.data.company._id}`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create company');
    } finally { setLoading(false); }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">

        {/* Hero Banner */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-56 h-56 bg-white opacity-5 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-5 rounded-full -ml-12 -mb-12" />
            <div className="relative flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl flex-shrink-0">
                <Building2 className="h-9 w-9 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">Admin Panel</span>
                  <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">New Company</span>
                </div>
                <h1 className="text-3xl font-black text-white mb-1">Create Company</h1>
                <p className="text-purple-200 text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />Register your company to start posting jobs
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

          <div className="px-8 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-indigo-50 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">Company Information</p>
              <p className="text-xs text-gray-500">You can update more details after creation</p>
            </div>
          </div>

          <div className="p-8">
            <div className="space-y-3 mb-8">
              <Label htmlFor="companyName" className="text-gray-700 font-bold text-sm flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-indigo-50 flex items-center justify-center">
                  <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                </span>
                Company Name
              </Label>
              <Input id="companyName" type="text"
                className="h-14 border-2 border-gray-200 focus:border-indigo-500 rounded-2xl bg-gray-50 focus:bg-white transition-all text-base"
                placeholder="e.g. Microsoft, Google, Amazon"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && registerNewCompany()}
              />
              <p className="text-xs text-gray-400 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />You can change the name and add more details later
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate('/admin/companies')}
                className="flex-1 h-12 rounded-2xl border-2 border-gray-200 hover:border-gray-300 font-semibold text-gray-600">
                Cancel
              </Button>
              <Button onClick={registerNewCompany} disabled={loading}
                className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 font-bold shadow-lg hover:shadow-xl transition-all">
                {loading
                  ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating...</>
                  : <><ArrowRight className="mr-2 h-4 w-4" />Continue</>}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default CompanyCreate;
