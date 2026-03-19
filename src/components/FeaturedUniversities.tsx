import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const universities = [
  { name: "Manipal University", desc: "NAAC A+ accredited. Industry-focused online programs with world-class faculty.", tag: "Top Rated" },
  { name: "SRM University", desc: "One of India's top-ranked private universities offering flexible online degrees.", tag: "Popular" },
  { name: "Sharda University", desc: "UGC-approved online programs with strong placement support and mentorship.", tag: "Trending" },
  { name: "OP Jindal University", desc: "Globally recognized programs with emphasis on research and innovation.", tag: "Premium" },
  { name: "Amity University", desc: "India's leading education group offering diverse online programs.", tag: "Trusted" },
  { name: "LPU Online", desc: "Affordable quality education with extensive industry collaborations.", tag: "Value Pick" },
  { name: "Jain University", desc: "NAAC A accredited institution with cutting-edge online learning platform.", tag: "Rising" },
  { name: "UPES Online", desc: "Specialized programs in energy, design, and business with industry partnerships.", tag: "Specialized" },
];

const FeaturedUniversities = () => {
  return (
    <section className="py-16 md:py-24 section-alt">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">Featured Universities</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore top UGC-approved online universities handpicked by our experts.
          </p>
        </div>

        {/* Best prices pill */}
        <div className="flex justify-center mb-12">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border-2 border-accent/40 bg-accent/5 text-accent font-heading font-bold text-sm tracking-wide">
            ✦ Best prices guaranteed.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {universities.map((uni, i) => (
            <div
              key={uni.name}
              className="bg-card rounded-2xl p-6 flex flex-col animate-fade-in-up transition-all duration-300 hover:-translate-y-1.5"
              style={{
                animationDelay: `${i * 0.07}s`,
                boxShadow: "var(--shadow-card)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "var(--shadow-card-hover)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "var(--shadow-card)"; }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center font-heading font-bold text-primary text-lg">
                  {uni.name.charAt(0)}
                </div>
                <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                  {uni.tag}
                </span>
              </div>
              <h3 className="font-heading font-bold text-foreground mb-2">{uni.name}</h3>
              <p className="text-sm text-muted-foreground mb-6 flex-1">{uni.desc}</p>
              <Button variant="default" size="sm" className="w-full rounded-xl">
                View Programs <ArrowRight size={14} className="ml-1" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedUniversities;
