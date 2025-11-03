import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import {
  Code2,
  Database,
  Cloud,
  ShieldCheck,
  Smartphone,
  Cpu,
  Layout,
  Settings,
  Bug,
  User,
  LineChart,
  Gamepad2,
  Blocks,
  Wand2,
} from "lucide-react";

const categories = [
  { name: "Frontend Developer", icon: <Layout size={18} /> },
  { name: "Backend Developer", icon: <Code2 size={18} /> },
  { name: "FullStack Developer", icon: <Settings size={18} /> },
  { name: "UI/UX Designer", icon: <Wand2 size={18} /> },
  { name: "DevOps Engineer", icon: <Cloud size={18} /> },
  { name: "Mobile App Developer", icon: <Smartphone size={18} /> },
  { name: "Machine Learning Engineer", icon: <Cpu size={18} /> },
  { name: "Data Scientist", icon: <LineChart size={18} /> },
  { name: "Product Manager", icon: <User size={18} /> },
  { name: "Cloud Architect", icon: <Cloud size={18} /> },
  { name: "Cybersecurity Analyst", icon: <ShieldCheck size={18} /> },
  { name: "QA Engineer", icon: <Bug size={18} /> },
  { name: "Database Administrator", icon: <Database size={18} /> },
  { name: "Game Developer", icon: <Gamepad2 size={18} /> },
  { name: "Blockchain Developer", icon: <Blocks size={18} /> },
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query)); // sets redux state
    setTimeout(() => {
      navigate("/browse"); // navigates after state is set
    }, 50);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 my-20">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-800">
        Explore by Category
      </h2>

      <Carousel className="max-w-6xl mx-auto">
        <CarouselContent>
          {categories.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 px-2 "
            >
              <Button
                onClick={() => searchJobHandler(cat.name)}
                variant="outline"
                className="w-full flex flex-col items-center justify-center rounded-xl border shadow hover:shadow-md hover:border-blue-500 transition-all duration-200 gap-2 py-6 text-gray-700"
              >
                <div className="text-blue-600">{cat.icon}</div>
                <span className="text-sm sm:text-base text-center">
                  {cat.name}
                </span>
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
