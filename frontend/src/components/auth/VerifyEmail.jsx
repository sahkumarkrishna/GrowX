import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Check, AlertCircle, Mail, Loader2, Copy, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [manualCodeMode, setManualCodeMode] = useState(false);
  const [manualToken, setManualToken] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [verifyingManual, setVerifyingManual] = useState(false);
  const [copied, setCopied] = useState(false);

  const USER_API = import.meta.env.VITE_USER_API || 'http://localhost:8000/api/v1/user';

  useEffect(() => {
    const verifyEmailToken = async () => {
      try {
        const token = searchParams.get('token');
        const email = searchParams.get('email');

        if (!token || !email) {
          setError('Invalid verification link');
          setLoading(false);
          return;
        }

        const res = await axios.get(`${USER_API}/verify-email?token=${token}&email=${email}`);

        if (res.data.success) {
          setVerified(true);
          toast.success(res.data.message);
          setTimeout(() => navigate('/login'), 3000);
        }
      } catch (err) {
        setError(err?.response?.data?.message || 'Email verification failed');
        toast.error(err?.response?.data?.message || 'Email verification failed');
      } finally {
        setLoading(false);
      }
    };

    verifyEmailToken();
  }, [searchParams, navigate, USER_API]);

  const handleManualCodeVerification = async () => {
    if (!manualToken.trim() || !manualEmail.trim()) {
      toast.error('Please enter both email and verification code');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(manualEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Token validation (should be 32 characters)
    if (manualToken.trim().length !== 32) {
      toast.error('Verification code must be exactly 32 characters');
      return;
    }

    try {
      setVerifyingManual(true);
      const res = await axios.get(`${USER_API}/verify-email?token=${manualToken}&email=${manualEmail}`);

      if (res.data.success) {
        setVerified(true);
        toast.success(res.data.message);
        setTimeout(() => navigate('/login'), 3000);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Verification failed');
    } finally {
      setVerifyingManual(false);
    }
  };

  const copyTokenToClipboard = (token) => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {loading && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center animate-spin">
                <Loader2 className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Verifying Email</h1>
            <p className="text-gray-600">Please wait while we verify your email address...</p>
          </div>
        )}

        {!loading && verified && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center animate-bounce">
                <Check className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">✅ Email Verified!</h1>
            <p className="text-gray-600 mb-6">
              Your email has been successfully verified. You can now login to your GrowX account.
            </p>
            <Button
              onClick={() => navigate('/login')}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-2 rounded-lg">
              Go to Login
            </Button>
            <p className="text-sm text-gray-500 mt-4">Redirecting in a few seconds...</p>
          </div>
        )}

        {!loading && !verified && error && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">Verification Failed</h1>
            <p className="text-gray-600 text-center mb-6">{error}</p>

            {/* Manual Code Entry */}
            {!manualCodeMode ? (
              <div className="space-y-3">
                <Button
                  onClick={() => setManualCodeMode(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg"
                >
                  Enter Code Manually
                </Button>
                <Button
                  onClick={() => navigate('/signup')}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 rounded-lg">
                  Register Again
                </Button>
                <Button
                  onClick={() => navigate('/login')}
                  variant="outline"
                  className="w-full border-2 border-gray-300 hover:bg-gray-50 text-gray-800 font-bold py-2 rounded-lg">
                  Back to Login
                </Button>
              </div>
            ) : (
              <div className="space-y-4 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <h2 className="font-bold text-gray-800">Enter Verification Code</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Email Address</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={manualEmail}
                    onChange={(e) => setManualEmail(e.target.value)}
                    className="h-11 border-2 border-blue-300 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Verification Code</label>
                  <Input
                    type="text"
                    placeholder="Enter the 32-character code from your email"
                    value={manualToken}
                    onChange={(e) => setManualToken(e.target.value.toUpperCase())}
                    className="h-11 border-2 border-blue-300 focus:border-blue-500 font-mono text-center tracking-wider"
                    maxLength="32"
                  />
                </div>
                <Button
                  onClick={handleManualCodeVerification}
                  disabled={verifyingManual || !manualToken.trim() || !manualEmail.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg"
                >
                  {verifyingManual ? (
                    <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Verifying...</>
                  ) : (
                    'Verify Code'
                  )}
                </Button>
                <Button
                  onClick={() => setManualCodeMode(false)}
                  variant="outline"
                  className="w-full border-2 border-gray-300"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
