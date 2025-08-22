import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./shared/Footer";
import About from "./About";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Company from "./Company";
import FeedbackSection from "./FeedbackSection";
import ResumeCheck from "./ResumeCheck";
import JobPortalStats from "./JobPortalStats";    

const Home = () => {
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
      <Navbar />
      <HeroSection />
      <About />
      <JobPortalStats/>
      <Company />
      <CategoryCarousel />
      <ResumeCheck />

      <LatestJobs />
      <FeedbackSection />

      <Footer />
    </div>
  );
};

export default Home;
