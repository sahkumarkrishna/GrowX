import React, { useEffect, useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { User, Mail, Phone, Lock, Loader2, ArrowRight, Sparkles, MailCheck } from 'lucide-react';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '', email: '', phoneNumber: '', password: '', role: 'student', file: ''
  });
  const [sentEmail, setSentEmail] = useState('');   // triggers "check email" screen
  const [resendLoading, setResendLoading] = useState(false);

  const USER_API = import.meta.env.VITE_USER_API || 'http://localhost:8000/api/v1/user';
  const { loading, user } = useSelector(store => store.auth);
  const dispatch  = useDispatch();
  const navigate  = useNavigate();

  const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });
  const changeFileHandler  = (e) => setInput({ ...input, file: e.target.files?.[0] });

  const isValidEmail = (email) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
    const [local, domain] = email.split('@');
    if (local.length < 3) return false;
    const parts = domain.split('.');
    if (parts.length < 2 || parts[parts.length - 1].length < 2) return false;
    return true;
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isValidEmail(input.email)) {
      toast.error('Please enter a valid email address (e.g., yourname@domain.com)');
      return;
    }

    const formData = new FormData();
    formData.append('fullname',    input.fullname);
    formData.append('email',       input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password',    input.password);
    formData.append('role',        input.role);
    if (input.file) formData.append('file', input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      if (res.data.success) {
        setSentEmail(res.data.email || input.email);  // flip to check-email screen
      } else {
        toast.error(res.data.message || 'Signup failed.');
      }
    } catch (err) {
      const d = err?.response?.data;
      if (d?.notVerified) {
        // Already registered but not verified — show same check-email screen
        setSentEmail(d.email || input.email);
        toast.info('Email already registered but not verified. Resend the link below.');
      } else {
        toast.error(d?.message || 'Something went wrong.');
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  // ── Resend ──────────────────────────────────────────────────────────────────
  const handleResend = async () => {
    try {
      setResendLoading(true);
      const res = await axios.post(`${USER_API}/resend-verification`, { email: sentEmail });
      if (res.data.success) toast.success('Verification email resent! Check your inbox.');
      else toast.error(res.data.message || 'Could not resend.');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Could not resend.');
    } finally {
      setResendLoading(false);
    }
  };

  useEffect(() => { if (user) navigate('/'); }, [user, navigate]);

  // ════════════════════════════════════════════════════════════════════════════
  // CHECK YOUR EMAIL screen  (shown after successful register)
  // ════════════════════════════════════════════════════════════════════════════
  if (sentEmail) {
    return (
      <div className="min-h-screen flex">
        {/* Left: gradient */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600
                        items-center justify-center p-12">
          <div className="max-w-md text-white space-y-6">
            <h1 className="text-5xl font-bold leading-tight">Almost There!</h1>
            <p className="text-xl text-blue-100">
              Just one more step — verify your email to unlock full access.
            </p>
          </div>
        </div>

        {/* Right: check-email card */}
        <div className="flex-1 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md space-y-6 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20
                            bg-gradient-to-br from-purple-100 to-blue-100
                            rounded-full mx-auto mb-2">
              <MailCheck className="w-10 h-10 text-purple-600" />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900">Check your inbox!</h2>
              <p className="mt-3 text-gray-600 leading-relaxed">
                We sent a verification link to:
              </p>
              {/* Email pill */}
              <div className="inline-flex items-center gap-2 bg-purple-50 border-2 border-purple-200
                              rounded-xl px-5 py-3 mt-3 mx-auto">
                <Mail className="w-4 h-4 text-purple-500 flex-shrink-0" />
                <span className="font-bold text-purple-700 text-sm">{sentEmail}</span>
              </div>
              <p className="mt-4 text-gray-500 text-sm">
                Click the link to activate your account. It expires in{' '}
                <strong className="text-gray-700">24 hours</strong>.
              </p>
            </div>

            {/* Steps */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-left space-y-3">
              {[
                'Open your email app',
                'Find the email from GrowX',
                'Click "Verify My Email"',
                'Come back and sign in!',
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-purple-600 text-white text-xs font-bold
                                   flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-gray-700 text-sm">{s}</span>
                </div>
              ))}
            </div>

            <p className="text-gray-500 text-sm">Didn't receive it? Check spam, or:</p>

            <Button onClick={handleResend} disabled={resendLoading}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600
                         hover:from-purple-700 hover:to-blue-700 text-white font-semibold
                         shadow-lg hover:shadow-xl transition-all">
              {resendLoading
                ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Resending...</>
                : <><MailCheck className="mr-2 h-5 w-5" /> Resend Verification Email</>}
            </Button>

            <p className="text-sm text-gray-500">
              Already verified?{' '}
              <Link to="/login" className="font-semibold text-purple-600 hover:text-purple-700">
                Sign in →
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════════════
  // SIGNUP FORM
  // ════════════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen flex">

      {/* Left: gradient panel */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600
                      items-center justify-center p-12">
        <div className="max-w-md text-white space-y-6">
          <h1 className="text-5xl font-bold leading-tight">Join Our Community</h1>
          <p className="text-xl text-blue-100">
            Create an account and unlock endless possibilities for growth and learning.
          </p>
          <div className="space-y-4 pt-8">
            {[
              { title: 'Free Access',     sub: 'Start learning immediately' },
              { title: 'Track Progress',  sub: 'Monitor your learning journey' },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-blue-100">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16
                            bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-gray-600">Start your learning journey today</p>
          </div>

          <form onSubmit={submitHandler} className="space-y-5">
            {/* Full Name */}
            <div>
              <Label className="text-sm font-medium text-gray-700">Full Name</Label>
              <div className="mt-2 relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input name="fullname" value={input.fullname} onChange={changeEventHandler}
                  placeholder="John Doe" required
                  className="pl-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500" />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label className="text-sm font-medium text-gray-700">Email</Label>
              <div className="mt-2 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input type="email" name="email" value={input.email} onChange={changeEventHandler}
                  placeholder="you@example.com" required
                  className="pl-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500" />
              </div>
            </div>

            {/* Phone */}
            <div>
              <Label className="text-sm font-medium text-gray-700">Phone</Label>
              <div className="mt-2 relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler}
                  placeholder="9876543210" required
                  className="pl-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500" />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label className="text-sm font-medium text-gray-700">Password</Label>
              <div className="mt-2 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input type="password" name="password" value={input.password} onChange={changeEventHandler}
                  placeholder="Create a strong password" required
                  className="pl-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500" />
              </div>
            </div>

            {/* Profile photo */}
            <div>
              <Label className="text-sm font-medium text-gray-700">Profile Photo (Optional)</Label>
              <div className="mt-2">
                <Input type="file" accept="image/*" onChange={changeFileHandler}
                  className="h-12 cursor-pointer border-gray-300 focus:border-purple-500" />
              </div>
            </div>

            <Button type="submit" disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600
                         hover:from-blue-700 hover:to-purple-700 text-white font-semibold
                         text-base shadow-lg hover:shadow-xl transition-all">
              {loading
                ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Creating account...</>
                : <>Create Account <ArrowRight className="ml-2 h-5 w-5" /></>}
            </Button>
          </form>

          {/* Bottom links */}
          <div className="space-y-4">
            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-purple-600 hover:text-purple-700">
                Sign in
              </Link>
            </p>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>
            <Link to="/admin/login" className="block">
              <Button type="button" variant="outline"
                className="w-full h-11 border-2 border-slate-700 text-slate-700
                           hover:bg-slate-700 hover:text-white transition-all font-semibold">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Signup;
