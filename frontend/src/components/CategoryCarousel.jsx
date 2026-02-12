import { motion } from 'framer-motion';
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
  ArrowRight,
} from "lucide-react";

const categories = [
  { name: "Frontend Developer", icon: Layout, color: "from-blue-500 to-cyan-500", jobs: 245 },
  { name: "Backend Developer", icon: Code2, color: "from-purple-500 to-pink-500", jobs: 189 },
  { name: "FullStack Developer", icon: Settings, color: "from-emerald-500 to-teal-500", jobs: 312 },
  { name: "UI/UX Designer", icon: Wand2, color: "from-pink-500 to-rose-500", jobs: 156 },
  { name: "DevOps Engineer", icon: Cloud, color: "from-indigo-500 to-blue-500", jobs: 98 },
  { name: "Mobile App Developer", icon: Smartphone, color: "from-orange-500 to-amber-500", jobs: 134 },
  { name: "Machine Learning Engineer", icon: Cpu, color: "from-violet-500 to-purple-500", jobs: 87 },
  { name: "Data Scientist", icon: LineChart, color: "from-emerald-500 to-green-500", jobs: 176 },
  { name: "Product Manager", icon: User, color: "from-red-500 to-orange-500", jobs: 92 },
  { name: "Cloud Architect", icon: Cloud, color: "from-sky-500 to-blue-500", jobs: 67 },
  { name: "Cybersecurity Analyst", icon: ShieldCheck, color: "from-slate-600 to-gray-700", jobs: 54 },
  { name: "QA Engineer", icon: Bug, color: "from-lime-500 to-green-500", jobs: 123 },
  { name: "Database Administrator", icon: Database, color: "from-cyan-500 to-blue-500", jobs: 78 },
  { name: "Game Developer", icon: Gamepad2, color: "from-fuchsia-500 to-pink-500", jobs: 45 },
  { name: "Blockchain Developer", icon: Blocks, color: "from-amber-500 to-orange-500", jobs: 34 },
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    setTimeout(() => {
      navigate("/browse");
    }, 50);
  };

  return (
    <section className="w-full px-4 py-20 bg-gradient-to-br from-white to-emerald-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore by <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Category</span>
          </h2>
          <p className="text-xl text-gray-600">Find your perfect role across various tech domains</p>
        </motion.div>

        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <CarouselItem
                  key={index}
                  className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Button
                      onClick={() => searchJobHandler(cat.name)}
                      variant="outline"
                      className="w-full h-full group relative overflow-hidden rounded-3xl border-2 border-gray-200 hover:border-emerald-300 shadow-lg hover:shadow-2xl transition-all duration-300 p-6 bg-white hover:-translate-y-2"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                      <div className="relative flex flex-col items-center justify-center gap-4">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Icon size={28} />
                        </div>
                        <div className="text-center">
                          <span className="text-sm font-bold text-gray-900 block mb-1">
                            {cat.name}
                          </span>
                          <span className="text-xs text-gray-500 font-semibold">
                            {cat.jobs} Jobs
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </Button>
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 bg-white shadow-lg border-2 hover:bg-emerald-50 hover:border-emerald-300" />
          <CarouselNext className="hidden md:flex -right-12 bg-white shadow-lg border-2 hover:bg-emerald-50 hover:border-emerald-300" />
        </Carousel>
      </div>
    </section>
  );
};

export default CategoryCarousel;
