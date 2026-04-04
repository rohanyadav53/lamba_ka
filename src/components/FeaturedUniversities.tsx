// src/components/FeaturedUniversities.tsx
// University images → /public/uni-manipal.jpg, uni-sharda.jpg, uni-amity.jpg,
//                              uni-upgrad.jpg, uni-lpu.jpg, uni-vgu.jpg

import { useState } from 'react'
import { Star, MapPin, BookOpen, ArrowRight, CheckCircle2, Clock, MessageCircle } from 'lucide-react'

// ─── Theme ──────────────────────────────────────────────────────────────────
const NAVY  = '#0b1f3a'
const GREEN = '#22c55e'

// ─── University Data ─────────────────────────────────────────────────────────
const universities = [
  {
    id: 'manipal',
    name: 'Manipal University',
    location: 'Jaipur, Rajasthan',
    rating: 4.8,
    image: '/uni-manipal.jpg',
    accreditation: 'NAAC A+',
    tags: ['Management', 'Technology', 'Commerce'],
    courses: 5,
  },
  {
    id: 'sharda',
    name: 'Sharda University',
    location: 'Greater Noida, UP',
    rating: 4.5,
    image: '/uni-sharda.jpg',
    accreditation: 'NAAC A',
    tags: ['Management', 'Technology', 'Arts'],
    courses: 5,
  },
  {
    id: 'amity',
    name: 'Amity University',
    location: 'Noida, UP',
    rating: 4.6,
    image: '/uni-amity.jpg',
    accreditation: 'NAAC A+',
    tags: ['Management', 'Commerce', 'Law'],
    courses: 5,
  },
  {
    id: 'upgrad',
    name: 'upGrad',
    location: 'Mumbai (Online)',
    rating: 4.9,
    image: '/uni-upgrad.jpg',
    accreditation: 'University Partnered',
    tags: ['Management', 'Technology', 'Data Science'],
    courses: 4,
  },
  {
    id: 'lpu',
    name: 'LPU Online',
    location: 'Phagwara, Punjab',
    rating: 4.5,
    image: '/uni-lpu.jpg',
    accreditation: 'NAAC A++',
    tags: ['Technology', 'Management', 'Commerce'],
    courses: 4,
  },
  {
    id: 'vgu',
    name: 'VGU Online',
    location: 'Jaipur, Rajasthan',
    rating: 4.1,
    image: '/uni-vgu.jpg',
    accreditation: 'NAAC B++',
    tags: ['Management', 'Commerce'],
    courses: 4,
  },
]

