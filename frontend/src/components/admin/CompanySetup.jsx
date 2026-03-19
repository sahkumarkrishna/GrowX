import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2, Building2, Globe, MapPin, Image, CheckCircle2, Sparkles, Upload } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';
import { motion } from 'framer-motion';
import AdminLayout from './AdminLayout';

const COMPANY_API = import.meta.env.VITE_COMPANY_API;

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({ name: '', description: '', website: '', location: '', file: null });
  const [preview, setPreview] = useState(null);
  const { singleCompany } = useSelector(store => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', input.name);
    formData.append('description', input.description);
    formData.append('website', input.website);
    formData.append('location', input.location);
    if (input.file) formData.append('file', input.file);
    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API}/update/${params.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/companies');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error updating company');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || '',
      description: singleCompany.description || '',
      website: singleCompany.website || '',
      location: singleCompany.location || '',
      file: null,
    });
    if (singleCompany.logo) setPreview(singleCompany.logo);
  }, [singleCompany]);

  const fields = [
    { label: 'Company Name', name: 'name', icon: Building2, color: 'blue', placeholder: 'e.g. Google Inc.', type: 'text' },
    { label: 'Location', name: 'location', icon: MapPin, color: 'emerald', placeholder: 'e.g. San Francisco, CA', type: 'text' },
    { label: 'Website', name: 'website', icon: Globe, color: 'purple', placeholder: 'https://example.com', type: 'text' },
    { label: 'Description', name: 'description', icon: Sparkles, color: 'pink', placeholder: 'Brief company description', type: 'text' },
  ];

  const colorMap = {
    blue: { ring: 'focus:border-blue-500', icon: 'text-blue-500', bg: 'bg-blue-50', badge: 'bg-blue-100 text-blue-700' },
    emerald: { ring: 'focus:border-emerald-500', icon: 'text-emerald-500', bg: 'bg-emerald-50', badge: 'bg-emerald-100 text-emerald-700' },
    purple: { ring: 'focus:border-purple-500', icon: 'text-purple-500', bg: 'bg-purple-50', badge: 'bg-purple-100 text-purple-700' },
    pink: { ring: 'focus:border-pink-500', icon: 'text-pink-500', bg: 'bg-pink-50', badge: 'bg-pink-100 text-pink-700' },
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">

        {/* ── Hero Banner ── */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 mb-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-56 h-56 bg-white opacity-5 rounded-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-5 rounded-full -ml-12 -mb-12" />
          <div className="relative flex items-center gap-5">
            {/* Logo Preview */}
            <div className="flex-shrink-0">
              {preview ? (
                <img src={preview} alt="logo"
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-white/40 shadow-xl" />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl border-2 border-white/30">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">Admin Panel</span>
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">Company Setup</span>
              </div>
              <h1 className="text-3xl font-black text-white mb-1">
                {input.name || 'Company Setup'}
              </h1>
              <p className="text-blue-200 text-sm">Update your company profile & branding</p>
            </div>
          </div>
        </motion.div>

        {/* ── Form Card ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <form onSubmit={submitHandler}
            className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

            {/* Card Header */}
            <div className="px-8 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">Company Information</p>
                <p className="text-xs text-gray-500">Fill in the details below to update your company</p>
              </div>
            </div>

            <div className="p-8">
              {/* Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {fields.map(({ label, name, icon: Icon, color, placeholder, type }, i) => {
                  const c = colorMap[color];
                  return (
                    <motion.div key={name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 + i * 0.05 }}>
                      <Label className="text-gray-700 font-semibold text-sm flex items-center gap-2 mb-2">
                        <span className={`w-6 h-6 rounded-lg ${c.bg} flex items-center justify-center`}>
                          <Icon className={`w-3.5 h-3.5 ${c.icon}`} />
                        </span>
                        {label}
                      </Label>
                      <Input
                        type={type}
                        name={name}
                        value={input[name]}
                        onChange={changeEventHandler}
                        placeholder={placeholder}
                        className={`h-12 border-2 border-gray-200 ${c.ring} rounded-2xl bg-gray-50 focus:bg-white transition-all text-gray-800 placeholder:text-gray-400 shadow-sm`}
                      />
                    </motion.div>
                  );
                })}
              </div>

              {/* Logo Upload */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}
                className="mb-8">
                <Label className="text-gray-700 font-semibold text-sm flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-lg bg-rose-50 flex items-center justify-center">
                    <Image className="w-3.5 h-3.5 text-rose-500" />
                  </span>
                  Company Logo
                </Label>
                <label className="flex items-center gap-4 p-4 border-2 border-dashed border-gray-200 hover:border-blue-400 rounded-2xl cursor-pointer bg-gray-50 hover:bg-blue-50 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                    <Upload className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                      {input.file ? input.file.name : 'Click to upload logo'}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">PNG, JPG, WEBP up to 5MB</p>
                  </div>
                  {preview && (
                    <img src={preview} alt="preview"
                      className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-md flex-shrink-0" />
                  )}
                  <input type="file" accept="image/*" onChange={changeFileHandler} className="hidden" />
                </label>
              </motion.div>

              {/* Completion Badges */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }}
                className="flex flex-wrap gap-2 mb-8">
                {fields.map(({ label, name, color }) => {
                  const filled = !!input[name];
                  return (
                    <span key={name}
                      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium transition-all ${filled ? colorMap[color].badge : 'bg-gray-100 text-gray-400'}`}>
                      <CheckCircle2 className={`w-3 h-3 ${filled ? '' : 'opacity-40'}`} />
                      {label}
                    </span>
                  );
                })}
              </motion.div>

              {/* Submit */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}>
                {loading ? (
                  <Button disabled
                    className="w-full h-13 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-base shadow-xl">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Updating Company...
                  </Button>
                ) : (
                  <Button type="submit"
                    className="w-full h-13 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-bold text-base shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all">
                    <CheckCircle2 className="mr-2 h-5 w-5" /> Update Company
                  </Button>
                )}
              </motion.div>
            </div>
          </form>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default CompanySetup;
