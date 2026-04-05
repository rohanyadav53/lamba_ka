import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, Clock, MessageCircle, ArrowRight, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ─── Theme & Data ───────────────────────────────────────────────────────────
const NAVY = '#0b1f3a';
const GREEN = '#22c55e';

const featuredCourses = [
  // --- Manipal Online Courses ---
  {
    category: 'Technology',
    name: 'M.Sc Mathematics',
    university: 'Manipal University Jaipur Online',
    fee: '₹80,000 total',
    duration: '2 Years',
    highlights: ['15-20 Hours/Week', 'Analytical problem solving', 'Live interactive classes']
  },
  {
    category: 'Management',
    name: 'MBA',
    university: 'Manipal University Jaipur Online',
    fee: '₹1,80,000 total',
    duration: '2 Years',
    highlights: ['15-20 Hours/Week', 'Industry expert faculty', 'Placement assistance']
  },
  {
    category: 'Technology',
    name: 'BCA',
    university: 'Manipal University Jaipur Online',
    fee: '₹1,39,500 total',
    duration: '3 Years',
    highlights: ['15-20 Hours/Week', 'Programming fundamentals', 'UGC Entitled degree']
  },
  {
    category: 'Commerce',
    name: 'B.Com',
    university: 'Manipal University Jaipur Online',
    fee: '₹99,000 total',
    duration: '3 Years',
    highlights: ['15-20 Hours/Week', 'Core accounting focus', 'UGC Entitled degree']
  },
  {
    category: 'Commerce', // Placed in Commerce as it relates to Finance/Econ
    name: 'M.A. Economics',
    university: 'Manipal University Jaipur Online',
    fee: '₹80,000 total',
    duration: '2 Years',
    highlights: ['15-20 Hours/Week', 'Economic policy focus', 'Live interactive classes']
  },
  {
    category: 'Management', // Placed in Management/Media
    name: 'M.A. JMC',
    university: 'Manipal University Jaipur Online',
    fee: '₹80,000 total',
    duration: '2 Years',
    highlights: ['15-20 Hours/Week', 'Media & broadcasting', 'UGC Entitled degree']
  },
  {
    category: 'Technology',
    name: 'MCA',
    university: 'Manipal University Jaipur Online',
    fee: '₹1,58,000 total',
    duration: '2 Years',
    highlights: ['15-20 Hours/Week', 'Advanced computing', 'Placement assistance']
  },
  {
    category: 'Management',
    name: 'BBA',
    university: 'Manipal University Jaipur Online',
    fee: '₹1,39,500 total',
    duration: '3 Years',
    highlights: ['15-20 Hours/Week', 'Business foundations', 'UGC Entitled degree']
  },
  {
    category: 'Commerce',
    name: 'M.Com',
    university: 'Manipal University Jaipur Online',
    fee: '₹1,08,000 total',
    duration: '2 Years',
    highlights: ['15-20 Hours/Week', 'Advanced finance', 'Live interactive classes']
  },
  // --- VGU Online Courses ---
  {
    category: 'Arts',
    name: 'M.A.',
    university: 'VGU Online',
    fee: '₹72,000 total',
    duration: '2 Years',
    highlights: ['Comprehensive curriculum', 'Live interactive sessions', 'UGC Entitled degree']
  },
  {
    category: 'Management',
    name: 'MBA',
    university: 'VGU Online',
    fee: '₹1,50,000 total',
    duration: '2 Years',
    highlights: ['Industry expert faculty', 'Live case studies', 'Placement assistance']
  },
  {
    category: 'Management',
    name: 'MBA Int. Finance',
    university: 'VGU Online',
    fee: '₹2,40,000 total',
    duration: '2 Years',
    highlights: ['Global finance focus', 'International certifications', 'Placement assistance']
  },
  {
    category: 'Technology',
    name: 'MCA',
    university: 'VGU Online',
    fee: '₹1,50,000 total',
    duration: '2 Years',
    highlights: ['Advanced computing', 'Practical assignments', 'Placement assistance']
  },
  {
    category: 'Arts',
    name: 'M.A. JMC',
    university: 'VGU Online',
    fee: '₹72,000 total',
    duration: '2 Years',
    highlights: ['Media & broadcasting', 'Industry projects', 'UGC Entitled degree']
  },
  {
    category: 'Technology',
    name: 'M.Sc Mathematics',
    university: 'VGU Online',
    fee: '₹72,000 total',
    duration: '2 Years',
    highlights: ['Analytical problem solving', 'Live interactive classes', 'UGC Entitled degree']
  },
  {
    category: 'Arts',
    name: 'B.A.',
    university: 'VGU Online',
    fee: '₹72,000 total',
    duration: '3 Years',
    highlights: ['Comprehensive curriculum', 'Live interactive sessions', 'UGC Entitled degree']
  },
  {
    category: 'Management',
    name: 'BBA',
    university: 'VGU Online',
    fee: '₹1,32,000 total',
    duration: '3 Years',
    highlights: ['Business foundations', 'Placement assistance', 'UGC Entitled degree']
  },
  {
    category: 'Technology',
    name: 'BCA',
    university: 'VGU Online',
    fee: '₹1,32,000 total',
    duration: '3 Years',
    highlights: ['Programming fundamentals', 'Practical assignments', 'UGC Entitled degree']
  },
  // --- AMITY ONLINE COURSES ---

  // Integrated & Dual Degrees
  { category: 'Management', name: 'BBA + MBA', university: 'Amity University Online', fee: '₹3,45,800 total', duration: '54 Months', highlights: ['Integrated degree program', 'Top QS Ranked University', 'Placement assistance'] },
  { category: 'Commerce', name: 'B.Com + MBA', university: 'Amity University Online', fee: '₹2,83,100 total', duration: '54 Months', highlights: ['Integrated degree program', 'Top QS Ranked University', 'Placement assistance'] },
  { category: 'Technology', name: 'BCA + MCA', university: 'Amity University Online', fee: '₹3,04,000 total', duration: '54 Months', highlights: ['Integrated degree program', 'Top QS Ranked University', 'Placement assistance'] },

  // Management (BBA & MBA Variants)
  { category: 'Management', name: 'BBA', university: 'Amity University Online', fee: '₹1,65,000 total', duration: '3 Years', highlights: ['Top QS Ranked University', 'Global Alumni Network', 'Placement assistance'] },
  { category: 'Management', name: 'BBA Travel & Tourism', university: 'Amity University Online', fee: '₹1,65,000 total', duration: '3 Years', highlights: ['Tourism industry focus', 'Global Alumni Network', 'Placement assistance'] },
  { category: 'Management', name: 'BBA Data Analytics', university: 'Amity University Online', fee: '₹2,25,000 total', duration: '3 Years', highlights: ['In collaboration with HCLTech', 'Industry-aligned curriculum', 'Placement assistance'] },
  { category: 'Management', name: 'BBA Business Analytics', university: 'Amity University Online', fee: '₹2,10,000 total', duration: '3 Years', highlights: ['In collaboration with KPMG', 'Industry-aligned curriculum', 'Placement assistance'] },
  { category: 'Management', name: 'MBA General', university: 'Amity University Online', fee: '₹1,99,000 total', duration: '2 Years', highlights: ['Top QS Ranked University', 'Global Alumni Network', 'Placement assistance'] },
  { category: 'Management', name: 'MBA HR Analytics', university: 'Amity University Online', fee: '₹1,99,000 total', duration: '2 Years', highlights: ['Data-driven HR focus', 'Top QS Ranked University', 'Placement assistance'] },
  { category: 'Management', name: 'MBA Data Science', university: 'Amity University Online', fee: '₹1,99,000 total', duration: '2 Years', highlights: ['Advanced analytics focus', 'Top QS Ranked University', 'Placement assistance'] },
  { category: 'Management', name: 'MBA Business Analytics', university: 'Amity University Online', fee: '₹1,99,000 total', duration: '2 Years', highlights: ['Advanced business strategy', 'Top QS Ranked University', 'Placement assistance'] },
  { category: 'Management', name: 'MBA Int. Finance', university: 'Amity University Online', fee: '₹2,99,000 total', duration: '2 Years', highlights: ['Global finance focus', 'Top QS Ranked University', 'Placement assistance'] },
  { category: 'Management', name: 'MBA Digital Marketing', university: 'Amity University Online', fee: '₹1,99,000 total', duration: '2 Years', highlights: ['Modern marketing focus', 'Top QS Ranked University', 'Placement assistance'] },

  // Technology (BCA & MCA Variants)
  { category: 'Technology', name: 'BCA', university: 'Amity University Online', fee: '₹1,50,000 total', duration: '3 Years', highlights: ['Top QS Ranked University', 'Core programming skills', 'Placement assistance'] },
  { category: 'Technology', name: 'BCA Data Science', university: 'Amity University Online', fee: '₹1,50,000 total', duration: '3 Years', highlights: ['Data science fundamentals', 'Top QS Ranked University', 'Placement assistance'] },
  { category: 'Technology', name: 'BCA Cloud & Security', university: 'Amity University Online', fee: '₹2,25,000 total', duration: '3 Years', highlights: ['In collaboration with TCS iON', 'Industry-aligned curriculum', 'Placement assistance'] },
  { category: 'Technology', name: 'BCA Software Engg.', university: 'Amity University Online', fee: '₹2,25,000 total', duration: '3 Years', highlights: ['In collaboration with HCLTech', 'Industry-aligned curriculum', 'Placement assistance'] },
  { category: 'Technology', name: 'BCA Data Engg.', university: 'Amity University Online', fee: '₹2,25,000 total', duration: '3 Years', highlights: ['In collaboration with HCLTech', 'Industry-aligned curriculum', 'Placement assistance'] },
  { category: 'Technology', name: 'BCA Applied Data Engg.', university: 'Amity University Online', fee: '₹2,10,000 total', duration: '3 Years', highlights: ['In collaboration with KPMG', 'Industry-aligned curriculum', 'Placement assistance'] },
  { category: 'Technology', name: 'BCA Data Analytics', university: 'Amity University Online', fee: '₹2,25,000 total', duration: '3 Years', highlights: ['In collaboration with TCS iON', 'Industry-aligned curriculum', 'Placement assistance'] },
  { category: 'Technology', name: 'MCA', university: 'Amity University Online', fee: '₹1,70,000 total', duration: '2 Years', highlights: ['Top QS Ranked University', 'Advanced computing', 'Placement assistance'] },
  { category: 'Technology', name: 'MCA Cyber Security', university: 'Amity University Online', fee: '₹2,50,000 total', duration: '2 Years', highlights: ['In collaboration with HCLTech', 'Industry-aligned curriculum', 'Placement assistance'] },
  { category: 'Technology', name: 'MCA Software Engg.', university: 'Amity University Online', fee: '₹2,50,000 total', duration: '2 Years', highlights: ['In collaboration with HCLTech', 'Industry-aligned curriculum', 'Placement assistance'] },
  { category: 'Technology', name: 'MCA Blockchain', university: 'Amity University Online', fee: '₹1,70,000 total', duration: '2 Years', highlights: ['Web3 & Blockchain focus', 'Top QS Ranked University', 'Placement assistance'] },
  { category: 'Technology', name: 'MCA ML & AI', university: 'Amity University Online', fee: '₹1,70,000 total', duration: '2 Years', highlights: ['AI & Machine Learning focus', 'Top QS Ranked University', 'Placement assistance'] },
  { category: 'Technology', name: 'MCA ML & AI (TCS iON)', university: 'Amity University Online', fee: '₹2,50,000 total', duration: '2 Years', highlights: ['In collaboration with TCS iON', 'Industry-aligned curriculum', 'Placement assistance'] },

  // Commerce (B.Com & M.Com Variants)
  { category: 'Commerce', name: 'B.Com', university: 'Amity University Online', fee: '₹99,000 total', duration: '3 Years', highlights: ['Top QS Ranked University', 'Core accounting focus', 'Placement assistance'] },
  { category: 'Commerce', name: 'B.Com Honours', university: 'Amity University Online', fee: '₹1,65,000 total', duration: '3 Years', highlights: ['Advanced commerce focus', 'Top QS Ranked University', 'Placement assistance'] },
  { category: 'Commerce', name: 'B.Com Int. Finance', university: 'Amity University Online', fee: '₹2,50,000 total', duration: '3 Years', highlights: ['Global accounting standards', 'Top QS Ranked University', 'Placement assistance'] },
  { category: 'Commerce', name: 'M.Com FinTech', university: 'Amity University Online', fee: '₹1,20,000 total', duration: '2 Years', highlights: ['Financial technology focus', 'Top QS Ranked University', 'Placement assistance'] },

  // Arts & Journalism
  { category: 'Arts', name: 'B.A.', university: 'Amity University Online', fee: '₹99,000 total', duration: '3 Years', highlights: ['Top QS Ranked University', 'Comprehensive curriculum', 'Placement assistance'] },
  { category: 'Arts', name: 'B.A. JMC', university: 'Amity University Online', fee: '₹1,70,000 total', duration: '3 Years', highlights: ['Journalism & Mass Comm', 'Media industry focus', 'Placement assistance'] },
  { category: 'Arts', name: 'M.A. JMC', university: 'Amity University Online', fee: '₹1,70,000 total', duration: '2 Years', highlights: ['Advanced Journalism', 'Broadcasting & Media', 'Placement assistance'] },
  { category: 'Arts', name: 'M.A. Public Policy', university: 'Amity University Online', fee: '₹1,30,000 total', duration: '2 Years', highlights: ['Governance focus', 'Top QS Ranked University', 'Placement assistance'] },

  // Regional Language B.A. Programs
  { category: 'Arts', name: 'B.A. (Malayalam)', university: 'Amity University Online', fee: '₹85,000 total', duration: '3 Years', highlights: ['Study in Malayalam Medium', 'Comprehensive curriculum', 'UGC Entitled degree'] },
  { category: 'Arts', name: 'B.A. (Tamil)', university: 'Amity University Online', fee: '₹85,000 total', duration: '3 Years', highlights: ['Study in Tamil Medium', 'Comprehensive curriculum', 'UGC Entitled degree'] },
  { category: 'Arts', name: 'B.A. (Kannada)', university: 'Amity University Online', fee: '₹85,000 total', duration: '3 Years', highlights: ['Study in Kannada Medium', 'Comprehensive curriculum', 'UGC Entitled degree'] },
  { category: 'Arts', name: 'B.A. (Telugu)', university: 'Amity University Online', fee: '₹85,000 total', duration: '3 Years', highlights: ['Study in Telugu Medium', 'Comprehensive curriculum', 'UGC Entitled degree'] },
  { category: 'Arts', name: 'B.A. (Hindi)', university: 'Amity University Online', fee: '₹85,000 total', duration: '3 Years', highlights: ['Study in Hindi Medium', 'Comprehensive curriculum', 'UGC Entitled degree'] },
  // --- AMITY ONLINE COURSES (Batch 2) ---
  {
    category: 'Management',
    name: 'MBA Healthcare Mgmt',
    university: 'Amity University Online',
    fee: '₹2,99,000 total',
    duration: '2 Years',
    highlights: ['In collaboration with Medvarsity', 'Hospital administration', 'Placement assistance']
  },
  {
    category: 'Technology',
    name: 'BCA FinTech & AI',
    university: 'Amity University Online',
    fee: '₹2,50,000 total',
    duration: '3 Years',
    highlights: ['In collaboration with Paytm', 'Financial technology focus', 'Placement assistance']
  },
  {
    category: 'Technology',
    name: 'MCA FinTech & AI',
    university: 'Amity University Online',
    fee: '₹2,75,000 total',
    duration: '2 Years',
    highlights: ['In collaboration with Paytm', 'Advanced AI applications', 'Placement assistance']
  },
  {
    category: 'Management',
    name: 'MBA Dual Specialization',
    university: 'Amity University Online',
    fee: '₹2,99,000 total',
    duration: '2 Years',
    highlights: ['Top QS Ranked University', 'Two major concentrations', 'Global alumni network']
  },
  {
    category: 'Commerce',
    name: 'M.Com Financial Mgmt',
    university: 'Amity University Online',
    fee: '₹1,20,000 total',
    duration: '2 Years',
    highlights: ['Corporate finance focus', 'Top QS Ranked University', 'Placement assistance']
  },
  {
    category: 'Technology',
    name: 'M.Sc Data Science',
    university: 'Amity University Online',
    fee: '₹2,50,000 total',
    duration: '2 Years',
    highlights: ['Advanced data analytics', 'Top QS Ranked University', 'Placement assistance']
  },
  {
    category: 'Management',
    name: 'Integrated UG + PG',
    university: 'Amity University Online',
    fee: '₹1,99,000 total',
    duration: '54 Months',
    highlights: ['Top QS Ranked University', 'Fast-track master\'s path', 'Multiple degree options']
  },
  // --- LPU ONLINE COURSES ---

  // UG Programs
  {
    category: 'Management',
    name: 'BBA',
    university: 'LPU Online',
    fee: '₹40,800/year',
    duration: '3 Years',
    highlights: ['UGC Entitled degree', 'Live weekend classes', 'Placement support']
  },
  {
    category: 'Technology',
    name: 'BCA',
    university: 'LPU Online',
    fee: '₹40,800/year',
    duration: '3 Years',
    highlights: ['UGC Entitled degree', 'Practical assignments', 'Placement support']
  },
  {
    category: 'Arts',
    name: 'B.A.',
    university: 'LPU Online',
    fee: '₹32,800/year',
    duration: '3 Years',
    highlights: ['UGC Entitled degree', 'Comprehensive curriculum', 'Live weekend classes']
  },

  // PG Programs
  {
    category: 'Technology',
    name: 'MCA',
    university: 'LPU Online',
    fee: '₹60,000/year',
    duration: '2 Years',
    highlights: ['5 Specializations available', 'Advanced computing', 'Placement support']
  },
  {
    category: 'Technology',
    name: 'M.Sc Mathematics',
    university: 'LPU Online',
    fee: '₹32,800/year',
    duration: '2 Years',
    highlights: ['Analytical problem solving', 'Live weekend classes', 'UGC Entitled degree']
  },
  {
    category: 'Commerce',
    name: 'M.Sc Economics',
    university: 'LPU Online',
    fee: '₹32,800/year',
    duration: '2 Years',
    highlights: ['Advanced economic theory', 'Live weekend classes', 'Placement support']
  },

  // Diploma Programs
  {
    category: 'Management',
    name: 'DBA (Diploma)',
    university: 'LPU Online',
    fee: '₹40,800 total',
    duration: '1 Year',
    highlights: ['Fast-track business basics', 'Industry-aligned', 'Live weekend classes']
  },
  {
    category: 'Technology',
    name: 'DCA (Diploma)',
    university: 'LPU Online',
    fee: '₹40,800 total',
    duration: '1 Year',
    highlights: ['Fast-track IT basics', 'Practical assignments', 'Live weekend classes']
  },
  { category: 'Technology', name: 'Data Science', university: 'upGrad', fee: '₹3,40,000 total', duration: '11 Months', highlights: ['Python & ML', 'Industry projects', '500+ hiring partners'] },
  { category: 'Technology', name: 'Full Stack Dev', university: 'upGrad', fee: '₹2,99,000 total', duration: '13 Months', highlights: ['MERN stack', 'System design', 'Job guarantee*'] },
  { category: 'Management', name: 'PGDM', university: 'upGrad', fee: '₹2,00,000/year', duration: '12 Months', highlights: ['400+ Hiring Partners', 'Salary Hike Guarantee', 'Weekend Live'] },
];

