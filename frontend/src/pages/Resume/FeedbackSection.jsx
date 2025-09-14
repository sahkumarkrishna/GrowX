import { Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

const feedbackData = [
  {
    id: 1,
    name: "Rohit Sharma",
    gender: "Male",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    feedback:
      "Krishna's resume website is beautifully designed and easy to navigate. The interactive sections make exploring his work enjoyable!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sneha Patel",
    gender: "Female",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    feedback:
      "I love the modern design and smooth animations. It really showcases Krishna's skills and projects professionally.",
    rating: 5,
  },
  {
    id: 3,
    name: "Aditya Verma",
    gender: "Male",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    feedback:
      "The resume website is responsive and very well organized. It makes reviewing Krishna's portfolio quick and intuitive.",
    rating: 4,
  },
  {
    id: 4,
    name: "Priya Sharma",
    gender: "Female",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    feedback:
      "Amazing attention to detail! The projects section and interactive components reflect a high level of professionalism.",
    rating: 5,
  },
  {
    id: 5,
    name: "Raghav Joshi",
    gender: "Male",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    feedback:
      "Very clean design and excellent use of animations. Krishna's skills are highlighted perfectly through this site.",
    rating: 4,
  },
  {
    id: 6,
    name: "Anika Sen",
    gender: "Female",
    image: "https://randomuser.me/api/portraits/women/29.jpg",
    feedback:
      "The resume website is visually stunning and professional. It’s clear a lot of effort went into user experience.",
    rating: 5,
  },
];

const FeedbackSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-50 via-blue-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-purple-900 mb-16">
          What People Say About My Resume Website
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {feedbackData.map((fb) => (
            <Card
              key={fb.id}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all p-6 flex flex-col justify-between border-l-8 border-gradient-to-tr from-pink-500 via-purple-500 to-blue-500"
            >
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-16 h-16 ring-2 ring-purple-500">
                  <AvatarImage src={fb.image} alt={fb.name} />
                  <AvatarFallback>{fb.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-lg font-semibold text-purple-900">{fb.name}</h4>
                  <p className="text-sm text-gray-500">{fb.gender}</p>
                </div>
              </div>
              <p className="text-gray-800 mb-4 italic">"{fb.feedback}"</p>
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
