import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  Calendar,
  Clock,
  ChevronRight,
  ShieldCheck,
  Video,
  CheckCircle2,
  Stethoscope,
  Star,
  Building2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DOCTORS_DATA } from '../data/mockData';
import { DoctorCard } from '../components/DoctorCard';
import { Doctor, Appointment } from '../types';
import { useApp } from '../context/AppContext';

// Image assets for "Your Offers" tiles from existing assets
const OFFER_IMAGES = [
  '/src/assets/images/doctor_video_call_1792346319246.jpg',
  '/src/assets/images/doctor_patient_exam_1792348644757.jpg',
  '/src/assets/images/mother_child_health_1792348643490.jpg',
  '/src/assets/images/hero_telemedicine_1792346318867.jpg',
  '/src/assets/images/family_health_care_1792346319788.jpg',
];

const OFFER_TILES = [
  { id: 1, title: 'General Physician 24/7', img: OFFER_IMAGES[0], bg: '#E9F1FF' },
  { id: 2, title: 'Specialist Consultation', img: OFFER_IMAGES[1], bg: '#FCE7F0' },
  { id: 3, title: 'Mother & Child Care', img: OFFER_IMAGES[2], bg: '#E9F1FF' },
  { id: 4, title: 'Instant Video Advice', img: OFFER_IMAGES[3], bg: '#FCE7F0' },
  { id: 5, title: 'Family Healthcare Plan', img: OFFER_IMAGES[4], bg: '#E9F1FF' },
];

// Specialty Filter Chips matching the reference screenshot
const SPECIALTY_FILTER_CHIPS = [
  { id: 'all', label: 'All Specialties' },
  { id: 'cardiology', label: 'Cardiology' },
  { id: 'pediatrics', label: 'Pediatrics' },
  { id: 'gynecology', label: 'Gynecology & Obstetrics' },
  { id: 'endocrinology', label: 'Endocrinology' },
  { id: 'orthopedics', label: 'Orthopedics' },
  { id: 'dermatology', label: 'Dermatology & Venereology' },
  { id: 'general-physician', label: 'General Physician' },
  { id: 'internal-medicine', label: 'Internal Medicine' },
];

