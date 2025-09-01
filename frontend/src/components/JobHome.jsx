import React, { useEffect } from "react";

import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";

import About from "./About";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Company from "./Company";
import FeedbackSection from "./FeedbackSection";
import ResumeCheck from "./ResumeCheck";
import JobPortalStats from "./JobPortalStats";

const JobHome = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>


      <HeroSection />
      <About />
      <JobPortalStats />
      <Company />
      <CategoryCarousel />
      <ResumeCheck />

      <LatestJobs />
      <FeedbackSection />

      
    </div>
  );
};

export default JobHome;
