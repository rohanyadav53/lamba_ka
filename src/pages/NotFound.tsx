import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Highly performant mouse tracking using CSS variables instead of React state
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        // Updates the CSS directly, skipping React re-renders for zero lag
        containerRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
        containerRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex flex-col bg-[#0b1f3a] text-white overflow-hidden"
    >
      <Header />
      
      <main className="flex-grow relative flex items-center justify-center overflow-hidden">
        
        {/* Dynamic Spotlight Background using CSS variables for smooth performance */}
        <div 
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background: `radial-gradient(circle 600px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34, 197, 94, 0.08), transparent 80%)`
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto w-full">
          {/* Subtle hover scale added to the text to keep it interactive */}
          <h1 className="text-[10rem] md:text-[16rem] lg:text-[20rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-600 select-none mb-4 hover:scale-105 transition-transform duration-500 cursor-default">
            404
          </h1>
          
          <div className="max-w-lg mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Looks like you wandered off campus.
            </h2>
            <p className="text-slate-400 mb-10 text-lg">
              The page you are looking for doesn't exist, has been moved, or is currently taking a gap year.
            </p>
            
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 bg-[#22c55e] text-[#0b1f3a] px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-colors duration-300 group"
            >
              Back to Homepage 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Ambient background glows for depth */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#22c55e]/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;