export const DoctorsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchQuery, setSearchQuery, addAppointment, showToast, currentUser } = useApp();

  const queryFromUrl = searchParams.get('search') || searchParams.get('q') || '';
  const specFromUrl = searchParams.get('speciality') || '';
  const doctorFromUrl = searchParams.get('doctorId') || '';

  const [desktopSearch, setDesktopSearch] = useState(queryFromUrl);
  const [selectedSpeciality, setSelectedSpeciality] = useState(specFromUrl);

  // Carousel slide index (auto-advances every 4s)
  const [activeSlide, setActiveSlide] = useState(0);

  // Selected doctor for booking
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>(() => {
    if (doctorFromUrl) {
      const match = DOCTORS_DATA.find((d) => d.id === doctorFromUrl);
      if (match) return match;
    }
    return DOCTORS_DATA[0];
  });

  // Mobile / Tablet Slide-up Bottom Sheet State
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Booking Engine Form State
  const todayStr = new Date().toISOString().split('T')[0];
  const [consultationDate, setConsultationDate] = useState(todayStr);
  const [selectedSlot, setSelectedSlot] = useState('03:00 PM');
  const [patientName, setPatientName] = useState(currentUser?.name || 'Minhajul');
  const [patientPhone, setPatientPhone] = useState(currentUser?.phone || '+8801700112233');
  const [symptoms, setSymptoms] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  // Available Time Slots matching screenshot
  const timeSlots = ['03:00 PM', '04:30 PM', '06:00 PM', '07:30 PM'];

  // 2) BANNER CAROUSEL AUTO-ADVANCE EVERY 4s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Keep URL parameters in sync
  useEffect(() => {
    if (specFromUrl) {
      setSelectedSpeciality(specFromUrl);
    }
    if (queryFromUrl) {
      setDesktopSearch(queryFromUrl);
      setSearchQuery(queryFromUrl);
    }
    if (doctorFromUrl) {
      const found = DOCTORS_DATA.find((d) => d.id === doctorFromUrl);
      if (found) setSelectedDoctor(found);
    }
  }, [specFromUrl, queryFromUrl, doctorFromUrl, setSearchQuery]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileDrawerOpen]);

  // Combined search term: searchQuery (from MobileTopBar) or desktopSearch
  const effectiveSearch = useMemo(() => {
    return searchQuery || desktopSearch;
  }, [searchQuery, desktopSearch]);

  // Filter Doctors list
  const filteredDoctors = useMemo(() => {
    return DOCTORS_DATA.filter((doc) => {
      // Search keyword filter
      if (effectiveSearch.trim()) {
        const q = effectiveSearch.trim().toLowerCase();
        const matchName = doc.name.toLowerCase().includes(q);
        const matchSpec = doc.speciality.toLowerCase().includes(q);
        const matchBmdc = doc.bmdcNumber.toLowerCase().includes(q);
        const matchHosp = doc.hospital.toLowerCase().includes(q);
        const matchDegrees = doc.degrees.toLowerCase().includes(q);
        if (!matchName && !matchSpec && !matchBmdc && !matchHosp && !matchDegrees) {
          return false;
        }
      }

      // Speciality chip filter
      if (selectedSpeciality && selectedSpeciality !== 'all') {
        const filterNorm = selectedSpeciality.toLowerCase().replace(/[-_&]/g, ' ');
        const docSpecNorm = doc.speciality.toLowerCase();
        const docCodeNorm = doc.specialityCode?.toLowerCase() || '';

        const isMatch =
          docSpecNorm.includes(filterNorm) ||
          docCodeNorm.includes(selectedSpeciality.toLowerCase()) ||
          (filterNorm.includes('cardio') && docSpecNorm.includes('cardio')) ||
          (filterNorm.includes('pediatric') && docSpecNorm.includes('pediatric')) ||
          (filterNorm.includes('gyne') && (docSpecNorm.includes('gynae') || docSpecNorm.includes('gyne'))) ||
          (filterNorm.includes('endocrin') && docSpecNorm.includes('endocrin')) ||
          (filterNorm.includes('orthoped') && docSpecNorm.includes('orthoped')) ||
          (filterNorm.includes('dermatol') && docSpecNorm.includes('dermatol')) ||
          (filterNorm.includes('physician') && docSpecNorm.includes('physician')) ||
          (filterNorm.includes('internal') && docSpecNorm.includes('medicine'));

        if (!isMatch) return false;
      }

      return true;
    });
  }, [effectiveSearch, selectedSpeciality]);

  // Popular specialists row (first 5 top specialists)
  const popularSpecialists = useMemo(() => {
    return DOCTORS_DATA.slice(0, 5);
  }, []);

  // When user selects slots on a doctor card
  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setConfirmedBooking(null);

    // On mobile / tablet screens (< 1024px), open the touch bottom sheet
    if (window.innerWidth < 1024) {
      setMobileDrawerOpen(true);
    }
  };

  const handleResetBooking = () => {
    setPatientName(currentUser?.name || '');
    setPatientPhone(currentUser?.phone || '');
    setSymptoms('');
    setConfirmedBooking(null);
  };

  const handleResetFilters = () => {
    setDesktopSearch('');
    setSearchQuery('');
    setSelectedSpeciality('');
    setSearchParams({});
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSlot) {
      showToast('Please choose an available consultation time slot', 'error');
      return;
    }

    if (!patientName.trim()) {
      showToast('Please enter patient name', 'error');
      return;
    }

    if (!patientPhone.trim()) {
      showToast('Please enter patient contact phone number', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const newAptId = 'APT-' + Math.floor(100000 + Math.random() * 900000);

      const appointment: Appointment = {
        id: newAptId,
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        doctorSpeciality: selectedDoctor.speciality,
        doctorAvatar: selectedDoctor.avatar,
        doctorBmdc: selectedDoctor.bmdcNumber,
        patient: {
          name: patientName,
          age: 32,
          gender: 'male',
          relationship: 'Self',
          phone: patientPhone,
          symptoms: symptoms || 'General specialist consultation',
        },
        date: consultationDate,
        time: selectedSlot,
        consultationType: 'video',
        fee: selectedDoctor.fee,
        paymentMethod: 'bKash',
        paymentStatus: 'paid',
        status: 'upcoming',
        createdAt: new Date().toISOString(),
      };

      addAppointment(appointment);
      setConfirmedBooking(appointment);

      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
      });

      showToast(`Appointment confirmed with ${selectedDoctor.name}!`, 'success');
    }, 850);
  };

  // Reusable Booking Engine Form Component
  const renderBookingForm = (isMobileSheet = false) => {
    return (
      <div className="space-y-4">
        {/* Top Header Row: "Booking Engine" Pill + "Cancel" / Close */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#1F6BFF] bg-[#EAF2FF] border border-[#1F6BFF]/20 px-2.5 py-0.5 rounded-md">
            Booking Engine
          </span>
          {isMobileSheet ? (
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(false)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition cursor-pointer"
              aria-label="Close booking sheet"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleResetBooking}
              className="text-xs text-slate-400 hover:text-slate-600 transition cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>

        {/* Doctor Name & Specialty */}
        <div>
          <h3 className="font-bold text-base sm:text-lg text-slate-900 leading-snug">
            Book {selectedDoctor.name.startsWith('Dr.') || selectedDoctor.name.startsWith('Prof.')
              ? selectedDoctor.name
              : `Dr. ${selectedDoctor.name}`}
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {selectedDoctor.speciality}
          </p>
        </div>

        {confirmedBooking ? (
          /* Booking Confirmation State */
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3 animate-in fade-in">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Appointment Confirmed!</span>
            </div>
            <div className="text-xs text-slate-700 space-y-1">
              <p>
                <strong>Booking ID:</strong> {confirmedBooking.id}
              </p>
              <p>
                <strong>Patient:</strong> {confirmedBooking.patient.name}
              </p>
              <p>
                <strong>Date & Time:</strong> {confirmedBooking.date} at {confirmedBooking.time}
              </p>
              <p>
                <strong>Doctor Fee:</strong> ৳{confirmedBooking.fee} BDT (Paid)
              </p>
            </div>
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileDrawerOpen(false);
                  navigate(`/room/${confirmedBooking.id}?doctor=${selectedDoctor.id}`);
                }}
                className="w-full min-h-[44px] py-2.5 bg-[#1F6BFF] hover:bg-blue-600 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer"
              >
                <Video className="w-4 h-4" />
                <span>Join Consultation Video Room</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmedBooking(null);
                  if (isMobileSheet) setMobileDrawerOpen(false);
                }}
                className="w-full min-h-[44px] py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-medium transition cursor-pointer"
              >
                Schedule Another Slot
              </button>
            </div>
          </div>
        ) : (
          /* Standard Booking Form */
          <form onSubmit={handleConfirmBooking} className="space-y-4">
            {/* Field 1: Consultation Date */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                CONSULTATION DATE
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={consultationDate}
                  onChange={(e) => setConsultationDate(e.target.value)}
                  min={todayStr}
                  className="w-full min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm sm:text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1F6BFF]/20 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Field 2: Select Available Slot (2x2 Grid with Clock icons) */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                SELECT AVAILABLE SLOT
              </label>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot) => {
                  const isSlotActive = selectedSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`min-h-[44px] py-2 px-2.5 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all border cursor-pointer ${
                        isSlotActive
                          ? 'bg-[#1F6BFF] text-white border-[#1F6BFF] shadow-xs font-semibold'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-[#1F6BFF]/40 hover:bg-slate-50'
                      }`}
                    >
                      <Clock
                        className={`w-3.5 h-3.5 ${
                          isSlotActive ? 'text-white' : 'text-slate-400'
                        }`}
                      />
                      <span>{slot}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field 3: Patient Details */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                PATIENT DETAILS
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Patient Full Name (e.g. Minhajul)"
                  required
                  className="w-full min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm sm:text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F6BFF]/20 focus:bg-white transition"
                />
                <input
                  type="tel"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  placeholder="+8801700112233"
                  required
                  className="w-full min-h-[44px] bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm sm:text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F6BFF]/20 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Field 4: Primary Symptoms / Notes */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                PRIMARY SYMPTOMS / NOTES
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="E.g., high blood pressure readings, recurrent headache..."
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm sm:text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F6BFF]/20 focus:bg-white transition resize-none"
              />
            </div>

            {/* Cryptographic Secure Enclave Notice matching screenshot */}
            <div className="bg-[#EAF2FF] border border-[#1F6BFF]/20 rounded-xl p-3 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#1F6BFF] shrink-0 mt-0.5" />
              <p className="text-[11px] text-[#0B1E48] leading-relaxed font-normal">
                Clinical scheduling uses cryptographically secure tokens. Booking values are saved and stored in local enclave records.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[46px] py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer bg-[#1F6BFF] hover:bg-blue-600 text-white shadow-blue-500/20 active:scale-[0.99] disabled:opacity-60"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Scheduling Appointment...</span>
                </span>
              ) : (
                <span>Confirm Scheduled Appointment</span>
              )}
            </button>
          </form>
        )}
      </div>
    );
  };

  return (
    <div
      className="w-full min-h-screen bg-white font-['Poppins',sans-serif] text-slate-800"
      style={{
        paddingBottom: 'calc(64px + env(safe-area-inset-bottom, 0px) + 16px)',
      }}
    >
      {/* =========================================================================
          MOBILE VIEW ONLY (< 768px): NATIVE APP LOOK AND FEEL
          Tested at 360px, 390px, and 412px widths.
          ========================================================================= */}
      <div className="block md:hidden bg-white">
        {/* 2) BANNER CAROUSEL
            Margin 16px, radius 16px, aspect-ratio 3/1, overflow hidden, scroll-snap-x, auto-advance every 4s.
            4 dots overlaid at bottom center (8px from the bottom): inactive 6px white at 60% opacity, active 8px solid white.
            Use our OWN promo slides (simple brand-colored placeholders titled "Promo banner 1..4"). */}
        <section className="px-4 pt-3 pb-1" aria-label="Promotion Carousel">
          <div className="relative w-full aspect-[3/1] rounded-[16px] overflow-hidden shadow-xs">
            {/* Slides Container */}
            <div
              className="flex w-full h-full transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {/* Promo Banner 1 */}
              <div className="w-full h-full shrink-0 bg-gradient-to-r from-[#1F6BFF] via-[#2563EB] to-[#1D4ED8] p-3.5 flex flex-col justify-center text-white select-none">
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-200">
                  Doctor's Care Special
                </span>
                <h3 className="text-[15px] font-bold text-white leading-tight">
                  Promo banner 1
                </h3>
                <p className="text-[11px] text-blue-100 truncate mt-0.5">
                  Instant 24/7 Video Consultation with BMDC Doctors
                </p>
              </div>

              {/* Promo Banner 2 */}
              <div className="w-full h-full shrink-0 bg-gradient-to-r from-[#0B1E48] via-[#1E3A8A] to-[#1F6BFF] p-3.5 flex flex-col justify-center text-white select-none">
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-200">
                  Specialist Network
                </span>
                <h3 className="text-[15px] font-bold text-white leading-tight">
                  Promo banner 2
                </h3>
                <p className="text-[11px] text-blue-100 truncate mt-0.5">
                  Expert Clinical Advice within 10 Minutes
                </p>
              </div>

              {/* Promo Banner 3 */}
              <div className="w-full h-full shrink-0 bg-gradient-to-r from-[#059669] via-[#047857] to-[#064E3B] p-3.5 flex flex-col justify-center text-white select-none">
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-200">
                  Diagnostic Lab
                </span>
                <h3 className="text-[15px] font-bold text-white leading-tight">
                  Promo banner 3
                </h3>
                <p className="text-[11px] text-emerald-100 truncate mt-0.5">
                  Doorstep Blood Sample Collection & E-Report
                </p>
              </div>

              {/* Promo Banner 4 */}
              <div className="w-full h-full shrink-0 bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#1F6BFF] p-3.5 flex flex-col justify-center text-white select-none">
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-200">
                  Medicine & Rx
                </span>
                <h3 className="text-[15px] font-bold text-white leading-tight">
                  Promo banner 4
                </h3>
                <p className="text-[11px] text-indigo-100 truncate mt-0.5">
                  Digital E-Prescription & Doorstep Medicine
                </p>
              </div>
            </div>

            {/* 4 dots overlaid at bottom center (8px from the bottom) */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 pointer-events-none">
              {[0, 1, 2, 3].map((idx) => (
                <span
                  key={idx}
                  className={`rounded-full transition-all duration-300 ${
                    activeSlide === idx
                      ? 'w-2 h-2 bg-white'
                      : 'w-1.5 h-1.5 bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Full-bleed 8px section divider in #F2F4F7 */}
        <div className="w-full h-2 bg-[#F2F4F7] my-3" />

        {/* 3) "Popular Specialists" ROW
            Header: left title 18px/700; right "View All" 14px, brand blue, underlined.
            Horizontal scroll-snap list, left padding 16px, gap 12px, scrollbar hidden.
            Each card is 300px wide so the next card peeks in from the right.
            Card: 1px #D9DEE7 border, radius 16px, padding 12px, two columns. */}
        <section className="py-2" aria-label="Popular Specialists">
          {/* Header */}
          <div className="px-4 flex items-center justify-between mb-3">
            <h2 className="text-[18px] font-bold text-slate-900 tracking-tight">
              Popular Specialists
            </h2>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('all-specialists-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[14px] text-[#1F6BFF] underline font-medium cursor-pointer"
            >
              View All
            </button>
          </div>

          {/* Horizontal scroll list */}
          <div className="flex gap-3 overflow-x-auto scroll-smooth scrollbar-none px-4 pb-2 snap-x snap-mandatory">
            {popularSpecialists.map((doc) => {
              // Strip "Dr." / "Prof. Dr." prefix for mobile card as specified
              const cleanName = doc.name.replace(/^(Prof\.\s*Dr\.|Dr\.)\s*/i, '');

              return (
                <div
                  key={doc.id}
                  onClick={() => handleSelectDoctor(doc)}
                  className="w-[300px] shrink-0 snap-start bg-white border border-[#D9DEE7] rounded-[16px] p-3 flex gap-3 cursor-pointer shadow-xs hover:border-[#1F6BFF]/50 transition-all select-none"
                >
                  {/* Left Column (84px): photo 84x110, radius 8px, bg #EEF0F3, object-cover; 12px green (#12B886) online dot with 2px white ring; below it "6+ Years" (13px/600) over "Experience" (13px, #6B7280) */}
                  <div className="w-[84px] shrink-0 flex flex-col items-center">
                    <div className="relative w-[84px] h-[110px] rounded-[8px] bg-[#EEF0F3] overflow-hidden">
                      <img
                        src={doc.avatar}
                        alt={cleanName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLElement;
                          target.style.display = 'none';
                        }}
                      />
                      {/* 12px green (#12B886) online dot with a 2px white ring at photo's top-right */}
                      <span className="w-3 h-3 rounded-full bg-[#12B886] ring-2 ring-white absolute top-1.5 right-1.5" />
                    </div>

                    <div className="text-center mt-1.5 w-full">
                      <span className="text-[13px] font-semibold text-slate-900 block leading-tight">
                        {doc.experienceYears}+ Years
                      </span>
                      <span className="text-[13px] text-[#6B7280] block leading-tight">
                        Experience
                      </span>
                    </div>
                  </div>

                  {/* Right Column: name 17px/700; yellow star 16px + 4.9 (15px/700) + (12); speciality chip (white 14px on #1F6BFF with inward notch); price ৳550 20px/700; bottom row "See Expert" (16px/600, brand blue) with chevron-right */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      {/* Name 17px/700 */}
                      <h3 className="text-[17px] font-bold text-slate-900 truncate leading-snug">
                        {cleanName}
                      </h3>

                      {/* Rating row: yellow star 16px + "4.9" (15px/700) + "(12)" */}
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B] shrink-0" />
                        <span className="text-[15px] font-bold text-slate-900 leading-none">
                          {doc.rating.toFixed(1)}
                        </span>
                        <span className="text-[13px] text-[#6B7280] leading-none">
                          ({doc.reviewCount})
                        </span>
                      </div>

                      {/* Speciality chip: white 14px text on #1F6BFF, padding 4px 10px, right edge with an inward notch */}
                      <div
                        style={{
                          clipPath: 'polygon(0 0, 100% 0, 94% 50%, 100% 100%, 0 100%)',
                        }}
                        className="bg-[#1F6BFF] text-white text-[14px] font-medium px-2.5 py-1 inline-block mt-2 pr-4 truncate max-w-full"
                      >
                        {doc.speciality}
                      </div>

                      {/* Price "৳550" 20px/700 */}
                      <div className="text-[20px] font-bold text-slate-900 mt-2">
                        ৳{doc.fee}
                      </div>
                    </div>

                    {/* Bottom row "See Expert" (16px/600, brand blue) with chevron-right pushed to far right */}
                    <div className="flex items-center justify-between text-[#1F6BFF] mt-2 pt-2 border-t border-slate-100">
                      <span className="text-[16px] font-semibold">
                        See Expert
                      </span>
                      <ChevronRight className="w-5 h-5 text-[#1F6BFF]" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Full-bleed 8px section divider in #F2F4F7 */}
        <div className="w-full h-2 bg-[#F2F4F7] my-3" />

        {/* 4) "Your Offers - Instant Consultation (24/7)" ROW
            Title 18px/700, subtitle "Quality care one tap away" 14px #6B7280.
            Horizontal scroll-snap tiles, 106px wide: image box 106x102, radius 8px, soft tinted bg (#E9F1FF, alternate #FCE7F0), doctor cut-out image; caption below (13px/600, max 2 lines, line-clamp-2). Next tile peeks. */}
        <section className="py-2" aria-label="Instant Consultation Offers">
          <div className="px-4 mb-3">
            <h2 className="text-[18px] font-bold text-slate-900 tracking-tight">
              Your Offers - Instant Consultation (24/7)
            </h2>
            <p className="text-[14px] text-[#6B7280] mt-0.5">
              Quality care one tap away
            </p>
          </div>

          <div className="flex gap-3 overflow-x-auto scroll-smooth scrollbar-none px-4 pb-2 snap-x snap-mandatory">
            {OFFER_TILES.map((tile) => (
              <div
                key={tile.id}
                onClick={() => {
                  // Direct to consult with general physician or first online doctor
                  const targetDoc = DOCTORS_DATA[tile.id % DOCTORS_DATA.length];
                  handleSelectDoctor(targetDoc);
                }}
                className="w-[106px] shrink-0 snap-start cursor-pointer group select-none"
              >
                {/* Image box 106x102, radius 8px, soft tinted bg (#E9F1FF, alternate #FCE7F0) */}
                <div
                  className="w-[106px] h-[102px] rounded-[8px] overflow-hidden p-1.5 flex items-center justify-center transition-transform group-hover:scale-105"
                  style={{ backgroundColor: tile.bg }}
                >
                  <img
                    src={tile.img}
                    alt={tile.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-[6px]"
                    onError={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>

                {/* Caption below (13px/600, max 2 lines, line-clamp-2) */}
                <p className="text-[13px] font-semibold text-slate-800 line-clamp-2 mt-1.5 leading-snug">
                  {tile.title}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Full-bleed 8px section divider in #F2F4F7 */}
        <div className="w-full h-2 bg-[#F2F4F7] my-3" />

        {/* ALL SPECIALISTS DIRECTORY (Mobile) */}
        <section id="all-specialists-section" className="px-4 py-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[18px] font-bold text-slate-900 tracking-tight">
              All Specialists
            </h2>
            <span className="text-xs text-[#6B7280]">
              {filteredDoctors.length} found
            </span>
          </div>

          {/* Specialty Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-3 scrollbar-none -mx-4 px-4">
            {SPECIALTY_FILTER_CHIPS.map((chip) => {
              const isActive =
                chip.id === 'all'
                  ? !selectedSpeciality || selectedSpeciality === 'all'
                  : selectedSpeciality.toLowerCase() === chip.id.toLowerCase();
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => {
                    setSelectedSpeciality(chip.id === 'all' ? '' : chip.id);
                  }}
                  className={`min-h-[38px] whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer flex items-center justify-center ${
                    isActive
                      ? 'bg-[#1F6BFF] text-white shadow-xs'
                      : 'bg-white border border-[#D9DEE7] text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>

          {/* Doctor Cards List */}
          <div className="space-y-3">
            {filteredDoctors.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#D9DEE7] p-8 text-center">
                <Stethoscope className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-800">No doctors found</p>
                <p className="text-xs text-slate-500 mt-1">Try another search or filter.</p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-3 px-4 py-2 bg-[#1F6BFF] text-white text-xs font-semibold rounded-xl"
                >
                  Show All
                </button>
              </div>
            ) : (
              filteredDoctors.map((doc) => (
                <DoctorCard
                  key={doc.id}
                  doctor={doc}
                  isSelected={selectedDoctor.id === doc.id}
                  onSelectSlots={handleSelectDoctor}
                />
              ))
            )}
          </div>
        </section>
      </div>

      {/* =========================================================================
          DESKTOP VIEW ONLY (>= 768px): EXACTLY AS BEFORE
          "Desktop (>= 768px) looks exactly as before."
          ========================================================================= */}
      <div className="hidden md:block">
        {/* 1. Header Title & Subtitle */}
        <div className="max-w-[1240px] mx-auto px-6 pt-8 pb-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Find Trusted Clinical Specialists
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Search and book physical or virtual consultation slots with board-certified physicians.
          </p>
        </div>

        {/* 2. Top Unified Search & Specialty Filter Bar */}
        <div className="max-w-[1240px] mx-auto px-6 mb-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-xs flex items-center gap-3">
            {/* Search Input on the left */}
            <div className="relative w-64 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={desktopSearch}
                onChange={(e) => {
                  setDesktopSearch(e.target.value);
                  setSearchQuery(e.target.value);
                }}
                placeholder="Search by name, spec..."
                className="w-full min-h-[42px] bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1F6BFF]/20 focus:bg-white transition-all"
              />
              {desktopSearch && (
                <button
                  type="button"
                  onClick={() => {
                    setDesktopSearch('');
                    setSearchQuery('');
                  }}
                  className="w-8 h-8 absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Specialty Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto w-full pb-1 pt-0.5 scrollbar-none text-xs">
              {SPECIALTY_FILTER_CHIPS.map((chip) => {
                const isActive =
                  chip.id === 'all'
                    ? !selectedSpeciality || selectedSpeciality === 'all'
                    : selectedSpeciality.toLowerCase() === chip.id.toLowerCase();
                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => {
                      setSelectedSpeciality(chip.id === 'all' ? '' : chip.id);
                    }}
                    className={`min-h-[38px] whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer flex items-center justify-center ${
                      isActive
                        ? 'bg-[#1F6BFF] text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:border-[#1F6BFF]/40 hover:bg-slate-50'
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. Main 2-Column Clinical Layout */}
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="grid grid-cols-12 gap-6 items-start">
            {/* Left Column: Doctor Cards List (8 cols) */}
            <div className="col-span-8 space-y-4">
              {filteredDoctors.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center shadow-xs">
                  <Stethoscope className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-900 text-base">
                    No specialists matched your search
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Try clearing the search query or selecting "All Specialties" to view all available board-certified physicians.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="mt-4 px-5 py-2.5 bg-[#1F6BFF] hover:bg-blue-600 text-white text-xs font-semibold rounded-xl shadow-xs transition cursor-pointer min-h-[42px]"
                  >
                    Show All Specialists
                  </button>
                </div>
              ) : (
                filteredDoctors.map((doc) => (
                  <DoctorCard
                    key={doc.id}
                    doctor={doc}
                    isSelected={selectedDoctor.id === doc.id}
                    onSelectSlots={handleSelectDoctor}
                  />
                ))
              )}
            </div>

            {/* Right Column: Sticky Booking Engine Widget (4 cols) */}
            <div className="col-span-4 sticky top-24">
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
                {renderBookingForm(false)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MOBILE / TABLET TOUCH BOTTOM SHEET DRAWER
          Opens when user taps "See Expert" or "Select Slots" on mobile screens.
          ========================================================================= */}
      {mobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 p-0 sm:p-4">
          {/* Backdrop click area */}
          <div
            className="absolute inset-0"
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Drawer Container with 20px top corners */}
          <div className="relative z-10 bg-white w-full sm:max-w-md rounded-t-[20px] sm:rounded-[20px] max-h-[88vh] overflow-y-auto p-5 sm:p-6 shadow-2xl space-y-3">
            {/* Native Mobile Pull Handle */}
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-2 sm:hidden" />

            {/* Booking Form inside Mobile Sheet */}
            {renderBookingForm(true)}
          </div>
        </div>
      )}
    </div>
  );
};
