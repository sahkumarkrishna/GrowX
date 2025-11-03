import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2, Mail, Lock } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const USER_API_END_POINT = import.meta.env.VITE_USER_API;
  const from = location.state?.from?.pathname || "/";

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.email || !input.password || !input.role) {
      toast.error("Please fill all fields including role");
      return;
    }

    try {
      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate(from, { replace: true });
      } else {
        toast.error(res.data.message || "Login failed!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 px-4">
    <div className="w-full max-w-xl bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-200 space-y-8">
      
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-gray-800">Welcome Back</h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Login to access your dashboard
        </p>
      </div>

      <form onSubmit={submitHandler} className="space-y-5">

        {/* Email */}
        <div>
          <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              id="email"
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="example@gmail.com"
              className="pl-10 h-12 rounded-lg"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              id="password"
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="pl-10 h-12 rounded-lg"
              required
            />
          </div>
        </div>

        {/* Role */}
        <div>
          <Label className="text-gray-700 font-medium">Role</Label>
          <RadioGroup
            className="flex gap-6 mt-3"
            value={input.role}
            onValueChange={(value) => setInput({ ...input, role: value })}
          >
            <label className="flex items-center gap-2 cursor-pointer">
              <RadioGroupItem value="student" id="student" />
              <span className="text-gray-700">Student</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <RadioGroupItem value="recruiter" id="recruiter" />
              <span className="text-gray-700">Recruiter</span>
            </label>
          </RadioGroup>
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full h-12 text-base font-semibold rounded-lg" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>

        {/* Bottom Link */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-blue-600 hover:underline">
            Create account
          </Link>
        </p>
      </form>
    </div>
  </div>
);

};

export default Login;
