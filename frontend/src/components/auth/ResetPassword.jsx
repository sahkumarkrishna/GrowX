import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { Lock, Eye, EyeOff, Loader2, ArrowRight, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

// ── Password strength helper ───────────────────────────────────────────────────
const getStrength = (p) => {
  if (!p) return { score: 0, label: '', color: '' };
  let s = 0;
  if (p.length >= 6)           s++;
  if (p.length >= 10)          s++;
  if (/[A-Z]/.test(p))         s++;
  if (/[0-9]/.test(p))         s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  const levels = [
    { label: 'Very weak', color: 'bg-red-500' },
    { label: 'Weak',      color: 'bg-orange-500' },
    { label: 'Fair',      color: 'bg-yellow-400' },
    { label: 'Good',      color: 'bg-blue-500' },
    { label: 'Strong',    color: 'bg-green-500' },
    { label: 'Very strong', color: 'bg-emerald-500' },
  ];
  return { score: s, ...levels[s] };
};

const ResetPassword = () => {
  const { token }  = useParams();
  const navigate   = useNavigate();

  const [password,  setPassword]  = useState('');
  const [confirm,   setConfirm]   = useState('');
  const [show1,     setShow1]     = useState(false);
  const [show2,     setShow2]     = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [success,   setSuccess]   = useState(false);

  const USER_API = import.meta.env.VITE_USER_API || 'http://localhost:8000/api/v1/user';
  const str = getStrength(password);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password.length < 6)  { toast.error('Password must be at least 6 characters.'); return; }
    if (password !== confirm)  { toast.error('Passwords do not match.'); return; }

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API}/reset-password/${token}`, { password });
      if (res.data.success) {
        setSuccess(true);
        toast.success(res.data.message);
        setTimeout(() => navigate('/login'), 2500);
      } else {
        toast.error(res.data.message || 'Reset failed.');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Link is invalid or has expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* ── Left: Form ── */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">

          {/* Brand */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16
                            bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-4">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {success ? 'Password Updated!' : 'Create New Password'}
            </h2>
            <p className="mt-2 text-gray-600">
              {success ? 'Redirecting you to login…' : 'Make it strong and memorable.'}
            </p>
          </div>

          {success ? (
            /* ── Success state ── */
            <div className="text-center space-y-5">
              <div className="inline-flex items-center justify-center w-20 h-20
                              bg-green-50 border-2 border-green-200 rounded-full mx-auto">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <p className="text-gray-600 text-sm">
                Your password has been reset successfully.
              </p>
              <Link to="/login">
                <Button className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600
                                   hover:from-purple-700 hover:to-blue-700 text-white font-semibold
                                   shadow-lg hover:shadow-xl transition-all">
                  Go to Sign In <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          ) : (
            /* ── Form ── */
            <form onSubmit={submitHandler} className="space-y-6">

              {/* New password */}
              <div>
                <Label className="text-sm font-medium text-gray-700">New Password</Label>
                <div className="mt-2 relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input type={show1 ? 'text' : 'password'} value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password" required
                    className="pl-10 pr-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500" />
                  <button type="button" onClick={() => setShow1(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
                    {show1 ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Strength bar */}
                {password && (
                  <div className="mt-2 px-1">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i}
                          className={`h-1.5 flex-1 rounded-full transition-all duration-300
                            ${i <= str.score ? str.color : 'bg-gray-200'}`} />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">{str.label}</p>
                  </div>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Confirm Password</Label>
                <div className="mt-2 relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input type={show2 ? 'text' : 'password'} value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Repeat your password" required
                    className={`pl-10 pr-10 h-12 border-gray-300 focus:ring-purple-500 ${
                      confirm && confirm !== password
                        ? 'border-red-400 focus:border-red-500'
                        : 'focus:border-purple-500'
                    }`} />
                  <button type="button" onClick={() => setShow2(p => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
                    {show2 ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {confirm && confirm !== password && (
                  <p className="mt-1 text-xs text-red-500 px-1">Passwords don't match</p>
                )}
              </div>

              <Button type="submit" disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600
                           hover:from-purple-700 hover:to-blue-700 text-white font-semibold
                           text-base shadow-lg hover:shadow-xl transition-all">
                {loading
                  ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Updating...</>
                  : <>Update Password <ArrowRight className="ml-2 h-5 w-5" /></>}
              </Button>

              <p className="text-center text-sm text-gray-600">
                Remembered it?{' '}
                <Link to="/login" className="font-semibold text-purple-600 hover:text-purple-700">
                  Sign in
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>

      {/* ── Right: Gradient panel ── */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700
                      items-center justify-center p-12">
        <div className="max-w-md text-white space-y-6">
          <h1 className="text-5xl font-bold leading-tight">Secure Your Account</h1>
          <p className="text-xl text-purple-100">
            Choose a strong, unique password to keep your account safe.
          </p>
          <div className="space-y-4 pt-8">
            {[
              { title: 'Use 10+ characters',    sub: 'Longer passwords are stronger' },
              { title: 'Mix it up',             sub: 'Add uppercase, numbers & symbols' },
              { title: 'Keep it unique',        sub: "Don't reuse other passwords" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-purple-100">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ResetPassword;
