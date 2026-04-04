// src/components/FoundersSection.tsx
import React from 'react';

const FoundersSection = () => {
  const founders = [
    {
      name: "Narender Lamba",
      role: "Founder",
      image: "/narender.jpeg",
      bio: "15+ years in education. Visionary behind SikshaVision's student-first transparency."
    },
    {
      name: "Dr. Kuldeep Yadav",
      role: "Co-Founder",
      image: "/kuldeep.jpeg",
      bio: "Legal scholar & PhD. Dedicated to innovation and academic excellence in online learning."
    },
    {
      name: "Jatin Bangar",
      role: "Co-Founder",
      image: "/jatin.jpeg",
      bio: "Educationist & Psychologist. Focused on helping students find clarity and direction."
    }
  ];

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4">
        {/* Compact Heading */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B] mb-2">
            Guided by Experts
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto">
            Our leadership brings over 40 years of combined experience in law, psychology, and education to help you build your future.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {founders.map((founder, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-4 overflow-hidden rounded-full border-2 border-[#1E293B]/10">
                <img 
                  src={founder.image} 
                  alt={founder.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-[#1E293B]">{founder.name}</h3>
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3">
                {founder.role}
              </span>
              <p className="text-slate-600 text-sm leading-relaxed">
                {founder.bio}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-[#1E293B] font-medium italic text-sm">
            “Your journey is our journey. Let’s build your future, together.”
          </p>
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;