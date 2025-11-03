import React, { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { User, Mail, Phone, Lock, Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: ''
  });

  const USER_API_END_POINT = import.meta.env.VITE_USER_API;
  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password', input.password);
    formData.append('role', input.role);
    if (input.file) formData.append('file', input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      } else toast.error(res.data.message || 'Signup failed.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-200 px-4">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-lg bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl p-8 shadow-xl"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Create Account
        </h1>

        <div className="space-y-5">

          <div>
            <Label className="text-gray-700 font-medium">Full Name</Label>
            <div className="flex items-center gap-2 border rounded-lg px-3 bg-gray-50">
              <User className="h-5 w-5 text-gray-500" />
              <Input
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                placeholder="John Doe"
                className="border-none bg-transparent focus-visible:ring-0"
                required
              />
            </div>
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Email</Label>
            <div className="flex items-center gap-2 border rounded-lg px-3 bg-gray-50">
              <Mail className="h-5 w-5 text-gray-500" />
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="abc@example.com"
                className="border-none bg-transparent focus-visible:ring-0"
                required
              />
            </div>
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Phone</Label>
            <div className="flex items-center gap-2 border rounded-lg px-3 bg-gray-50">
              <Phone className="h-5 w-5 text-gray-500" />
              <Input
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                placeholder="9876543210"
                className="border-none bg-transparent focus-visible:ring-0"
                required
              />
            </div>
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Password</Label>
            <div className="flex items-center gap-2 border rounded-lg px-3 bg-gray-50">
              <Lock className="h-5 w-5 text-gray-500" />
              <Input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="••••••••"
                className="border-none bg-transparent focus-visible:ring-0"
                required
              />
            </div>
          </div>

          <div className="flex flex-row items-center justify-between gap-4">
            <RadioGroup className="flex gap-4">
              <label className="flex items-center gap-2 text-sm font-medium">
                <Input type="radio" name="role" value="student" checked={input.role === "student"} onChange={changeEventHandler} />
                Student
              </label>

              <label className="flex items-center gap-2 text-sm font-medium">
                <Input type="radio" name="role" value="recruiter" checked={input.role === "recruiter"} onChange={changeEventHandler} />
                Recruiter
              </label>
            </RadioGroup>

            <div>
              <Label>Profile</Label>
              <Input type="file" accept="image/*" onChange={changeFileHandler} className="cursor-pointer" />
            </div>
          </div>

          <Button type="submit" className="w-full py-3 text-lg font-semibold" disabled={loading}>
            {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Loading...</> : "Sign Up"}
          </Button>

          <p className="text-center text-sm text-gray-600 font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">Login</Link>
          </p>

        </div>
      </form>
    </div>
  );
};

export default Signup;
