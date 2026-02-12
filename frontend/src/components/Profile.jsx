import React, { useState } from 'react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen, Award, FileText } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-6 sm:py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Profile Card */}
        <div className="bg-white/80 backdrop-blur-md border-2 border-gray-200 rounded-2xl shadow-2xl p-6 sm:p-8 mb-6">
          {/* Header with Gradient */}
          <div className="h-24 sm:h-32 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 rounded-xl -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-16 sm:mb-20"></div>
          
          {/* Profile Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 -mt-12 sm:-mt-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
              <Avatar className="h-24 w-24 sm:h-28 sm:w-28 ring-4 ring-white shadow-xl">
                <AvatarImage
                  src={user?.profile?.profilePhoto || 'https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg'}
                  alt="profile"
                />
              </Avatar>
              <div className="mt-2 sm:mt-8">
                <h1 className="font-extrabold text-2xl sm:text-3xl text-gray-900">{user?.fullname}</h1>
                <p className="text-gray-600 text-sm sm:text-base mt-1">{user?.profile?.bio || 'No bio available'}</p>
              </div>
            </div>
            <Button onClick={() => setOpen(true)} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl shadow-lg mt-2 sm:mt-8">
              <Pen className="w-4 h-4 mr-2" /> Edit Profile
            </Button>
          </div>

          {/* Contact Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 sm:my-8">
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold">Email</p>
                <span className="text-sm font-medium text-gray-900">{user?.email || 'NA'}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Contact className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold">Phone</p>
                <span className="text-sm font-medium text-gray-900">{user?.phoneNumber || 'NA'}</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="my-6">
            <div className="flex items-center gap-2 mb-3">
              <Award className="h-5 w-5 text-purple-600" />
              <h2 className="font-bold text-lg text-gray-900">Skills</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {user?.profile?.skills?.length > 0 ? (
                user.profile.skills.map((skill, index) => (
                  <Badge key={index} className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-purple-300 px-3 py-1 text-sm">{skill}</Badge>
                ))
              ) : (
                <span className="text-gray-500">No skills added</span>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-green-600" />
              <Label className="text-base font-bold text-gray-900">Resume</Label>
            </div>
            {user?.profile?.resume ? (
              <a
                href={user.profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                {user.profile.resumeOriginalName}
              </a>
            ) : (
              <span className="text-gray-500">No resume uploaded</span>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
