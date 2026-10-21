import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, PhoneCall, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { openAuthModal } = useApp();

  return (
    <footer className="w-full bg-[#064e3b] text-white pt-16 pb-8 font-['Poppins',sans-serif] print:hidden">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-emerald-800/60">
          {/* Col 1 & 2: Brand, About line, Social icons & Contact */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-white text-emerald-700 flex items-center justify-center shadow-xs">
                <Stethoscope className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white leading-none">
                Doctor's care
              </span>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal max-w-sm">
              Bangladesh's leading digital healthcare platform providing 24/7 doctor consultations, doorstep diagnostic testing, and healthcare protection packages for your family and employees.
            </p>

            {/* Contact info */}
            <div className="space-y-2 pt-2 text-xs text-emerald-100 font-medium">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-300" />
                <span>09677885599</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-300" />
                <span>support@doctorscare.com.bd</span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="#facebook"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full bg-emerald-800/80 hover:bg-emerald-700 flex items-center justify-center text-white transition"
                aria-label="Facebook"
              >
                <span className="text-xs font-bold">f</span>
              </a>
              <a
                href="#twitter"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full bg-emerald-800/80 hover:bg-emerald-700 flex items-center justify-center text-white transition"
                aria-label="Twitter / X"
              >
                <span className="text-xs font-bold">𝕏</span>
              </a>
              <a
                href="#linkedin"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full bg-emerald-800/80 hover:bg-emerald-700 flex items-center justify-center text-white transition"
                aria-label="LinkedIn"
              >
                <span className="text-xs font-bold">in</span>
              </a>
              <a
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full bg-emerald-800/80 hover:bg-emerald-700 flex items-center justify-center text-white transition"
                aria-label="Instagram"
              >
                <span className="text-xs font-bold">📷</span>
              </a>
              <a
                href="#youtube"
                onClick={(e) => e.preventDefault()}
                className="w-8 h-8 rounded-full bg-emerald-800/80 hover:bg-emerald-700 flex items-center justify-center text-white transition"
                aria-label="YouTube"
              >
                <span className="text-xs font-bold">▶</span>
              </a>
            </div>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="font-semibold text-sm text-white mb-4 tracking-wide uppercase">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-100/80">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/hospital-partners" className="hover:text-white transition-colors">
                  Hospital Partners
                </Link>
              </li>
              <li>
                <Link to="/corporate" className="hover:text-white transition-colors">
                  Corporate Partnerships
                </Link>
              </li>
              <li>
                <Link to="/it-services" className="hover:text-white transition-colors">
                  Healthcare IT Services
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Health Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Services */}
          <div>
            <h4 className="font-semibold text-sm text-white mb-4 tracking-wide uppercase">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-100/80">
              <li>
                <Link to="/doctors" className="hover:text-white transition-colors">
                  Video Consultation
                </Link>
              </li>
              <li>
                <Link to="/diagnostic" className="hover:text-white transition-colors">
                  Home Diagnostic Tests
                </Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-white transition-colors">
                  Family Health Plans
                </Link>
              </li>
              <li>
                <Link to="/join-doctor" className="hover:text-white transition-colors font-medium text-emerald-300">
                  Join as a Doctor
                </Link>
              </li>
              <li>
                <Link to="/doctors?speciality=general-physician" className="hover:text-white transition-colors">
                  General Physicians
                </Link>
              </li>
              <li>
                <Link to="/doctors?speciality=pediatrics" className="hover:text-white transition-colors">
                  Pediatric Specialists
                </Link>
              </li>
              <li>
                <Link to="/doctors?speciality=gynecology" className="hover:text-white transition-colors">
                  Gynae & Obs Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Support */}
          <div>
            <h4 className="font-semibold text-sm text-white mb-4 tracking-wide uppercase">
              Support
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-100/80">
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openAuthModal()}
                  className="hover:text-white transition-colors text-left"
                >
                  Patient Login
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openAuthModal('doctor')}
                  className="hover:text-white transition-colors text-left"
                >
                  Doctor Portal
                </button>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom line with copyright */}
        <div className="pt-6 text-center text-xs text-emerald-300/80">
          <p>Copyright © 2026 Doctor's care. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
