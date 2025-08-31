

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
  <div className="bg-gradient-to-b from-white to-gray-100 py-20 px-4 sm:px-8">
       <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-6">
       <span className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full font-medium text-sm shadow-sm">
          🚀 No. 1 Job Hunt Platform
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Search, Apply & <br />
          Get Your <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
         Good life begins with a good company. Start exploring thousands of
         jobs in one place. Connect with top employers, unlock your potential,
          and take the next big step in your career journey today.
        </p>
        <div className="flex w-full sm:w-[90%] md:w-[70%] lg:w-[50%] mx-auto shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-2 sm:gap-4">
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full py-2 text-sm sm:text-base"
          />
          <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2] px-4 py-2">
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
