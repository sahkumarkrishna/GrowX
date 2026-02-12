import React, { useState } from 'react';
import { Button } from './ui/button';
import { Bookmark, BookmarkCheck, MapPin, Briefcase, DollarSign, Clock } from 'lucide-react';
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
    setIsSaved(!isSaved);
  };

  const daysAgo = daysAgoFunction(job?.createdAt);

  return (
    <div className="group relative p-6 rounded-3xl shadow-lg bg-white border border-gray-100 hover:border-emerald-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ">
      {/* Top Section */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          {daysAgo === 0 ? (
            <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              New Today
            </span>
          ) : (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {daysAgo}d ago
            </span>
          )}
        </div>
        <Button
          variant="outline"
          className="rounded-full border-2 hover:scale-110 transition-transform hover:border-emerald-500"
          size="icon"
          onClick={handleSaveJob}
        >
          {isSaved ? (
            <BookmarkCheck className="w-4 h-4 text-emerald-600" />
          ) : (
            <Bookmark className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-4 mb-4">
        <Avatar className="w-16 h-16 ring-2 ring-emerald-100 group-hover:ring-emerald-300 transition-all">
          <AvatarImage
            src={job?.company?.logo || 'https://via.placeholder.com/150'}
            alt={job?.company?.name || 'Company Logo'}
          />
          <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-xl">
            {job?.company?.name?.[0] || '🏢'}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-bold text-lg text-gray-900">{job?.company?.name}</h2>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="h-4 w-4" />
            <span>{job?.location || 'India'}</span>
          </div>
        </div>
      </div>

      {/* Job Title */}
      <h1 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
        {job?.title}
      </h1>
      <p className="text-sm text-gray-600 line-clamp-2 mb-4">{job?.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold px-3 py-1">
          <Briefcase className="h-3 w-3 mr-1" />
          {job?.position} Position{job?.position > 1 ? 's' : ''}
        </Badge>
        <Badge className="bg-teal-50 text-teal-700 border-teal-200 font-semibold px-3 py-1">
          {job?.jobType}
        </Badge>
        <Badge className="bg-amber-50 text-amber-700 border-amber-200 font-semibold px-3 py-1">
          <DollarSign className="h-3 w-3 mr-1" />
          ₹{job?.salary} LPA
        </Badge>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="flex-1 rounded-xl border-2 hover:border-emerald-600 hover:text-emerald-600 font-semibold"
        >
          Details
        </Button>
        <Button
          className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold shadow-lg"
          onClick={handleSaveJob}
        >
          {isSaved ? '✓ Saved' : 'Save'}
        </Button>
      </div>
    </div>
  );
};

export default Job;
