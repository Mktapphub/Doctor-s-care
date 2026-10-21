import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const LoginPage: React.FC = () => {
  const { login, showToast } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [identifier, setIdentifier] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [resendCountdown, setResendCountdown] = useState(54);
  const [canResend, setCanResend] = useState(false);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  useEffect(() => {
    if (step === 'otp') {
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 150);
    }
  }, [step]);

  const handleIdentifierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      showToast('Please enter your email or mobile number', 'error');
      return;
    }
    setOtp(['', '', '', '', '', '']);
    setOtpError('');
    setStep('otp');
    showToast('Verification code sent successfully', 'info');
  };

  const handleOtpInput = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const digit = rawVal.replace(/\D/g, '').slice(-1);

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    setOtpError('');

    if (digit && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        otpInputRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

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
    const targetIdx = Math.min(pastedData.length, 5);
    otpInputRefs.current[targetIdx]?.focus();
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length === 6) {
      // Auto-detect role by email or identifier
      let detectedRole: UserRole = 'patient';
      const lowerId = identifier.toLowerCase();
      if (lowerId.includes('doc') || lowerId.includes('dr.') || lowerId.includes('doctor')) {
        detectedRole = 'doctor';
      } else if (lowerId.includes('admin') || lowerId.includes('ops')) {
        detectedRole = 'admin';
      }

      const defaultName =
        name ||
        (detectedRole === 'doctor'
          ? 'Dr. Tanvir Rahman'
          : detectedRole === 'admin'
          ? 'Operations Admin'
          : 'Rafiq Ahmed');

      login(detectedRole, identifier, defaultName);
      showToast(`Welcome back, ${defaultName}! (${detectedRole.toUpperCase()})`, 'success');
      navigate(
        detectedRole === 'doctor'
          ? '/doctor-dashboard'
          : detectedRole === 'admin'
          ? '/admin'
          : '/dashboard'
      );
    } else {
      setOtpError('Please enter a valid 6-digit verification code.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Poppins',sans-serif]">
      {/* Main Split Layout */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Branding Column (Posh Dark Emerald Gradient) */}
        <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-lg space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white">
              Trusted Clinical Excellence for Every Family in Bangladesh
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
              Experience seamless video consultations with registered medical specialists, instant home diagnostic sample collection, and verified e-prescriptions.
            </p>
          </div>
        </div>

        {/* Right Form Column (Posh Clean White Canvas) */}
        <div className="lg:col-span-6 bg-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-center">
          <div className="w-full max-w-md space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {step === 'phone' ? 'Sign In or Register' : 'Verify Authentication Code'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {step === 'phone'
                  ? 'Enter your email address or mobile number. Role will be automatically detected.'
                  : `Enter the 6-digit verification code sent to ${identifier}`}
              </p>
            </div>

            {step === 'phone' ? (
              <form onSubmit={handleIdentifierSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rafiq Ahmed"
                    className="w-full h-12 px-4 text-sm rounded-xl border border-slate-200 bg-slate-50/40 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 transition-all"
                  />
                </div>

                {/* Email or Mobile Number */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address or Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="name@example.com or 01711223344"
                    className="w-full h-12 px-4 text-sm font-medium text-slate-900 rounded-xl border border-slate-200 bg-slate-50/40 focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 transition-all"
                  />
                  <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    System will automatically detect your patient, doctor, or admin profile.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                >
                  <span>Continue with Verification Code</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2.5 text-center uppercase tracking-wider">
                    Enter 6-Digit Verification Code
                  </label>

                  <div className="flex items-center justify-between gap-2">
                    {otp.map((digit, idx) => {
                      const isFilled = Boolean(digit);
                      return (
                        <input
                          key={idx}
                          ref={(el) => {
                            otpInputRefs.current[idx] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpInput(idx, e)}
                          onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                          onPaste={handleOtpPaste}
                          className={`w-12 h-16 text-center font-mono text-2xl font-black rounded-2xl border-2 transition-all duration-200 outline-none ${
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
                      Enter code sent to your email or mobile. Automatically advances to next box.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Verify & Enter Portal</span>
                </button>

                <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                  <button
                    type="button"
                    onClick={() => setStep('phone')}
                    className="font-medium text-slate-600 hover:text-slate-900 underline flex items-center gap-1"
                  >
                    ← Edit Identifier
                  </button>

                  {canResend ? (
                    <button
                      type="button"
                      onClick={() => {
                        setResendCountdown(54);
                        setCanResend(false);
                        showToast('New verification code sent!', 'info');
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

            <div className="pt-4 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500">
                By continuing, you agree to Doctor&apos;s Care{' '}
                <Link to="/terms" className="text-emerald-700 font-semibold hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-emerald-700 font-semibold hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
