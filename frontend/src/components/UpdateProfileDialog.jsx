import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, User, Mail, Phone, FileText, Award, Briefcase } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const USER_API_END_POINT = import.meta.env.VITE_USER_API;

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || ""
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
        setOpen(false);
    }

    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[500px] bg-white rounded-2xl border-2 border-gray-200" onInteractOutside={() => setOpen(false)}>
                <DialogHeader className="border-b border-gray-200 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                        </div>
                        <DialogTitle className="text-2xl font-extrabold text-gray-900">Update Profile</DialogTitle>
                    </div>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className='grid gap-4 py-4'>
                        <div className='space-y-2'>
                            <Label htmlFor="name" className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                                <User className="h-4 w-4 text-purple-600" />
                                Full Name
                            </Label>
                            <Input
                                id="name"
                                name="fullname"
                                type="text"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                className="h-11 border-2 focus:border-purple-500 rounded-xl"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="email" className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                                <Mail className="h-4 w-4 text-blue-600" />
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className="h-11 border-2 focus:border-blue-500 rounded-xl"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="phoneNumber" className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                                <Phone className="h-4 w-4 text-green-600" />
                                Phone Number
                            </Label>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                className="h-11 border-2 focus:border-green-500 rounded-xl"
                                placeholder="+91 9876543210"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="bio" className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                                <Briefcase className="h-4 w-4 text-orange-600" />
                                Bio
                            </Label>
                            <Input
                                id="bio"
                                name="bio"
                                value={input.bio}
                                onChange={changeEventHandler}
                                className="h-11 border-2 focus:border-orange-500 rounded-xl"
                                placeholder="Tell us about yourself"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="skills" className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                                <Award className="h-4 w-4 text-pink-600" />
                                Skills
                            </Label>
                            <Input
                                id="skills"
                                name="skills"
                                value={input.skills}
                                onChange={changeEventHandler}
                                className="h-11 border-2 focus:border-pink-500 rounded-xl"
                                placeholder="React, Node.js, Python"
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="file" className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                                <FileText className="h-4 w-4 text-indigo-600" />
                                Resume (PDF)
                            </Label>
                            <Input
                                id="file"
                                name="file"
                                type="file"
                                accept="application/pdf"
                                onChange={fileChangeHandler}
                                className="h-11 border-2 focus:border-indigo-500 rounded-xl cursor-pointer"
                            />
                        </div>
                    </div>
                    <DialogFooter className="border-t border-gray-200 pt-4">
                        {
                            loading ? (
                                <Button disabled className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold">
                                    <Loader2 className='mr-2 h-5 w-5 animate-spin' /> Updating...
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl font-semibold shadow-lg">
                                    Update Profile
                                </Button>
                            )
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog