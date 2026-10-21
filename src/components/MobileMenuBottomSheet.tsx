import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  X,
  Stethoscope,
  FlaskConical,
  Shield,
  FileText,
  Building2,
  Building,
  Cpu,
  UserPlus,
  HelpCircle,
  BookOpen,
  PhoneCall,
  Info,
  Globe,
  LogOut,
  ChevronRight,
  User as UserIcon,
  Phone,
  Lock,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MobileMenuBottomSheet: React.FC = () => {
  const navigate = useNavigate();
  const {
    mobileMenuOpen,
    closeMobileMenu,
    currentUser,
    logout,
    openAuthModal,
    language,
    toggleLanguage,
  } = useApp();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        closeMobileMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, closeMobileMenu]);

  // Lock background scroll when open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  if (!mobileMenuOpen) return null;

  const handleNavClick = (path: string) => {
    closeMobileMenu();
    navigate(path);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 p-0 sm:p-4 print:hidden"
    >
      {/* Clickable Backdrop */}
      <div
        className="absolute inset-0"
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Slide-up Sheet Container */}
      <div className="relative z-10 w-full sm:max-w-lg bg-white rounded-t-[28px] sm:rounded-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-250">
        {/* Pull Handle for Native Mobile Touch Feel */}
        <div className="pt-3 pb-1 flex justify-center sm:hidden">
          <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
        </div>

        {/* Top Header Row */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-slate-900 tracking-tight leading-none">
                Doctor's<span className="text-emerald-600"> care</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Healthcare Menu & Services
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={closeMobileMenu}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 overscroll-contain">
          {/* User Account / Profile Card */}
          {currentUser ? (
            <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 leading-snug">
                    {currentUser.name}
                  </h4>
                  <p className="text-xs text-slate-500">{currentUser.phone}</p>
                  <span className="inline-block mt-1 text-[10px] font-semibold text-emerald-700 bg-white border border-emerald-200 px-2 py-0.5 rounded-full capitalize">
                    {currentUser.role} Account
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 items-end">
                <button
                  type="button"
                  onClick={() => handleNavClick('/dashboard')}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition cursor-pointer"
                >
                  Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="text-[11px] text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50/60 border border-emerald-100 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-slate-900">Welcome to Doctor's care</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Sign in to access prescriptions & reports
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  openAuthModal();
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1 cursor-pointer"
              >
                <span>Log In</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Quick Healthcare Services 4-Card Grid */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Core Healthcare Services
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleNavClick('/doctors')}
                className="p-3 bg-white border border-slate-200/90 hover:border-emerald-500/50 hover:bg-emerald-50/20 rounded-2xl text-left transition shadow-2xs group cursor-pointer flex flex-col justify-between h-24"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-slate-900 group-hover:text-emerald-700 transition">
                    Video Consultation
                  </h5>
                  <p className="text-[10px] text-slate-400">24/7 Verified Doctors</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('/diagnostic')}
                className="p-3 bg-white border border-slate-200/90 hover:border-emerald-500/50 hover:bg-emerald-50/20 rounded-2xl text-left transition shadow-2xs group cursor-pointer flex flex-col justify-between h-24"
              >
                <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center group-hover:scale-105 transition">
                  <FlaskConical className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-slate-900 group-hover:text-emerald-700 transition">
                    Home Diagnostics
                  </h5>
                  <p className="text-[10px] text-slate-400">Sample Collection</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('/packages')}
                className="p-3 bg-white border border-slate-200/90 hover:border-emerald-500/50 hover:bg-emerald-50/20 rounded-2xl text-left transition shadow-2xs group cursor-pointer flex flex-col justify-between h-24"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-105 transition">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-slate-900 group-hover:text-emerald-700 transition">
                    Health Packages
                  </h5>
                  <p className="text-[10px] text-slate-400">Family & Annual Plans</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('/dashboard')}
                className="p-3 bg-white border border-slate-200/90 hover:border-emerald-500/50 hover:bg-emerald-50/20 rounded-2xl text-left transition shadow-2xs group cursor-pointer flex flex-col justify-between h-24"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-105 transition">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-slate-900 group-hover:text-emerald-700 transition">
                    My Prescriptions
                  </h5>
                  <p className="text-[10px] text-slate-400">Digital Health Records</p>
                </div>
              </button>
            </div>
          </div>

          {/* Business & Clinical Partners Category */}
          <div className="pt-2 border-t border-slate-100">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              For Partners & Enterprises
            </p>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => handleNavClick('/corporate')}
                className="w-full min-h-[44px] flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-800 block">Corporate Healthcare</span>
                    <span className="text-[10px] text-slate-400">Employee wellness & NGO plans</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('/hospital-partners')}
                className="w-full min-h-[44px] flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-800 block">Hospital Partners</span>
                    <span className="text-[10px] text-slate-400">Top clinical institutions in BD</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('/it-services')}
                className="w-full min-h-[44px] flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-800 block">Healthcare IT Services</span>
                    <span className="text-[10px] text-slate-400">EMR, telemedicine & hospital tech</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('/join-doctor')}
                className="w-full min-h-[44px] flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-emerald-50/60 transition text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <UserPlus className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-800 block">Join as a Doctor</span>
                    <span className="text-[10px] text-emerald-600">BMDC verified physician network</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-600" />
              </button>
            </div>
          </div>

          {/* Resources & Information Category */}
          <div className="pt-2 border-t border-slate-100">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Information & Patient Support
            </p>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => handleNavClick('/how-it-works')}
                className="w-full min-h-[44px] flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-50 transition text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-semibold text-slate-800">How It Works</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('/blog')}
                className="w-full min-h-[44px] flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-50 transition text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-semibold text-slate-800">Health Blog & Medical Articles</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('/faq')}
                className="w-full min-h-[44px] flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-50 transition text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-semibold text-slate-800">Frequently Asked Questions</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('/contact')}
                className="w-full min-h-[44px] flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-50 transition text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <PhoneCall className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-semibold text-slate-800">24/7 Helpline & Support</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('/about')}
                className="w-full min-h-[44px] flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-50 transition text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Info className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-semibold text-slate-800">About Doctor's care</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Utility Bar: Language & Helpline */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3 text-xs">
          <button
            type="button"
            onClick={toggleLanguage}
            className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl font-semibold text-slate-700 hover:bg-emerald-50 flex items-center gap-1.5 transition cursor-pointer min-h-[40px]"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            <span>Language: {language === 'en' ? 'English (বাংলা)' : 'বাংলা (EN)'}</span>
          </button>

          <a
            href="tel:16780"
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl flex items-center gap-1.5 transition shadow-xs min-h-[40px]"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call 16780</span>
          </a>
        </div>
      </div>
    </div>
  );
};