type FilterType = 'All' | 'Management' | 'Technology' | 'Commerce';
type UniversityType = 'All' | 'Manipal University Jaipur Online' | 'VGU Online' | 'Amity University Online' | 'LPU Online' | 'upGrad';

const FILTERS: FilterType[] = ['All', 'Management', 'Technology', 'Commerce'];
const UNIVERSITIES: UniversityType[] = ['All', 'Manipal University Jaipur Online', 'VGU Online', 'Amity University Online', 'LPU Online', 'upGrad'];

function categoryStyle(cat: string): React.CSSProperties {
  if (cat === 'Technology') return { color: '#7c3aed', background: '#ede9fe' };
  if (cat === 'Commerce') return { color: '#0369a1', background: '#e0f2fe' };
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
  const [activeUniversity, setActiveUniversity] = useState<UniversityType>('All');
  const [searchParams, setSearchParams] = useSearchParams();
  const uniFilter = searchParams.get('uni');

  let displayCourses = featuredCourses;

  if (activeFilter !== 'All') {
    displayCourses = displayCourses.filter((c) => c.category === activeFilter);
  }

  if (activeUniversity !== 'All') {
    displayCourses = displayCourses.filter((c) => c.university === activeUniversity);
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

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {UNIVERSITIES.map((u) => {
              const isActive = activeUniversity === u;
              return (
                <button
                  key={u}
                  onClick={() => setActiveUniversity(u)}
                  className="px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200"
                  style={isActive ? { background: GREEN, color: '#ffffff', borderColor: GREEN, boxShadow: '0 2px 8px rgba(34,197,94,0.25)' } : { background: '#ffffff', color: '#374151', borderColor: '#d1d5db' }}
                >
                  {u === 'All' ? 'All Universities' : u}
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
                onClick={() => { setActiveFilter('All'); setActiveUniversity('All'); setSearchParams({}); }}
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
