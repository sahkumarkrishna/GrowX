import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaDownload } from "react-icons/fa";
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


  // ✅ Download resume as PDF (fetch single resume and export)
  const handleDownload = async (id, name) => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      const resumeData = res.data.data;

      // Create a temporary div to render resume content
      const tempDiv = document.createElement("div");
      tempDiv.style.position = "absolute";
      tempDiv.style.left = "-9999px";
      tempDiv.style.top = "0";
      tempDiv.style.width = "800px"; // A4 width
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
    return <p className="text-center text-gray-500 mt-20 text-lg">Loading resumes...</p>;

  if (!resumes.length)
    return (
      <div className="flex justify-center items-center min-h-[60vh] px-4">
        <Card className="p-8 sm:p-12 text-center  shadow-xl rounded-2xl max-w-md w-full">
          <CardTitle className="text-2xl sm:text-3xl font-bold text-pink-600 mb-4">
            No Resumes Found
          </CardTitle>
          <p className="text-gray-700 text-sm sm:text-base">
            You haven't added any resumes yet.
          </p>
        </Card>
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-pink-600 justify-center ">All Resumes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  ">
        {resumes.map((resume) => (
          <Card key={resume._id} className="p-4 hover:shadow-lg transition">
            <CardHeader>
              <CardTitle>
                {resume.personalInfo?.fullName || "Unnamed Resume"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Email:</strong> {resume.personalInfo?.email || "-"}</p>
              <p><strong>Phone:</strong> {resume.personalInfo?.phone || "-"}</p>

              <div className="flex flex-col sm:flex-row sm:gap-2 gap-2 mt-4 justify-center sm:justify-start">
                {/* View Resume */}
                <Button
                  className="flex-1 sm:flex-none bg-pink-500 hover:bg-pink-600 text-white font-medium px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105 flex items-center justify-center gap-2"
                  onClick={() => navigate(`/resume/${resume._id}`)}
                >
                  <FaEye /> View
                </Button>

                {/* Edit */}
                <Button
                  className="flex-1 sm:flex-none bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105 flex items-center justify-center gap-2"
                  onClick={() => navigate(`/edit-resume/${resume._id}`)}
                >
                  <FaEdit /> Edit
                </Button>

                {/* Delete */}
                <Button
                  className="flex-1 sm:flex-none bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105 flex items-center justify-center gap-2"
                  onClick={() => handleDelete(resume._id)}
                >
                  <FaTrash /> Delete
                </Button>

                {/* ✅ Download */}
                <Button
                  className="flex-1 sm:flex-none bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg shadow-md transition transform hover:scale-105 flex items-center justify-center gap-2"
                  onClick={() => handleDownload(resume._id, resume.personalInfo?.fullName)}
                >
                  <FaDownload /> Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
