import React, { useEffect } from "react";
import { X, User, Mail, Phone, ArrowRight } from "lucide-react";
import { createPortal } from "react-dom";

interface Props {
  onClose: () => void;
}

const LeadPopup = ({ onClose }: Props) => {
  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const modalContent = (
    <div className="fixed inset-0 z- flex items-center justify-center p-4 sm:p-6">
      
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-[#0b1f3a]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl flex flex-col max-h-[95vh] sm:max-h-[90vh] animate-in zoom-in-95 duration-200">

        {/* Modal Header (Fixed at top) */}
        <div className="bg-[#0b1f3a] text-white p-6 relative shrink-0 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-1.5 rounded-full"
          >
            <X size={18} />
          </button>
          <h2 className="text-xl font-extrabold">Connect with a Counselor</h2>
          <p className="text-sm text-white/70 mt-1">Get personalized guidance for free</p>
          <div className="text-xs mt-3 text-green-400">● 3 counselors available now</div>
        </div>

        {/* Modal Body (Scrollable if screen is too small) */}
        <div className="p-6 space-y-4 overflow-y-auto">
          
          {/* Name */}
          <div>
            <label className="text-xs font-bold text-gray-700">Student Name *</label>
            <div className="relative mt-1">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-gray-200 bg-gray-50 rounded-lg py-2.5 pl-10 pr-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0b1f3a]/20"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-xs font-bold text-gray-700">Email *</label>
            <div className="relative mt-1">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-200 bg-gray-50 rounded-lg py-2.5 pl-10 pr-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0b1f3a]/20"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs font-bold text-gray-700">Phone *</label>
            <div className="relative mt-1">
              <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                placeholder="10-digit mobile number"
                className="w-full border border-gray-200 bg-gray-50 rounded-lg py-2.5 pl-10 pr-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0b1f3a]/20"
              />
            </div>
          </div>

          {/* University */}
          <div>
            <label className="text-xs font-bold text-gray-700">University</label>
            <select className="w-full border border-gray-200 bg-gray-50 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0b1f3a]/20">
              <option>Manipal Online</option>
              <option>VGU Online</option>
              <option>Amity Online</option>
              <option>Sharda Online</option>
              <option>LPU Online</option>
              <option>upGrad</option>
            </select>
          </div>

          {/* Course */}
          <div>
            <label className="text-xs font-bold text-gray-700">Course</label>
            <select className="w-full border border-gray-200 bg-gray-50 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0b1f3a]/20">
              <option>MBA</option>
              <option>BCA</option>
              <option>MCA</option>
            </select>
          </div>

          {/* CTA */}
          <button className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white py-3 mt-2 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors">
            Get Free Counseling
            <ArrowRight size={16} />
          </button>

          <p className="text-xs text-gray-500 text-center">
            By submitting, you agree to be contacted. No spam!
          </p>
        </div>
      </div>
    </div>
  );

  // Render outside the DOM hierarchy
  return createPortal(modalContent, document.body);
};

export default LeadPopup;