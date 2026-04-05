import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const counsellors = [
  { name: "Dr. Meera Kapoor", role: "Senior Education Counsellor", rating: 4.9, sessions: "2,423", img: "MK" },
  { name: "Arjun Nair", role: "Career Strategy Advisor", rating: 4.8, sessions: "3,105", img: "AN" },
  { name: "Sneha Verma", role: "Admissions Expert", rating: 4.9, sessions: "2,890", img: "SV" },
  { name: "Rajesh Gupta", role: "University Relations Lead", rating: 4.7, sessions: "2,150", img: "RG" },
];

const CounsellorSection = () => {
  const [startIdx, setStartIdx] = useState(0);
  const visible = 4;

  const prev = () => setStartIdx((i) => Math.max(0, i - 1));
  const next = () => setStartIdx((i) => Math.min(counsellors.length - visible, i + 1));

  return (
    <section className="py-16 md:py-24 section-alt">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Right Guidance from Experts
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            Our seasoned counsellors help you make the best decision for your future.
          </p>
        </div>

        {/* Credibility pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {["8–10 years experience", "4 expert counsellors", "2K–3K people placed"].map((pill) => (
            <span
              key={pill}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/5 border border-primary/15 text-xs font-semibold text-primary"
            >
              {pill}
            </span>
          ))}
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Arrows */}
          <button
            onClick={prev}
            disabled={startIdx === 0}
            className="hidden md:flex absolute -left-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card items-center justify-center text-foreground disabled:opacity-30 transition-all duration-200 hover:bg-accent hover:text-accent-foreground z-10"
            style={{ boxShadow: "var(--shadow-card)" }}
            aria-label="Previous counsellor"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            disabled={startIdx >= counsellors.length - visible}
            className="hidden md:flex absolute -right-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card items-center justify-center text-foreground disabled:opacity-30 transition-all duration-200 hover:bg-accent hover:text-accent-foreground z-10"
            style={{ boxShadow: "var(--shadow-card)" }}
            aria-label="Next counsellor"
          >
            <ChevronRight size={20} />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {counsellors.slice(startIdx, startIdx + visible).map((c, i) => (
              <div
                key={c.name}
                className="bg-card rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1.5 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.08}s`, boxShadow: "var(--shadow-card)" }}
              >
                {/* Avatar placeholder */}
                <div className="w-20 h-20 rounded-full bg-primary/10 text-primary font-heading font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {c.img}
                </div>
                <h3 className="font-heading font-bold text-foreground mb-1">{c.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{c.role}</p>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span className="text-sm font-semibold text-foreground">{c.rating}</span>
                </div>
                <span className="inline-block text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                  {c.sessions}+ Counselling
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CounsellorSection;
