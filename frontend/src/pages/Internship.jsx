
import HeroSection from './Internship/HeroSection';
import Apply from './Internship/Apply';
import About from './Internship/About';
import StatsSection from './Internship/StatsSection';
import ConnectivitySection from './Internship/ConnectivitySection';
import Features from './Internship/Features';
import WhyChooseInternship from './Internship/WhyChooseUs';

import Certificate from './Internship/Certificate';
import FAQSection from './Internship/FAQSection';
import FeedbackSection from './Internship/Feedback';
import Contact from './Internship/Contact';


const Internship = () => {
    return (
        <div>
            <HeroSection />
            <ConnectivitySection />
            <About />
            <StatsSection />
            <Features />
            < WhyChooseInternship />
            <FeedbackSection/>
            <FAQSection />
            <Certificate />
            <Apply />
            <Contact/>


        </div>
    );
}

export default Internship;
