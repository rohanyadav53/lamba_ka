import { Search, FileText, CheckCircle } from "lucide-react";

const steps = [
  { icon: Search, step: "01", title: "Compare", desc: "Browse and compare online programs across top universities." },
  { icon: FileText, step: "02", title: "Apply", desc: "Submit your application with guidance from our expert counsellors." },
  { icon: CheckCircle, step: "03", title: "Enroll", desc: "Complete admission and start your online degree journey." },
];

const HowItWorks = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Three simple steps to your online degree.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative text-center animate-fade-in-up"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px border-t-2 border-dashed border-border" />
              )}
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-accent/10 text-accent mb-6 relative">
                <s.icon size={36} />
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                  {s.step}
                </span>
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
