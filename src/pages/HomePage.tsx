import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  Check,
  CheckCircle2,
  Video,
  Clock,
  Users,
  Star,
  Download,
  Stethoscope,
  Heart,
  Activity,
  FlaskConical,
  UserCheck,
  FileText,
  Building2,
  Cpu,
  ShieldCheck,
  PhoneCall,
  Menu,
  X,
  Smartphone,
  QrCode,
  Calendar,
  ArrowRight,
  Mail,
  MapPin,
  Send,
  Building,
  ExternalLink,
  MessageSquare,
  Briefcase,
  HelpCircle,
  Info,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import img_hero_telemedicine_1792346318867 from '../assets/images/hero_telemedicine_1792346318867.jpg';
import img_mother_child_health_1792348643490 from '../assets/images/mother_child_health_1792348643490.jpg';
import img_doctor_video_call_1792346319246 from '../assets/images/doctor_video_call_1792346319246.jpg';
import img_family_health_care_1792346319788 from '../assets/images/family_health_care_1792346319788.jpg';
import img_doctor_patient_exam_1792348644757 from '../assets/images/doctor_patient_exam_1792348644757.jpg';
import img_diagnostic_sample_1792346319850 from '../assets/images/diagnostic_sample_1792346319850.jpg';
import img_family_video_call_1792348644093 from '../assets/images/family_video_call_1792348644093.jpg';
import img_corporate_partner_1792350582214 from '../assets/images/corporate_partner_1792350582214.jpg';

// Image assets matching reference screenshot sections
const HERO_DOCTOR_IMG = img_hero_telemedicine_1792346318867;
const HERO_MOTHER_CHILD_IMG = img_mother_child_health_1792348643490;
const DOCTOR_WAVING_IMG = img_doctor_video_call_1792346319246;
const FAMILY_MAIN_IMG = img_family_health_care_1792346319788;
const DOCTOR_EXAM_IMG = img_doctor_patient_exam_1792348644757;
const DIAGNOSTIC_SAMPLE_IMG = img_diagnostic_sample_1792346319850;
const FAMILY_PHONE_IMG = img_family_video_call_1792348644093;
const CORPORATE_PARTNER_IMG = img_corporate_partner_1792350582214;