// ─── Course Data ─────────────────────────────────────────────────────────────
const featuredCourses = [
  {
    category: 'Management',
    name: 'MBA',
    university: 'Manipal University Jaipur Online',
    fee: '₹1,25,000/year',
    duration: '2 Years',
    highlights: ['Industry mentorship', 'Live projects', '15+ specializations'],
  },
  {
    category: 'Technology',
    name: 'MCA',
    university: 'Manipal University Jaipur Online',
    fee: '₹1,00,000/year',
    duration: '2 Years',
    highlights: ['Programming focused', 'Cloud computing', 'AI/ML modules'],
  },
  {
    category: 'Management',
    name: 'MBA',
    university: 'Amity University Noida Online',
    fee: '₹1,50,000/year',
    duration: '2 Years',
    highlights: ['Top brand value', 'Global alumni network', '20+ specializations'],
  },
  {
    category: 'Technology',
    name: 'M.Sc Data Science',
    university: 'Amity University Noida Online',
    fee: '₹1,30,000/year',
    duration: '2 Years',
    highlights: ['Python & R', 'Machine learning', 'Big data analytics'],
  },
  {
    category: 'Technology',
    name: 'Data Science',
    university: 'upGrad',
    fee: '₹3,40,000 total',
    duration: '11 Months',
    highlights: ['Python & ML', 'Industry projects', '500+ hiring partners'],
  },
  {
    category: 'Technology',
    name: 'Full Stack Dev',
    university: 'upGrad',
    fee: '₹2,99,000 total',
    duration: '13 Months',
    highlights: ['MERN stack', 'System design', 'Job guarantee*'],
  },
  {
    category: 'Management',
    name: 'MBA',
    university: 'LPU Online',
    fee: '₹1,20,000/year',
    duration: '2 Years',
    highlights: ['10+ Specialisations', 'Bloomberg Access', '700+ Recruiters'],
  },
  {
    category: 'Technology',
    name: 'B.Tech (CSE)',
    university: 'LPU Online',
    fee: '₹1,40,000/year',
    duration: '4 Years',
    highlights: ['Virtual Labs', 'AI/ML Curriculum', 'Coding Bootcamp'],
  },
  {
    category: 'Management',
    name: 'BBA',
    university: 'Sharda University Online',
    fee: '₹80,000/year',
    duration: '3 Years',
    highlights: ['Entrepreneurship Track', 'Internship Credits', 'Live Projects'],
  },
  {
    category: 'Commerce',
    name: 'B.Com',
    university: 'VGU Online',
    fee: '₹50,000/year',
    duration: '3 Years',
    highlights: ['GST & Taxation', 'Accounting Software', 'Finance Electives'],
  },
  {
    category: 'Commerce',
    name: 'M.Com',
    university: 'Manipal University Jaipur Online',
    fee: '₹75,000/year',
    duration: '2 Years',
    highlights: ['Advanced Accounting', 'Business Finance', 'Research Methods'],
  },
  {
    category: 'Management',
    name: 'PGDM',
    university: 'upGrad',
    fee: '₹2,00,000/year',
    duration: '12 Months',
    highlights: ['400+ Hiring Partners', 'Salary Hike Guarantee', 'Weekend Live'],
  },
]

type FilterType = 'All' | 'Management' | 'Technology' | 'Commerce'
const FILTERS: FilterType[] = ['All', 'Management', 'Technology', 'Commerce']

function categoryStyle(cat: string): React.CSSProperties {
  if (cat === 'Technology') return { color: '#7c3aed', background: '#ede9fe' }
  if (cat === 'Commerce')   return { color: '#0369a1', background: '#e0f2fe' }
  return { color: NAVY, background: '#e8edf5' }
}

// ─── University Card ──────────────────────────────────────────────────────────
function UniversityCard({
  uni,
  onViewCourses,
}: {
  uni: typeof universities[0]
  onViewCourses: () => void
}) {
  const [imgErr, setImgErr] = useState(false)

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col hover:-translate-y-1 transition-all duration-300"
      style={{ boxShadow: '0 2px 12px rgba(11,31,58,0.07)' }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden" style={{ background: NAVY }}>
        {!imgErr ? (
          <img
            src={uni.image}
            alt={uni.name}
            className="w-full h-full object-cover"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${NAVY}, #1e3a5f)` }}
          >
            <span className="text-white font-bold text-5xl opacity-20">{uni.name.charAt(0)}</span>
          </div>
        )}
        <div
          className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide shadow-sm bg-white"
          style={{ color: NAVY }}
        >
          {uni.accreditation}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-base leading-tight" style={{ color: NAVY, fontFamily: 'Outfit, sans-serif' }}>
            {uni.name}
          </h3>
          <span className="flex items-center gap-1 font-bold text-sm shrink-0" style={{ color: '#f59e0b' }}>
            <Star className="w-3.5 h-3.5" style={{ fill: '#f59e0b', stroke: '#f59e0b' }} />
            {uni.rating.toFixed(1)}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-400 mb-1">
          <MapPin className="w-3 h-3" />{uni.location}
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
          <BookOpen className="w-3 h-3" />{uni.courses}+ Courses
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {uni.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
              style={{ color: NAVY, background: '#eef1f7', borderColor: '#d0d8ea' }}
            >
              {t}
            </span>
          ))}
        </div>

        <button
          onClick={onViewCourses}
          className="mt-auto w-full font-bold text-sm py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 hover:opacity-90 active:scale-95 text-white"
          style={{ background: GREEN }}
        >
          View Courses <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// ─── Course Card ──────────────────────────────────────────────────────────────
