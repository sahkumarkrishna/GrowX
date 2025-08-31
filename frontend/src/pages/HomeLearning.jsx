

import Herosection from '../pages/Learning/Herosection'

import About from './Learning/About'
import WhyChooseUs from './Learning/WhyChooseUs'
import StatsSection from './Learning/StatsSection'
import FeedbackSection from './Learning/Feedback'
import FAQSection from './Learning/FAQSection'

import Certificate from './Learning/Certificate'
import Features from './Learning/Features'


export default function Home() {
  return (
    <>
   
    <Herosection/>
    
    <About/>
   
    <StatsSection/>
     <Features/>
    <WhyChooseUs/>
    <FeedbackSection/>
    <FAQSection/>
    <Certificate/>
    
     
    </>
  )
}
