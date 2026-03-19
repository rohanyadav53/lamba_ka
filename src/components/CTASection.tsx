import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="hero-gradient text-primary-foreground section-padding relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-accent/20 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 max-w-2xl mx-auto leading-tight">
          Start Your Online Degree Journey Today
        </h2>
        <p className="text-primary-foreground/70 mb-10 max-w-lg mx-auto text-lg">
          Join over 1 lakh students who found their perfect university through shikshavision.com.
        </p>
        <Button variant="hero-primary" size="lg" className="px-10 py-6 rounded-xl text-base">
          Get Free Counselling <ArrowRight size={18} className="ml-1" />
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
