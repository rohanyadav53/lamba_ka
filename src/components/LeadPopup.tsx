import React, { useEffect, useState } from "react";
import { X, User, Mail, Phone, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { createPortal } from "react-dom";
import { toast } from "sonner";

interface Props {
  onClose: () => void;
  source?: string;
  preselectedUniversity?: string;
  preselectedCourse?: string;
}

// API base URL — uses env var in prod, proxy in dev
const API_BASE = import.meta.env.VITE_API_URL || "";

const universities = [
  "Manipal Online",
  "VGU Online",
  "Amity Online",
  "Sharda Online",
  "LPU Online",
  "upGrad",
];

const courses = ["MBA", "BCA", "MCA", "BBA", "B.Com", "M.Com", "Data Science", "Full Stack Dev"];

const LeadPopup = ({ onClose, source = "Popup", preselectedUniversity, preselectedCourse }: Props) => {
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [university, setUniversity] = useState(preselectedUniversity || universities[0]);
  const [course, setCourse] = useState(preselectedCourse || courses[0]);

  // UX state
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Auto-close after success (5 seconds)
  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => onClose(), 5000);
      return () => clearTimeout(timeout);
    }
  }, [success, onClose]);

  // Form validation
  const isValid = () => {
    if (!name.trim() || name.trim().length < 2) return false;
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
    if (!phone.trim() || !/^[6-9]\d{9}$/.test(phone)) return false;
    return true;
  };

  // Submit handler — posts to backend API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid()) {
      toast.error("Please fill in all fields correctly");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          university,
          course,
          source,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess(true);
      toast.success(data.message || "Thank you! Our counselor will contact you shortly.");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-[#0b1f3a]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl flex flex-col max-h-[95vh] sm:max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Success State */}
        {success ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-green-500" />
            </div>
            <h2 className="text-xl font-extrabold text-[#0b1f3a] mb-2">Thank You!</h2>
            <p className="text-gray-500 text-sm mb-6">
              Our counselor will contact you within 24 hours.
              <br />
              <span className="text-xs text-gray-400 mt-1 block">This popup will close automatically.</span>
            </p>
            <button
              onClick={onClose}
              className="block w-full text-center text-sm text-gray-400 hover:text-gray-600 transition-colors mt-2"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Modal Header */}
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

            {/* Modal Body (Scrollable) */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
              {/* Name */}
              <div>
                <label className="text-xs font-bold text-gray-700">Student Name *</label>
                <div className="relative mt-1">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-200 bg-gray-50 rounded-lg py-2.5 pl-10 pr-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0b1f3a]/20"
                    required
                    minLength={2}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-200 bg-gray-50 rounded-lg py-2.5 pl-10 pr-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0b1f3a]/20"
                    required
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    className="w-full border border-gray-200 bg-gray-50 rounded-lg py-2.5 pl-10 pr-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0b1f3a]/20"
                    required
                    maxLength={10}
                  />
                </div>
                {phone && !/^[6-9]\d{9}$/.test(phone) && phone.length === 10 && (
                  <p className="text-red-500 text-[10px] mt-1">Must start with 6-9</p>
                )}
              </div>

              {/* University */}
              <div>
                <label className="text-xs font-bold text-gray-700">University</label>
                <select
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0b1f3a]/20"
                >
                  {universities.map((u) => (
                    <option key={u}>{u}</option>
                  ))}
                </select>
              </div>

              {/* Course */}
              <div>
                <label className="text-xs font-bold text-gray-700">Course</label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0b1f3a]/20"
                >
                  {courses.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* CTA */}
              <button
                type="submit"
                disabled={loading || !isValid()}
                className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white py-3 mt-2 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    Get Free Counseling
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By submitting, you agree to be contacted. No spam!
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default LeadPopup;