import React, { useEffect, useState } from 'react'
import {
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow
} from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal, Calendar, Building2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany = companies?.filter(company =>
      !searchCompanyByText ||
      company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    );
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  if (!filterCompany || filterCompany.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-4">
          <Building2 className="h-10 w-10 text-purple-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No Companies Found</h3>
        <p className="text-gray-600 text-center max-w-md">
          {searchCompanyByText ? 'Try adjusting your search' : 'Get started by creating your first company'}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[640px]">
        <TableCaption className="text-gray-600 py-4">A list of your registered companies</TableCaption>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-50 hover:to-purple-50">
            <TableHead className="font-bold text-gray-900">Logo</TableHead>
            <TableHead className="font-bold text-gray-900">Company Name</TableHead>
            <TableHead className="font-bold text-gray-900">Created Date</TableHead>
            <TableHead className="text-right font-bold text-gray-900">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map((company, index) => (
            <motion.tr
              key={company._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-colors"
            >
              <TableCell className="py-4">
                <Avatar className="w-12 h-12 border-2 border-purple-200 shadow-md">
                  <AvatarImage src={company.logo || '/placeholder-company.png'} alt={company.name} />
                </Avatar>
              </TableCell>
              <TableCell className="font-semibold text-gray-900">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-purple-600" />
                  {company.name}
                </div>
              </TableCell>
              <TableCell className="text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  {company.createdAt ? new Date(company.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  }) : 'N/A'}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                      <MoreHorizontal className="h-5 w-5 text-gray-600" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40 p-2">
                    <div
                      onClick={() => navigate(`/admin/companies/${company._id}`)}
                      className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-blue-50 rounded-lg transition-colors group"
                    >
                      <Edit2 className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                      <span className="font-medium text-gray-700 group-hover:text-blue-600">Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CompaniesTable;
