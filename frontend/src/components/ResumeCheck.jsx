import React from 'react';
import { Button } from './ui/button';
import { ExternalLink } from 'lucide-react';

const ResumeCheck = () => {
  return (
    <section className="min-h-[70vh] bg-gradient-to-br from-[#f3f4f6] to-white py-16 px-6 flex items-center justify-center">
      <div className="max-w-3xl w-full text-center flex flex-col items-center justify-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#6A38C2] mb-4 leading-tight">
          Get Your Resume <br className="hidden md:block" /> ATS-Ready
        </h2>
        <p className="text-gray-600 text-sm md:text-base mb-6 max-w-xl">
          Make sure your resume beats the bots. Use our partner tool to check your resume’s ATS score and get personalized suggestions to improve your chances of landing interviews.
        </p>
        <a
          href="https://resumeworded.com/score"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="bg-[#6A38C2] text-white px-6 py-3 text-sm md:text-base rounded-full flex items-center gap-2 shadow-md hover:bg-[#5831a8] transition">
            Check Resume with ATS <ExternalLink size={18} />
          </Button>
        </a>
      </div>
    </section>
  );
};

export default ResumeCheck;
