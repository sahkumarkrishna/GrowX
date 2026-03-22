import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { Mail, Loader2, ArrowLeft, Sparkles, MailCheck, ArrowRight } from 'lucide-react';

const ForgotPassword = () => {
    const [email,   setEmail]   = useState("");
    const [loading, setLoading] = useState(false);
    const [sent,    setSent]    = useState(false);

    const USER_API = import.meta.env.VITE_USER_API || "http://localhost:8000/api/v1/user";

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!email) { toast.error("Please enter your email address."); return; }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API}/forgot-password`, { email }, {
                headers: { "Content-Type": "application/json" }
            });
            if (res.data.success) setSent(true);
            else toast.error(res.data.message || "Something went wrong.");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">

            {/* ── Left: Form ── */}
            <div className="flex-1 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-8">

                    {/* Back link */}
                    <Link to="/login"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to login
                    </Link>

                    {/* Brand */}
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16
                                        bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-4">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Forgot Password?</h2>
                        <p className="mt-2 text-gray-600">We'll send a reset link to your email.</p>
                    </div>

                    {sent ? (
                        /* ── Sent success state ── */
                        <div className="space-y-5 text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20
                                            bg-green-50 border-2 border-green-200 rounded-full mx-auto">
                                <MailCheck className="w-10 h-10 text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">Check your inbox</h3>
                                <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                                    If an account exists for:
                                </p>
                                {/* Email pill */}
                                <div className="inline-flex items-center gap-2 bg-purple-50 border-2 border-purple-200
                                                rounded-xl px-5 py-3 mt-3">
                                    <Mail className="w-4 h-4 text-purple-500 flex-shrink-0" />
                                    <span className="font-bold text-purple-700 text-sm">{email}</span>
                                </div>
                                <p className="mt-3 text-gray-500 text-sm">
                                    …we sent a password reset link. It expires in{" "}
                                    <strong className="text-gray-700">15 minutes</strong>.
                                </p>
                            </div>
                            <p className="text-gray-400 text-sm">
                                Didn't receive it? Check spam, or{" "}
                                <button onClick={() => setSent(false)}
                                    className="text-purple-600 hover:text-purple-700 font-semibold underline underline-offset-2">
                                    try again
                                </button>.
                            </p>
                            <Link to="/login">
                                <Button className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600
                                                   hover:from-purple-700 hover:to-blue-700 text-white
                                                   font-semibold shadow-lg hover:shadow-xl transition-all">
                                    Back to Sign In <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        /* ── Form ── */
                        <form onSubmit={submitHandler} className="space-y-6">
                            <div>
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                    Email Address
                                </Label>
                                <div className="mt-2 relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input id="email" type="email" value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com" required
                                        className="pl-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500" />
                                </div>
                            </div>

                            <Button type="submit" disabled={loading}
                                className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600
                                           hover:from-purple-700 hover:to-blue-700 text-white
                                           font-semibold text-base shadow-lg hover:shadow-xl transition-all">
                                {loading
                                    ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</>
                                    : <>Send Reset Link <ArrowRight className="ml-2 h-5 w-5" /></>}
                            </Button>

                            <p className="text-center text-sm text-gray-600">
                                Remembered it?{" "}
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
                    <h1 className="text-5xl font-bold leading-tight">No Worries!</h1>
                    <p className="text-xl text-purple-100">
                        It happens to everyone. We'll help you get back into your account safely.
                    </p>
                    <div className="space-y-4 pt-8">
                        {[
                            { title: "Quick Recovery", sub: "Reset link arrives in seconds" },
                            { title: "Secure Process", sub: "Link expires after 15 minutes" },
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

export default ForgotPassword;
