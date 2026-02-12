import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaDownload, FaPlus } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { motion } from "framer-motion";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function AllResumes() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResumes();
  }, [API_URL]);

  const fetchResumes = async () => {
    try {
      const res = await axios.get(`${API_URL}`);
      setResumes(res.data.data || []);
      toast.success("Resumes loaded successfully ✅");
    } catch (error) {
      console.error("Error fetching resumes:", error);
      toast.error("Failed to fetch resumes ❌");
    } finally {
      setLoading(false);
    }
  };

 const handleDelete = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    setResumes((prev) => prev.filter((resume) => resume._id !== id));
    toast.success("Resume deleted successfully 🗑️");
  } catch (error) {
    console.error("Error deleting resume:", error);
    toast.error("Failed to delete resume ❌");
  }
};

  const handleDownload = async (id, name) => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      const resumeData = res.data.data;

      const tempDiv = document.createElement("div");
      tempDiv.style.position = "absolute";
      tempDiv.style.left = "-9999px";
      tempDiv.style.top = "0";
      tempDiv.style.width = "800px";
      tempDiv.innerHTML = `
        <div style="padding:20px; font-family:Arial; line-height:1.5;">
          <h2 style="margin:0; color:#E91E63;">${resumeData.personalInfo?.fullName || "Unnamed Resume"}</h2>
          <p>${resumeData.personalInfo?.title || ""}</p>
          <p><b>Email:</b> ${resumeData.personalInfo?.email || "-"}</p>
          <p><b>Phone:</b> ${resumeData.personalInfo?.phone || "-"}</p>
          <hr/>
          <h3>Education</h3>
          ${(resumeData.education || [])
            .map(
              (edu) => `
              <p><b>${edu.degree}</b> - ${edu.institution} (${edu.startDate} - ${edu.endDate || "Present"})</p>
            `
            )
            .join("")}
        </div>
      `;
      document.body.appendChild(tempDiv);

      const canvas = await html2canvas(tempDiv, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${name || "resume"}.pdf`);

      document.body.removeChild(tempDiv);
      toast.success("Resume downloaded ✅");
    } catch (err) {
      console.error(err);
      toast.error("Failed to download resume ❌");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-6 -mt-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-md"
        >
          <IoMdArrowRoundBack size={24} />
          Back
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              My Resumes
            </h1>
            <p className="text-gray-600 mt-2">{resumes.length} resume{resumes.length !== 1 ? 's' : ''} found</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/resume-builder')}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            <FaPlus /> Create New Resume
          </motion.button>
        </motion.div>

        {!resumes.length ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center items-center min-h-[50vh]"
          >
            <Card className="p-12 text-center shadow-2xl rounded-2xl max-w-md w-full bg-white">
              <div className="text-6xl mb-4">📄</div>
              <CardTitle className="text-3xl font-bold text-pink-600 mb-4">
                No Resumes Found
              </CardTitle>
              <p className="text-gray-700 mb-6">
                You haven't created any resumes yet. Start building your professional resume now!
              </p>
              <Button
                onClick={() => navigate('/resume-builder')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold"
              >
                Create Your First Resume
              </Button>
            </Card>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {resumes.map((resume, idx) => (
              <motion.div
                key={resume._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 bg-white border-2 border-purple-100 overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600"></div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                        {resume.personalInfo?.fullName?.charAt(0) || "U"}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-bold text-gray-800 truncate">
                          {resume.personalInfo?.fullName || "Unnamed Resume"}
                        </CardTitle>
                        <p className="text-sm text-gray-500 truncate">{resume.personalInfo?.title || "No title"}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4 text-sm">
                      <p className="text-gray-600 truncate">
                        <span className="font-semibold">✉️</span> {resume.personalInfo?.email || "-"}
                      </p>
                      <p className="text-gray-600 truncate">
                        <span className="font-semibold">📞</span> {resume.personalInfo?.phone || "-"}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition flex items-center justify-center gap-1"
                        onClick={() => navigate(`/resume/${resume._id}`)}
                      >
                        <FaEye size={14} /> View
                      </Button>

                      <Button
                        size="sm"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition flex items-center justify-center gap-1"
                        onClick={() => navigate(`/edit-resume/${resume._id}`)}
                      >
                        <FaEdit size={14} /> Edit
                      </Button>

                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition flex items-center justify-center gap-1"
                        onClick={() => handleDownload(resume._id, resume.personalInfo?.fullName)}
                      >
                        <FaDownload size={14} /> Download
                      </Button>

                      <Button
                        size="sm"
                        className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition flex items-center justify-center gap-1"
                        onClick={() => handleDelete(resume._id)}
                      >
                        <FaTrash size={14} /> Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