function CourseCard({ course }: { course: typeof featuredCourses[0] }) {
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col hover:shadow-md transition-all duration-200"
      style={{ boxShadow: '0 2px 8px rgba(11,31,58,0.06)' }}
    >
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold px-3 py-1 rounded-full" style={categoryStyle(course.category)}>
            {course.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
            <Clock className="w-3 h-3" />{course.duration}
          </span>
        </div>
        <h4 className="font-bold text-lg leading-tight" style={{ color: NAVY, fontFamily: 'Outfit, sans-serif' }}>
          {course.name}
        </h4>
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
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: GREEN }} />
              {h}
            </div>
          ))}
        </div>
      </div>

      <button
        className="mx-4 mb-4 font-bold text-sm py-3 rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95 text-white"
        style={{ background: GREEN, width: 'calc(100% - 2rem)' }}
      >
        Apply Now →
      </button>
    </div>
  )
}

// ─── Main Export ─────────────────────────────────────────────────────────────
interface Props {
  onCounselorOpen?: () => void
}

export default function FeaturedUniversities({ onCounselorOpen }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All')

  const filteredCourses =
    activeFilter === 'All'
      ? featuredCourses
      : featuredCourses.filter((c) => c.category === activeFilter)

  return (
    <>
      {/* ── Universities ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border"
              style={{ color: GREEN, background: '#f0fdf4', borderColor: '#bbf7d0' }}
            >
              Partnered Universities
            </span>
            <h2
              className="font-extrabold text-3xl md:text-4xl mb-3"
              style={{ color: NAVY, fontFamily: 'Outfit, sans-serif' }}
            >
              Discover Excellence at Our<br className="hidden sm:block" /> Featured Universities
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              UGC-DEB approved online degrees from India's most trusted institutions. Free expert counseling included.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <span
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border font-semibold text-xs tracking-wide"
              style={{ color: GREEN, background: '#f0fdf4', borderColor: '#bbf7d0' }}
            >
              ✦ Best prices &amp; no hidden fees guaranteed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {universities.map((uni) => (
              <UniversityCard
                key={uni.id}
                uni={uni}
                onViewCourses={() =>
                  document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' })
                }
              />
            ))}
          </div>

          <p className="text-center text-gray-400 text-xs mt-8 italic">
            Explore over 50+ other partner institutions across India
          </p>
        </div>
      </section>

      {/* ── Courses ──────────────────────────────────────────────────── */}
      <section id="courses-section" className="py-16 md:py-24" style={{ background: '#f0f2f5' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border"
              style={{ color: NAVY, background: '#e8edf5', borderColor: '#c4cfdf' }}
            >
              Popular Programs
            </span>
            <h2
              className="font-extrabold text-3xl md:text-4xl mb-3"
              style={{ color: NAVY, fontFamily: 'Outfit, sans-serif' }}
            >
              Explore Top Courses
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Handpicked programs across management and technology — all UGC approved.
            </p>
          </div>

          {/* Filter Tabs — inline styles guarantee correct contrast always */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {FILTERS.map((f) => {
              const isActive = activeFilter === f
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className="px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200"
                  style={
                    isActive
                      ? { background: NAVY, color: '#ffffff', borderColor: NAVY, boxShadow: '0 2px 8px rgba(11,31,58,0.25)' }
                      : { background: '#ffffff', color: '#374151', borderColor: '#d1d5db' }
                  }
                >
                  {f}
                </button>
              )
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, i) => (
              <CourseCard key={`${course.name}-${course.university}-${i}`} course={course} />
            ))}
          </div>

          {/* Bottom CTA — dark navy bg with white text, always visible */}
          <div className="text-center mt-14">
            <p className="text-gray-500 text-sm mb-5">Not sure which course is right for you?</p>
            <button
              onClick={onCounselorOpen}
              className="inline-flex items-center gap-2.5 font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95 text-white shadow-lg"
              style={{ background: NAVY }}
            >
              <MessageCircle className="w-4 h-4" />
              Get Free Counseling
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
