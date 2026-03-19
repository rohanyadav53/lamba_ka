import { Star } from "lucide-react";

const testimonials = [
  { name: "Priya Sharma", program: "MBA, Manipal University", rating: 5, text: "sample_KA01 made my decision so easy. The comparison tool helped me pick the right university, and my counsellor was amazing throughout." },
  { name: "Rahul Verma", program: "MCA, SRM University", rating: 5, text: "I was confused between 3 universities. The expert counsellor at sample_KA01 helped me understand the differences and I'm now happily enrolled." },
  { name: "Ananya Patel", program: "BBA, Amity University", rating: 4, text: "The entire process was seamless. From comparison to enrollment, everything was handled professionally. Highly recommend!" },
];

const Testimonials = () => {
  return (
    <section className="section-padding section-alt">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">What Students Say</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Hear from students who found their perfect university through us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="card-elevated p-8 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={16}
                    className={j < t.rating ? "text-amber-400 fill-amber-400" : "text-border"}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">"{t.text}"</p>
              <div>
                <p className="font-heading font-bold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.program}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
