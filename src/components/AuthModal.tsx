import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Phone,
  ShieldCheck,
  Check,
  ArrowRight,
  UserCheck,
  Stethoscope,
  Shield,
  Sparkles,
  Video,
  FileText,
  Lock,
  RefreshCw,
  Terminal,
  Zap,
  ChevronRight,
  BadgeCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const AuthModal: React.FC = () => {
  const { authModalOpen, closeAuthModal, login, showToast } = useApp();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [resendCountdown, setResendCountdown] = useState(54);
  const [canResend, setCanResend] = useState(false);

  // Input refs for the 6 individual OTP number blocks
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Vertical carousel highlights
  const sliderItems = [
    {
      icon: ShieldCheck,
      iconColor: 'text-emerald-300',
      badge: 'BMDC Verified',
      title: '100% BMDC Verified Specialists',
      subtitle: 'Consult certified MBBS & FCPS professors with verified registration numbers',
    },
    {
      icon: Video,
      iconColor: 'text-sky-300',
      badge: '24/7 Available',
      title: 'HD Video & Audio Teleconsultation',
      subtitle: 'Connect with expert doctors within 5-10 minutes from any district in Bangladesh',
    },
    {
      icon: RefreshCw,
      iconColor: 'text-amber-300',
      badge: 'Free Follow-Up',
      title: '14-Day Free Follow-Up Care',
      subtitle: 'Review lab investigations and get ongoing recovery advice at zero additional fee',
    },
    {
      icon: FileText,
      iconColor: 'text-teal-300',
      badge: 'Digital Rx',
      title: 'Cryptographic QR Prescriptions',
      subtitle: 'Instantly download official digital prescriptions accepted across all pharmacies',
    },
    {
      icon: Lock,
      iconColor: 'text-indigo-200',
      badge: 'HIPAA & DGHS Compliant',
      title: '256-Bit Encrypted Health Records',
      subtitle: 'Bank-grade medical data security protecting patient-doctor confidentiality',
    },
  ];

  const [sliderIndex, setSliderIndex] = useState(0);

  // Auto-rotate vertical carousel slider
  useEffect(() => {
    if (!authModalOpen) return;
    const timer = setInterval(() => {
      setSliderIndex((prev) => (prev + 1) % sliderItems.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [authModalOpen, sliderItems.length]);

  // Resend countdown timer when on OTP step
  useEffect(() => {
    if (step !== 'otp') return;
    setResendCountdown(54);
    setCanResend(false);

    const interval = setInterval(() => {
      setResendCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [step]);

  // Focus the first OTP input when transitioning to OTP step
  useEffect(() => {
    if (step === 'otp') {
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 150);
    }
  }, [step]);

  if (!authModalOpen) return null;

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      showToast('Please enter a valid 11-digit mobile number', 'error');
      return;
    }
    setOtp(['', '', '', '', '', '']);
    setOtpError('');
    setStep('otp');
  };

  // Handle individual OTP cell typing & auto-focus navigation
  const handleOtpInput = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const digit = rawVal.replace(/\D/g, '').slice(-1); // Take latest single digit

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    setOtpError('');

    // Auto-focus to next cell if digit entered
    if (digit && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Move focus to previous and clear it
        otpInputRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      otpInputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      e.preventDefault();
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Support pasting full 6-digit OTP
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pastedData) return;

    const newOtp = ['', '', '', '', '', ''];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    setOtpError('');

    // Focus last filled or next slot
    const targetIdx = Math.min(pastedData.length, 5);
    otpInputRefs.current[targetIdx]?.focus();
  };

  // Quick auto-fill demo OTP code
  const handleFillDemoOtp = () => {
    const demo = ['1', '2', '3', '4', '5', '6'];
    setOtp(demo);
    setOtpError('');
    otpInputRefs.current[5]?.focus();
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp === '123456' || enteredOtp.length === 6) {
      const defaultName =
        name ||
        (selectedRole === 'doctor'
          ? 'Dr. Tanvir Rahman'
          : selectedRole === 'admin'
          ? 'Operations Admin'
          : 'Rafiq Ahmed');
      login(selectedRole, phone, defaultName);
      showToast(`Welcome back, ${defaultName}!`, 'success');
      setStep('phone');
    } else {
      setOtpError('Invalid OTP code. For testing, enter demo OTP: 123456');
    }
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'doctor') {
      login('doctor', '01819888999', 'Dr. Tanvir Rahman');
      showToast('Logged in as Dr. Tanvir Rahman (BMDC A-56219)', 'success');
    } else if (role === 'admin') {
      login('admin', '01912000111', 'Hospital Admin');
      showToast('Logged in as Hospital Operations Admin', 'info');
    } else {
      login('patient', '01711223344', 'Rafiq Ahmed');
      showToast('Logged in as Patient Rafiq Ahmed', 'success');
    }
    setStep('phone');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden font-['Poppins',sans-serif] max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ========================================================
            TOP BANNER: Smooth Vertical Carousel Slider & Trust Accents
            ======================================================== */}
        <div className="bg-gradient-to-br from-[#065f46] via-[#047857] to-[#064e3b] text-white px-6 pt-5 pb-5 relative shrink-0 overflow-hidden">
          {/* Subtle background glow effect */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-300/15 rounded-full blur-2xl pointer-events-none" />

          {/* Top Bar with brand & close action */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white shadow-xs">
                <Sparkles className="w-4 h-4 text-emerald-200" />
              </span>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-100 flex items-center gap-1.5">
                  Doctor&apos;s Care Bangladesh
                  <span className="inline-flex items-center px-1.5 py-0.2 rounded-full bg-emerald-400/20 text-emerald-200 text-[9px] border border-emerald-300/30 font-medium">
                    Verified Portal
                  </span>
                </span>
              </div>
            </div>

            <button
              onClick={closeAuthModal}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Title and subtext */}
          <div className="mt-3 relative z-10">
            <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              {step === 'phone' ? 'Log in or Create Account' : 'Verify Mobile OTP'}
            </h3>
            <p className="text-xs text-emerald-100/90 mt-0.5">
              {step === 'phone'
                ? 'Enter your mobile number to consult top specialists or manage medical records'
                : `Enter the 6-digit verification code sent to +880 ${phone}`}
            </p>
          </div>

          {/* Smooth Vertical Carousel Slider */}
          <div className="mt-3.5 relative z-10">
            <div className="relative h-17 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-2.5 overflow-hidden shadow-inner">
              {sliderItems.map((item, idx) => {
                const isActive = idx === sliderIndex;
                const isPrev = idx === (sliderIndex - 1 + sliderItems.length) % sliderItems.length;
                const IconComponent = item.icon;

                return (
                  <div
                    key={idx}
                    className={`absolute inset-0 px-3.5 py-2.5 flex items-center justify-between transition-all duration-700 ease-out ${
                      isActive
                        ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                        : isPrev
                        ? 'opacity-0 -translate-y-5 scale-95 pointer-events-none'
                        : 'opacity-0 translate-y-5 scale-95 pointer-events-none'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center shrink-0 shadow-xs">
                        <IconComponent className={`w-5 h-5 ${item.iconColor}`} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-white/20 text-white/95">
                            {item.badge}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-white truncate mt-0.5">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-emerald-100/90 truncate max-w-xs">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Active pulse tag */}
                    <div className="shrink-0 flex items-center gap-1.5 pl-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Carousel navigation pills */}
            <div className="flex items-center justify-center gap-1.5 mt-2">
              {sliderItems.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSliderIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === sliderIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/35 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================
            MODAL BODY: Form & Interactive Number Blocks / Sandbox
            ======================================================== */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {step === 'phone' ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              {/* Role Selection Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Select User Role
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('patient')}
                    className={`py-2.5 px-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      selectedRole === 'patient'
                        ? 'border-emerald-600 bg-emerald-50/90 text-emerald-700 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Patient</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('doctor')}
                    className={`py-2.5 px-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      selectedRole === 'doctor'
                        ? 'border-emerald-600 bg-emerald-50/90 text-emerald-700 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Stethoscope className="w-4 h-4" />
                    <span>Doctor</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('admin')}
                    className={`py-2.5 px-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                      selectedRole === 'admin'
                        ? 'border-slate-800 bg-slate-900 text-white shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    <span>Admin</span>
                  </button>
                </div>
              </div>

              {/* Full Name input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span className="text-slate-400 font-normal">(Optional for quick demo)</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={
                    selectedRole === 'doctor'
                      ? 'e.g. Dr. Tanvir Rahman'
                      : selectedRole === 'admin'
                      ? 'e.g. Operations Admin'
                      : 'e.g. Rafiq Ahmed'
                  }
                  className="w-full h-11 px-3.5 text-sm rounded-xl border border-slate-200 bg-slate-50/40 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 transition-all"
                />
              </div>

              {/* Bangladesh Mobile Phone Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number <span className="text-rose-500">*</span>
                </label>
                <div className="flex rounded-xl border border-slate-200 overflow-hidden focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/15 focus-within:bg-white transition-all bg-slate-50/40">
                  <span className="bg-slate-100 px-3 flex items-center gap-1.5 text-xs font-bold text-slate-700 border-r border-slate-200 shrink-0">
                    <span className="text-base leading-none">🇧🇩</span>
                    <span>+880</span>
                  </span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="1711223344"
                    className="w-full h-11 px-3.5 text-sm font-medium text-slate-900 bg-transparent focus:outline-none"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  We will send a 6-digit one-time password (OTP) via SMS.
                </p>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                <span>Continue with Mobile OTP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* ========================================================
               OTP VERIFICATION VIEW: 6 Distinct Spacious Number Blocks
               ======================================================== */
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              {/* 6-digit Distinct, Spacious Individual Number Blocks */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2.5 text-center uppercase tracking-wider">
                  Enter 6-Digit Verification Code
                </label>

                <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                  {otp.map((digit, idx) => {
                    const isFilled = Boolean(digit);
                    return (
                      <input
                        key={idx}
                        ref={(el) => {
                          otpInputRefs.current[idx] = el;
                        }}
                        id={`otp-box-${idx}`}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpInput(idx, e)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        onPaste={handleOtpPaste}
                        className={`w-11 h-14 sm:w-13 sm:h-16 text-center font-mono text-xl sm:text-2xl font-black rounded-2xl border-2 transition-all duration-200 outline-none ${
                          isFilled
                            ? 'border-emerald-600 bg-emerald-50/50 text-emerald-700 shadow-xs'
                            : 'border-slate-200 bg-slate-50/60 text-slate-900 hover:border-slate-300'
                        } focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-500/15 focus:scale-105`}
                      />
                    );
                  })}
                </div>

                {otpError ? (
                  <p className="text-xs font-semibold text-rose-600 mt-2 text-center animate-shake">
                    {otpError}
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-500 mt-2 text-center">
                    Type or paste code received via SMS. Automatically advances to next box.
                  </p>
                )}
              </div>

              {/* Verify OTP CTA */}
              <button
                type="submit"
                className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Verify & Enter Portal</span>
              </button>

              {/* Resend and change number controls */}
              <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="font-medium text-slate-600 hover:text-slate-900 underline flex items-center gap-1"
                >
                  ← Edit Number
                </button>

                {canResend ? (
                  <button
                    type="button"
                    onClick={() => {
                      setResendCountdown(54);
                      setCanResend(false);
                      showToast('New verification code sent via SMS!', 'info');
                    }}
                    className="font-bold text-emerald-600 hover:underline"
                  >
                    Resend Code
                  </button>
                ) : (
                  <span className="text-slate-400 font-mono text-[11px]">
                    Resend code in {resendCountdown}s
                  </span>
                )}
              </div>
            </form>
          )}

          {/* Trust Compliance Footer Note */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-slate-400" /> 256-Bit SSL Encrypted
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <BadgeCheck className="w-3 h-3 text-emerald-600" /> DGHS & BMDC Compliant
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
