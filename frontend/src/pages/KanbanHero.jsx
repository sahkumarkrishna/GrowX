
import About from "./KanbanBoard/About";
import FAQs from "./KanbanBoard/FAQ";
import FeaturesSection from "./KanbanBoard/FeaturesSection";
import FeedbackSection from "./KanbanBoard/FeedbackSection";
import HeroSection from "./KanbanBoard/HeroSection";
import StatsSection from "./KanbanBoard/StatsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <About />
      <StatsSection />
      <FeaturesSection />
      <FeedbackSection />
      <FAQs />
    </>
  );
}
