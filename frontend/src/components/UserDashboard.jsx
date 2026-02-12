import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Briefcase, Bookmark } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            My Dashboard
          </h1>
          <p className="text-gray-600">Choose what you want to view</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="cursor-pointer hover:shadow-2xl transition-all border-2 border-purple-200" onClick={() => navigate('/dashboard/quiz')}>
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-10 h-10 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Quiz Dashboard</h2>
                <p className="text-gray-600">View your quiz results and performance</p>
                <Button className="mt-4 bg-purple-600">View Quiz Results</Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="cursor-pointer hover:shadow-2xl transition-all border-2 border-blue-200" onClick={() => navigate('/dashboard/jobs')}>
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Job Applications</h2>
                <p className="text-gray-600">Track your job applications</p>
                <Button className="mt-4 bg-blue-600">View Applications</Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="cursor-pointer hover:shadow-2xl transition-all border-2 border-amber-200" onClick={() => navigate('/dashboard/saved-jobs')}>
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bookmark className="w-10 h-10 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Saved Jobs</h2>
                <p className="text-gray-600">View your bookmarked jobs</p>
                <Button className="mt-4 bg-amber-600">View Saved Jobs</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
