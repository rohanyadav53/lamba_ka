import { ShieldCheck, UserCheck, GitCompareArrows, Handshake } from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "Verified Universities", desc: "Every university on our platform is UGC-approved and NAAC accredited." },
  { icon: UserCheck, title: "Dedicated Counsellor", desc: "Get a personal counsellor who guides you from selection to enrollment." },
  { icon: GitCompareArrows, title: "Easy Comparison", desc: "Compare fees, rankings, placements, and curriculum side by side." },
  { icon: Handshake, title: "End-to-End Support", desc: "From application to admission, we handle the entire process for you." },
];

const WhyChoose = () => {
  return (
    <section className="section-padding section-alt">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">Why Choose sample_KA01</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We simplify your journey to the right online degree.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="card-elevated p-8 text-center animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent mb-5">
                <f.icon size={32} />
              </div>
              <h3 className="font-heading font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
