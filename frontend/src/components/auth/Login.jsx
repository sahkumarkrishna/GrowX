import React, { useEffect, useState } from 'react';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const USER_API_END_POINT = import.meta.env.VITE_USER_API;

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.email || !input.password || !input.role) {
      toast.error('Please fill all fields including role');
      return;
    }

    try {
      dispatch(setLoading(true));
      console.log('Sending login request to:', `${USER_API_END_POINT}/login`, input);

      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      console.log('Login response:', res.data);

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate('/');
      } else {
        toast.error(res.data.message || 'Login failed!');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error?.response?.data?.message || 'Login failed!');
    } finally {
      dispatch(setLoading(false));
      console.log('Loading state reset to false');
    }
  };

  useEffect(() => {
    if (user) {
      console.log('User already logged in, redirecting...');
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div>
     
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50">
        <div className="w-full max-w-md space-y-8 bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-center text-2xl font-bold text-gray-800">Login to your account</h2>

          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="abc@gmail.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="Enter your password"
                required
              />
            </div>

            <div>
              <Label>Role</Label>
              <RadioGroup
                className="flex gap-4 mt-2"
                value={input.role}
                onValueChange={(value) => setInput({ ...input, role: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="recruiter" id="recruiter" />
                  <Label htmlFor="recruiter">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Login button with loading state */}
            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Login'
              )}
            </Button>

            <div className="text-center text-sm mt-4">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Signup
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
