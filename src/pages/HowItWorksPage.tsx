import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Video,
  FileText,
  FlaskConical,
  Pill,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  Smartphone,
  CreditCard,
  Truck,
  Sparkles,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'consultation' | 'diagnostic' | 'pharmacy' | 'plans'>('consultation');

  return (
    <div className="w-full min-h-screen bg-slate-50/70 font-['Poppins',sans-serif] text-gray-800 pb-24">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-emerald-50/60 via-white to-slate-50/70 pt-10 pb-12 border-b border-gray-200">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link to="/" className="hover:text-emerald-700 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 font-medium">How It Works</span>
          </div>

          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
              <Sparkles className="w-4 h-4" />
              Simple, Reliable & Transparent
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              Healthcare Made Easy in Just a Few Taps
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Explore how <strong>Doctor's care</strong> connects you to verified BMDC doctors, certified doorstep lab tests, digital prescriptions, and medicine delivery without waiting in traffic.
            </p>
          </div>

          {/* Service Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveTab('consultation')}
              className={`flex items-center gap-2 text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl transition ${
                activeTab === 'consultation'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Video Consultation</span>
            </button>

            <button
              onClick={() => setActiveTab('diagnostic')}
              className={`flex items-center gap-2 text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl transition ${
                activeTab === 'diagnostic'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <FlaskConical className="w-4 h-4" />
              <span>Home Diagnostics</span>
            </button>

            <button
              onClick={() => setActiveTab('pharmacy')}
              className={`flex items-center gap-2 text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl transition ${
                activeTab === 'pharmacy'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Pill className="w-4 h-4" />
              <span>Medicine Delivery</span>
            </button>

            <button
              onClick={() => setActiveTab('plans')}
              className={`flex items-center gap-2 text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl transition ${
                activeTab === 'plans'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Care Health Plans</span>
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic Tab Content */}
      <section className="py-14">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          {activeTab === 'consultation' && (
            <div className="space-y-12">
              <div className="text-center max-w-xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  How Online Doctor Consultation Works
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  Connect with general practitioners in under 10 minutes or book a specialist at your preferred time.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    step: '01',
                    icon: <Smartphone className="w-6 h-6 text-emerald-600" />,
                    title: 'Choose a Doctor or Department',
                    desc: 'Search by doctor name or pick from 36+ specialties including General Medicine, Pediatrics, Gynecology, and Dermatology.',
                  },
                  {
                    step: '02',
                    icon: <Clock className="w-6 h-6 text-emerald-600" />,
                    title: 'Select Instant or Scheduled Slot',
                    desc: 'See a GP right away or schedule a dedicated 15-minute video appointment with a senior consultant.',
                  },
                  {
                    step: '03',
                    icon: <Video className="w-6 h-6 text-emerald-600" />,
                    title: 'Encrypted HD Video Consultation',
                    desc: 'Join the private video call from your mobile browser or laptop. Discuss symptoms, upload past reports, and chat securely.',
                  },
                  {
                    step: '04',
                    icon: <FileText className="w-6 h-6 text-emerald-600" />,
                    title: 'Instant BMDC E-Prescription',
                    desc: 'The doctor writes a registered electronic prescription complete with BMDC registration number, instructions, and test advice.',
                  },
                ].map((s, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs relative flex flex-col justify-between">
                    <div>
                      <span className="text-3xl font-black text-emerald-600/15 absolute top-4 right-4">
                        {s.step}
                      </span>
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                        {s.icon}
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm mb-2">{s.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-4">
                <Link
                  to="/doctors"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-md transition"
                >
                  <span>Consult a Doctor Now</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'diagnostic' && (
            <div className="space-y-12">
              <div className="text-center max-w-xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  Doorstep Diagnostic Sample Collection
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  No need to fast in waiting rooms. Get certified medical blood and urine samples collected at home.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    step: '01',
                    icon: <FlaskConical className="w-6 h-6 text-emerald-600" />,
                    title: 'Select Your Lab Tests',
                    desc: 'Browse test packages like CBC, Lipid Profile, Dengue NS1, Thyroid panel, or upload your doctor’s lab advice slip.',
                  },
                  {
                    step: '02',
                    icon: <Smartphone className="w-6 h-6 text-emerald-600" />,
                    title: 'Provide Address & Preferred Time',
                    desc: 'Choose your preferred 2-hour morning or evening window across Dhaka and supported metropolitan areas.',
                  },
                  {
                    step: '03',
                    icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
                    title: 'Certified Phlebotomist Visits',
                    desc: 'Our trained medical phlebotomist arrives with sterile vacuum tubes and sealed needles following strict bio-safety protocols.',
                  },
                  {
                    step: '04',
                    icon: <FileText className="w-6 h-6 text-emerald-600" />,
                    title: 'Digital Reports in 12-24 Hours',
                    desc: 'Receive verified digital pathology reports directly in your app. Consult with your doctor for immediate review.',
                  },
                ].map((s, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs relative flex flex-col justify-between">
                    <div>
                      <span className="text-3xl font-black text-emerald-600/15 absolute top-4 right-4">
                        {s.step}
                      </span>
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                        {s.icon}
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm mb-2">{s.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-4">
                <Link
                  to="/diagnostic"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-md transition"
                >
                  <span>Book Diagnostic Tests</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'pharmacy' && (
            <div className="space-y-12">
              <div className="text-center max-w-xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  Genuine Medicine Delivered to Your Doorstep
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  Order 100% genuine DGDA-approved medicines with verified pharmacists checking every order.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    step: '01',
                    icon: <FileText className="w-6 h-6 text-emerald-600" />,
                    title: 'Upload or Select Prescription',
                    desc: 'Use the prescription issued by your online doctor or snap a photo of any written prescription.',
                  },
                  {
                    step: '02',
                    icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
                    title: 'Pharmacist Audit & Price Confirmation',
                    desc: "Our registered 'A-Grade' pharmacist verifies dosages, checks for drug interactions, and confirms the medicine price.",
                  },
                  {
                    step: '03',
                    icon: <CreditCard className="w-6 h-6 text-emerald-600" />,
                    title: 'Pay Online or Cash on Delivery',
                    desc: 'Pay seamlessly via bKash, Nagad, debit/credit cards, or pay cash upon receiving the medicine package.',
                  },
                  {
                    step: '04',
                    icon: <Truck className="w-6 h-6 text-emerald-600" />,
                    title: 'Express Delivery in Temperature Bags',
                    desc: 'Medicines (including cold-chain insulins and vaccines) are delivered securely to your doorstep within hours.',
                  },
                ].map((s, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs relative flex flex-col justify-between">
                    <div>
                      <span className="text-3xl font-black text-emerald-600/15 absolute top-4 right-4">
                        {s.step}
                      </span>
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                        {s.icon}
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm mb-2">{s.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-4">
                <Link
                  to="/doctors"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-md transition"
                >
                  <span>Consult Doctor to Get Prescription</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'plans' && (
            <div className="space-y-12">
              <div className="text-center max-w-xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  Health Plans for You & Your Family
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  Enjoy year-round healthcare protection with unlimited consultations and hospital benefits.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    step: '01',
                    icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
                    title: 'Select a Care Package',
                    desc: 'Pick between Jotno (Individual), Astha (Couple), Aponjon (Family 4-member), or Momota (Maternity & Senior).',
                  },
                  {
                    step: '02',
                    icon: <Smartphone className="w-6 h-6 text-emerald-600" />,
                    title: 'Add Family Beneficiaries',
                    desc: 'Add names, ages, and phone numbers for your spouse, children, or elderly parents so they can consult anytime.',
                  },
                  {
                    step: '03',
                    icon: <Video className="w-6 h-6 text-emerald-600" />,
                    title: 'Unlimited Free Consultations',
                    desc: 'Covered members pay ৳0 for 24/7 general physician calls and enjoy subsidized specialist booking fees.',
                  },
                  {
                    step: '04',
                    icon: <CreditCard className="w-6 h-6 text-emerald-600" />,
                    title: 'Hospital Cashback & Discounts',
                    desc: 'Claim up to ৳100,000 hospitalization cashback and enjoy 10%-40% discounts at over 20+ partner hospitals.',
                  },
                ].map((s, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs relative flex flex-col justify-between">
                    <div>
                      <span className="text-3xl font-black text-emerald-600/15 absolute top-4 right-4">
                        {s.step}
                      </span>
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                        {s.icon}
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm mb-2">{s.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-4">
                <Link
                  to="/packages"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-md transition"
                >
                  <span>Explore Health Care Packages</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Safety & Compliance Guarantee Banner */}
      <section className="max-w-[1120px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-10 shadow-xs flex flex-col md:flex-row items-center gap-8">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <div className="space-y-1.5 flex-1">
            <h3 className="text-xl font-extrabold text-gray-900">
              100% Certified by Bangladesh Medical & Dental Council (BMDC)
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Every prescription generated through Doctor's care complies with national telemedicine laws. All doctor credentials and registrations are verified before they are authorized to consult.
            </p>
          </div>
          <Link
            to="/doctors"
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl shrink-0 transition"
          >
            Find a Doctor
          </Link>
        </div>
      </section>
    </div>
  );
};
