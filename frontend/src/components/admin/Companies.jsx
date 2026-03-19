import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { Building2, Plus, Search, BarChart2, TrendingUp, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import AdminLayout from './AdminLayout'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell
} from 'recharts'

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4', '#8b5cf6']

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
    )
  }
  return null
}

const Companies = () => {
  useGetAllCompanies()
  const [input, setInput] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { companies } = useSelector(store => store.company)

  useEffect(() => { dispatch(setSearchCompanyByText(input)) }, [input])

  // ── Graph Data ──
  const monthlyData = (() => {
    const map = {}
    companies?.forEach(c => {
      if (c.createdAt) {
        const m = new Date(c.createdAt).toLocaleString('default', { month: 'short' })
        map[m] = (map[m] || 0) + 1
      }
    })
    return Object.entries(map).map(([month, count]) => ({ month, count }))
  })()

  const locationData = (() => {
    const map = {}
    companies?.forEach(c => {
      const loc = c.location || 'Unknown'
      map[loc] = (map[loc] || 0) + 1
    })
    return Object.entries(map).slice(0, 6).map(([name, value]) => ({ name, value }))
  })()

  const topCompanies = [...(companies || [])]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6)
    .map(c => ({
      name: c.name?.length > 12 ? c.name.slice(0, 12) + '..' : (c.name || 'N/A'),
      jobs: c.jobs?.length || 0,
    }))

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">

        {/* ── Hero Banner ── */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-16 -mb-16" />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl flex-shrink-0">
                  <Building2 className="h-9 w-9 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-black text-white mb-1">Companies</h1>
                  <p className="text-purple-200">Manage your registered companies & analytics</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">{companies?.length || 0} Total</span>
                    <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">{monthlyData.length} Active Months</span>
                  </div>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={() => navigate('/admin/companies/create')}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30 shadow-xl h-12 px-6 rounded-2xl font-bold">
                  <Plus className="h-5 w-5 mr-2" /> New Company
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ── Analytics Graph Section ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <BarChart2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-800">Company Analytics</h2>
              <p className="text-xs text-gray-500">Visual overview of company registrations</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Area Chart — Monthly Registrations */}
            <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
              <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100 px-6 py-4">
                  <CardTitle className="flex items-center gap-2 text-gray-800 text-base">
                    <TrendingUp className="w-5 h-5 text-indigo-600" />
                    Monthly Company Registrations
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={monthlyData}>
                      <defs>
                        <linearGradient id="companyAreaGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={3}
                        fill="url(#companyAreaGrad)"
                        dot={{ fill: '#6366f1', r: 5, strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 8 }} name="Companies" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Pie — Location Distribution */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
              <Card className="border-0 shadow-xl rounded-3xl overflow-hidden h-full">
                <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-100 px-6 py-4">
                  <CardTitle className="flex items-center gap-2 text-gray-800 text-base">
                    <Building2 className="w-5 h-5 text-pink-600" />
                    Location Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 flex flex-col items-center">
                  <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                      <Pie data={locationData} cx="50%" cy="50%" innerRadius={40} outerRadius={65}
                        dataKey="value" paddingAngle={4}>
                        {locationData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-col gap-1.5 w-full mt-2">
                    {locationData.map((l, i) => (
                      <div key={i} className="flex items-center justify-between px-3 py-1.5 rounded-xl"
                        style={{ backgroundColor: `${COLORS[i % COLORS.length]}15` }}>
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                          <span className="text-xs font-semibold text-gray-700 truncate max-w-[100px]">{l.name}</span>
                        </div>
                        <span className="text-xs font-black" style={{ color: COLORS[i % COLORS.length] }}>{l.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Bar Chart — Top Companies by Jobs */}
          {topCompanies.some(c => c.jobs > 0) && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6">
              <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100 px-6 py-4">
                  <CardTitle className="flex items-center gap-2 text-gray-800 text-base">
                    <BarChart2 className="w-5 h-5 text-emerald-600" />
                    Company Analytics Graph — Jobs per Company
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={topCompanies}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="jobs" radius={[8, 8, 0, 0]} name="Jobs" maxBarSize={44}>
                        {topCompanies.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>

        {/* ── Search Bar ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-5 mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              className="pl-12 h-12 bg-white border-2 border-gray-200 focus:border-indigo-500 rounded-2xl shadow-sm text-base"
              placeholder="Search companies by name..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </motion.div>

        {/* ── Table Card ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <CompaniesTable />
        </motion.div>

      </div>
    </AdminLayout>
  )
}

export default Companies
