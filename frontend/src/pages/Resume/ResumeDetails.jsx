import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaDownload, FaEdit, FaPrint, FaShare } from "react-icons/fa";
import axios from "axios";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Resumeviews from "./Resumeviews";

export default function ResumeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isAdmin = searchParams.get("admin") === "true";

  const API_URL = import.meta.env.VITE_API_URL;
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const resumeRef = useRef();

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(`${API_URL}/${id}`);
        setResume(res.data.data);
        toast.success("Resume loaded!");
      } catch (err) {
        toast.error("Failed to load resume");
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [id]);

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      const canvas = await html2canvas(resumeRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save(`${resume?.personalInfo?.fullName || "resume"}.pdf`);

      toast.success("Downloaded!");
    } catch {
      toast.error("Download failed");
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl font-bold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
{/* Toolbar */}
{!isAdmin && (
  <div className="max-w-5xl mx-auto mb-6 sticky top-4 z-10">
    
    <div className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold
                   bg-gradient-to-r from-gray-700 to-gray-900
                   hover:scale-105 hover:shadow-lg transition-all duration-200"
      >
        <IoMdArrowRoundBack size={18} />
        Back
      </button>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center md:justify-end">

        {/* Edit */}
        <button
          onClick={() => navigate(`/edit-resume/${id}`)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white
                     bg-gradient-to-r from-yellow-400 to-orange-500
                     hover:scale-105 hover:shadow-lg transition-all duration-200"
        >
          <FaEdit />
          Edit
        </button>

        {/* Print */}
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white
                     bg-gradient-to-r from-blue-500 to-cyan-500
                     hover:scale-105 hover:shadow-lg transition-all duration-200"
        >
          <FaPrint />
          Print
        </button>

        {/* Download */}
        <button
          onClick={handleDownloadPDF}
          disabled={downloading}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white
                     bg-gradient-to-r from-green-500 to-emerald-600
                     hover:scale-105 hover:shadow-lg transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaDownload />
          {downloading ? "Downloading..." : "Download"}
        </button>

        {/* Share */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied!");
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white
                     bg-gradient-to-r from-purple-500 to-pink-500
                     hover:scale-105 hover:shadow-lg transition-all duration-200"
        >
          <FaShare />
          Share
        </button>

      </div>
    </div>
  </div>
)}

      {/* Resume */}
      <div ref={resumeRef}>
        <Resumeviews resume={resume} />
      </div>

      {/* Print Fix */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #resume-view, #resume-view * { visibility: visible; }
          #resume-view { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>
    </div>
  );
}