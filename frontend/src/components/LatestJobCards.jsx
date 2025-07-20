import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer hover:shadow-2xl transition-all duration-200'
        >
            <div className='flex items-center gap-4'>
                {job?.company?.logo && (
                    <img
                        src={job.company.logo}
                        alt={`${job.company.name} logo`}
                        className='w-12 h-12 object-contain rounded-md border'
                    />
                )}
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div className='mt-3'>
                <h1 className='font-bold text-lg mb-1'>{job?.title}</h1>
                <p className='text-sm text-gray-600 line-clamp-2'>{job?.description}</p>
            </div>

            <div className='flex flex-wrap items-center gap-2 mt-4'>
                <Badge className='text-blue-700 font-bold' variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className='text-[#F83002] font-bold' variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className='text-[#7209b7] font-bold' variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>
        </div>
    )
}

export default LatestJobCards;
