import { Link } from 'react-router-dom';
import {
  Compass,
  ShieldCheck,
  GraduationCap,
  Target,
  ArrowRight,
  PhoneCall,
  BookOpen,
  Building2,
  Award,
  HeadphonesIcon
} from 'lucide-react';
import Header from '@/components/Header'; // Adjust path if needed
import Footer from '@/components/Footer'; // Adjust path if needed

const NAVY = '#0b1f3a';
const GREEN = '#22c55e';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-grow">
        {/* ─── Hero Section ────────────────────────────────────────────────── */}
        <section className="relative py-20 lg:py-28 overflow-hidden" style={{ backgroundColor: NAVY }}>
          {/* Subtle background decoration */}
          <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-green-400 font-semibold text-sm mb-6 border border-white/20 tracking-wider uppercase">
              About Shiksha Vision
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Empowering Futures Through <br className="hidden md:block" />
              <span style={{ color: GREEN }}>Accessible Online Education</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 mb-10 leading-relaxed">
              Shiksha Vision is your trusted guide to finding, comparing, and enrolling in India’s top UGC-entitled online university programs.
            </p>
          </div>
        </section>

        {/* ─── Stats / Trust Metrics ─────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-slate-100 text-center">
              <div className="p-4">
                <div className="flex justify-center mb-3"><BookOpen size={28} style={{ color: GREEN }} /></div>
                <h3 className="text-3xl font-extrabold text-slate-900 mb-1">50+</h3>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Top Programs</p>
              </div>
              <div className="p-4">
                <div className="flex justify-center mb-3"><Building2 size={28} style={{ color: GREEN }} /></div>
                <h3 className="text-3xl font-extrabold text-slate-900 mb-1">5+</h3>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Premium Partners</p>
              </div>
              <div className="p-4">
                <div className="flex justify-center mb-3"><Award size={28} style={{ color: GREEN }} /></div>
                <h3 className="text-3xl font-extrabold text-slate-900 mb-1">100%</h3>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">UGC-Entitled</p>
              </div>
              <div className="p-4">
                <div className="flex justify-center mb-3"><HeadphonesIcon size={28} style={{ color: GREEN }} /></div>
                <h3 className="text-3xl font-extrabold text-slate-900 mb-1">24/7</h3>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Admission Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── The Story / Intro ─────────────────────────────────────────── */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-slate-900">
                  Navigating the Future of Education, Together.
                </h2>
                <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                  <p>
                    The landscape of higher education is changing rapidly. With the rise of online degrees, students and working professionals now have the power to upgrade their skills from anywhere in the world. However, with hundreds of universities and thousands of specializations available, finding the right fit can feel overwhelming.
                  </p>
                  <p className="font-semibold text-slate-800">
                    That is where Shiksha Vision steps in.
                  </p>
                  <p>
                    We are a premier educational consultancy and aggregator platform dedicated to simplifying your academic journey. We bridge the gap between ambitious learners and world-class universities, ensuring that every student makes an informed, confident decision about their future.
                  </p>
                </div>
              </div>
              <div className="relative">
                {/* Placeholder for a nice image. You can replace the src with a real photo of students/learning */}
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Students collaborating"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl border-8 border-slate-50 bg-green-500 flex items-center justify-center shadow-lg">
                  <Target size={48} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── What We Do Section ────────────────────────────────────────── */}
        <section className="py-20 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-slate-900">How Shiksha Vision Helps You</h2>
            <p className="max-w-2xl mx-auto text-lg text-slate-500 mb-16">
              We remove the guesswork from university admissions with a transparent, student-first approach.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {/* Pillar 1 */}
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow duration-300">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: `${NAVY}15`, color: NAVY }}>
                  <Compass size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">Unbiased Comparisons</h3>
                <p className="text-slate-600 leading-relaxed">
                  We bring India’s top universities—including Manipal, Amity, LPU, VGU, and Sharda—onto one single platform. Compare fees, durations, and syllabi side-by-side to find the perfect match for your career goals.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow duration-300">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: `${GREEN}15`, color: GREEN }}>
                  <GraduationCap size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">Expert Counseling</h3>
                <p className="text-slate-600 leading-relaxed">
                  Our dedicated team of educational counselors provides personalized, one-on-one guidance to help you choose a program that aligns with your professional aspirations and budget.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow duration-300">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: `${NAVY}15`, color: NAVY }}>
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">End-to-End Support</h3>
                <p className="text-slate-600 leading-relaxed">
                  From shortlisting universities to navigating the admission process and securing your enrollment, we hold your hand through every step of the journey—completely free of cost.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── University Partners (Credibility Grid) ────────────────────── */}
        <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-8">Trusted by India's Top Universities</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {/* You can replace these text spans with actual logo <img> tags */}
              <span className="text-2xl font-bold text-slate-800">AMITY ONLINE</span>
              <span className="text-2xl font-bold text-slate-800">MANIPAL</span>
              <span className="text-2xl font-bold text-slate-800">LPU ONLINE</span>
              <span className="text-2xl font-bold text-slate-800">VGU ONLINE</span>
              <span className="text-2xl font-bold text-slate-800">SHARDA</span>
            </div>
          </div>
        </section>

        {/* ─── The Vision ────────────────────────────────────────────────── */}
        <section className="py-24" style={{ backgroundColor: NAVY }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-green-400 font-bold tracking-widest uppercase mb-6 text-sm">Our Vision</h2>
            <blockquote className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight font-serif italic">
              "To democratize access to quality higher education by becoming the most trusted, transparent, and student-centric enrollment platform in India."
            </blockquote>
          </div>
        </section>

        {/* ─── Call to Action ────────────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Ready to take the next step?</h2>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              Don't let confusion delay your career progression. Let our experts guide you to the right university today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/programs"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white rounded-full transition-all duration-200 hover:opacity-90 shadow-lg"
                style={{ backgroundColor: GREEN }}
              >
                Explore Programs
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-full transition-all duration-200 border-2"
                style={{ borderColor: NAVY, color: NAVY }}
              >
                <PhoneCall size={18} />
                Speak to a Counselor
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}