import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import LeadPopup from "@/components/LeadPopup"; // Make sure this import matches your file structure

const universities = [
  { name: "Manipal Online", link: "https://muj.onlinemanipal.com/" },
  { name: "VGU Online (Jaipur)", link: "https://onlinevgu.com/" },
  { name: "upGrad", link: "https://www.upgrad.com/" },
  { name: "Amity Online", link: "https://amityonline.com/" },
  { name: "Sharda Online", link: "https://shardaonline.ac.in/" },
  { name: "LPU Online", link: "https://www.lpuonline.com/" }
];

const HeroSection = () => {
  // State to control the visibility of the Lead Popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <section className="bg-[#0B1F3A] text-white relative overflow-hidden">
      <div className="container mx-auto px-4 pt-20 pb-16 md:pt-28 md:pb-24">
        
        {/* Hero Content */}
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            Same Degree. Better Price.
            <br /> The smartest way to enroll in Online Universities
          </h1>

          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Make an informed decision with expert guidance and transparent comparisons of India's top online universities.
          </p>

          {/* Added onClick handler to open the popup */}
          <Button 
            size="lg" 
            className="px-8 py-6 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold"
            onClick={() => setIsPopupOpen(true)}
          >
            <MessageCircle size={18} className="mr-2" />
            Talk to Expert
          </Button>
        </div>

        {/* Universities */}
        <div className="mt-16 md:mt-20">
          <p className="text-center text-sm text-white/50 mb-6 font-medium uppercase">
            Partnered with India's leading universities
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {universities.map((uni) => (
              <a key={uni.name} href={uni.link} target="_blank" rel="noopener noreferrer">
                <div className="bg-white/10 px-5 py-3 rounded-xl text-sm font-medium text-white/80 border border-white/10 hover:bg-white/20 transition">
                  {uni.name}
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Conditionally render the LeadPopup component */}
      {isPopupOpen && <LeadPopup onClose={() => setIsPopupOpen(false)} />}
    </section>
  );
};

export default HeroSection;