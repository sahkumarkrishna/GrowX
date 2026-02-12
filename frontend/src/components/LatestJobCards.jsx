import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { MapPin, Briefcase, DollarSign, TrendingUp } from 'lucide-react'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className='group relative p-5 rounded-2xl shadow-lg bg-white border-2 border-gray-200 cursor-pointer hover:border-purple-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden'
        >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            
            {/* Trending Badge */}
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                <TrendingUp className="h-3 w-3" />
                Hot
            </div>

            <div className='flex items-center gap-4 mb-4'>
                {job?.company?.logo && (
                    <img
                        src={job.company.logo}
                        alt={`${job.company.name} logo`}
                        className='w-12 h-12 object-contain rounded-lg border-2 border-gray-200 group-hover:border-purple-300 transition-colors'
                    />
                )}
                <div>
                    <h1 className='font-bold text-base sm:text-lg text-gray-900 group-hover:text-purple-600 transition-colors'>{job?.company?.name}</h1>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="h-3 w-3" />
                        <p>India</p>
                    </div>
                </div>
            </div>

            <div className='mb-4'>
                <h1 className='font-extrabold text-lg mb-2 text-gray-900'>{job?.title}</h1>
                <p className='text-sm text-gray-600 line-clamp-2'>{job?.description}</p>
            </div>

            <div className='flex flex-wrap items-center gap-2'>
                <Badge className='bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 border-blue-300 font-semibold px-3 py-1'>
                    <Briefcase className="h-3 w-3 mr-1 inline" />
                    {job?.position} Position{job?.position > 1 ? 's' : ''}
                </Badge>
                <Badge className='bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border-orange-300 font-semibold px-3 py-1'>
                    {job?.jobType}
                </Badge>
                <Badge className='bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-300 font-semibold px-3 py-1'>
                    <DollarSign className="h-3 w-3 mr-1 inline" />
                    ₹{job?.salary} LPA
                </Badge>
            </div>
        </div>
    )
}

export default LatestJobCards;
