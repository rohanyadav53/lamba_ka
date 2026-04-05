import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, BookOpen, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ─── Theme & Data ───────────────────────────────────────────────────────────
const NAVY = '#0b1f3a';
const GREEN = '#22c55e';

const universities = [
  { id: 'manipal', name: 'Manipal University', filterName: 'Manipal University Jaipur Online', location: 'Jaipur, Rajasthan', rating: 4.8, image: '/uni-manipal.jpg', accreditation: 'NAAC A+', tags: ['Management', 'Technology', 'Commerce'], courses: 5 },
  { id: 'sharda', name: 'Sharda University', filterName: 'Sharda University', location: 'Greater Noida, UP', rating: 4.5, image: '/uni-sharda.jpg', accreditation: 'NAAC A', tags: ['Management', 'Technology', 'Arts'], courses: 5 },
  { id: 'amity', name: 'Amity University', filterName: 'Amity University Online', location: 'Noida, UP', rating: 4.6, image: '/uni-amity.jpg', accreditation: 'NAAC A+', tags: ['Management', 'Commerce', 'Law'], courses: 5 },
  { id: 'upgrad', name: 'upGrad', filterName: 'upGrad', location: 'Mumbai (Online)', rating: 4.9, image: '/uni-upgrad.jpg', accreditation: 'University Partnered', tags: ['Management', 'Technology', 'Data Science'], courses: 4 },
  { id: 'lpu', name: 'LPU Online', filterName: 'LPU Online', location: 'Phagwara, Punjab', rating: 4.5, image: '/uni-lpu.jpg', accreditation: 'NAAC A++', tags: ['Technology', 'Management', 'Commerce'], courses: 4 },
  { id: 'vgu', name: 'VGU Online', filterName: 'VGU Online', location: 'Jaipur, Rajasthan', rating: 4.1, image: '/uni-vgu.jpg', accreditation: 'NAAC B++', tags: ['Management', 'Commerce'], courses: 4 },
];

// ─── University Card Component ────────────────────────────────────────────────
function UniversityCard({ uni, onViewCourses }: { uni: typeof universities, onViewCourses: () => void }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col hover:-translate-y-1 transition-all duration-300" style={{ boxShadow: '0 2px 12px rgba(11,31,58,0.07)' }}>
      <div className="relative h-64 overflow-hidden" style={{ background: NAVY }}>
        {!imgErr ? (
          <img src={uni.image} alt={uni.name} className="w-full h-full object-cover" onError={() => setImgErr(true)} />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${NAVY}, #1e3a5f)` }}>
            <span className="text-white font-bold text-5xl opacity-20">{uni.name.charAt(0)}</span>
          </div>
        )}
        <div className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide shadow-sm bg-white" style={{ color: NAVY }}>
          {uni.accreditation}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-base leading-tight" style={{ color: NAVY, fontFamily: 'Outfit, sans-serif' }}>{uni.name}</h3>
          <span className="flex items-center gap-1 font-bold text-sm shrink-0" style={{ color: '#f59e0b' }}>
            <Star className="w-3.5 h-3.5" style={{ fill: '#f59e0b', stroke: '#f59e0b' }} /> {uni.rating.toFixed(1)}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400 mb-1"><MapPin className="w-3 h-3" />{uni.location}</div>
        <div className="flex items-center gap-1 text-xs text-gray-400 mb-4"><BookOpen className="w-3 h-3" />{uni.courses}+ Courses</div>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {uni.tags.map((t) => (
            <span key={t} className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border" style={{ color: NAVY, background: '#eef1f7', borderColor: '#d0d8ea' }}>{t}</span>
          ))}
        </div>
        <button onClick={onViewCourses} className="mt-auto w-full font-bold text-sm py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 hover:opacity-90 active:scale-95 text-white" style={{ background: GREEN }}>
          View Courses <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function TopUniversities() {
  const navigate = useNavigate();

  const handleViewCourses = (university) => {
    navigate(`/programs?uni=${encodeURIComponent(university.filterName)}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border" style={{ color: GREEN, background: '#f0fdf4', borderColor: '#bbf7d0' }}>
              Partnered Universities
            </span>
            <h1 className="font-extrabold text-3xl md:text-4xl mb-3" style={{ color: NAVY, fontFamily: 'Outfit, sans-serif' }}>
              Discover Excellence at Our<br className="hidden sm:block" /> Featured Universities
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              UGC-DEB approved online degrees from India's most trusted institutions. Free expert counseling included.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border font-semibold text-xs tracking-wide" style={{ color: GREEN, background: '#f0fdf4', borderColor: '#bbf7d0' }}>
              ✦ Best prices &amp; no hidden fees guaranteed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {universities.map((uni) => (
              <UniversityCard
                key={uni.id}
                uni={uni}
                onViewCourses={() => handleViewCourses(uni)}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
