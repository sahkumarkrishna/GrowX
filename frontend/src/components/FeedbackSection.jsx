import React from "react";
import { Star, Send } from "lucide-react"; // ✈️ Using Send as an airplane-like icon
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

// Dummy feedback data
const feedbackData = [
  {
    id: 1,
    name: "Ananya Sharma",
    gender: "Female",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    feedback: "The portal helped me land my dream internship. Thank you!",
    rating: 5,
  },
  {
    id: 2,
    name: "Rohit Kumar",
    gender: "Male",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    feedback: "Easy to navigate, but needs better job filters.",
    rating: 4,
  },
  {
    id: 3,
    name: "Meena Patel",
    gender: "Female",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    feedback: "Great support from the recruiter team.",
    rating: 5,
  },
  {
    id: 4,
    name: "Aarav Singh",
    gender: "Male",
    image: "https://randomuser.me/api/portraits/men/60.jpg",
    feedback: "Smooth experience overall. Will recommend to friends.",
    rating: 4,
  },
  {
    id: 5,
    name: "Priya Verma",
    gender: "Female",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    feedback: "Needs improvements in resume suggestions.",
    rating: 3,
  },
  {
    id: 6,
    name: "Karan Mehta",
    gender: "Male",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    feedback: "Found a great job in just a week. Highly recommend!",
    rating: 5,
  },
];


const FeedbackSection = () => {
  return (
    <div className="py-12 ">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center items-center mb-4">
          <Send className="w-8 h-8 text-blue-500 mr-2" />
          <h2 className="text-3xl font-bold text-center">What Users Say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {feedbackData.map((fb) => (
            <Card key={fb.id} className="bg-white shadow-xl rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar>
                    <AvatarImage src={fb.image} alt={fb.name} />
                    <AvatarFallback>{fb.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{fb.name}</h4>
                    <p className="text-sm text-gray-500">{fb.gender}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{fb.feedback}</p>
                <div className="flex space-x-1 text-yellow-500">
                  {Array.from({ length: fb.rating }, (_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400" />
                  ))}
                  {Array.from({ length: 5 - fb.rating }, (_, i) => (
                    <Star key={i} className="w-5 h-5" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection;
