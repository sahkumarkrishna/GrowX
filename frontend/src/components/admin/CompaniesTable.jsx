import React, { useEffect, useState } from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Edit2, Trash2, Building2, Calendar, MapPin, Globe, AlertTriangle } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/button'
import { removeCompany } from '@/redux/companySlice'
import axios from 'axios'
import { toast } from 'sonner'

const COMPANY_API = import.meta.env.VITE_COMPANY_API

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company)
  const [filterCompany, setFilterCompany] = useState(companies)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const filtered = companies?.filter(c =>
      !searchCompanyByText || c?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    )
    setFilterCompany(filtered)
  }, [companies, searchCompanyByText])

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      setDeleting(true)
      await axios.delete(`${COMPANY_API}/delete/${deleteTarget._id}`, { withCredentials: true })
      dispatch(removeCompany(deleteTarget._id))
      toast.success(`"${deleteTarget.name}" deleted successfully`)
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to delete company')
    } finally {
      setDeleting(false)
      setDeleteTarget(null)
    }
  }

  if (!filterCompany || filterCompany.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mb-5 shadow-lg">
          <Building2 className="h-12 w-12 text-purple-500" />
        </div>
        <h3 className="text-2xl font-black text-gray-700 mb-2">No Companies Found</h3>
        <p className="text-gray-400 text-center max-w-sm">
          {searchCompanyByText ? 'Try adjusting your search term' : 'Get started by creating your first company'}
        </p>
      </div>
    )
  }

  return (
    <>
      {/* ── Company Cards ── */}
      <div className="p-6">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-12 gap-4 px-4 py-3 mb-2 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100">
          <div className="col-span-1 text-xs font-bold text-gray-500 uppercase tracking-wide">Logo</div>
          <div className="col-span-4 text-xs font-bold text-gray-500 uppercase tracking-wide">Company</div>
          <div className="col-span-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Location</div>
          <div className="col-span-2 text-xs font-bold text-gray-500 uppercase tracking-wide">Registered</div>
          <div className="col-span-2 text-xs font-bold text-gray-500 uppercase tracking-wide text-right">Actions</div>
        </div>

        {/* Rows */}
        <div className="space-y-3">
          <AnimatePresence>
            {filterCompany.map((company, index) => (
              <motion.div key={company._id}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{ delay: index * 0.04 }}
                className="group grid grid-cols-2 sm:grid-cols-12 gap-4 items-center px-4 py-4 rounded-2xl border border-gray-100 bg-white hover:border-indigo-200 hover:shadow-lg transition-all duration-300">

                {/* Logo */}
                <div className="col-span-1">
                  {company.logo ? (
                    <img src={company.logo} alt={company.name}
                      className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-md group-hover:scale-110 transition-transform" />
                  ) : (
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>

                {/* Name + Website */}
                <div className="col-span-1 sm:col-span-4 min-w-0">
                  <p className="font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">{company.name}</p>
                  {company.website && (
                    <a href={company.website} target="_blank" rel="noreferrer"
                      className="flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-700 mt-0.5 truncate"
                      onClick={e => e.stopPropagation()}>
                      <Globe className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{company.website.replace(/^https?:\/\//, '')}</span>
                    </a>
                  )}
                </div>

                {/* Location */}
                <div className="col-span-1 sm:col-span-3 hidden sm:flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <span className="text-sm text-gray-600 truncate">{company.location || '—'}</span>
                </div>

                {/* Date */}
                <div className="col-span-1 sm:col-span-2 hidden sm:flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    {company.createdAt ? new Date(company.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric'
                    }) : 'N/A'}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-2 sm:col-span-2 flex items-center justify-end gap-2">
                  <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/admin/companies/${company._id}`)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-semibold text-xs transition-all border border-indigo-100 hover:border-indigo-300 shadow-sm">
                    <Edit2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Edit</span>
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                    onClick={() => setDeleteTarget(company)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 font-semibold text-xs transition-all border border-red-100 hover:border-red-300 shadow-sm">
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Delete</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer count */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-400 font-medium">
            Showing <span className="font-bold text-gray-600">{filterCompany.length}</span> of{' '}
            <span className="font-bold text-gray-600">{companies?.length}</span> companies
          </p>
        </div>
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

              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-red-100 to-rose-100 flex items-center justify-center shadow-lg">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>

              <h3 className="text-xl font-black text-gray-800 text-center mb-2">Delete Company?</h3>
              <p className="text-gray-500 text-center text-sm mb-6">
                Are you sure you want to delete{' '}
                <span className="font-bold text-gray-800">"{deleteTarget.name}"</span>?
                This action cannot be undone.
              </p>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setDeleteTarget(null)}
                  className="flex-1 h-11 rounded-2xl border-2 border-gray-200 font-semibold hover:border-gray-300">
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
    </>
  )
}

export default CompaniesTable
