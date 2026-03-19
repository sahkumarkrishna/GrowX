import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Users, Search, UserCheck, UserX, Mail, Phone, Calendar,
  Crown, TrendingUp, Activity, BarChart2, Shield, Star, Zap,
  Trash2, ToggleLeft, ToggleRight, AlertTriangle
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'sonner';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl shadow-2xl p-4 min-w-[130px]">
        {label && <p className="font-bold text-gray-700 text-sm mb-2">{label}</p>}
        {payload.map((p, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-xs text-gray-600">{p.name}:</span>
            <span className="text-xs font-bold text-gray-800">{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const USER_API = import.meta.env.VITE_USER_API || 'http://localhost:8000/api/v1/user';

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${USER_API}/all`, { withCredentials: true });
      setUsers(res.data.users || []);
    } catch {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      await axios.delete(`${USER_API}/delete/${deleteTarget._id}`, { withCredentials: true });
      setUsers(prev => prev.filter(u => u._id !== deleteTarget._id));
      toast.success(`"${deleteTarget.fullname}" deleted successfully`);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to delete user');
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const handleToggleStatus = async (userId) => {
    try {
      const res = await axios.patch(`${USER_API}/toggle-status/${userId}`, {}, { withCredentials: true });
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, isActive: res.data.user.isActive } : u));
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update status');
    }
  };

  // ── Derived Stats ──
  const activeUsers   = users.filter(u => u.isActive !== false);
  const recruiters    = users.filter(u => u.role === 'recruiter');
  const students      = users.filter(u => u.role === 'student');
  const thisMonth     = users.filter(u => new Date(u.createdAt).getMonth() === new Date().getMonth());

  // ── Graph Data ──
  const monthlyData = (() => {
    const map = {};
    users.forEach(u => {
      if (u.createdAt) {
        const m = new Date(u.createdAt).toLocaleString('default', { month: 'short' });
        map[m] = (map[m] || 0) + 1;
      }
    });
    return Object.entries(map).map(([month, count]) => ({ month, count }));
  })();

  const roleData = [
    { name: 'Students',   value: students.length,   fill: '#8b5cf6' },
    { name: 'Recruiters', value: recruiters.length,  fill: '#3b82f6' },
    { name: 'Others',     value: users.length - students.length - recruiters.length, fill: '#10b981' },
  ].filter(d => d.value > 0);

  const weeklyData = (() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const map = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };
    users.forEach(u => {
      if (u.createdAt) {
        const d = days[new Date(u.createdAt).getDay()];
        map[d]++;
      }
    });
    return days.map(day => ({ day, users: map[day] }));
  })();

  // ── Filtered Users ──
  const filteredUsers = users.filter(u => {
    const matchSearch =
      u.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeFilter === 'recruiter') return matchSearch && u.role === 'recruiter';
    if (activeFilter === 'student')   return matchSearch && u.role === 'student';
    if (activeFilter === 'active')    return matchSearch && u.isActive !== false;
    return matchSearch;
  });

  const statCards = [
    { title: 'Total Users',    value: users.length,          icon: Users,      g: 'from-violet-500 to-purple-600',  bg: 'from-violet-50 to-purple-50',  border: 'border-violet-100' },
    { title: 'Active Users',   value: activeUsers.length,    icon: UserCheck,  g: 'from-emerald-500 to-green-600',  bg: 'from-emerald-50 to-green-50',  border: 'border-emerald-100' },
    { title: 'Recruiters',     value: recruiters.length,     icon: Crown,      g: 'from-amber-500 to-orange-500',   bg: 'from-amber-50 to-orange-50',   border: 'border-amber-100' },
    { title: 'Students',       value: students.length,       icon: Star,       g: 'from-blue-500 to-cyan-500',      bg: 'from-blue-50 to-cyan-50',      border: 'border-blue-100' },
    { title: 'Inactive',       value: users.length - activeUsers.length, icon: UserX, g: 'from-red-500 to-rose-500', bg: 'from-red-50 to-rose-50', border: 'border-red-100' },
    { title: 'Joined This Month', value: thisMonth.length,   icon: Zap,        g: 'from-pink-500 to-fuchsia-500',   bg: 'from-pink-50 to-fuchsia-50',   border: 'border-pink-100' },
  ];

  const filters = [
    { key: 'all',       label: `All (${users.length})` },
    { key: 'student',   label: `Students (${students.length})` },
    { key: 'recruiter', label: `Recruiters (${recruiters.length})` },
    { key: 'active',    label: `Active (${activeUsers.length})` },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-2xl animate-pulse">
              <Users className="w-10 h-10 text-white" />
            </div>
            <p className="text-gray-500 font-semibold text-lg">Loading Users...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">

        {/* ── Hero Banner ── */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white opacity-5 rounded-full -mr-24 -mt-24" />
            <div className="absolute bottom-0 left-0 w-52 h-52 bg-white opacity-5 rounded-full -ml-20 -mb-20" />
            {/* floating user avatars decoration */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex gap-2 opacity-30">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-white/40 border-2 border-white/60"
                  style={{ marginTop: i % 2 === 0 ? 0 : 16 }} />
              ))}
            </div>
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl flex-shrink-0">
                  <Users className="h-9 w-9 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-black text-white mb-1">Active Users</h1>
                  <p className="text-purple-200">Monitor & manage all platform users</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">{users.length} Total</span>
                    <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">{activeUsers.length} Active</span>
                    <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">{recruiters.length} Recruiters</span>
                    <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">{thisMonth.length} This Month</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Search & Filter Bar ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="mb-6">
          <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    className="pl-12 h-12 border-2 border-gray-200 focus:border-violet-500 rounded-2xl bg-gray-50 focus:bg-white transition-all shadow-sm"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {filters.map(f => (
                    <button key={f.key} onClick={() => setActiveFilter(f.key)}
                      className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all border ${
                        activeFilter === f.key
                          ? 'bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-200'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-violet-300 hover:text-violet-600'
                      }`}>
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ── Stat Cards ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {statCards.map((c, i) => (
            <motion.div key={c.title} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.04 * i }} whileHover={{ y: -4, scale: 1.04 }}>
              <Card className={`border ${c.border} shadow-md bg-gradient-to-br ${c.bg} overflow-hidden`}>
                <CardContent className="p-4">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${c.g} flex items-center justify-center shadow-md mb-3`}>
                    <c.icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-xs text-gray-500 font-medium leading-tight mb-1">{c.title}</p>
                  <p className="text-2xl font-black text-gray-800">{c.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Analytics Graphs ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
              <BarChart2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-800">User Analytics</h2>
              <p className="text-xs text-gray-500">Visual overview of user registrations & activity</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Area — Monthly Registrations */}
            <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 border-b border-violet-100 px-6 py-4">
                  <CardTitle className="flex items-center gap-2 text-gray-800 text-base">
                    <TrendingUp className="w-5 h-5 text-violet-600" />
                    Monthly User Registrations
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={230}>
                    <AreaChart data={monthlyData}>
                      <defs>
                        <linearGradient id="userAreaGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.28} />
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="count" stroke="#8b5cf6" strokeWidth={3}
                        fill="url(#userAreaGrad)"
                        dot={{ fill: '#8b5cf6', r: 5, strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 8 }} name="Users" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Donut — Role Distribution */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card className="border-0 shadow-xl rounded-3xl overflow-hidden h-full">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100 px-6 py-4">
                  <CardTitle className="flex items-center gap-2 text-gray-800 text-base">
                    <Shield className="w-5 h-5 text-blue-600" />
                    Role Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 flex flex-col items-center">
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie data={roleData} cx="50%" cy="50%" innerRadius={45} outerRadius={72}
                        dataKey="value" paddingAngle={4}>
                        {roleData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-col gap-2 w-full mt-3">
                    {roleData.map((r, i) => (
                      <div key={i} className="flex items-center justify-between px-3 py-2 rounded-xl"
                        style={{ backgroundColor: `${r.fill}15` }}>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: r.fill }} />
                          <span className="text-sm font-semibold text-gray-700">{r.name}</span>
                        </div>
                        <span className="text-sm font-black" style={{ color: r.fill }}>{r.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Bar — Weekly Signups */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100 px-6 py-4">
                <CardTitle className="flex items-center gap-2 text-gray-800 text-base">
                  <Activity className="w-5 h-5 text-emerald-600" />
                  User Signups by Day of Week
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="users" radius={[8, 8, 0, 0]} name="Users" maxBarSize={48}>
                      {weeklyData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* ── Users Grid ── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredUsers.map((user, index) => (
            <motion.div key={user._id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * index }} whileHover={{ y: -6, scale: 1.02 }}>
              <Card className="hover:shadow-2xl transition-all duration-400 border-0 shadow-lg overflow-hidden group">
                {/* Top color bar */}
                <div className={`h-1.5 group-hover:h-2 transition-all ${
                  user.role === 'recruiter'
                    ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-red-500'
                    : 'bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500'
                }`} />

                <CardContent className="p-6">
                  {/* Avatar + Name */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="relative flex-shrink-0">
                      <Avatar className="w-16 h-16 ring-4 ring-white shadow-lg">
                        <AvatarImage src={user.profile?.profilePhoto} />
                        <AvatarFallback className={`text-white text-xl font-black ${
                          user.role === 'recruiter'
                            ? 'bg-gradient-to-br from-amber-500 to-orange-600'
                            : 'bg-gradient-to-br from-violet-500 to-purple-600'
                        }`}>
                          {user.fullname?.charAt(0)?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      {/* Online dot */}
                      <div className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full border-2 border-white bg-emerald-400 shadow-sm" />
                      {user.role === 'recruiter' && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                          <Crown className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-lg text-gray-900 truncate group-hover:text-violet-600 transition-colors">
                        {user.fullname}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Badge className={`text-xs px-2 py-0.5 ${
                          user.role === 'recruiter'
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0'
                            : 'bg-gradient-to-r from-violet-500 to-purple-600 text-white border-0'
                        }`}>
                          {user.role}
                        </Badge>
                        <Badge className={`text-xs px-2 py-0.5 border-0 ${
                          user.isActive !== false
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {user.isActive !== false ? '● Active' : '○ Inactive'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2.5 p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Phone className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-blue-600 font-semibold">Phone</p>
                        <p className="text-xs text-gray-800 font-medium truncate">{user.phoneNumber || '—'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 p-3 bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl border border-violet-100">
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Calendar className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-violet-600 font-semibold">Joined</p>
                        <p className="text-xs text-gray-800 font-medium truncate">
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })
                            : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => handleToggleStatus(user._id)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                        user.isActive !== false
                          ? 'bg-orange-50 hover:bg-orange-100 text-orange-600 border-orange-100 hover:border-orange-300'
                          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border-emerald-100 hover:border-emerald-300'
                      }`}>
                      {user.isActive !== false
                        ? <><ToggleRight className="w-3.5 h-3.5" /> Deactivate</>
                        : <><ToggleLeft className="w-3.5 h-3.5" /> Activate</>}
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => setDeleteTarget(user)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 font-bold text-xs transition-all border border-red-100 hover:border-red-300">
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </motion.button>
                  </div>

                  {/* Skills / Bio preview */}
                  {user.profile?.bio && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                      <p className="text-xs text-gray-500 line-clamp-2">{user.profile.bio}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Empty State ── */}        {filteredUsers.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="w-28 h-28 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-violet-100 to-purple-200 flex items-center justify-center shadow-xl">
              <Users size={56} className="text-violet-500" />
            </div>
            <h3 className="text-2xl font-black text-gray-700 mb-2">No users found</h3>
            <p className="text-gray-400">Try adjusting your search or filter</p>
          </motion.div>
        )}

        {/* ── Footer Count ── */}
        {filteredUsers.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Showing <span className="font-bold text-gray-600">{filteredUsers.length}</span> of{' '}
              <span className="font-bold text-gray-600">{users.length}</span> users
            </p>
          </motion.div>
        )}

      </div>

      {/* ── Delete Confirmation Modal ── */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
            onClick={() => setDeleteTarget(null)}>
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full border border-gray-100"
              onClick={e => e.stopPropagation()}>
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-red-100 to-rose-100 flex items-center justify-center shadow-lg">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-black text-gray-800 text-center mb-2">Delete User?</h3>
              <p className="text-gray-500 text-center text-sm mb-6">
                Are you sure you want to delete{' '}
                <span className="font-bold text-gray-800">"{deleteTarget.fullname}"</span>?{' '}
                All their applications will also be removed.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setDeleteTarget(null)}
                  className="flex-1 h-11 rounded-2xl border-2 border-gray-200 font-semibold">
                  Cancel
                </Button>
                <Button onClick={handleDelete} disabled={deleting}
                  className="flex-1 h-11 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 font-bold shadow-lg text-white">
                  {deleting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Deleting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2"><Trash2 className="w-4 h-4" /> Delete</span>
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </AdminLayout>
  );
};

export default AdminUsers;
