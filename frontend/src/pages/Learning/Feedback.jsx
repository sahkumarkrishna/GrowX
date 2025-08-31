import React from "react";
import { Star } from "lucide-react"; 
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card} from "@/components/ui/card";

// Updated feedback data with new names
const feedbackData = [
  {
    id: 1,
    name: "Sanya Kapoor",
    gender: "Female",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    feedback: "The portal helped me land my dream internship quickly. Highly intuitive and user-friendly!",
    rating: 5,
  },
  {
    id: 2,
    name: "Aditya Verma",
    gender: "Male",
    image: "https://randomuser.me/api/portraits/men/77.jpg",
    feedback: "Navigation is smooth and the learning resources are excellent, though job filters could improve.",
    rating: 4,
  },
  {
    id: 3,
    name: "Isha Mehta",
    gender: "Female",
    image: "https://randomuser.me/api/portraits/women/58.jpg",
    feedback: "Responsive support and practical guidance made my learning journey seamless.",
    rating: 5,
  },
  {
    id: 4,
    name: "Raghav Singh",
    gender: "Male",
    image: "https://randomuser.me/api/portraits/men/69.jpg",
    feedback: "Smooth experience and very engaging platform. I’d recommend it to everyone!",
    rating: 4,
  },
  {
    id: 5,
    name: "Tanya Roy",
    gender: "Female",
    image: "https://randomuser.me/api/portraits/women/72.jpg",
    feedback: "Good resources but resume suggestions can be more detailed.",
    rating: 3,
  },
  {
    id: 6,
    name: "Vivaan Malhotra",
    gender: "Male",
    image: "https://randomuser.me/api/portraits/men/40.jpg",
    feedback: "Found my perfect job in just a week. This platform is amazing!",
    rating: 5,
  },
];

const FeedbackSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          What Our Users Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {feedbackData.map((fb) => (
            <Card
              key={fb.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col justify-between"
            >
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={fb.image} alt={fb.name} />
                  <AvatarFallback>{fb.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{fb.name}</h4>
                  <p className="text-sm text-gray-500">{fb.gender}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{fb.feedback}</p>
              <div className="flex space-x-1">
                {Array.from({ length: fb.rating }, (_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
                {Array.from({ length: 5 - fb.rating }, (_, i) => (
                  <Star key={i} className="w-5 h-5 text-gray-300" />
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
