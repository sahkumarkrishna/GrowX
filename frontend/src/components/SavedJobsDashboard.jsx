import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bookmark, Calendar, MapPin, Briefcase, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import axios from 'axios';
import { toast } from 'sonner';

const SavedJobsDashboard = () => {
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const SAVED_JOB_API = `${import.meta.env.VITE_USER_API?.replace('/user', '/saved-job') || 'http://localhost:8000/api/v1/saved-job'}`;

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      const res = await axios.get(`${SAVED_JOB_API}/user`, { withCredentials: true });
      setSavedJobs(res.data.savedJobs || []);
    } catch (error) {
      console.error('Failed to fetch saved jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleUnsave = async (jobId) => {
    try {
      await axios.delete(`${SAVED_JOB_API}/unsave/${jobId}`, { withCredentials: true });
      setSavedJobs(savedJobs.filter(item => item.job._id !== jobId));
      toast.success('Job removed from saved');
    } catch (error) {
      toast.error('Failed to unsave job');
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Bookmark className="w-6 h-6" />
            Saved Jobs ({savedJobs?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
            </div>
          ) : !savedJobs || savedJobs.length === 0 ? (
            <div className="text-center py-12">
              <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No saved jobs yet</p>
              <Button onClick={() => navigate('/joball')} className="mt-4 bg-amber-600">
                Browse Jobs
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {savedJobs.map((item) => (
                <motion.div
                  key={item._id}
                  whileHover={{ scale: 1.02 }}
                  className="border-2 border-amber-100 rounded-lg p-4 hover:shadow-md transition-all bg-gradient-to-br from-amber-50 to-orange-50"
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
                              Saved: {new Date(item?.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Badge className="bg-amber-100 text-amber-800">
                              {item?.job?.position} Positions
                            </Badge>
                            <Badge variant="outline">
                              {item?.job?.salary} LPA
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Button
                        onClick={() => navigate(`/description/${item?.job?._id}`)}
                        className="bg-amber-600"
                        size="sm"
                      >
                        View Details
                      </Button>
                      <Button
                        onClick={() => handleUnsave(item?.job?._id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Remove
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

export default SavedJobsDashboard;
