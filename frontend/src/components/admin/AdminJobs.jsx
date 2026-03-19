import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import { Briefcase, Plus, Search } from 'lucide-react'
import AdminLayout from './AdminLayout'

const AdminJobs = () => {
  useGetAllAdminJobs()
  const [input, setInput] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchJobByText(input))
  }, [input, dispatch])

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">Job Postings</h1>
              <p className="text-sm text-gray-600">Manage all your job listings</p>
            </div>
          </div>
        </div>

        {/* Filter & Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-10 h-11 bg-white border-2 border-gray-200 focus:border-purple-500 rounded-xl shadow-sm"
              placeholder="Search by title, role..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="w-full sm:w-auto h-11 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl shadow-lg font-semibold"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Job
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <AdminJobsTable />
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminJobs
