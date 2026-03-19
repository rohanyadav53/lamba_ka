import { GraduationCap, TrendingUp, Clock } from "lucide-react";

const programs = [
  { name: "MBA", duration: "2 Years", tag: "Most Popular", icon: GraduationCap },
  { name: "BBA", duration: "3 Years", tag: "Trending", icon: TrendingUp },
  { name: "MCA", duration: "2 Years", tag: "In Demand", icon: GraduationCap },
  { name: "M.Com", duration: "2 Years", tag: "Popular", icon: GraduationCap },
  { name: "Data Science", duration: "2 Years", tag: "Trending", icon: TrendingUp },
  { name: "BCA", duration: "3 Years", tag: "Rising", icon: GraduationCap },
];

const PopularPrograms = () => {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">Popular Programs</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Choose from high-demand online programs across top universities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {programs.map((p, i) => (
            <div
              key={p.name}
              className="card-elevated p-6 group cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                  <p.icon size={24} />
                </div>
                <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                  {p.tag}
                </span>
              </div>

              <h3 className="font-heading font-bold text-xl text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
                {p.name}
              </h3>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock size={14} />
                <span>{p.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularPrograms;
