import { Users, Headset, Star } from "lucide-react";

const metrics = [
  { icon: Users, value: "1 Lakh+", label: "Students Guided", delay: "0s" },
  { icon: Headset, value: "500+", label: "Expert Counsellors", delay: "0.1s" },
  { icon: Star, value: "4.8/5", label: "Student Rating", delay: "0.2s" },
];

const TrustMetrics = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="card-elevated p-8 text-center animate-fade-in-up"
              style={{ animationDelay: m.delay }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 text-accent mb-4">
                <m.icon size={28} />
              </div>
              <p className="text-3xl font-heading font-extrabold text-foreground mb-1">{m.value}</p>
              <p className="text-sm text-muted-foreground font-medium">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustMetrics;
