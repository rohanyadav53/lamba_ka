import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustMetrics from "@/components/TrustMetrics";
import MeetFounders from "@/components/MeetFounders";
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
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <TrustMetrics />
      <MeetFounders />
      <FeaturedUniversities />
      <PopularPrograms />
      <PlatformServices />
      <WhyChoose />
      <HowItWorks />
      <CounsellorSection />
      <Testimonials />
      <PlacementsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
