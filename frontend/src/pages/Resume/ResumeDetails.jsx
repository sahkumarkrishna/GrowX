import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ResumeTemplate from "./ResumeTemplate.jsx";


export default function ResumeDetails() {
  const { id } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get(`${API_URL}/${id}`);
        setResume(res.data.data);
      } catch (error) {
        console.error("Error fetching resume:", error);
      }
    };
    fetchResume();
  }, [id]);

  return <div>{resume ? <ResumeTemplate resume={resume} /> : <p>Loading...</p>}</div>;
}
