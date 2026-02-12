import Herosection from './Learning/Herosection';
import About from './Learning/About';
import StatsSection from './Learning/StatsSection';
import Features from './Learning/Features';
import WhyChooseUs from './Learning/WhyChooseUs';
import Feedback from './Learning/Feedback';
import FAQSection from './Learning/FAQSection';
import Certificate from './Learning/Certificate';

export default function HomeLearning() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Herosection />
      <About />
      <StatsSection />
      <Features />
      <WhyChooseUs />
      <Feedback />
      <FAQSection />
      <Certificate />
    </div>
  );
}
