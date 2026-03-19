import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Loader2, User, Mail, Phone, FileText, Award, Briefcase, Camera, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const USER_API = import.meta.env.VITE_USER_API;

const inp = "w-full border-2 border-gray-200 focus:border-purple-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors bg-white";

const Field = ({ label, icon: Icon, color, children }) => (
  <div>
    <label className={`text-xs font-bold uppercase tracking-wide mb-1.5 flex items-center gap-1.5 ${color}`}>
      <Icon size={12} /> {label}
    </label>
    {children}
  </div>
);

export default function UpdateProfileDialog({ open, setOpen }) {
  const dispatch   = useDispatch();
  const { user }   = useSelector(s => s.auth);
  const photoRef   = useRef();
  const resumeRef  = useRef();

  const [loading, setLoading]     = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(user?.profile?.profilePhoto || '');
  const [resumeFile, setResumeFile]     = useState(null);

  const [form, setForm] = useState({
    fullname:    user?.fullname    || '',
    email:       user?.email       || '',
    phoneNumber: user?.phoneNumber || '',
    bio:         user?.profile?.bio || '',
    skills:      user?.profile?.skills?.join(', ') || '',
  });

  const set = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const onPhoto = e => {
    const f = e.target.files?.[0];
    if (!f) return;
    setPhotoFile(f);
    setPhotoPreview(URL.createObjectURL(f));
  };

  const onResume = e => {
    const f = e.target.files?.[0];
    if (f) setResumeFile(f);
  };

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (photoFile)  fd.append('file', photoFile);
      if (resumeFile) fd.append('resume', resumeFile);

      const res = await axios.post(`${USER_API}/profile/update`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[560px] bg-white rounded-3xl border-0 shadow-2xl p-0 overflow-hidden max-h-[92vh] flex flex-col"
        onInteractOutside={() => setOpen(false)}>

        {/* Header */}
        <DialogHeader className="bg-gradient-to-r from-purple-600 to-blue-600 px-7 py-5 shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-black text-white">Edit Profile</DialogTitle>
              <p className="text-purple-200 text-xs mt-0.5">Update your personal information</p>
            </div>
            <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <X size={16} />
            </button>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 px-7 py-6">
          <form onSubmit={submit} className="space-y-5">

            {/* Profile Photo */}
            <div className="flex flex-col items-center gap-3 pb-5 border-b border-gray-100">
              <div className="relative">
                <img
                  src={photoPreview || 'https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg'}
                  alt="avatar"
                  className="w-24 h-24 rounded-2xl object-cover ring-4 ring-purple-100 shadow-lg"
                />
                <button type="button" onClick={() => photoRef.current.click()}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <Camera size={14} className="text-white" />
                </button>
                <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={onPhoto} />
              </div>
              <p className="text-xs text-gray-400 font-medium">Click camera icon to change photo</p>
            </div>

            {/* Personal Info */}
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Personal Information</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name" icon={User} color="text-purple-600">
                  <input name="fullname" value={form.fullname} onChange={set} placeholder="John Doe" className={inp} />
                </Field>
                <Field label="Email Address" icon={Mail} color="text-blue-600">
                  <input name="email" type="email" value={form.email} onChange={set} placeholder="john@example.com" className={inp} />
                </Field>
                <Field label="Phone Number" icon={Phone} color="text-green-600">
                  <input name="phoneNumber" value={form.phoneNumber} onChange={set} placeholder="+91 9876543210" className={inp} />
                </Field>
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Professional Info */}
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Professional Information</p>
              <div className="space-y-4">
                <Field label="Bio / About" icon={Briefcase} color="text-orange-600">
                  <textarea name="bio" value={form.bio} onChange={set} rows={3}
                    placeholder="Tell us about yourself, your experience and goals..."
                    className={`${inp} resize-none`} />
                </Field>
                <Field label="Skills (comma separated)" icon={Award} color="text-pink-600">
                  <input name="skills" value={form.skills} onChange={set}
                    placeholder="React, Node.js, Python, SQL, Figma..."
                    className={inp} />
                  {form.skills && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {form.skills.split(',').map(s => s.trim()).filter(Boolean).map((s, i) => (
                        <span key={i} className="text-xs bg-purple-100 text-purple-700 px-2.5 py-1 rounded-lg font-semibold">{s}</span>
                      ))}
                    </div>
                  )}
                </Field>
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Resume */}
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Resume</p>
              <Field label="Upload Resume (PDF)" icon={FileText} color="text-indigo-600">
                <div onClick={() => resumeRef.current.click()}
                  className={`w-full border-2 border-dashed rounded-xl px-4 py-4 flex items-center gap-3 cursor-pointer transition-all
                    ${resumeFile ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-gray-50 hover:border-purple-400 hover:bg-purple-50'}`}>
                  <input ref={resumeRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={onResume} />
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${resumeFile ? 'bg-green-500' : 'bg-gray-200'}`}>
                    <FileText size={16} className={resumeFile ? 'text-white' : 'text-gray-500'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    {resumeFile ? (
                      <p className="text-sm font-semibold text-green-700 truncate">{resumeFile.name}</p>
                    ) : user?.profile?.resumeOriginalName ? (
                      <>
                        <p className="text-sm font-semibold text-gray-700 truncate">{user.profile.resumeOriginalName}</p>
                        <p className="text-xs text-gray-400">Click to replace</p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-semibold text-gray-600">Click to upload resume</p>
                        <p className="text-xs text-gray-400">PDF, DOC, DOCX</p>
                      </>
                    )}
                  </div>
                  {resumeFile && (
                    <button type="button" onClick={ev => { ev.stopPropagation(); setResumeFile(null); }}
                      className="text-red-400 hover:text-red-600 shrink-0"><X size={14} /></button>
                  )}
                </div>
              </Field>
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-2">
              {loading
                ? <><Loader2 size={18} className="animate-spin" /> Updating...</>
                : <><User size={16} /> Save Changes</>}
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
