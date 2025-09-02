
import About from "./Learning/About";

import FAQSection from "./Learning/FAQSection";
import Features from "./Learning/Features";
import FeedbackSection from "./Learning/Feedback";
import HeroSection from "./Learning/Herosection";
import StatsSection from "./Learning/StatsSection";
import WhyChooseLearning from "./Learning/WhyChooseUs";



const LearningHome = () => {
    return (
        <div>
            <HeroSection />

            <About />
            <StatsSection />
            <Features />
            <WhyChooseLearning />
            <FeedbackSection />
            <FAQSection />
           
        </div>
    );
}

export default LearningHome;
