import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn } from "lucide-react";
import LeadPopup from "@/components/LeadPopup";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Explore Programs", path: "/programs" },
  { name: "Top Universities", path: "/universities" },
  { name: "About", path: "/about" },
  { name: "Blog", path: "/blog" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const location = useLocation();

  return (
    // FIXED: Changed "sticky top-0" to "relative", changed background to solid white
    <header className="relative z-50 bg-white border-b border-slate-100">
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img 
            src="/sv_logo.svg" 
            alt="SikshaVision" 
            className="h-24 md:h-28 lg:h-32 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive 
                    ? "bg-[#0b1f3a] text-white font-bold shadow-md"
                    : "text-slate-600 font-semibold hover:text-[#0b1f3a] hover:bg-slate-100"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Buttons Container */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <Button 
              variant="outline" 
              className="border-2 border-[#0b1f3a] text-[#0b1f3a] hover:bg-slate-50 rounded-full px-6 font-bold transition-colors flex items-center gap-2"
            >
              <LogIn size={16} />
              Login
            </Button>
          </Link>

          <Button 
            variant="accent" 
            size="lg" 
            className="bg-[#0b1f3a] text-white hover:bg-[#1e3a5f] shadow-lg shadow-[#0b1f3a]/20 rounded-full px-6 transition-colors"
            onClick={() => setIsPopupOpen(true)}
          >
            Get Free Counselling
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white animate-fade-in shadow-xl absolute w-full">
          <nav className="flex flex-col gap-2 p-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`py-3 px-5 text-sm rounded-xl transition-all ${
                    isActive
                      ? "bg-[#0b1f3a] text-white font-bold shadow-md"
                      : "text-slate-600 font-medium hover:text-[#0b1f3a] hover:bg-slate-50"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            
            <div className="mt-2 flex flex-col gap-3">
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-[#0b1f3a] text-[#0b1f3a] py-6 rounded-xl text-base font-bold flex items-center justify-center gap-2"
                >
                  <LogIn size={18} />
                  Login
                </Button>
              </Link>

              <Button 
                variant="accent" 
                className="w-full bg-[#0b1f3a] text-white py-6 rounded-xl text-base shadow-lg shadow-[#0b1f3a]/20"
                onClick={() => {
                  setMobileOpen(false);
                  setIsPopupOpen(true);
                }}
              >
                Get Free Counselling
              </Button>
            </div>
          </nav>
        </div>
      )}

      {/* Lead Popup Trigger */}
      {isPopupOpen && <LeadPopup onClose={() => setIsPopupOpen(false)} />}
    </header>
  );
};

export default Header;