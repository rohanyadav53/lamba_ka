import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, Clock, MessageCircle, ArrowRight, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ─── Theme & Data ───────────────────────────────────────────────────────────
const NAVY  = '#0b1f3a';
const GREEN = '#22c55e';

const featuredCourses = [
  { category: 'Management', name: 'MBA', university: 'Manipal University Jaipur Online', fee: '₹1,25,000/year', duration: '2 Years', highlights: ['Industry mentorship', 'Live projects', '15+ specializations'] },
  { category: 'Technology', name: 'MCA', university: 'Manipal University Jaipur Online', fee: '₹1,00,000/year', duration: '2 Years', highlights: ['Programming focused', 'Cloud computing', 'AI/ML modules'] },
  { category: 'Management', name: 'MBA', university: 'Amity University Noida Online', fee: '₹1,50,000/year', duration: '2 Years', highlights: ['Top brand value', 'Global alumni network', '20+ specializations'] },
  { category: 'Technology', name: 'M.Sc Data Science', university: 'Amity University Noida Online', fee: '₹1,30,000/year', duration: '2 Years', highlights: ['Python & R', 'Machine learning', 'Big data analytics'] },
  { category: 'Technology', name: 'Data Science', university: 'upGrad', fee: '₹3,40,000 total', duration: '11 Months', highlights: ['Python & ML', 'Industry projects', '500+ hiring partners'] },
  { category: 'Technology', name: 'Full Stack Dev', university: 'upGrad', fee: '₹2,99,000 total', duration: '13 Months', highlights: ['MERN stack', 'System design', 'Job guarantee*'] },
  { category: 'Management', name: 'MBA', university: 'LPU Online', fee: '₹1,20,000/year', duration: '2 Years', highlights: ['10+ Specialisations', 'Bloomberg Access', '700+ Recruiters'] },
  { category: 'Technology', name: 'B.Tech (CSE)', university: 'LPU Online', fee: '₹1,40,000/year', duration: '4 Years', highlights: ['Virtual Labs', 'AI/ML Curriculum', 'Coding Bootcamp'] },
  { category: 'Management', name: 'BBA', university: 'Sharda University Online', fee: '₹80,000/year', duration: '3 Years', highlights: ['Entrepreneurship Track', 'Internship Credits', 'Live Projects'] },
  { category: 'Commerce', name: 'B.Com', university: 'VGU Online', fee: '₹50,000/year', duration: '3 Years', highlights: ['GST & Taxation', 'Accounting Software', 'Finance Electives'] },
  { category: 'Commerce', name: 'M.Com', university: 'Manipal University Jaipur Online', fee: '₹75,000/year', duration: '2 Years', highlights: ['Advanced Accounting', 'Business Finance', 'Research Methods'] },
  { category: 'Management', name: 'PGDM', university: 'upGrad', fee: '₹2,00,000/year', duration: '12 Months', highlights: ['400+ Hiring Partners', 'Salary Hike Guarantee', 'Weekend Live'] },
];

type FilterType = 'All' | 'Management' | 'Technology' | 'Commerce';
const FILTERS: FilterType[] = ['All', 'Management', 'Technology', 'Commerce'];

function categoryStyle(cat: string): React.CSSProperties {
  if (cat === 'Technology') return { color: '#7c3aed', background: '#ede9fe' };
  if (cat === 'Commerce')   return { color: '#0369a1', background: '#e0f2fe' };
  return { color: NAVY, background: '#e8edf5' };
}

// ─── Course Card Component ────────────────────────────────────────────────────
function CourseCard({ course }: { course: typeof featuredCourses }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col hover:shadow-md transition-all duration-200" style={{ boxShadow: '0 2px 8px rgba(11,31,58,0.06)' }}>
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold px-3 py-1 rounded-full" style={categoryStyle(course.category)}>{course.category}</span>
          <span className="flex items-center gap-1 text-xs text-gray-400 font-medium"><Clock className="w-3 h-3" />{course.duration}</span>
        </div>
        <h4 className="font-bold text-lg leading-tight" style={{ color: NAVY, fontFamily: 'Outfit, sans-serif' }}>{course.name}</h4>
        <p className="text-gray-400 text-xs mt-1">{course.university}</p>
      </div>
      <div className="mx-4 mb-4 rounded-xl p-4 border border-gray-100" style={{ background: '#f8f9fb' }}>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Total Fees</p>
            <p className="font-bold text-xl" style={{ color: NAVY, fontFamily: 'Outfit, sans-serif' }}>{course.fee}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-400 uppercase tracking-wide font-semibold mb-0.5">Duration</p>
            <p className="font-bold text-lg" style={{ color: NAVY, fontFamily: 'Outfit, sans-serif' }}>{course.duration}</p>
          </div>
        </div>
        <div className="space-y-1.5">
          {course.highlights.map((h) => (
            <div key={h} className="flex items-center gap-2 text-xs text-gray-600">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: GREEN }} />{h}
            </div>
          ))}
        </div>
      </div>
      <button className="mx-4 mb-4 font-bold text-sm py-3 rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95 text-white" style={{ background: GREEN, width: 'calc(100% - 2rem)' }}>
        Apply Now →
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Programs() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [searchParams, setSearchParams] = useSearchParams();
  const uniFilter = searchParams.get('uni');

  let displayCourses = featuredCourses;

  if (activeFilter !== 'All') {
    displayCourses = displayCourses.filter((c) => c.category === activeFilter);
  }

  if (uniFilter) {
    displayCourses = displayCourses.filter((c) => c.university.includes(uniFilter));
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f2f5]">
      <Header />
      <main className="flex-grow py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border" style={{ color: NAVY, background: '#e8edf5', borderColor: '#c4cfdf' }}>
              {uniFilter ? `Programs at ${uniFilter}` : 'Popular Programs'}
            </span>
            <h1 className="font-extrabold text-3xl md:text-4xl mb-3" style={{ color: NAVY, fontFamily: 'Outfit, sans-serif' }}>
              Explore Top Courses
            </h1>
          </div>

          {uniFilter && (
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm">
                <span className="text-sm font-semibold text-slate-600">
                  Showing: <span style={{ color: NAVY }}>{uniFilter}</span>
                </span>
                <button 
                  onClick={() => setSearchParams({})} 
                  className="p-1 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-slate-400 hover:text-red-500" />
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {FILTERS.map((f) => {
              const isActive = activeFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200"
                  style={isActive ? { background: NAVY, color: '#ffffff', borderColor: NAVY, boxShadow: '0 2px 8px rgba(11,31,58,0.25)' } : { background: '#ffffff', color: '#374151', borderColor: '#d1d5db' }}
                >
                  {f}
                </button>
              );
            })}
          </div>

          {displayCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayCourses.map((course, i) => (
                <CourseCard key={`${course.name}-${course.university}-${i}`} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-500 font-medium">No {activeFilter !== 'All' ? activeFilter : ''} courses found for this university.</p>
              <button 
                onClick={() => { setActiveFilter('All'); setSearchParams({}); }}
                className="mt-4 text-sm font-bold underline"
                style={{ color: GREEN }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}