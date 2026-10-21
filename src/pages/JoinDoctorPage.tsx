import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Stethoscope,
  ShieldCheck,
  Award,
  TrendingUp,
  Clock,
  DollarSign,
  Calendar,
  CheckCircle2,
  ChevronRight,
  FileCheck,
  Video,
  Users,
  Smartphone,
  AlertCircle,
  HelpCircle,
  Headphones,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const JoinDoctorPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useApp();

  // Interactive Earnings Calculator
  const [fee, setFee] = useState(500);
  const [patientsPerDay, setPatientsPerDay] = useState(12);
  const [daysPerWeek, setDaysPerWeek] = useState(6);

  const monthlyEstimatedEarnings = fee * patientsPerDay * (daysPerWeek * 4);

  // Form State
  const [fullName, setFullName] = useState('');
  const [bmdcNumber, setBmdcNumber] = useState('');
  const [bmdcType, setBmdcType] = useState('Full Registration (Type A)');
  const [specialty, setSpecialty] = useState('General Physician');
  const [qualifications, setQualifications] = useState('');
  const [currentChamber, setCurrentChamber] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [experienceYears, setExperienceYears] = useState('3-5 Years');
  const [desiredFee, setDesiredFee] = useState('500');
  const [agreedGuidelines, setAgreedGuidelines] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !bmdcNumber || !phone || !email || !qualifications) {
      showToast('Please fill in all mandatory application fields', 'error');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccessModal(true);
      showToast('Doctor application submitted successfully for BMDC audit!', 'success');
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/70 font-['Poppins',sans-serif] text-gray-800 pb-24">
      {/* Top Breadcrumb & Hero */}
      <section className="bg-gradient-to-b from-emerald-50/60 via-white to-slate-50/70 pt-10 pb-14 border-b border-gray-200">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
            <Link to="/" className="hover:text-emerald-700 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 font-medium">Join as a Doctor</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                <ShieldCheck className="w-4 h-4" />
                BMDC Registered Doctors Only
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-[1.15] tracking-tight">
                Practice Anywhere, Anytime. <br />
                <span className="text-emerald-700">Join Bangladesh's #1</span> Telemedicine Network
              </h1>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl">
                Deliver care to patients across all 64 districts from the comfort of your home or chamber. Set your own schedule, write BMDC compliant e-prescriptions, and receive guaranteed automated payouts directly to your bKash or bank account.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#application-form"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-7 py-3.5 rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all"
                >
                  <span>Apply to Join Now</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
                <Link
                  to="/doctor-dashboard"
                  className="bg-white hover:bg-gray-50 text-gray-700 font-semibold text-sm px-6 py-3.5 rounded-xl border border-gray-200 flex items-center gap-2 transition"
                >
                  <Stethoscope className="w-4 h-4 text-emerald-600" />
                  <span>Existing Doctor Portal</span>
                </Link>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div>
                  <p className="text-2xl font-extrabold text-emerald-700">1,800+</p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">Verified Doctors</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-gray-900">৳85,000+</p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">Avg. Monthly Earning</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-emerald-600">100%</p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">Flexible Timing</p>
                </div>
              </div>
            </div>

            {/* Right Card: Earnings Calculator */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  Calculator
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">Earnings Estimator</h3>
                    <p className="text-xs text-gray-500">Calculate your potential teleconsultation income</p>
                  </div>
                </div>

                <div className="space-y-5 text-xs text-gray-700">
                  <div>
                    <div className="flex justify-between font-medium mb-1.5">
                      <span>Consultation Fee per Patient:</span>
                      <strong className="text-sm font-bold text-emerald-700">৳{fee}</strong>
                    </div>
                    <input
                      type="range"
                      min={300}
                      max={1500}
                      step={50}
                      value={fee}
                      onChange={(e) => setFee(Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>৳300</span>
                      <span>৳900</span>
                      <span>৳1,500</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-medium mb-1.5">
                      <span>Consultations per Day:</span>
                      <strong className="text-sm font-bold text-gray-900">{patientsPerDay} Patients</strong>
                    </div>
                    <input
                      type="range"
                      min={3}
                      max={30}
                      step={1}
                      value={patientsPerDay}
                      onChange={(e) => setPatientsPerDay(Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>3 / day</span>
                      <span>15 / day</span>
                      <span>30 / day</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-medium mb-1.5">
                      <span>Days Practicing per Week:</span>
                      <strong className="text-sm font-bold text-gray-900">{daysPerWeek} Days</strong>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={7}
                      step={1}
                      value={daysPerWeek}
                      onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                      <span>1 Day</span>
                      <span>4 Days</span>
                      <span>7 Days</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 bg-emerald-50/60 p-4 rounded-xl text-center">
                    <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                      Estimated Monthly Income
                    </p>
                    <p className="text-3xl font-extrabold text-emerald-700 mt-1">
                      ৳{monthlyEstimatedEarnings.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">
                      *Estimates based on active consultations with 0 registration or software subscription fees.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Doctor's Care */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
              Why Doctors Trust Us
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3">
              Built by Medical & Tech Leaders for Bangladeshi Doctors
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              We eliminate administrative hassles so you can focus entirely on clinical excellence and patient health.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-gray-200 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">Practice On Your Terms</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Toggle your online/offline status with one tap. Choose instant calls or scheduled appointments around your hospital duties.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-gray-200 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">BMDC Compliant Rx</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Fast e-prescription engine with built-in Bangladesh DGDA medicine database, auto-dosage templates, and secure digital signing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-gray-200 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">Automated Payouts</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Direct weekly disbursement straight to your personal bKash, Nagad, or Bangladeshi commercial bank account with transparent accounting.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-gray-200 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">Dedicated Doctor Desk</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                24/7 dedicated physician liaison team to assist you with patient triage, tech support, and schedule coordination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Onboarding Process */}
      <section className="py-16 bg-emerald-50/40 border-b border-gray-200">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
              Simple Verification
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3">
              How To Join in 4 Easy Steps
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Our clinical compliance team verifies all credentials within 24 to 48 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {[
              {
                step: '01',
                title: 'Submit Application',
                desc: 'Fill out the doctor registration form with your BMDC registration number and medical credentials.',
              },
              {
                step: '02',
                title: 'BMDC Verification',
                desc: 'Our compliance team verifies your registration status with the official BMDC national registry.',
              },
              {
                step: '03',
                title: 'Quick 10-Min Demo',
                desc: 'Join a brief orientation with our doctor support lead to walk through the video room and Rx creator.',
              },
              {
                step: '04',
                title: 'Start Consulting',
                desc: 'Go online anytime to start consulting with thousands of waiting patients across Bangladesh.',
              },
            ].map((s, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs relative">
                <span className="text-3xl font-black text-emerald-600/20 absolute top-4 right-4">
                  {s.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-sm flex items-center justify-center mb-4">
                  {idx + 1}
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1.5">{s.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Registration Form */}
      <section id="application-form" className="py-16 bg-white">
        <div className="max-w-[840px] mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
                Practitioner Onboarding
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3">
                Doctor Registration Form
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Please provide accurate clinical information as per your BMDC registration certificate.
              </p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Full Name (with Dr. prefix) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Mahmudul Hasan"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    BMDC Registration Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. A-74291"
                    value={bmdcNumber}
                    onChange={(e) => setBmdcNumber(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    BMDC Registration Type
                  </label>
                  <select
                    value={bmdcType}
                    onChange={(e) => setBmdcType(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
                  >
                    <option value="Full Registration (Type A)">Full Registration (Type A - Medical)</option>
                    <option value="Dental Registration (Type B)">Dental Registration (Type B - Dental)</option>
                    <option value="Temporary Specialist">Temporary Specialist Registration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Primary Speciality *
                  </label>
                  <select
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
                  >
                    <option value="General Physician">General Physician / Family Medicine</option>
                    <option value="Pediatrics">Pediatrics (Child Health)</option>
                    <option value="Gynecology & Obstetrics">Gynecology & Obstetrics</option>
                    <option value="Cardiology">Cardiology (Heart)</option>
                    <option value="Dermatology">Dermatology (Skin & Hair)</option>
                    <option value="Internal Medicine">Internal Medicine</option>
                    <option value="Endocrinology">Endocrinology (Diabetes & Thyroid)</option>
                    <option value="Orthopedics">Orthopedics (Bone & Joint)</option>
                    <option value="Psychiatry">Psychiatry & Mental Health</option>
                    <option value="Neurology">Neurology</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Degrees / Qualifications *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MBBS (DMC), FCPS (Medicine), MRCP (UK)"
                    value={qualifications}
                    onChange={(e) => setQualifications(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Current Hospital / Chamber Workplace
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dhaka Medical College Hospital / Square"
                    value={currentChamber}
                    onChange={(e) => setCurrentChamber(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Mobile Phone Number (bKash / Contact) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+880 1711-234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Professional Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="doctor@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Clinical Experience
                  </label>
                  <select
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
                  >
                    <option value="1-3 Years">1 - 3 Years</option>
                    <option value="3-5 Years">3 - 5 Years</option>
                    <option value="5-10 Years">5 - 10 Years</option>
                    <option value="10+ Years">10+ Years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Desired Consultation Fee (BDT)
                  </label>
                  <select
                    value={desiredFee}
                    onChange={(e) => setDesiredFee(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white"
                  >
                    <option value="300">৳300 (Standard General Practitioner)</option>
                    <option value="400">৳400 (Senior Medical Officer)</option>
                    <option value="500">৳500 (Registrar / Junior Consultant)</option>
                    <option value="700">৳700 (Specialist Consultant)</option>
                    <option value="1000">৳1,000 (Senior Consultant)</option>
                    <option value="1500">৳1,500 (Professor / Super-specialist)</option>
                  </select>
                </div>
              </div>

              {/* Guidelines Checkbox */}
              <div className="p-4 rounded-xl bg-slate-50 border border-gray-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedGuidelines}
                    onChange={(e) => setAgreedGuidelines(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded text-emerald-600 accent-emerald-600"
                  />
                  <span className="text-xs text-gray-600 leading-relaxed">
                    I declare that I hold an active and valid registration from the Bangladesh Medical and Dental Council (BMDC). I agree to abide by the national BMDC Telemedicine Guidelines and Doctor's care Code of Medical Ethics.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting || !agreedGuidelines}
                className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                {submitting ? (
                  <span>Submitting Credentials...</span>
                ) : (
                  <>
                    <FileCheck className="w-4 h-4" />
                    <span>Submit Practitioner Application</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {successModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-gray-900">Application Received!</h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Thank you, <strong>{fullName}</strong>. Your BMDC registration number <strong>{bmdcNumber}</strong> has been queued for validation. Our compliance team will contact you at <strong>{phone}</strong> within 24 hours.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-50 text-xs text-emerald-800 font-medium text-left flex items-start gap-2.5 border border-emerald-200">
              <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
              <span>You can preview the live Doctor Dashboard right now in test mode.</span>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSuccessModal(false)}
                className="flex-1 py-3 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => navigate('/doctor-dashboard')}
                className="flex-1 py-3 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 shadow-xs"
              >
                Open Doctor Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
