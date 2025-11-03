
import { Star } from "lucide-react"; 
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

const feedbackData = [
  {
    id: 1,
    name: "Ananya Sharma",
    gender: "Female",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    feedback: "The internship program gave me hands-on experience and boosted my confidence. Truly transformative!",
    rating: 5,
  },
  {
    id: 2,
    name: "Rohan Mehta",
    gender: "Male",
    image: "https://randomuser.me/api/portraits/men/77.jpg",
    feedback: "Learning from experts and working on real projects made my internship invaluable.",
    rating: 4,
  },
  {
    id: 3,
    name: "Ishita Jain",
    gender: "Female",
    image: "https://randomuser.me/api/portraits/women/58.jpg",
    feedback: "Mentorship and team collaboration helped me grow professionally and personally.",
    rating: 5,
  },
  {
    id: 4,
    name: "Karan Singh",
    gender: "Male",
    image: "https://randomuser.me/api/portraits/men/69.jpg",
    feedback: "Smooth onboarding and exciting projects made this internship a remarkable experience.",
    rating: 4,
  },
  {
    id: 5,
    name: "Tara Roy",
    gender: "Female",
    image: "https://randomuser.me/api/portraits/women/72.jpg",
    feedback: "Great learning resources, mentorship, and exposure to real-world challenges.",
    rating: 5,
  },
  {
    id: 6,
    name: "Vivaan Malhotra",
    gender: "Male",
    image: "https://randomuser.me/api/portraits/men/40.jpg",
    feedback: "I gained practical experience and valuable networking opportunities through this internship.",
    rating: 5,
  },
];

const FeedbackSection = () => {
  return (
    <section className="py-16 ">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-purple-900 mb-12">
          Internship Experiences
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {feedbackData.map((fb) => (
            <Card
              key={fb.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col justify-between border-l-4 border-pink-500"
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
              <p className="text-gray-800 mb-4">{fb.feedback}</p>
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
