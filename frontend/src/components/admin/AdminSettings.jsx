import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Camera, User, Mail, Save, Loader2, Crown, CheckCircle2, Sparkles, Upload } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import axios from 'axios';
import AdminLayout from './AdminLayout';
import { motion, AnimatePresence } from 'framer-motion';

const AdminSettings = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch  = useDispatch();
  const fileRef   = useRef(null);

  const [loading,      setLoading]      = useState(false);
  const [saved,        setSaved]        = useState(false);
  const [photoPreview, setPhotoPreview] = useState(user?.profile?.profilePhoto || null);
  const [photoFile,    setPhotoFile]    = useState(null);
  const [fullname,     setFullname]     = useState(user?.fullname || '');
  const [email,        setEmail]        = useState(user?.email    || '');

  const USER_API = import.meta.env.VITE_USER_API || 'http://localhost:8000/api/v1/user';

  useEffect(() => {
    setFullname(user?.fullname || '');
    setEmail(user?.email    || '');
    setPhotoPreview(user?.profile?.profilePhoto || null);
  }, [user]);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!fullname.trim() || !email.trim()) {
      toast.error('Name and email are required');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('fullname', fullname);
      formData.append('email',    email);
      if (photoFile) formData.append('file', photoFile);

      const res = await axios.post(`${USER_API}/profile/update`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        setPhotoFile(null);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        toast.success('Profile updated!');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-blue-50/30">
        <div className="max-w-5xl mx-auto px-4 py-10">

          {/* ── Page Title ── */}
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-900">Profile Settings</h1>
                <p className="text-sm text-gray-500">Manage your admin profile</p>
              </div>
            </div>
          </motion.div>

          {/* ── Main Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

            {/* ── LEFT — Avatar Card ── */}
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 }} className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden h-full">

                {/* Gradient top strip */}
                <div className="h-28 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 relative">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15),_transparent)]" />
                  {/* floating circles */}
                  <div className="absolute top-2 right-4 w-16 h-16 rounded-full bg-white/10" />
                  <div className="absolute bottom-0 left-6 w-10 h-10 rounded-full bg-white/10" />
                </div>

                {/* Avatar — overlapping the strip */}
                <div className="flex flex-col items-center -mt-14 px-6 pb-8">
                  <div className="relative mb-4">
                    {/* Glow ring */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-400 to-blue-400 blur-md opacity-40 scale-110" />
                    <div className="relative w-28 h-28 rounded-full ring-4 ring-white shadow-2xl overflow-hidden bg-gradient-to-br from-violet-200 to-indigo-200">
                      {photoPreview ? (
                        <img src={photoPreview} alt="avatar" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-5xl font-black text-violet-500">
                            {fullname?.charAt(0)?.toUpperCase() || 'A'}
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Camera FAB */}
                    <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                      onClick={() => fileRef.current?.click()}
                      className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg border-2 border-white">
                      <Camera size={14} className="text-white" />
                    </motion.button>
                    <input ref={fileRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                  </div>

                  {/* Name & email live preview */}
                  <h2 className="text-xl font-black text-gray-900 text-center flex items-center gap-1.5">
                    {fullname || 'Admin User'}
                    <Crown size={14} className="text-amber-400" />
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5 text-center truncate max-w-full">{email || '—'}</p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 justify-center mt-3">
                    <span className="bg-violet-100 text-violet-700 text-xs px-3 py-1 rounded-full font-bold capitalize">
                      {user?.role || 'recruiter'}
                    </span>
                    <span className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full font-bold">
                      ● Online
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="w-full border-t border-gray-100 my-5" />

                  {/* Upload area */}
                  <label className="w-full flex flex-col items-center gap-2 p-4 border-2 border-dashed border-violet-200 hover:border-violet-500 rounded-2xl cursor-pointer bg-violet-50/50 hover:bg-violet-50 transition-all group">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Upload size={16} className="text-violet-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-bold text-gray-700 group-hover:text-violet-600 transition-colors">
                        {photoFile ? photoFile.name : 'Upload new photo'}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5">PNG · JPG · WEBP · max 5MB</p>
                    </div>
                    {photoFile && <CheckCircle2 size={16} className="text-emerald-500" />}
                    <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                  </label>

                  {/* Joined info */}
                  {user?.createdAt && (
                    <p className="text-[11px] text-gray-400 mt-4 font-medium">
                      Member since {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT — Edit Form ── */}
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }} className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

                {/* Card header */}
                <div className="px-8 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-violet-50/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md">
                      <User size={15} className="text-white" />
                    </div>
                    <div>
                      <p className="font-black text-gray-800 text-sm">Edit Profile</p>
                      <p className="text-xs text-gray-400">Name · Email · Photo</p>
                    </div>
                  </div>
                  <AnimatePresence>
                    {saved && (
                      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full">
                        <CheckCircle2 size={13} />
                        Saved!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="p-8 space-y-6">

                  {/* Full Name */}
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                    <Label className="text-gray-700 font-bold text-xs flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-xl bg-violet-100 flex items-center justify-center">
                        <User size={12} className="text-violet-600" />
                      </span>
                      Full Name
                    </Label>
                    <div className="relative">
                      <Input
                        type="text"
                        value={fullname}
                        onChange={e => setFullname(e.target.value)}
                        placeholder="Enter your full name"
                        className="h-13 pl-4 pr-4 border-2 border-gray-200 focus:border-violet-500 rounded-2xl bg-gray-50/80 focus:bg-white transition-all text-sm font-semibold text-gray-800 placeholder:text-gray-400 shadow-sm"
                      />
                      {fullname && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <CheckCircle2 size={16} className="text-violet-400" />
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Email */}
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <Label className="text-gray-700 font-bold text-xs flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-xl bg-blue-100 flex items-center justify-center">
                        <Mail size={12} className="text-blue-600" />
                      </span>
                      Email Address
                    </Label>
                    <div className="relative">
                      <Input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="h-13 pl-4 pr-4 border-2 border-gray-200 focus:border-blue-500 rounded-2xl bg-gray-50/80 focus:bg-white transition-all text-sm font-semibold text-gray-800 placeholder:text-gray-400 shadow-sm"
                      />
                      {email && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <CheckCircle2 size={16} className="text-blue-400" />
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Info box */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                    className="flex items-start gap-3 p-4 bg-gradient-to-r from-violet-50 to-blue-50 rounded-2xl border border-violet-100">
                    <div className="w-7 h-7 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles size={13} className="text-violet-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-violet-700 mb-0.5">Profile Tip</p>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Your name and photo appear in the sidebar and across the admin panel. Use a clear photo for best results.
                      </p>
                    </div>
                  </motion.div>

                  {/* Progress indicator */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-gray-500">Profile Completion</p>
                      <p className="text-xs font-black text-violet-600">
                        {[fullname, email, photoPreview].filter(Boolean).length * 33}%
                      </p>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${[fullname, email, photoPreview].filter(Boolean).length * 33}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full"
                      />
                    </div>
                    <div className="flex gap-3">
                      {[
                        { label: 'Name',  done: !!fullname },
                        { label: 'Email', done: !!email },
                        { label: 'Photo', done: !!photoPreview },
                      ].map(({ label, done }) => (
                        <span key={label} className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full transition-all ${
                          done ? 'bg-violet-100 text-violet-700' : 'bg-gray-100 text-gray-400'
                        }`}>
                          <CheckCircle2 size={9} className={done ? '' : 'opacity-30'} />
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Save Button */}
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <Button onClick={handleSave} disabled={loading}
                      className="w-full h-13 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 font-black text-sm shadow-xl hover:shadow-violet-200 hover:shadow-2xl transition-all text-white">
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin" /> Saving changes...
                        </span>
                      ) : saved ? (
                        <span className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" /> Saved Successfully!
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Save className="w-4 h-4" /> Save Changes
                        </span>
                      )}
                    </Button>
                  </motion.div>

                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
