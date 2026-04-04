import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustMetrics from "@/components/TrustMetrics";
import FeaturedUniversities from "@/components/FeaturedUniversities";
import PopularPrograms from "@/components/PopularPrograms";
import PlatformServices from "@/components/PlatformServices";
import WhyChoose from "@/components/WhyChoose";
import HowItWorks from "@/components/HowItWorks";
import CounsellorSection from "@/components/CounsellorSection";
import Testimonials from "@/components/Testimonials";
import PlacementsSection from "@/components/PlacementsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import MeetFounders from "@/components/MeetFounders"; // Import only once
import Footer from "@/components/Footer";
import LeadPopup from "@/components/LeadPopup";

const Index = () => {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection />
        <TrustMetrics />

        <FeaturedUniversities onCounselorOpen={() => setPopupOpen(true)} />

        <PopularPrograms />
        <PlatformServices />
        <WhyChoose />
        <HowItWorks />
        <CounsellorSection />
        <Testimonials />
        <PlacementsSection />
        <FAQSection />
        <CTASection />
        
        {/* Founders section placed perfectly before the footer */}
        <MeetFounders /> 
      </main>

      <Footer />

      {/* Lead Popup Logic */}
      {popupOpen && (
        <LeadPopup onClose={() => setPopupOpen(false)} />
      )}
    </div>
  );
};

export default Index;