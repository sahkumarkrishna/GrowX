import HeroSection from "./Resume/HeroSection";
import AboutSection from "./Resume/About";
import StatsSection from "./Resume/StatsSection";
import WhyChoose from "./Resume/WhyChoose";
import FeedbackSection from "./Resume/FeedbackSection";
import FAQSection from "./Resume/Frequently Asked Questions";

const ResumeHome = () => {
    return (
        <div>
            <HeroSection/>
            <AboutSection/>
            <StatsSection/>
           
            <WhyChoose/>
            <FeedbackSection/>
            <FAQSection/>
        </div>
    );
}

export default ResumeHome;
