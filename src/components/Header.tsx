import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Stethoscope,
  ChevronDown,
  ChevronRight,
  Globe,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  PhoneCall,
  Building2,
  Briefcase,
  Cpu,
  Activity,
  Heart,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { language, toggleLanguage, t, currentUser, logout, openAuthModal } = useApp();
  const [blogsOpen, setBlogsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="hidden md:block sticky top-0 z-40 w-full bg-white border-b border-slate-200/80 font-['Poppins',sans-serif] print:hidden">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
        {/* Left: Brand Logo & Desktop Navigation */}
        <div className="flex items-center gap-8 lg:gap-10">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs group-hover:bg-emerald-700 transition-colors">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 leading-none">
                Doctor's<span className="text-emerald-600"> care</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                Healthcare Anytime Anywhere
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-slate-700">
            <Link
              to="/doctors"
              className="hover:text-emerald-600 transition-colors py-2"
            >
              Consultation
            </Link>
            <Link
              to="/diagnostic"
              className="hover:text-emerald-600 transition-colors py-2"
            >
              Home Diagnostic
            </Link>
            <Link
              to="/packages"
              className="hover:text-emerald-600 transition-colors py-2"
            >
              Health Plan
            </Link>

            {/* Blogs Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setBlogsOpen(!blogsOpen);
                  setMoreOpen(false);
                }}
                className="flex items-center gap-1 hover:text-emerald-600 transition-colors py-2 focus:outline-none"
              >
                <span>Blogs</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${blogsOpen ? 'rotate-180' : ''}`} />
              </button>
              {blogsOpen && (
                <div
                  className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50"
                  onMouseLeave={() => setBlogsOpen(false)}
                >
                  <Link
                    to="/blog"
                    onClick={() => setBlogsOpen(false)}
                    className="block px-4 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium"
                  >
                    All Articles
                  </Link>
                  <Link
                    to="/blog?cat=heart"
                    onClick={() => setBlogsOpen(false)}
                    className="block px-4 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium"
                  >
                    Heart Health
                  </Link>
                  <Link
                    to="/blog?cat=pediatrics"
                    onClick={() => setBlogsOpen(false)}
                    className="block px-4 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-medium"
                  >
                    Child Nutrition
                  </Link>
                </div>
              )}
            </div>

            {/* More Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setMoreOpen(!moreOpen);
                  setBlogsOpen(false);
                }}
                onMouseEnter={() => setMoreOpen(true)}
                className={`flex items-center gap-1 transition-colors py-2 focus:outline-none ${
                  moreOpen ? 'text-emerald-600' : 'hover:text-emerald-600'
                }`}
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
              </button>

              {moreOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-52 bg-white border border-slate-100 rounded-2xl shadow-[0_10px_35px_rgba(5,150,105,0.08)] py-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  onMouseLeave={() => setMoreOpen(false)}
                >
                  <Link
                    to="/corporate"
                    onClick={() => setMoreOpen(false)}
                    className="block px-5 py-2.5 text-sm font-medium text-slate-800 hover:text-emerald-700 hover:bg-emerald-50/70 transition-colors"
                  >
                    Employers & NGOs
                  </Link>
                  <Link
                    to="/join-doctor"
                    onClick={() => setMoreOpen(false)}
                    className="block px-5 py-2.5 text-sm font-medium text-slate-800 hover:text-emerald-700 hover:bg-emerald-50/70 transition-colors"
                  >
                    Join as a Doctor
                  </Link>
                  <Link
                    to="/about"
                    onClick={() => setMoreOpen(false)}
                    className="block px-5 py-2.5 text-sm font-medium text-slate-800 hover:text-emerald-700 hover:bg-emerald-50/70 transition-colors"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setMoreOpen(false)}
                    className="block px-5 py-2.5 text-sm font-medium text-slate-800 hover:text-emerald-700 hover:bg-emerald-50/70 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right: Language toggle + User / Login */}
        <div className="flex items-center gap-3">
          {/* Language Switch */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-300 text-slate-700 hover:bg-emerald-50/50 transition"
            title="Toggle English / Bengali"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'en' ? 'বাংলা' : 'EN'}</span>
          </button>

          {/* User Profile or Log In Button */}
          {currentUser ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 hover:border-emerald-500 transition"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="hidden sm:inline text-xs font-semibold text-slate-800 max-w-[100px] truncate">
                  {currentUser.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {userDropdown && (
                <div
                  className="absolute right-0 top-full mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 text-xs"
                  onMouseLeave={() => setUserDropdown(false)}
                >
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-slate-500 text-[11px]">{currentUser.phone}</p>
                  </div>

                  <Link
                    to="/dashboard"
                    onClick={() => setUserDropdown(false)}
                    className="block px-4 py-2 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-medium"
                  >
                    Patient Dashboard
                  </Link>

                  {currentUser.role === 'doctor' && (
                    <Link
                      to="/doctor-dashboard"
                      onClick={() => setUserDropdown(false)}
                      className="block px-4 py-2 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-medium"
                    >
                      Doctor Panel
                    </Link>
                  )}

                  {currentUser.role === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={() => setUserDropdown(false)}
                      className="block px-4 py-2 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-medium"
                    >
                      Admin Panel
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setUserDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-rose-50 text-rose-600 border-t border-slate-100 flex items-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Divider */}
              <div className="hidden md:block h-6 w-px bg-slate-200 mx-1"></div>

              <button
                type="button"
                onClick={() => openAuthModal()}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-xs shadow-emerald-600/20 focus:ring-2 focus:ring-emerald-500/40 outline-none"
              >
                <span>Log in</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3 shadow-lg max-h-[80vh] overflow-y-auto">
          <div className="space-y-1">
            <Link
              to="/doctors"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 text-sm font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg"
            >
              Consultation
            </Link>
            <Link
              to="/diagnostic"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 text-sm font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg"
            >
              Home Diagnostic
            </Link>
            <Link
              to="/packages"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 text-sm font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg"
            >
              Health Plan
            </Link>
            <Link
              to="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 text-sm font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg"
            >
              Health Blogs
            </Link>
          </div>

          {/* Mobile "More" Accordion Section */}
          <div className="pt-2 border-t border-slate-100">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
              More Services & Company
            </p>
            <div className="space-y-1">
              <Link
                to="/join-doctor"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 py-2 px-3 text-xs font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg"
              >
                <Stethoscope className="w-4 h-4 text-emerald-600" />
                <span>Join as a Doctor</span>
              </Link>
              <Link
                to="/hospital-partners"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 py-2 px-3 text-xs font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg"
              >
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>Hospital Partners</span>
              </Link>
              <Link
                to="/corporate"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 py-2 px-3 text-xs font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg"
              >
                <Briefcase className="w-4 h-4 text-amber-600" />
                <span>Corporate Healthcare</span>
              </Link>
              <Link
                to="/it-services"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 py-2 px-3 text-xs font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg"
              >
                <Cpu className="w-4 h-4 text-teal-600" />
                <span>Healthcare IT Services</span>
              </Link>
              <Link
                to="/how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 py-2 px-3 text-xs font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg"
              >
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>How It Works</span>
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 py-2 px-3 text-xs font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg"
              >
                <Heart className="w-4 h-4 text-rose-500" />
                <span>About Us</span>
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 py-2 px-3 text-xs font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>Contact Us</span>
              </Link>
              <Link
                to="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 py-2 px-3 text-xs font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg"
              >
                <HelpCircle className="w-4 h-4 text-slate-600" />
                <span>FAQs</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
