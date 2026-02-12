import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useNavigate } from 'react-router-dom';

const JobDashboardUser = () => {
  const { allAppliedJobs } = useSelector((state) => state.job);
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">Applied Jobs ({allAppliedJobs?.length || 0})</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {!allAppliedJobs || allAppliedJobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No jobs applied yet</p>
              <Button onClick={() => navigate('/joball')} className="mt-4">
                Browse Jobs
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {allAppliedJobs.map((item) => (
                <motion.div
                  key={item._id}
                  whileHover={{ scale: 1.02 }}
                  className="border rounded-lg p-4 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={item?.job?.company?.logo} />
                          <AvatarFallback>{item?.job?.company?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{item?.job?.title}</h3>
                          <p className="text-gray-600">{item?.job?.company?.name}</p>
                          <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {item?.job?.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              {item?.job?.jobType}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Applied: {new Date(item?.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={getStatusColor(item?.status)}>
                        {item?.status?.toUpperCase()}
                      </Badge>
                      <Button
                        onClick={() => navigate(`/description/${item?.job?._id}`)}
                        variant="outline"
                        size="sm"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default JobDashboardUser;
