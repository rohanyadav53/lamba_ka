import founderImg from "@/assets/narender-lamba.png";

const MeetFounders = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Meet Our Leadership
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The visionaries behind <b>shikshavision.com</b>, committed to simplifying online education and guiding students toward the right career paths.
          </p>
        </div>

        {/* Founder */}
        <div
          className="max-w-4xl mx-auto bg-card rounded-2xl overflow-hidden flex flex-col md:flex-row mb-12 animate-fade-in-up"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="md:w-2/5 flex-shrink-0">
            <img
              src={founderImg}
              alt="Narender Lamba - Founder of shikshavision.com"
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
                With over 15+ years of experience in the education industry, Narender has helped thousands of students make informed academic and career decisions.
              </p>
              <p>
                He has collaborated with leading universities and understands the real challenges students face while choosing the right course and institution.
              </p>
              <p>
                His vision for <b>shikshavision.com</b> is to build a transparent, student-first platform that simplifies online education and empowers learners across India.
              </p>
            </div>
          </div>
        </div>

        {/* Co-Founders */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Co-Founders
          </h3>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Jatin */}
            <div className="bg-card p-6 rounded-xl shadow">
              <h4 className="font-semibold text-lg text-foreground">Jatin</h4>
              <span className="text-sm text-accent font-medium">Co-Founder</span>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                Jatin brings strong expertise in student counseling and digital growth strategies. 
                He has worked closely with aspiring students to guide them toward the right academic opportunities, 
                ensuring they make confident career decisions.
              </p>
            </div>

            {/* Kuldeep */}
            <div className="bg-card p-6 rounded-xl shadow">
              <h4 className="font-semibold text-lg text-foreground">Kuldeep</h4>
              <span className="text-sm text-accent font-medium">Co-Founder</span>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                Kuldeep specializes in operations and partnerships, building strong relationships with universities 
                and institutions. His focus is on creating a seamless experience for students exploring online education.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default MeetFounders;