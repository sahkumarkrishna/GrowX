import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2, Building2, Globe, MapPin, Image } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';

const COMPANY_API = import.meta.env.VITE_COMPANY_API;

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null
  });
  const { singleCompany } = useSelector(store => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API}/update/${params.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Error updating company");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: null
    });
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-6 sm:py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6">
        <form onSubmit={submitHandler} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-gray-200 p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Button
              type="button"
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 h-10 px-4 rounded-xl border-2 font-semibold"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <h1 className="font-extrabold text-xl sm:text-2xl md:text-3xl text-gray-900">Company Setup</h1>
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <Label className="text-gray-700 font-semibold text-xs sm:text-sm flex items-center gap-2">
                <Building2 className="h-4 w-4 text-blue-600" />
                Company Name
              </Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="mt-1.5 h-11 border-2 focus:border-blue-500 rounded-xl"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-semibold text-xs sm:text-sm flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-600" />
                Location
              </Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="e.g. San Francisco, CA"
                className="mt-1.5 h-11 border-2 focus:border-green-500 rounded-xl"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-semibold text-xs sm:text-sm flex items-center gap-2">
                <Globe className="h-4 w-4 text-purple-600" />
                Website
              </Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                placeholder="https://example.com"
                className="mt-1.5 h-11 border-2 focus:border-purple-500 rounded-xl"
              />
            </div>

            <div>
              <Label className="text-gray-700 font-semibold text-xs sm:text-sm">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Brief company description"
                className="mt-1.5 h-11 border-2 focus:border-blue-500 rounded-xl"
              />
            </div>

            <div className="sm:col-span-2">
              <Label className="text-gray-700 font-semibold text-xs sm:text-sm flex items-center gap-2">
                <Image className="h-4 w-4 text-pink-600" />
                Company Logo
              </Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="mt-1.5 h-11 border-2 rounded-xl cursor-pointer"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 sm:mt-8">
            {loading ? (
              <Button disabled className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-semibold">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Updating...
              </Button>
            ) : (
              <Button type="submit" className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-semibold shadow-lg">
                Update Company
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
