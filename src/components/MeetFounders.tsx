import founderImg from "@/assets/narender-lamba.png";

const MeetFounders = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Meet Our Founder
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The visionary behind sample_KA01's mission to simplify online education.
          </p>
        </div>

        <div
          className="max-w-4xl mx-auto bg-card rounded-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in-up"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="md:w-2/5 flex-shrink-0">
            <img
              src={founderImg}
              alt="Narender Lamba - Founder of sample_KA01"
              className="w-full h-full object-cover min-h-[320px]"
            />
          </div>
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-1">
              Narender Lamba
            </h3>
            <span className="text-sm font-semibold text-accent mb-5">Founder</span>
            <div className="space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed">
              <p>
                With over 15+ years of experience in the education industry, he has guided thousands of students toward the right academic and career decisions.
              </p>
              <p>
                Having worked closely with leading universities, he understands the challenges students face while choosing the right program.
              </p>
              <p>
                His vision for sample_KA01 is to create a transparent, student-first platform that simplifies online education choices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetFounders;
