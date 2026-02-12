import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { Building2, Plus, Search, Briefcase } from 'lucide-react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { motion } from 'framer-motion'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center gap-2 bg-white text-gray-800 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-md hover:shadow-lg"
                >
                    <IoMdArrowRoundBack size={22} />
                    Back
                </motion.button>

                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-4 mb-3">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-xl">
                            <Building2 className="h-7 w-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Companies
                            </h1>
                            <p className="text-sm text-gray-600 flex items-center gap-1.5 mt-1">
                                <Briefcase className="h-4 w-4" />
                                Manage your registered companies
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Search & Action Bar */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 mb-6"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                                className="pl-12 h-12 bg-white border-2 border-gray-200 focus:border-purple-500 rounded-xl shadow-sm text-base"
                                placeholder="Search companies by name..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                        <Button 
                            onClick={() => navigate("/admin/companies/create")} 
                            className="w-full sm:w-auto h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 rounded-xl shadow-lg font-bold text-base px-6"
                        >
                            <Plus className="h-5 w-5 mr-2" />
                            New Company
                        </Button>
                    </div>
                </motion.div>

                {/* Table Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
                >
                    <CompaniesTable />
                </motion.div>
            </div>
        </div>
    )
}

export default Companies
