const placements = [
  { name: "Rohit S.", company: "Paytm", role: "Product Analyst" },
  { name: "Kavya M.", company: "Wipro", role: "Software Engineer" },
  { name: "Aditya R.", company: "TCS", role: "Business Analyst" },
  { name: "Neha P.", company: "Amazon", role: "Operations Manager" },
  { name: "Vikram J.", company: "MagicBricks", role: "Marketing Lead" },
  { name: "Priyanka D.", company: "Infosys", role: "Data Analyst" },
];

const PlacementsSection = () => {
  return (
    <section className="py-16 md:py-24 hero-gradient text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-20 w-72 h-72 rounded-full bg-accent/20 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Students Placed at Top Companies
          </h2>
          <p className="text-primary-foreground/60 max-w-xl mx-auto">
            Our students are working at India's leading companies across industries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {placements.map((p, i) => (
            <div
              key={p.name}
              className="bg-card text-foreground rounded-2xl p-6 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s`, boxShadow: "var(--shadow-card)" }}
            >
              {/* Avatar */}
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary font-heading font-bold text-sm flex items-center justify-center shrink-0">
                {p.name.split(" ").map(w => w[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-bold text-foreground text-sm">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.role}</p>
              </div>
              <div className="shrink-0 px-3 py-1.5 rounded-lg bg-accent/10 text-accent text-xs font-bold">
                {p.company}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlacementsSection;
