import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2, Mail, Lock, ArrowRight, Sparkles, AlertCircle, MailCheck } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "", role: "student" });
  const [unverifiedEmail, setUnverifiedEmail] = useState(null);
  const [resendLoading, setResendLoading] = useState(false);

  const { loading, user } = useSelector((store) => store.auth);
  const navigate  = useNavigate();
  const dispatch  = useDispatch();
  const location  = useLocation();

  const USER_API = import.meta.env.VITE_USER_API || "http://localhost:8000/api/v1/user";
  const from = location.state?.from?.pathname || "/";

  const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value });

  // ── Resend verification ─────────────────────────────────────────────────────
  const resendVerification = async () => {
    try {
      setResendLoading(true);
      const res = await axios.post(
        `${USER_API}/resend-verification`,          // ← correct endpoint
        { email: unverifiedEmail },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Verification email resent! Check your inbox.");
      } else {
        toast.error(res.data.message || "Failed to resend email.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to resend verification email.");
    } finally {
      setResendLoading(false);
    }
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.email || !input.password) { toast.error("Please fill all fields."); return; }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email)) { toast.error("Please enter a valid email address."); return; }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate(res.data.user.role === "recruiter" ? "/admin/dashboard" : from, { replace: true });
      } else {
        toast.error(res.data.message || "Login failed!");
      }
    } catch (err) {
      const d = err?.response?.data;
      toast.error(d?.message || "Login failed!");
      // unverified email → show resend block
      if (err?.response?.status === 403 && d?.notVerified) {
        setUnverifiedEmail(d.email || input.email);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => { if (user) navigate("/"); }, [user, navigate]);

  return (
    <div className="min-h-screen flex">

      {/* ── Left: Form ── */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">

          {/* Brand */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-gray-600">Sign in to continue your journey</p>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
              <div className="mt-2 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input id="email" type="email" name="email" value={input.email}
                  onChange={changeEventHandler} placeholder="you@example.com" required
                  className="pl-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                {/* ── Forgot password link ── */}
                <Link to="/forgot-password"
                  className="text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="mt-2 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input id="password" type="password" name="password" value={input.password}
                  onChange={changeEventHandler} placeholder="Enter your password" required
                  className="pl-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500" />
              </div>
            </div>

            <Button type="submit" disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600
                         hover:from-purple-700 hover:to-blue-700 text-white font-semibold
                         text-base shadow-lg hover:shadow-xl transition-all">
              {loading
                ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Signing in...</>
                : <>Sign In <ArrowRight className="ml-2 h-5 w-5" /></>}
            </Button>
          </form>

          {/* ── Unverified email banner ── */}
          {unverifiedEmail && (
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 space-y-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-amber-900">Email Not Verified</p>
                  <p className="text-sm text-amber-800 mt-1">
                    <span className="font-medium">{unverifiedEmail}</span> hasn't been verified yet.
                    Check your inbox or resend the link below.
                  </p>
                </div>
              </div>
              <Button onClick={resendVerification} disabled={resendLoading}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold
                           py-2 rounded-lg flex items-center justify-center gap-2">
                {resendLoading
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                  : <><MailCheck className="w-4 h-4" /> Resend Verification Email</>}
              </Button>
            </div>
          )}

          {/* Bottom links */}
          <div className="space-y-4">
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold text-purple-600 hover:text-purple-700">
                Create account
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

      {/* ── Right: Gradient panel ── */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700
                      items-center justify-center p-12">
        <div className="max-w-md text-white space-y-6">
          <h1 className="text-5xl font-bold leading-tight">Start Your Learning Journey Today</h1>
          <p className="text-xl text-purple-100">Join thousands of learners achieving their goals with our platform.</p>
          <div className="space-y-4 pt-8">
            {[
              { title: "Interactive Learning",  sub: "Engage with hands-on projects" },
              { title: "Expert Mentorship",      sub: "Learn from industry professionals" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
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

export default Login;
