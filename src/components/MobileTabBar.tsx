import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Home,
  Microscope,
  Package,
  BookOpen,
  Building2,
  Cpu,
  Info,
  PhoneCall,
  Globe,
  User as UserIcon,
  LogOut,
  ChevronRight,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MobileTabBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, toggleLanguage, currentUser, logout, openAuthModal } = useApp();
  const [moreSheetOpen, setMoreSheetOpen] = useState(false);

  const getActiveTab = () => {
    if (moreSheetOpen) return 'more';
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/doctors') || path.startsWith('/consultation') || path.startsWith('/doctor') || path.startsWith('/booking')) {
      return 'doctor';
    }
    if (path.startsWith('/diagnostic')) return 'diagnostic';
    return '';
  };

  const activeTab = getActiveTab();

  return (
    <>
      {/* 5) BOTTOM NAVIGATION (most important - match precisely) */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white font-['Poppins',sans-serif] print:hidden"
        style={{
          boxShadow: '0 -2px 12px rgba(16, 24, 40, 0.08)',
          height: 'calc(64px + env(safe-area-inset-bottom, 0px))',
          paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        }}
      >
        <div className="grid grid-cols-4 h-16 w-full items-center px-1">
          {/* Tab 1: Home */}
          <div className="flex items-center justify-center h-full">
            <button
              type="button"
              onClick={() => {
                setMoreSheetOpen(false);
                navigate('/');
              }}
              className={`flex flex-col items-center justify-center gap-0.5 min-h-[52px] w-[94px] max-w-full rounded-[14px] transition-all duration-150 cursor-pointer ${
                activeTab === 'home'
                  ? 'text-[#1F6BFF] bg-[#EAF2FF] shadow-[0_2px_8px_rgba(31,107,255,0.15)] font-semibold'
                  : 'text-[#6B7280] hover:text-slate-900 font-medium'
              }`}
            >
              <Home className="w-[26px] h-[26px]" strokeWidth={1.75} />
              <span className="text-[13px] leading-tight">Home</span>
            </button>
          </div>

          {/* Tab 2: Doctor */}
          <div className="flex items-center justify-center h-full">
            <button
              type="button"
              onClick={() => {
                setMoreSheetOpen(false);
                navigate('/doctors');
              }}
              className={`flex flex-col items-center justify-center gap-0.5 min-h-[52px] w-[94px] max-w-full rounded-[14px] transition-all duration-150 cursor-pointer ${
                activeTab === 'doctor'
                  ? 'text-[#1F6BFF] bg-[#EAF2FF] shadow-[0_2px_8px_rgba(31,107,255,0.15)] font-semibold'
                  : 'text-[#6B7280] hover:text-slate-900 font-medium'
              }`}
            >
              {/* Doctor with stethoscope outline */}
              <svg
                className="w-[26px] h-[26px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="7" r="4" />
                <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
                <path d="M10 14v2a2 2 0 0 0 4 0v-2" />
                <path d="M14 16h2a2 2 0 0 1 2 2v1" />
                <circle cx="18" cy="19" r="1" fill="currentColor" />
              </svg>
              <span className="text-[13px] leading-tight">Doctor</span>
            </button>
          </div>

          {/* Tab 3: Diagnostic */}
          <div className="flex items-center justify-center h-full">
            <button
              type="button"
              onClick={() => {
                setMoreSheetOpen(false);
                navigate('/diagnostic');
              }}
              className={`flex flex-col items-center justify-center gap-0.5 min-h-[52px] w-[94px] max-w-full rounded-[14px] transition-all duration-150 cursor-pointer ${
                activeTab === 'diagnostic'
                  ? 'text-[#1F6BFF] bg-[#EAF2FF] shadow-[0_2px_8px_rgba(31,107,255,0.15)] font-semibold'
                  : 'text-[#6B7280] hover:text-slate-900 font-medium'
              }`}
            >
              <Microscope className="w-[26px] h-[26px]" strokeWidth={1.75} />
              <span className="text-[13px] leading-tight">Diagnostic</span>
            </button>
          </div>

          {/* Tab 4: More (2x2 grid where one square is a "+") */}
          <div className="flex items-center justify-center h-full">
            <button
              type="button"
              onClick={() => setMoreSheetOpen(!moreSheetOpen)}
              className={`flex flex-col items-center justify-center gap-0.5 min-h-[52px] w-[94px] max-w-full rounded-[14px] transition-all duration-150 cursor-pointer ${
                activeTab === 'more'
                  ? 'text-[#1F6BFF] bg-[#EAF2FF] shadow-[0_2px_8px_rgba(31,107,255,0.15)] font-semibold'
                  : 'text-[#6B7280] hover:text-slate-900 font-medium'
              }`}
            >
              <svg
                className="w-[26px] h-[26px]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <path d="M17.5 14v7M14 17.5h7" />
              </svg>
              <span className="text-[13px] leading-tight">More</span>
            </button>
          </div>
        </div>
      </nav>

      {/* "More" Bottom Sheet Drawer */}
      {moreSheetOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          {/* Backdrop Click Area */}
          <div
            className="absolute inset-0"
            onClick={() => setMoreSheetOpen(false)}
          />

          {/* Sheet Container with 20px top corner radius */}
          <div
            className="relative z-10 bg-white w-full max-w-lg rounded-t-[20px] p-5 shadow-2xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200"
            style={{
              paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)',
            }}
          >
            {/* Drag Handle */}
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                More Services & Company
              </h3>
              <button
                type="button"
                onClick={() => setMoreSheetOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="divide-y divide-slate-100 py-2">
              <Link
                to="/packages"
                onClick={() => setMoreSheetOpen(false)}
                className="flex items-center justify-between py-3 text-sm font-semibold text-slate-800 hover:text-[#1F6BFF] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF2FF] text-[#1F6BFF] flex items-center justify-center">
                    <Package className="w-4 h-4" />
                  </div>
                  <span>Health Packages</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                to="/blog"
                onClick={() => setMoreSheetOpen(false)}
                className="flex items-center justify-between py-3 text-sm font-semibold text-slate-800 hover:text-[#1F6BFF] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF2FF] text-[#1F6BFF] flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span>Blogs & Health Advice</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                to="/corporate"
                onClick={() => setMoreSheetOpen(false)}
                className="flex items-center justify-between py-3 text-sm font-semibold text-slate-800 hover:text-[#1F6BFF] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF2FF] text-[#1F6BFF] flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span>Corporate Healthcare</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                to="/corporate"
                onClick={() => setMoreSheetOpen(false)}
                className="flex items-center justify-between py-3 text-sm font-semibold text-slate-800 hover:text-[#1F6BFF] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF2FF] text-[#1F6BFF] flex items-center justify-center">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <span>IT Services</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                to="/about"
                onClick={() => setMoreSheetOpen(false)}
                className="flex items-center justify-between py-3 text-sm font-semibold text-slate-800 hover:text-[#1F6BFF] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                    <Info className="w-4 h-4" />
                  </div>
                  <span>About Us</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                to="/contact"
                onClick={() => setMoreSheetOpen(false)}
                className="flex items-center justify-between py-3 text-sm font-semibold text-slate-800 hover:text-[#1F6BFF] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <span>Contact & Support</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>

            {/* Language Toggle & User Account Area */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              {/* Language Switch */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="min-h-[44px] flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition cursor-pointer"
              >
                <Globe className="w-4 h-4 text-[#1F6BFF]" />
                <span>{language === 'en' ? 'বাংলা সংস্করণ' : 'English View'}</span>
              </button>

              {/* User Login or Profile */}
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <Link
                    to="/dashboard"
                    onClick={() => setMoreSheetOpen(false)}
                    className="min-h-[44px] px-3.5 py-2 bg-[#EAF2FF] text-[#1F6BFF] hover:bg-[#d6e7ff] text-xs font-bold rounded-xl flex items-center gap-1.5 transition"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMoreSheetOpen(false);
                    }}
                    className="min-h-[44px] px-2.5 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold rounded-xl transition cursor-pointer"
                    title="Log Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMoreSheetOpen(false);
                    openAuthModal();
                  }}
                  className="min-h-[44px] px-4 py-2 bg-[#1F6BFF] hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-xs shadow-blue-500/20"
                >
                  Log In / Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
