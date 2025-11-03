import React from "react";
import { HiStar, HiOutlineStar } from "react-icons/hi"; // Corrected icons
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

// Updated images
const feedbackData = [
  {
    id: 1,
    name: "Sanya Kapoor",
    gender: "Student",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    feedback: "This platform helped me land my dream internship quickly. Highly intuitive and user-friendly!",
    rating: 5,
  },
  {
    id: 2,
    name: "Aditya Verma",
    gender: "Developer",
    image: "https://randomuser.me/api/portraits/men/77.jpg",
    feedback: "Navigation is smooth and the quizzes are excellent, though filters could be improved.",
    rating: 4,
  },
  {
    id: 3,
    name: "Isha Mehta",
    gender: "Learner",
    image: "https://randomuser.me/api/portraits/women/58.jpg",
    feedback: "Support is very responsive and the practical guidance made my journey seamless.",
    rating: 5,
  },
  {
    id: 4,
    name: "Raghav Singh",
    gender: "Engineer",
    image: "https://randomuser.me/api/portraits/men/69.jpg",
    feedback: "Smooth experience and very engaging quizzes. I’d recommend it to everyone!",
    rating: 4,
  },
  {
    id: 5,
    name: "Tanya Roy",
    gender: "Student",
    image: "https://randomuser.me/api/portraits/women/72.jpg",
    feedback: "Good resources but quiz explanations can be more detailed.",
    rating: 3,
  },
  {
    id: 6,
    name: "Vivaan Malhotra",
    gender: "Professional",
    image: "https://randomuser.me/api/portraits/men/40.jpg",
    feedback: "Found my perfect job in just a week. This platform is amazing!",
    rating: 5,
  },
];


const FeedbackSection = () => {
  return (
    <section className="py-20 ">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-14">
          🌟 What Our Users Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {feedbackData.map((fb) => (
            <Card
              key={fb.id}
              className="bg-gradient-to-tr from-white via-indigo-50 to-purple-50 rounded-2xl shadow-md hover:shadow-xl transition transform hover:scale-[1.02] p-6 flex flex-col justify-between"
            >
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-16 h-16 border-2 border-indigo-400 shadow-md">
                  <AvatarImage src={fb.image} alt={fb.name} className="object-cover" />
                  <AvatarFallback>{fb.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-lg font-semibold text-indigo-700">{fb.name}</h4>
                  <p className="text-sm text-gray-500">{fb.gender}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">“{fb.feedback}”</p>
              <div className="flex space-x-1">
                {Array.from({ length: fb.rating }, (_, i) => (
                  <HiStar key={i} className="w-5 h-5 text-yellow-400" />
                ))}
                {Array.from({ length: 5 - fb.rating }, (_, i) => (
                  <HiOutlineStar key={i} className="w-5 h-5 text-gray-300" />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
