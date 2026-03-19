import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

const universities = [
  "Manipal University", "SRM University", "Sharda University",
  "OP Jindal University", "Amity University", "LPU",
];

const HeroSection = () => {
  return (
    <section className="hero-gradient text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 pt-20 pb-16 md:pt-28 md:pb-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up">
            Find & Compare India's Top Online Universities
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/75 mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            Make an informed decision with side-by-side comparisons of UGC-approved online universities. Get expert guidance every step of the way.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero-primary" size="lg" className="px-8 py-6 rounded-xl">
              Compare Universities <ArrowRight className="ml-1" size={18} />
            </Button>
            <Button variant="hero-secondary" size="lg" className="px-8 py-6 rounded-xl">
              <MessageCircle size={18} className="mr-1" /> Talk to Expert
            </Button>
          </div>
        </div>

        {/* University logos */}
        <div className="mt-16 md:mt-20 animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
          <p className="text-center text-sm text-primary-foreground/50 mb-6 font-medium tracking-wide uppercase">
            Partnered with India's leading universities
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {universities.map((uni) => (
              <div
                key={uni}
                className="bg-primary-foreground/10 backdrop-blur-sm px-5 py-3 rounded-xl text-sm font-medium text-primary-foreground/70 border border-primary-foreground/10"
              >
                {uni}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
