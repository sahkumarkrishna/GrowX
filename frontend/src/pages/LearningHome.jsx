import Features from "./Intership/Features";
import About from "./Learning/About";
import Certificate from "./Learning/Certificate";
import FAQSection from "./Learning/FAQSection";
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
            <Certificate />
        </div>
    );
}

export default LearningHome;