// 12 FAQ questions and answers strictly covering required topics
const FAQ_ITEMS = [
  {
    q: 'What conditions can doctors treat online?',
    a: 'Our registered doctors can diagnose and manage a wide range of common acute conditions (fever, flu, cough, allergies, rashes, stomach pain, migraines) as well as chronic conditions (hypertension, diabetes, thyroid disorders, asthma). For severe emergencies such as chest pain or heavy trauma, please immediately visit the nearest emergency room or dial 999.',
  },
  {
    q: 'How does an online video consultation work?',
    a: 'Choose your desired doctor or specialty, pick an immediate consultation or schedule a convenient time slot, and enter the patient details. Once confirmed, you will enter our private, high-definition video room right in your browser or phone with no complex setup required.',
  },
  {
    q: 'Who provides the consultation on Doctor\'s care?',
    a: 'All consultations are conducted exclusively by licensed Bangladeshi doctors who hold valid MBBS/BDS degrees and post-graduate specialist qualifications (FCPS, MD, MRCP, MS) from recognized medical colleges and universities.',
  },
  {
    q: 'Are the registered doctors verified by BMDC?',
    a: 'Yes, 100%. Every single doctor on Doctor\'s care undergoes a rigorous primary-source verification of their Bangladesh Medical and Dental Council (BMDC) registration number, academic credentials, and clinical experience before they can consult.',
  },
  {
    q: 'When are the doctors available for consultation?',
    a: 'Our general physician services are available 24 hours a day, 7 days a week, 365 days a year. Specialized consultants are available throughout the day according to their appointment schedules, with typical response times under 10 minutes.',
  },
  {
    q: 'Can we select a doctor of our own choice?',
    a: 'Yes. You can browse our comprehensive directory by specialty, gender, consultation fee, spoken languages, and patient reviews, and directly choose the exact specialist you want to see.',
  },
  {
    q: 'How much do I need to pay for the consultation?',
    a: 'Consultation fees are transparently set by each doctor and range from ৳300 to ৳1,200 depending on seniority and specialty. You will always see the exact fee upfront before confirming your appointment.',
  },
  {
    q: 'How do I make a payment (bKash, Nagad, Card)?',
    a: 'We support all major Bangladeshi payment methods including bKash, Nagad, Rocket, Upay, as well as Visa, Mastercard, and American Express debit and credit cards through our secure 128-bit SSL encrypted gateway.',
  },
  {
    q: 'If I decide to cancel my consultation after making payment, how do I get a refund?',
    a: 'If you cancel at least 30 minutes before your scheduled slot, or if the doctor is unable to attend, a 100% full refund is automatically initiated to your original mobile wallet or card within 2 to 5 business days without any cancellation fee.',
  },
  {
    q: 'Is my personal health data and medical record secure?',
    a: 'Yes. We strictly adhere to HIPAA-grade clinical privacy standards. All video consultations, uploaded lab reports, and prescription histories are end-to-end encrypted and accessible solely by you and your authorized treating physician.',
  },
  {
    q: 'How do I receive an official e-prescription and order prescribed medicines?',
    a: 'Immediately after your consultation, your doctor generates a digitally signed e-prescription complete with BMDC registration details, diagnosis, Rx medicine table, and advice. You can download it as a PDF or tap "Order Prescribed Medicines" for doorstep delivery.',
  },
  {
    q: 'How does home sample collection for diagnostic lab tests work?',
    a: 'Simply select your required tests (blood count, lipid profile, HbA1c, etc.), enter your address and preferred collection time slot. A certified phlebotomist arrives at your home with sterilized kits, and your verified digital report appears in your dashboard within 24 hours.',
  },
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { openAuthModal, toggleMobileMenu } = useApp();

  // Search input state
  const [searchInput, setSearchInput] = useState('');

  // Hero carousel slide state (auto-rotates between 2 slides)
  const [currentSlide, setCurrentSlide] = useState(0);

  // Dropdown states for header navigation
  const [blogsOpen, setBlogsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // FAQ Accordion state: only one answer open at a time (null when all closed)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Contact form state & validation
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactTopic, setContactTopic] = useState('General Query');
  const [contactMessage, setContactMessage] = useState('');
  const [contactErrors, setContactErrors] = useState<{ [key: string]: string }>({});
  const [contactSubmitted, setContactSubmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/doctors?search=${encodeURIComponent(searchInput.trim())}`);
    } else {
      navigate('/doctors');
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!contactName.trim()) {
      errors.name = 'Please enter your name.';
    }
    if (!contactEmail.trim() || !/^\S+@\S+\.\S+$/.test(contactEmail)) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!contactPhone.trim() || contactPhone.trim().length < 8) {
      errors.phone = 'Please provide a valid phone number.';
    }
    if (!contactMessage.trim() || contactMessage.trim().length < 10) {
      errors.message = 'Please provide a message with at least 10 characters.';
    }

    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      return;
    }

    setContactErrors({});
    setContactSubmitted(true);
    // Mock reset after submit
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactMessage('');
    }, 1500);
  };

  return (
    <div className="w-full bg-white font-['Poppins',sans-serif] text-gray-800 antialiased">
      {/* =========================================================================
          SECTION 1. HEADER (white, thin bottom border)
          Left: logo. Next to it: Consultation, Home Diagnostic, Health Plan, Blogs (dropdown arrow), More (dropdown arrow). Right: blue "Log in >" button. Nothing else.
          ========================================================================= */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200/80">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
          {/* Left: Logo & Navigation */}
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

            {/* Desktop Navigation Links */}
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

              {/* Blogs dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setBlogsOpen(!blogsOpen);
                    setMoreOpen(false);
                  }}
                  className="flex items-center gap-1 hover:text-emerald-600 transition-colors py-2 focus:outline-none"
                >
                  Blogs <ChevronDown className={`w-3.5 h-3.5 transition-transform ${blogsOpen ? 'rotate-180' : ''}`} />
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

          {/* Right: Vertical Divider & Login button and mobile hamburger */}
          <div className="flex items-center gap-3">
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

            <button
              type="button"
              onClick={() => toggleMobileMenu()}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
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

      {/* =========================================================================
          SECTION 2. SEARCH BAR
          Full container width, rounded, white, thin border, placeholder "Search by doctor name/code or department", search icon at the right end.
          ========================================================================= */}
      <section className="w-full py-16 md:py-24">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by doctor name/code or department"
              className="w-full bg-white border border-slate-200 rounded-lg md:rounded-xl px-4 md:px-5 py-3.5 pr-12 text-sm md:text-base text-slate-900 placeholder-slate-400 shadow-[0_2px_8px_rgba(5,150,105,0.03)] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all"
            />
            <button
              type="submit"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-emerald-600 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3. HERO BANNER
          Asymmetrical visual hierarchy with high-contrast text-slate-500 helper text, doctor image, and dual actions.
          ========================================================================= */}
      <section className="w-full py-16 md:py-24">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          {/* Banner Box */}
          <div className="relative w-full bg-gradient-to-br from-[#f0fdf4] via-[#f8fcf9] to-[#ecfdf5] rounded-[24px] border border-emerald-100 p-6 sm:p-10 md:p-12 min-h-[380px] md:min-h-[420px] flex items-center justify-between overflow-hidden shadow-luxury">
            {/* Left Column: Asymmetrical Typography & Actions */}
            <div className="flex-1 max-w-xl text-left z-10 py-2 sm:py-4">
              {/* Quiet unboxed kicker */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-emerald-100 text-xs font-semibold text-emerald-800 mb-4 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Telemedicine & Clinic Network 24/7</span>
              </div>

              {currentSlide === 0 ? (
                <>
                  <h1 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-slate-900 leading-[1.18] tracking-tight mb-3">
                    Talk to a verified doctor, anytime from anywhere.
                  </h1>
                  <p className="text-sm sm:text-base text-slate-500 font-normal leading-relaxed mb-6 max-w-lg">
                    Connect with over 1,500+ BMDC-certified specialists within 10 minutes. Video consultations, diagnostic home tests, and instant digital prescriptions.
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-slate-900 leading-[1.18] tracking-tight mb-3">
                    Healthcare that is easy, instant, and within reach.
                  </h1>
                  <p className="text-sm sm:text-base text-slate-500 font-normal leading-relaxed mb-6 max-w-lg">
                    Comprehensive family care from Bangladesh's top medical colleges with zero waiting room hassle and free 14-day follow-up privileges.
                  </p>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 mb-6">
                <button
                  type="button"
                  onClick={() => navigate('/doctors')}
                  className="btn-filled text-sm px-6 py-3 rounded-[12px] shadow-luxury hover:scale-[1.02] active:scale-100 transition-all cursor-pointer"
                >
                  <span>Consult a Doctor Now</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/diagnostic')}
                  className="btn-filled-2 text-sm px-5 py-3 rounded-[12px] hover:bg-white hover:scale-[1.02] active:scale-100 transition-all cursor-pointer"
                >
                  <span>Home Lab Tests</span>
                </button>
              </div>

              {/* Trust Metadata with proper contrast text-slate-500 */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500 pt-3 border-t border-emerald-100/70">
                <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% BMDC Verified</span>
                </div>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>12,000+ Consultations</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-slate-700">4.9/5 Rating</span>
                </div>
              </div>
            </div>

            {/* Right Offset Image Composition */}
            <div className="hidden lg:flex w-2/5 max-w-[340px] shrink-0 self-end relative z-10 items-end justify-center">
              <div className="relative">
                <img
                  src={currentSlide === 0 ? HERO_DOCTOR_IMG : HERO_MOTHER_CHILD_IMG}
                  alt="Healthcare Specialist"
                  className="w-full h-auto object-cover max-h-[350px] rounded-2xl shadow-luxury-md border-2 border-white/80 transition-all duration-500"
                />
                <div className="absolute -bottom-3 -left-4 bg-white/95 backdrop-blur-xs border border-slate-200/80 rounded-[12px] p-2.5 shadow-luxury flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Avg Response</span>
                    <span className="text-xs font-bold text-slate-900">&lt; 10 Minutes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide Navigation Arrows */}
            <button
              type="button"
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? 1 : 0))}
              className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-emerald-700 flex items-center justify-center shadow-luxury border border-slate-200 transition-all focus:outline-none"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? 1 : 0))}
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-emerald-700 flex items-center justify-center shadow-luxury border border-slate-200 transition-all focus:outline-none"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Two Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-5">
            <button
              type="button"
              onClick={() => setCurrentSlide(0)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === 0 ? 'w-8 bg-emerald-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label="Slide 1"
            />
            <button
              type="button"
              onClick={() => setCurrentSlide(1)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === 1 ? 'w-8 bg-emerald-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label="Slide 2"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4. FOUR SERVICE CARDS (one row; 2x2 on mobile)
          Custom soft micro-interactions on hover (scale-up, crisp border transition, luxury depth shadow).
          ========================================================================= */}
      <section className="w-full py-16 md:py-24">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {/* Card 1: Live Video Consultation */}
            <div
              onClick={() => navigate('/doctors')}
              className="bg-white border border-slate-200/90 rounded-[16px] p-5 md:p-6 text-center shadow-luxury hover:shadow-luxury-md hover:scale-[1.03] hover:-translate-y-1.5 hover:border-emerald-500/50 transition-all duration-300 ease-out cursor-pointer flex flex-col items-center group"
            >
              <div className="relative w-20 h-20 md:w-24 md:h-24 mb-4 flex items-center justify-center">
                <div className="w-18 h-18 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white shadow-luxury bg-emerald-50 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={HERO_DOCTOR_IMG}
                    alt="Doctor"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Round emerald video badge at corner */}
                <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-luxury group-hover:scale-110 transition-transform duration-300">
                  <Video className="w-4 h-4" />
                </div>
              </div>
              <h3 className="font-bold text-base md:text-lg text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors duration-200">
                Live Video Consultation
              </h3>
              <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-normal">
                See a doctor on video now or book a time that suits you.
              </p>
            </div>

            {/* Card 2: Diagnostic Tests */}
            <div
              onClick={() => navigate('/diagnostic')}
              className="bg-white border border-slate-200/90 rounded-[16px] p-5 md:p-6 text-center shadow-luxury hover:shadow-luxury-md hover:scale-[1.03] hover:-translate-y-1.5 hover:border-emerald-500/50 transition-all duration-300 ease-out cursor-pointer flex flex-col items-center group"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 mb-4 flex items-center justify-center">
                <div className="w-18 h-18 md:w-20 md:h-20 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-2xs group-hover:scale-110 transition-transform duration-300">
                  <FlaskConical className="w-10 h-10" />
                </div>
              </div>
              <h3 className="font-bold text-base md:text-lg text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors duration-200">
                Diagnostic Tests
              </h3>
              <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-normal">
                Book lab tests and get samples collected at home.
              </p>
            </div>

            {/* Card 3: Corporate Healthcare */}
            <div
              onClick={() => navigate('/corporate')}
              className="bg-white border border-slate-200/90 rounded-[16px] p-5 md:p-6 text-center shadow-luxury hover:shadow-luxury-md hover:scale-[1.03] hover:-translate-y-1.5 hover:border-emerald-500/50 transition-all duration-300 ease-out cursor-pointer flex flex-col items-center group"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 mb-4 flex items-center justify-center">
                <div className="w-18 h-18 md:w-20 md:h-20 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-2xs group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-10 h-10" />
                </div>
              </div>
              <h3 className="font-bold text-base md:text-lg text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors duration-200">
                Corporate Healthcare
              </h3>
              <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-normal">
                Health and wellbeing plans for your team and their families.
              </p>
            </div>

            {/* Card 4: Healthcare IT Services */}
            <div
              onClick={() => navigate('/corporate')}
              className="bg-white border border-slate-200/90 rounded-[16px] p-5 md:p-6 text-center shadow-luxury hover:shadow-luxury-md hover:scale-[1.03] hover:-translate-y-1.5 hover:border-emerald-500/50 transition-all duration-300 ease-out cursor-pointer flex flex-col items-center group"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 mb-4 flex items-center justify-center">
                <div className="w-18 h-18 md:w-20 md:h-20 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shadow-2xs group-hover:scale-110 transition-transform duration-300">
                  <Cpu className="w-10 h-10" />
                </div>
              </div>
              <h3 className="font-bold text-base md:text-lg text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors duration-200">
                Healthcare IT Services
              </h3>
              <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-normal">
                Our engineers help you build health-tech products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5. STATS STRIP (full-width light-blue band)
          Five items in a row, each with a white circular icon, a bold number and a small grey label:
          [sample] Verified doctors · 10 Minutes Average waiting time · [sample] Patients served · 4.8 star App store rating · [sample] App downloads.
          ========================================================================= */}
      <section className="w-full bg-[#f0fdf4] py-16 md:py-24 border-y border-emerald-100/60">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 items-center text-center">
            {/* Stat 1 */}
            <div className="flex flex-col items-center">
              <div className="w-13 h-13 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-xs mb-3 border border-emerald-100">
                <Stethoscope className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl md:text-2xl text-slate-900 mb-0.5">
                450+
              </span>
              <span className="text-xs md:text-sm text-slate-500 font-medium">
                Certified Specialists
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center">
              <div className="w-13 h-13 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-xs mb-3 border border-emerald-100">
                <Clock className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl md:text-2xl text-slate-900 mb-0.5">
                10 Minutes
              </span>
              <span className="text-xs md:text-sm text-slate-500 font-medium">
                Average waiting time
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center">
              <div className="w-13 h-13 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-xs mb-3 border border-emerald-100">
                <Users className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl md:text-2xl text-slate-900 mb-0.5">
                12,000+
              </span>
              <span className="text-xs md:text-sm text-slate-500 font-medium">
                Consultations
              </span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center">
              <div className="w-13 h-13 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center text-amber-500 shadow-xs mb-3 border border-emerald-100">
                <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
              </div>
              <span className="font-bold text-xl md:text-2xl text-slate-900 mb-0.5">
                4.9 star
              </span>
              <span className="text-xs md:text-sm text-slate-500 font-medium">
                App store rating
              </span>
            </div>

            {/* Stat 5 */}
            <div className="col-span-2 md:col-span-1 flex flex-col items-center">
              <div className="w-13 h-13 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-xs mb-3 border border-emerald-100">
                <Download className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl md:text-2xl text-slate-900 mb-0.5">
                25,000+
              </span>
              <span className="text-xs md:text-sm text-slate-500 font-medium">
                App downloads
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6. WHY SECTION
          Left: a card with three overlapping photos (placeholders). Right (below the image on mobile): small blue label "Why [YOUR BRAND]?", H2 "A doctor for every family, in one app", then three checklist rows with colored circle check icons:
          - "See a GP or specialist any time, from anywhere."
          - "Get e-prescriptions, medicine delivery and lab tests in one place."
          - "Choose a care plan that protects you and your family."
          ========================================================================= */}
      <section className="w-full py-16 md:py-24">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left: Card with overlapping photos (stacks first on mobile) */}
            <div className="order-1 md:order-1 relative">
              <div className="relative mx-auto max-w-[480px]">
                {/* Main Card with Family Photo */}
                <div className="relative rounded-[20px] overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgba(5,150,105,0.06)] bg-white p-3">
                  <img
                    src={FAMILY_MAIN_IMG}
                    alt="Family health"
                    className="w-full h-[260px] md:h-[300px] object-cover rounded-xl"
                  />
                </div>

                {/* Overlapping Bottom-Left Photo: Doctor with Clipboard */}
                <div className="absolute -bottom-6 -left-4 sm:-left-6 w-44 sm:w-52 rounded-xl overflow-hidden border-4 border-white shadow-xl bg-white">
                  <img
                    src={DOCTOR_EXAM_IMG}
                    alt="Doctor consultation"
                    className="w-full h-28 sm:h-32 object-cover"
                  />
                </div>

                {/* Decorative Emerald Stethoscope Outline at Top Left */}
                <div className="absolute -top-6 -left-4 w-16 h-16 rounded-full bg-emerald-50/90 border border-emerald-100 flex items-center justify-center text-emerald-600 -z-10">
                  <Stethoscope className="w-8 h-8 opacity-50" />
                </div>
              </div>
            </div>

            {/* Right: Content (stacks below image on mobile) */}
            <div className="order-2 md:order-2">
              <span className="text-emerald-700 font-semibold text-sm mb-2 block tracking-wide">
                Why Doctor's care?
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-[34px] font-bold text-slate-900 leading-tight mb-8">
                A doctor for every family, in one app
              </h2>

              <div className="space-y-5">
                {/* Checklist Row 1: Emerald check */}
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <p className="text-sm md:text-base text-slate-700 leading-relaxed font-normal">
                    See a GP or specialist any time, from anywhere.
                  </p>
                </div>

                {/* Checklist Row 2: Teal check */}
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <p className="text-sm md:text-base text-slate-700 leading-relaxed font-normal">
                    Get e-prescriptions, medicine delivery and lab tests in one place.
                  </p>
                </div>

                {/* Checklist Row 3: Pine check */}
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <p className="text-sm md:text-base text-slate-700 leading-relaxed font-normal">
                    Choose a care plan that protects you and your family.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* =========================================================================
          SECTION 9. HOME DIAGNOSTIC SECTION
          Left: a photo collage (a blood sample being taken, a phone showing a report, a person at a desk). Right: small emerald label "Home Diagnostic Service", H2 "Lab samples collected at your door", grey line "Healthcare that is easy to reach." Then three rows, each with a small outline icon:
          - "Book tests in a few taps"
          - "Trained staff collect samples at your home or office"
          - "Get your report in the app within 24 hours"
          Emerald button "Book Test".
          ========================================================================= */}
      <section className="w-full py-16 md:py-24">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left: Photo collage (stacks first on mobile) */}
            <div className="order-1 md:order-1 relative">
              <div className="relative mx-auto max-w-[480px]">
                {/* Main Image: Blood sample technician */}
                <div className="rounded-[20px] overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgba(5,150,105,0.06)] bg-white p-3">
                  <img
                    src={DIAGNOSTIC_SAMPLE_IMG}
                    alt="Blood sample collected at doorstep"
                    className="w-full h-[250px] sm:h-[280px] object-cover rounded-xl"
                  />
                </div>

                {/* Overlapping Bottom Insets */}
                <div className="flex gap-3 mt-3">
                  {/* Inset 1: Phone showing report */}
                  <div className="w-1/3 rounded-xl overflow-hidden border-2 border-white shadow-md bg-white p-1">
                    <div className="w-full h-24 rounded-lg bg-emerald-50 flex flex-col items-center justify-center p-2 text-center">
                      <FileText className="w-6 h-6 text-emerald-600 mb-1" />
                      <span className="text-[10px] font-semibold text-slate-700">e-Report</span>
                    </div>
                  </div>

                  {/* Inset 2: Professional at desk */}
                  <div className="w-2/3 rounded-xl overflow-hidden border-2 border-white shadow-md bg-white">
                    <img
                      src={DOCTOR_EXAM_IMG}
                      alt="Lab specialist desk"
                      className="w-full h-24 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content (stacks below image on mobile) */}
            <div className="order-2 md:order-2">
              <span className="text-emerald-700 font-semibold text-sm mb-2 block tracking-wide">
                Home Diagnostic Service
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-[34px] font-bold text-slate-900 leading-tight mb-2">
                Lab samples collected at your door
              </h2>
              <p className="text-slate-500 text-sm md:text-base mb-6 font-normal">
                Healthcare that is easy to reach.
              </p>

              <div className="space-y-4 mb-8">
                {/* Row 1 */}
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50/70 border border-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <FlaskConical className="w-4 h-4" />
                  </div>
                  <span className="text-sm md:text-base text-slate-700 font-normal">
                    Book tests in a few taps
                  </span>
                </div>

                {/* Row 2 */}
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50/70 border border-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <span className="text-sm md:text-base text-slate-700 font-normal">
                    Trained staff collect samples at your home or office
                  </span>
                </div>

                {/* Row 3 */}
                <div className="flex items-center gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50/70 border border-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-sm md:text-base text-slate-700 font-normal">
                    Get your report in the app within 24 hours
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/diagnostic')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-6 py-2.5 rounded-xl shadow-sm shadow-emerald-600/20 transition-all focus:ring-2 focus:ring-emerald-400 outline-none"
              >
                Book Test
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10. PREMIUM MEMBER SECTION (mint-white background)
          ========================================================================= */}
      <section className="w-full py-16 md:py-24">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="bg-[#f0fdf4] rounded-[24px] p-6 sm:p-10 md:p-12 border border-emerald-100 shadow-luxury">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left/top: Photo of a family with a phone showing a video call */}
              <div className="order-1 md:order-1">
                <div className="rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(5,150,105,0.08)] border-4 border-white bg-white">
                  <img
                    src={FAMILY_PHONE_IMG}
                    alt="Family with video call on phone"
                    className="w-full h-[240px] sm:h-[300px] object-cover"
                  />
                </div>
              </div>

              {/* Right: Text block */}
              <div className="order-2 md:order-2">
                <span className="text-emerald-700 font-semibold text-sm mb-2 block tracking-wide">
                  Become a Premium Member
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-[34px] font-bold text-slate-900 leading-tight mb-4">
                  Care plans for you and your family
                </h2>
                <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-6 font-normal">
                  Our comprehensive healthcare package is designed for continuous health assurance and peace of mind. Enjoy 24/7 unlimited video consultations with experienced doctors, dedicated family health monitoring, and doorstep medical care whenever you need it.
                </p>
                <Link
                  to="/packages"
                  className="text-emerald-700 hover:text-emerald-800 font-semibold text-sm md:text-base inline-flex items-center gap-1.5 transition-colors group"
                >
                  <span>View Health Plans</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11. CORPORATE PARTNER
          ========================================================================= */}
      <section className="w-full py-16 md:py-24 border-t border-slate-100">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
            {/* Left: Image */}
            <div className="order-1 md:order-1">
              <div className="rounded-[20px] overflow-hidden border border-slate-100 shadow-[0_8px_30px_rgba(5,150,105,0.06)] bg-white p-3">
                <img
                  src={CORPORATE_PARTNER_IMG}
                  alt="Business laptop showing doctor video call"
                  className="w-full h-[260px] sm:h-[320px] object-cover rounded-xl"
                />
              </div>
            </div>

            {/* Right: Content */}
            <div className="order-2 md:order-2">
              <span className="text-emerald-700 font-semibold text-sm mb-2 block tracking-wide">
                Become a Corporate Partner
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-[34px] font-bold text-slate-900 leading-tight mb-4">
                Healthcare plans for your whole team
              </h2>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-6 font-normal">
                Ensure the well-being of your employees with our comprehensive corporate healthcare platform. We offer convenient medical care packages including 24/7 online doctor consultations, annual health checkups, OPD/IPD assistance, and personalized health management tailored to your company's needs.
              </p>
              <button
                type="button"
                onClick={() => {
                  const contactEl = document.getElementById('contact-section');
                  if (contactEl) {
                    contactEl.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('/corporate');
                  }
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-6 py-2.5 rounded-xl shadow-sm shadow-emerald-600/20 transition-all focus:ring-2 focus:ring-emerald-400 outline-none inline-flex items-center gap-2"
              >
                <span>Talk to Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 12. HOSPITAL PARTNERS
          centered H2 "Our Hospital Partners" and a row of 5 grey placeholder logo boxes labelled "Partner logo". Do not use any real hospital's logo.
          ========================================================================= */}
      <section className="w-full py-16 md:py-24 bg-slate-50/70 border-y border-slate-200/60">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            Clinical Network
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold text-slate-900 mt-3 mb-2">
            Our Hospital Partners
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto mb-10">
            Collaborating with leading tertiary care hospitals and diagnostic centers across Bangladesh for seamless patient referrals.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: 'Dhaka Metropolitan Medical Guild', desc: 'Tertiary Referral Partner' },
              { name: 'Chittagong Clinical Centre', desc: 'Diagnostic & Lab Network' },
              { name: 'Sylhet Specialist Healthcare', desc: 'Telehealth Integration Hub' },
              { name: 'North Bengal Medical Alliance', desc: 'Emergency Care Co-op' },
            ].map((partner, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200/80 rounded-[12px] p-5 text-center shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-center"
              >
                <Building2 className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                <h4 className="text-xs font-bold text-slate-900 mb-1">{partner.name}</h4>
                <span className="text-[10px] text-slate-500 font-medium">{partner.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 13. IN THE MEDIA
          H2 "[YOUR BRAND] in the News" and 3 cards, each with an image, a source name, a headline and a "Read more" link. Mark all content as sample placeholders. Do not use real news outlets' logos or invented quotes.
          ========================================================================= */}
      <section className="w-full py-16 md:py-24">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="text-center md:text-left mb-10">
            <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold block mb-1">
              [Sample Placeholder Media Section]
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-[34px] font-bold text-gray-900">
              Doctor's care in the News
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* News Card 1 */}
            <div className="bg-white border border-[#E5E7EB] rounded-[12px] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col">
              <div className="h-44 bg-emerald-50/60 overflow-hidden relative">
                <img
                  src={DOCTOR_WAVING_IMG}
                  alt="Telemedicine news"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-white/90 text-[10px] font-medium text-gray-600 px-2.5 py-1 rounded-md shadow-xs">
                  National Tech Review [Sample]
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-emerald-600 font-semibold block mb-1">
                    Featured Media Coverage
                  </span>
                  <h3 className="font-bold text-base text-gray-900 mb-2 leading-snug">
                    How digital healthcare consultations are bridging the medical specialist gap in Bangladesh
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    Reviewing the expansion of doorstep health testing and instant video doctor consultation services.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">Sample Date · 2026</span>
                  <a
                    href="#news-sample"
                    onClick={(e) => e.preventDefault()}
                    className="text-emerald-600 hover:text-emerald-700 text-xs font-semibold inline-flex items-center gap-1"
                  >
                    <span>Read more</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* News Card 2 */}
            <div className="bg-white border border-[#E5E7EB] rounded-[12px] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col">
              <div className="h-44 bg-emerald-50/60 overflow-hidden relative">
                <img
                  src={DIAGNOSTIC_SAMPLE_IMG}
                  alt="Home diagnostics news"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-white/90 text-[10px] font-medium text-gray-600 px-2.5 py-1 rounded-md shadow-xs">
                  Healthcare Today [Sample]
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-emerald-600 font-semibold block mb-1">
                    Health-Tech Innovation
                  </span>
                  <h3 className="font-bold text-base text-gray-900 mb-2 leading-snug">
                    Doorstep sample collections provide reliable diagnostic testing within 24 hours
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    Certified phlebotomists and digital reporting transform preventive routine lab work for urban families.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">Sample Date · 2026</span>
                  <a
                    href="#news-sample"
                    onClick={(e) => e.preventDefault()}
                    className="text-emerald-600 hover:text-emerald-700 text-xs font-semibold inline-flex items-center gap-1"
                  >
                    <span>Read more</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* News Card 3 */}
            <div className="bg-white border border-[#E5E7EB] rounded-[12px] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col">
              <div className="h-44 bg-emerald-50/60 overflow-hidden relative">
                <img
                  src={CORPORATE_PARTNER_IMG}
                  alt="Corporate wellness news"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-white/90 text-[10px] font-medium text-gray-600 px-2.5 py-1 rounded-md shadow-xs">
                  Business Outlook [Sample]
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-emerald-600 font-semibold block mb-1">
                    Corporate Wellbeing
                  </span>
                  <h3 className="font-bold text-base text-gray-900 mb-2 leading-snug">
                    Modern employers adopt round-the-clock telehealth coverage for employee wellness
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">
                    Examining corporate health plans that reduce downtime and deliver proactive health advisory.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">Sample Date · 2026</span>
                  <a
                    href="#news-sample"
                    onClick={(e) => e.preventDefault()}
                    className="text-emerald-600 hover:text-emerald-700 text-xs font-semibold inline-flex items-center gap-1"
                  >
                    <span>Read more</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 14. HIGHLIGHT BLOCK
          a rounded green block with a small round photo and a short quote. Label it clearly as sample content in the code.
          ========================================================================= */}
      <section className="w-full py-16 md:py-24">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          {/* SAMPLE TESTIMONIAL / HIGHLIGHT CONTENT */}
          <div className="bg-gradient-to-br from-[#064e3b] via-[#047857] to-[#059669] rounded-2xl md:rounded-[24px] p-8 md:p-12 text-white text-center shadow-xl border border-emerald-500/20 relative overflow-hidden">
            {/* Labeled clearly as sample content */}
            <div className="inline-block bg-white/15 px-3 py-1 rounded-full text-[10px] uppercase font-semibold tracking-wider mb-6">
              Sample User Testimonial
            </div>

            {/* Small round photo / avatar */}
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full overflow-hidden border-2 border-white/80 shadow-md mb-4 bg-white/20">
              <img
                src={HERO_DOCTOR_IMG}
                alt="Patient reviewer"
                className="w-full h-full object-cover"
              />
            </div>

            <h4 className="font-semibold text-lg md:text-xl text-white mb-2">
              Mahadi Hasan
            </h4>

            {/* 5 Stars */}
            <div className="flex items-center justify-center gap-1 text-amber-300 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-300" />
              ))}
            </div>

            {/* Quote matching prompt */}
            <p className="text-sm md:text-base text-emerald-50 max-w-xl mx-auto leading-relaxed font-normal italic">
              "This app is very helpful. Anybody can communicate with doctor anywhere place. Doctors are very cordial, sincerely and good adviser."
            </p>

            {/* Subtle pagination dots */}
            <div className="flex items-center justify-center gap-1.5 mt-6">
              <span className="w-6 h-1.5 rounded-full bg-white"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/40"></span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 15. APP DOWNLOAD
          on the left a phone mockup with a QR code placeholder; on the right H2 "Get the app free and unlock member benefits", a line "Download from the Play Store or scan the QR code", and Google Play and App Store buttons (placeholder links).
          ========================================================================= */}
      <section className="w-full py-16 md:py-24">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
            {/* Left: Phone mockup with QR code placeholder (stacks first on mobile) */}
            <div className="order-1 md:order-1 relative">
              <div className="relative mx-auto max-w-[340px] bg-white border border-gray-200 rounded-[28px] p-4 shadow-xl">
                {/* Phone screen preview */}
                <div className="bg-gray-50 rounded-[22px] overflow-hidden border border-gray-100 p-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200 mb-4">
                    <span className="font-bold text-xs text-gray-900">Doctor's care App</span>
                    <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                      Free Download
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="h-16 bg-emerald-50/70 rounded-xl p-3 flex items-center gap-3">
                      <Video className="w-6 h-6 text-emerald-600" />
                      <div className="text-left">
                        <span className="text-xs font-bold text-gray-900 block">Instant Video Call</span>
                        <span className="text-[10px] text-gray-500">Wait time under 10 min</span>
                      </div>
                    </div>
                    <div className="h-16 bg-emerald-50 rounded-xl p-3 flex items-center gap-3">
                      <FlaskConical className="w-6 h-6 text-emerald-600" />
                      <div className="text-left">
                        <span className="text-xs font-bold text-gray-900 block">Doorstep Tests</span>
                        <span className="text-[10px] text-gray-500">Sample collection at home</span>
                      </div>
                    </div>
                  </div>

                  {/* QR Code Placeholder Card */}
                  <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-xs">
                    <div className="w-24 h-24 mx-auto bg-gray-50 border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center mb-2">
                      <QrCode className="w-12 h-12 text-gray-700 mb-1" />
                      <span className="text-[9px] text-gray-400">Scan QR</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-800 block">
                      Scan the QR Code to Download
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Text and Store Buttons */}
            <div className="order-2 md:order-2">
              <h2 className="text-2xl sm:text-3xl md:text-[34px] font-bold text-gray-900 leading-tight mb-3">
                Get the app free and unlock member benefits
              </h2>
              <p className="text-sm md:text-base text-gray-600 mb-8 font-normal">
                Download from the Play Store or scan the QR code
              </p>

              {/* Store Buttons (placeholder links) */}
              <div className="flex flex-wrap items-center gap-4">
                {/* Google Play */}
                <a
                  href="#play-store"
                  onClick={(e) => e.preventDefault()}
                  className="bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl flex items-center gap-3 shadow-sm transition"
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a1.99 1.99 0 0 1-.61-.926V2.74c0-.34.08-.654.21-.926zm1.484-.528l10.378 5.992-2.38 2.38-7.998-8.372zm10.378 14.73l-10.378 5.992 7.998-8.372 2.38 2.38zm1.09-1.09l3.528-2.037a1.5 1.5 0 0 0 0-2.597l-3.528-2.037-2.613 2.613 2.613 2.613z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] text-gray-400 block leading-none">GET IT ON</span>
                    <span className="text-xs font-bold leading-tight">Google Play</span>
                  </div>
                </a>

                {/* App Store */}
                <a
                  href="#app-store"
                  onClick={(e) => e.preventDefault()}
                  className="bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl flex items-center gap-3 shadow-sm transition"
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 1.01-2.85-.92.04-2.04.62-2.7 1.39-.58.67-1.09 1.74-1.02 2.78 1.03.08 2.09-.57 2.71-1.32z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] text-gray-400 block leading-none">Download on the</span>
                    <span className="text-xs font-bold leading-tight">App Store</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 16. LATEST BLOGS
          small label "Latest Blogs", H2 "Read the latest from our health experts", a "View All" link on the right, and 3 blog cards (image, category, title, date).
          ========================================================================= */}
      <section className="w-full py-16 md:py-24 bg-[#F6F7F9]">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-emerald-600 font-semibold text-sm mb-1 block tracking-wide">
                Latest Blogs
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-[34px] font-bold text-gray-900 leading-tight">
                Read the latest from our health experts
              </h2>
            </div>
            <Link
              to="/blog"
              className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm inline-flex items-center gap-1 shrink-0"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Blog Card 1 */}
            <div
              onClick={() => navigate('/blog/1')}
              className="bg-white border border-[#E5E7EB] rounded-[12px] overflow-hidden shadow-xs hover:shadow-md transition-shadow cursor-pointer flex flex-col group"
            >
              <div className="h-44 overflow-hidden bg-emerald-50/60">
                <img
                  src={DOCTOR_WAVING_IMG}
                  alt="Mental health"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mb-2 inline-block">
                    Mental Health
                  </span>
                  <h3 className="font-bold text-base text-gray-900 group-hover:text-emerald-600 transition-colors mb-2 leading-snug">
                    Common Mental Health Challenges and Disorders in Bangladesh
                  </h3>
                </div>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <span>Dr. Tahmina Akter</span>
                  <span>1 year ago</span>
                </div>
              </div>
            </div>

            {/* Blog Card 2 */}
            <div
              onClick={() => navigate('/blog/2')}
              className="bg-white border border-[#E5E7EB] rounded-[12px] overflow-hidden shadow-xs hover:shadow-md transition-shadow cursor-pointer flex flex-col group"
            >
              <div className="h-44 overflow-hidden bg-emerald-50/60">
                <img
                  src={DIAGNOSTIC_SAMPLE_IMG}
                  alt="Liver disease"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md mb-2 inline-block">
                    Internal Medicine
                  </span>
                  <h3 className="font-bold text-base text-gray-900 group-hover:text-emerald-600 transition-colors mb-2 leading-snug">
                    Early Symptoms of Liver Disease and When to Get Tested
                  </h3>
                </div>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <span>Dr. Rafiqul Islam</span>
                  <span>8 months ago</span>
                </div>
              </div>
            </div>

            {/* Blog Card 3 */}
            <div
              onClick={() => navigate('/blog/3')}
              className="bg-white border border-[#E5E7EB] rounded-[12px] overflow-hidden shadow-xs hover:shadow-md transition-shadow cursor-pointer flex flex-col group"
            >
              <div className="h-44 overflow-hidden bg-emerald-50/60">
                <img
                  src={HERO_MOTHER_CHILD_IMG}
                  alt="Child nutrition"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md mb-2 inline-block">
                    Pediatrics
                  </span>
                  <h3 className="font-bold text-base text-gray-900 group-hover:text-emerald-600 transition-colors mb-2 leading-snug">
                    Child Care Guide: Seasonal Fevers and Preventive Nutrition
                  </h3>
                </div>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <span>Dr. Nusrat Jahan</span>
                  <span>4 months ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 17. FAQ
          Consistent py-16 md:py-24 rhythm, fluid CSS transition accordion, only one item open at a time.
          ========================================================================= */}
      <section className="w-full py-16 md:py-24">
        <div className="max-w-[880px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-emerald-600 font-semibold text-sm mb-2 block tracking-wide">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-[36px] font-bold text-slate-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm md:text-base text-slate-500 font-normal max-w-lg mx-auto">
              Find answers regarding bookings, doctor verification, e-prescriptions, bKash payments, and home lab tests.
            </p>
          </div>

          {/* Controlled Accordion: Only one answer open at a time with smooth fluid animation */}
          <div className="space-y-3.5">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`border rounded-[14px] bg-white overflow-hidden transition-all duration-300 ${
                    isOpen ? 'border-emerald-500/60 shadow-[0_4px_20px_rgba(5,150,105,0.08)]' : 'border-slate-200/90 shadow-2xs hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-semibold text-sm md:text-base text-slate-900 hover:text-emerald-600 transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'bg-emerald-600 text-white rotate-180 shadow-2xs' : 'bg-slate-100 text-slate-600'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'grid-rows-[1fr] opacity-100 pb-5 px-6 pt-1' : 'grid-rows-[0fr] opacity-0 px-6'
                    }`}
                  >
                    <div className="overflow-hidden text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {item.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 18. CONTACT
          H2 "Get in touch with us", a short line, and a form with Name, Email, Phone, Message and a submit button. Validate fields; submission is mocked.
          ========================================================================= */}
      <section id="contact-section" className="w-full py-16 md:py-24 bg-[#F6F7F9]">
        <div className="max-w-[760px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-[34px] font-bold text-gray-900 mb-3">
              Get in touch with us
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto leading-relaxed font-normal">
              We're here to help. Send your query or question below and provide us with as much detail as possible. We aim to reply to your query within 24 hours.
            </p>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-[16px] p-6 sm:p-10 shadow-xs">
            {contactSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>
                <h3 className="font-bold text-xl text-gray-900">
                  Thank you! Your message has been sent.
                </h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Our customer support team has received your query and will contact you via email or phone within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setContactSubmitted(false)}
                  className="text-emerald-600 hover:underline text-sm font-semibold pt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Your full name"
                      className={`w-full px-4 py-2.5 rounded-lg border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                        contactErrors.name
                          ? 'border-red-400 focus:ring-red-200'
                          : 'border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20'
                      }`}
                    />
                    {contactErrors.name && (
                      <span className="text-xs text-red-500 mt-1 block">
                        {contactErrors.name}
                      </span>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className={`w-full px-4 py-2.5 rounded-lg border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                        contactErrors.email
                          ? 'border-red-400 focus:ring-red-200'
                          : 'border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20'
                      }`}
                    />
                    {contactErrors.email && (
                      <span className="text-xs text-red-500 mt-1 block">
                        {contactErrors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone field */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+880 1700 000000"
                      className={`w-full px-4 py-2.5 rounded-lg border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                        contactErrors.phone
                          ? 'border-red-400 focus:ring-red-200'
                          : 'border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20'
                      }`}
                    />
                    {contactErrors.phone && (
                      <span className="text-xs text-red-500 mt-1 block">
                        {contactErrors.phone}
                      </span>
                    )}
                  </div>

                  {/* Concern topic dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      What is your concern?
                    </label>
                    <select
                      value={contactTopic}
                      onChange={(e) => setContactTopic(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition bg-white"
                    >
                      <option value="General Query">General Query</option>
                      <option value="Doctor Consultation">Doctor Consultation</option>
                      <option value="Home Diagnostic Test">Home Diagnostic Test</option>
                      <option value="Corporate Health Plan">Corporate Health Plan</option>
                      <option value="Billing & Refund">Billing & Refund</option>
                    </select>
                  </div>
                </div>

                {/* Message field */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Your query <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Describe your question or healthcare requirement..."
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
                      contactErrors.message
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20'
                    }`}
                  />
                  {contactErrors.message && (
                    <span className="text-xs text-red-500 mt-1 block">
                      {contactErrors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-8 py-3 rounded-lg shadow-sm transition-all focus:ring-2 focus:ring-emerald-400 outline-none inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 19. FOOTER
          Clinical deep pine and emerald footer with clean white accents
          ========================================================================= */}
      <footer className="w-full bg-[#043e30] border-t border-emerald-900/60 text-white pt-16 pb-8">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-emerald-800/60">
            {/* Col 1 & 2: Brand, About line, Social icons & Contact */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-white text-emerald-600 flex items-center justify-center shadow-xs">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <span className="text-2xl font-bold tracking-tight text-white leading-none">
                  Doctor's care
                </span>
              </div>

              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-normal max-w-sm">
                Bangladesh's leading digital healthcare platform providing 24/7 doctor consultations, doorstep diagnostic testing, and healthcare protection packages for your family and employees.
              </p>

              {/* Contact info matching PDF reference */}
              <div className="space-y-2 pt-2 text-xs text-emerald-100/90 font-medium">
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
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-600/50 flex items-center justify-center text-white transition"
                  aria-label="Facebook"
                >
                  <span className="text-xs font-bold">f</span>
                </a>
                <a
                  href="#twitter"
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-600/50 flex items-center justify-center text-white transition"
                  aria-label="Twitter / X"
                >
                  <span className="text-xs font-bold">𝕏</span>
                </a>
                <a
                  href="#linkedin"
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-600/50 flex items-center justify-center text-white transition"
                  aria-label="LinkedIn"
                >
                  <span className="text-xs font-bold">in</span>
                </a>
                <a
                  href="#instagram"
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-600/50 flex items-center justify-center text-white transition"
                  aria-label="Instagram"
                >
                  <span className="text-xs font-bold">📷</span>
                </a>
                <a
                  href="#youtube"
                  onClick={(e) => e.preventDefault()}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-600/50 flex items-center justify-center text-white transition"
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
                  <Link to="/join-doctor" className="hover:text-white transition-colors text-emerald-300 font-medium">
                    Join as a Doctor
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
          <div className="pt-6 text-center text-xs text-emerald-200/60">
            <p>Copyright © 2026 Doctor's care. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
