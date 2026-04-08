// src/pages/Login.tsx
// Dual-mode login page: Student OTP + Admin Email/Password

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { ArrowLeft, Phone, Mail, Lock, Shield, Loader2, KeyRound } from 'lucide-react';

type Tab = 'student' | 'admin';
type OtpStep = 'phone' | 'verify';

const NAVY = '#0b1f3a';
const GREEN = '#22c55e';

const Login = () => {
  const [activeTab, setActiveTab] = useState<Tab>('student');
  const navigate = useNavigate();
  const { login } = useAuth();

  // ── Student OTP State ─────────────────────────────────────────────────────
  const [otpStep, setOtpStep] = useState<OtpStep>('phone');
  const [studentPhone, setStudentPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);

  // ── Admin Login State ─────────────────────────────────────────────────────
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminLoading, setAdminLoading] = useState(false);

  // ── Student OTP Handlers ──────────────────────────────────────────────────
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentPhone.match(/^[6-9]\d{9}$/)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    setOtpLoading(true);
    try {
      const res = await api.post('/api/otp/send', { phone: studentPhone });
      toast.success(res.message || 'OTP sent to your phone');
      setOtpStep('verify');
    } catch (err: any) {
      toast.error(err.message || 'Failed to send OTP');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error('Please enter the 6-digit OTP');
      return;
    }

    setOtpLoading(true);
    try {
      const res = await api.post<{ token: string; user: any }>('/api/otp/verify', {
        phone: studentPhone,
        otp,
      });
      if (res.data) {
        login(res.data.token, res.data.user);
        toast.success('Login successful!');
        navigate('/');
      }
    } catch (err: any) {
      toast.error(err.message || 'Invalid OTP');
    } finally {
      setOtpLoading(false);
    }
  };

  // ── Admin Login Handler ───────────────────────────────────────────────────
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminEmail || !adminPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    setAdminLoading(true);
    try {
      const res = await api.post<{ token: string; user: any }>('/api/admin/login', {
        email: adminEmail,
        password: adminPassword,
      });
      if (res.data) {
        login(res.data.token, res.data.user);
        toast.success('Welcome back, Admin!');
        navigate('/admin');
      }
    } catch (err: any) {
      toast.error(err.message || 'Invalid credentials');
    } finally {
      setAdminLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1e3a5f 50%, #2d4a6f 100%)` }}>
      <div className="w-full max-w-md">
        {/* Back to home */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-4 text-center">
            <Link to="/" className="inline-block mb-4">
              <img src="/sv_logo.svg" alt="ShikshaVision" className="h-32 mx-auto" />
            </Link>
            <h1 className="text-2xl font-extrabold" style={{ color: NAVY }}>
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Sign in to your account
            </p>
          </div>

          {/* Tabs */}
          <div className="flex mx-8 mt-4 rounded-xl overflow-hidden border border-gray-200">
            <button
              onClick={() => { setActiveTab('student'); setOtpStep('phone'); }}
              className={`flex-1 py-3 text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${activeTab === 'student'
                ? 'text-white shadow-md'
                : 'text-gray-500 hover:text-gray-700 bg-gray-50'
                }`}
              style={activeTab === 'student' ? { background: NAVY } : {}}
            >
              <Phone size={15} />
              Student
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-3 text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${activeTab === 'admin'
                ? 'text-white shadow-md'
                : 'text-gray-500 hover:text-gray-700 bg-gray-50'
                }`}
              style={activeTab === 'admin' ? { background: NAVY } : {}}
            >
              <Shield size={15} />
              Admin
            </button>
          </div>

          {/* Form Area */}
          <div className="p-8">
            {/* ── Student OTP Login ───────────────────────────────────── */}
            {activeTab === 'student' && otpStep === 'phone' && (
              <form onSubmit={handleSendOtp} className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={studentPhone}
                      onChange={(e) => setStudentPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3 pl-11 pr-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0b1f3a]/20 focus:border-[#0b1f3a]/30 transition-all"
                      maxLength={10}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={otpLoading || studentPhone.length !== 10}
                  className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98]"
                  style={{ background: GREEN }}
                >
                  {otpLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>Send OTP</>
                  )}
                </button>
              </form>
            )}

            {activeTab === 'student' && otpStep === 'verify' && (
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div className="text-center mb-4">
                  <div className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{ background: '#f0fdf4' }}>
                    <KeyRound size={24} style={{ color: GREEN }} />
                  </div>
                  <p className="text-sm text-gray-500">
                    OTP sent to <span className="font-bold text-gray-700">+91 {studentPhone}</span>
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3 px-4 text-center text-2xl tracking-[0.5em] font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0b1f3a]/20 transition-all"
                    maxLength={6}
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  disabled={otpLoading || otp.length !== 6}
                  className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98]"
                  style={{ background: GREEN }}
                >
                  {otpLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>Verify & Login</>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => { setOtpStep('phone'); setOtp(''); }}
                  className="w-full text-sm text-gray-500 hover:text-gray-700 py-2 transition-colors"
                >
                  ← Change phone number
                </button>
              </form>
            )}

            {/* ── Admin Login ────────────────────────────────────────── */}
            {activeTab === 'admin' && (
              <form onSubmit={handleAdminLogin} className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      placeholder="admin@shikshavision.com"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3 pl-11 pr-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0b1f3a]/20 focus:border-[#0b1f3a]/30 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3 pl-11 pr-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0b1f3a]/20 focus:border-[#0b1f3a]/30 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={adminLoading || !adminEmail || !adminPassword}
                  className="w-full py-3.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98]"
                  style={{ background: NAVY }}
                >
                  {adminLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      <Shield size={16} />
                      Login as Admin
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 pb-8 text-center">
            <p className="text-xs text-gray-400">
              Protected by ShikshaVision Security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
