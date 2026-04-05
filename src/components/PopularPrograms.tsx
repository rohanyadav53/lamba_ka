import { GraduationCap, TrendingUp, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const programs = [
  { name: "MBA", duration: "2 Years", tag: "Most Popular", icon: GraduationCap },
  { name: "BBA", duration: "3 Years", tag: "Popular", icon: GraduationCap },
  { name: "MCA", duration: "2 Years", tag: "In Demand", icon: TrendingUp },
  { name: "B.Com", duration: "3 Years", tag: "Popular", icon: GraduationCap },
  { name: "BCA", duration: "3 Years", tag: "Trending", icon: TrendingUp },
  { name: "Data Science", duration: "2 Years", tag: "Trending", icon: TrendingUp },
];

const PopularPrograms = () => {
  const navigate = useNavigate();

  const handleProgramClick = (programName) => {
    navigate(`/programs?search=${encodeURIComponent(programName)}`);
  };

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Popular Programs</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Choose from high-demand online programs across top universities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {programs.map((p, i) => {
            const Icon = p.icon;

            return (
              <div
                key={p.name}
                onClick={() => handleProgramClick(p.name)}
                className="bg-white rounded-2xl p-6 border border-gray-100 group cursor-pointer hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md"
                style={{
                  animationDelay: `${i * 0.08}s`,
                  animation: 'fadeInUp 0.6s ease-out'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                    <Icon size={24} />
                  </div>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                    {p.tag}
                  </span>
                </div>

                <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                  {p.name}
                </h3>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Clock size={14} />
                  <span>{p.duration}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="font-semibold">View Details</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => navigate('/programs')}
            className="px-8 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors duration-300"
          >
            Explore All Programs
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default PopularPrograms;
