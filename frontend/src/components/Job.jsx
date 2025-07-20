import React, { useState } from 'react';
import { Button } from './ui/button';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  const handleSaveJob = () => {
    // ✅ Toggle saved state (you can also call an API here)
    setIsSaved(!isSaved);

    // Optional: Call API to save job
    // await axios.post('/api/saved-jobs', { jobId: job._id })
  };

  return (
    <div className="p-5 rounded-xl shadow-md bg-white border border-gray-100 hover:shadow-lg transition duration-300">
      {/* Top Section: Date and Bookmark */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? 'Today'
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          className="rounded-full"
          size="icon"
          onClick={handleSaveJob}
        >
          {isSaved ? (
            <BookmarkCheck className="w-4 h-4 text-purple-600" />
          ) : (
            <Bookmark className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Company Logo and Name */}
      <div className="flex items-center gap-3 my-4">
        <Avatar className="w-12 h-12">
          <AvatarImage
            src={job?.company?.logo || 'https://via.placeholder.com/150'}
            alt={job?.company?.name || 'Company Logo'}
          />
          <AvatarFallback>🏢</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold text-base md:text-lg">{job?.company?.name}</h2>
          <p className="text-xs text-gray-500">India</p>
        </div>
      </div>

      {/* Job Title and Description */}
      <div>
        <h1 className="font-bold text-lg md:text-xl mb-1">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Position{job?.position > 1 ? 's' : ''}
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          ₹{job?.salary} LPA
        </Badge>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-5">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="w-full sm:w-auto"
        >
          Details
        </Button>
        <Button
          className="bg-[#7209b7] w-full sm:w-auto text-white hover:bg-[#5e079e]"
          onClick={handleSaveJob}
        >
          {isSaved ? 'Saved' : 'Save For Later'}
        </Button>
      </div>
    </div>
  );
};

export default Job;
