import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaDownload, FaEdit, FaPrint, FaShare } from "react-icons/fa";
import axios from "axios";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ResumeTemplate from "./ResumeTemplate.jsx";

export default function ResumeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
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
        toast.success("Resume loaded successfully!");
      } catch (error) {
        console.error("Error fetching resume:", error);
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
      const element = resumeRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resume?.personalInfo?.fullName || "resume"}.pdf`);
      toast.success("Resume downloaded successfully!");
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast.error("Failed to download PDF");
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${resume?.personalInfo?.fullName}'s Resume`,
          text: "Check out my professional resume",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center -mt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-xl font-bold">Loading resume...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-8 px-4 -mt-16">
      {/* Floating Action Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto mb-6 sticky top-4 z-10 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-4"
      >
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-5 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
          >
            <IoMdArrowRoundBack size={20} />
            Back
          </motion.button>

          <div className="flex gap-3 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/edit-resume/${id}`)}
              className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-5 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              <FaEdit /> Edit
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrint}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              <FaPrint /> Print
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-5 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaDownload /> {downloading ? "Downloading..." : "Download PDF"}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              <FaShare /> Share
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Resume Display */}
      <motion.div
        ref={resumeRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="print:shadow-none"
      >
        {resume ? (
          <ResumeTemplate resume={resume} />
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">Resume not found</p>
          </div>
        )}
      </motion.div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print\:shadow-none,
          .print\:shadow-none * {
            visibility: visible;
          }
          .print\:shadow-none {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          button,
          .sticky {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
