import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Star,
  CheckCircle2,
  Building2,
  Clock,
  ShieldCheck,
  Video,
  Phone,
  MessageSquare,
  Calendar,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  ArrowLeft,
  Award,
  FileText,
  Sparkles,
  MapPin,
  Check,
  User,
  CreditCard,
  Lock,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DOCTORS_DATA } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { Appointment } from '../types';

export const DoctorProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser, addAppointment, showToast } = useApp();

  const doctor = DOCTORS_DATA.find((d) => d.id === id) || DOCTORS_DATA[0];

  const [activeTab, setActiveTab] = useState<'info' | 'experience' | 'reviews'>('info');
  const [lang, setLang] = useState<'en' | 'bn'>('en');

  // Professional Booking Engine State
  const [consultationType, setConsultationType] = useState<'video' | 'audio' | 'chat'>('video');
  const [selectedLocation, setSelectedLocation] = useState<'video' | 'square' | 'evercare' | 'labaid'>('video');

  const getIsoDate = (offsetDays = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split('T')[0];
  };

  const [consultationDate, setConsultationDate] = useState<string>(getIsoDate(0));
  const [selectedSlot, setSelectedSlot] = useState<string>('10:30 AM');

  // Custom interactive calendar picker state
  const dateInputRef = useRef<HTMLInputElement>(null);
  const calendarDropdownRef = useRef<HTMLDivElement>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calendarYear, setCalendarYear] = useState(() => {
    const d = new Date();
    return d.getFullYear();
  });
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const d = new Date();
    return d.getMonth();
  });

  // Close calendar dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarDropdownRef.current &&
        !calendarDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };
    if (isCalendarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCalendarOpen]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const handlePrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear((y) => y - 1);
    } else {
      setCalendarMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear((y) => y + 1);
    } else {
      setCalendarMonth((m) => m + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const m = String(calendarMonth + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    setConsultationDate(`${calendarYear}-${m}-${d}`);
    setIsCalendarOpen(false);
  };

  const isPastDate = (day: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(calendarYear, calendarMonth, day);
    return target < today;
  };

  const isSelectedDate = (day: number) => {
    const m = String(calendarMonth + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return consultationDate === `${calendarYear}-${m}-${d}`;
  };

  const isTodayDate = (day: number) => {
    const today = new Date();
    return (
      today.getFullYear() === calendarYear &&
      today.getMonth() === calendarMonth &&
      today.getDate() === day
    );
  };

  const handleOpenDatePicker = () => {
    setIsCalendarOpen((prev) => !prev);
  };

  const formatDisplayDate = (isoStr: string) => {
    try {
      const parts = isoStr.split('-');
      if (parts.length === 3) {
        const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        return d.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
      }
      return isoStr;
    } catch {
      return isoStr;
    }
  };

  // Patient Info
  const [isFamilyMember, setIsFamilyMember] = useState(false);
  const [patientName, setPatientName] = useState(currentUser?.name || 'Rafiq Ahmed');
  const [patientPhone, setPatientPhone] = useState(currentUser?.phone || '01711223344');
  const [patientAge, setPatientAge] = useState<number | string>(35);
  const [patientGender, setPatientGender] = useState<'male' | 'female' | 'other'>('male');
  const [relationship, setRelationship] = useState<'Self' | 'Spouse' | 'Child' | 'Parent' | 'Other'>('Self');
  const [symptoms, setSymptoms] = useState('');
  const [paymentGateway, setPaymentGateway] = useState<'bKash' | 'Nagad' | 'Card'>('bKash');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Secure Token for HIPAA session
  const [sessionToken] = useState(() => {
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `TOKEN #SEC-2026-${rand}`;
  });

  const getLocationFee = () => {
    switch (selectedLocation) {
      case 'video': return 799;
      case 'square': return 1200;
      case 'evercare': return 1500;
      case 'labaid': return 1000;
      default: return doctor.fee;
    }
  };

  const currentFee = getLocationFee();

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) {
      showToast('Please enter required patient details', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const newAptId = 'APT-' + Math.floor(100000 + Math.random() * 900000);
      const appointment: Appointment = {
        id: newAptId,
        doctorId: doctor.id,
        doctorName: doctor.name,
        doctorSpeciality: doctor.speciality,
        doctorAvatar: doctor.avatar,
        doctorBmdc: doctor.bmdcNumber,
        patient: {
          name: isFamilyMember ? `${patientName} (${relationship})` : patientName,
          age: Number(patientAge),
          gender: patientGender,
          relationship: isFamilyMember ? relationship : 'Self',
          phone: patientPhone,
          symptoms: symptoms || 'General consultation',
        },
        date: formatDisplayDate(consultationDate),
        time: selectedSlot,
        consultationType,
        fee: currentFee,
        paymentMethod: paymentGateway,
        paymentStatus: 'paid',
        status: 'upcoming',
        createdAt: new Date().toISOString(),
      };

      addAppointment(appointment);
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      showToast('Appointment successfully confirmed!', 'success');
      navigate(`/room/${newAptId}?doctor=${doctor.id}`);
    }, 1200);
  };

  const sampleReviews = [
    { id: 1, patientName: 'Kazi M. Rahman', date: '3 days ago', rating: 5, comment: 'Very patient and listened thoroughly to my symptoms. The digital prescription came right after the call.' },
    { id: 2, patientName: 'Shabana Yasmin', date: '1 week ago', rating: 5, comment: 'Consulted for blood sugar and diet. Highly recommended! Doctor gave clear practical guidance.' },
    { id: 3, patientName: 'Anisul Huq', date: '2 weeks ago', rating: 5, comment: 'Prompt video connection. Professional BMDC doctor who explained the lab test reports clearly.' },
  ];

  const conditionsEn = [
    'Type 2 diabetes',
    'Gestational diabetes',
    'Thyroid disorders',
    'Pregnancy-related thyroid problems',
    'Obesity and weight management',
    'Low energy and weakness',
    'High cholesterol',
    'PCOS and irregular periods',
    'Hormone-related infertility',
    'Osteoporosis',
  ];

  const conditionsBn = [
    '১. ডায়াবেটিস (Diabetes)',
    '২. গর্ভকালীন ডায়াবেটিস (Gestational Diabetes)',
    '৩. থাইরয়েড সমস্যা (Thyroid Disorders)',
    '৪. গর্ভকালীন থাইরয়েড (Gestational Thyroid)',
    '৫. অতিরিক্ত মোটা হওয়া (Obesity & Weight Management)',
    '৬. যৌন দুর্বলতা ও অক্ষ্মতা, দ্রুত বীর্যপাত',
    '৭. রক্তের চর্বি বা কোলেস্টেরল (Cholesterol)',
    '৮. মহিলাদের মুখে লোম, অনিয়মিত মাসিক (PCOS)',
    '৯. হরমোন জনিত বন্ধ্যাত্ব (Hormonal Infertility)',
    '১০. হাড়ের ক্ষয় (Osteoporosis)',
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 font-['Poppins',sans-serif] text-slate-800 pb-32">
      {/* Top Navigation / Breadcrumb */}
      <div className="bg-white border-b border-slate-200/80 py-3.5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Doctors Roster</span>
          </button>
          <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-medium border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Secure Medical Consultation Portal</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Doctor Profile & Clinical Details (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Doctor Profile Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-2xs">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="relative shrink-0 mx-auto sm:mx-0">
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    referrerPolicy="no-referrer"
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover bg-slate-100 border border-slate-200 shadow-xs"
                  />
                  <span className="absolute bottom-2 right-2 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full border-2 border-white shadow-xs">
                    Online
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-md">
                      {doctor.speciality}
                    </span>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                      BMDC: {doctor.bmdcNumber}
                    </span>
                  </div>

                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                    {doctor.name.startsWith('Dr.') ? doctor.name : `Dr. ${doctor.name}`}
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    {doctor.degrees}
                  </p>

                  <div className="mt-3 flex items-center gap-4 text-xs text-slate-600 flex-wrap pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-1 font-bold text-slate-900">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>{doctor.rating.toFixed(1)}</span>
                      <span className="text-slate-400 font-normal">({doctor.reviewCount} reviews)</span>
                    </div>
                    <span>·</span>
                    <span className="font-semibold text-slate-800">{doctor.experienceYears}+ Years Exp</span>
                    <span>·</span>
                    <span className="text-slate-600">{doctor.hospital}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-1.5 flex items-center gap-2 shadow-2xs">
              <button
                type="button"
                onClick={() => setActiveTab('info')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'info' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                About & Expertise
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('experience')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'experience' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Experience & Training
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('reviews')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'reviews' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Patient Reviews
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'info' && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-2xs space-y-4">
                  <h2 className="text-base font-bold text-slate-950 flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>Professional Background</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {doctor.about} Specialized in evidence-based medicine and advanced clinical care protocols with patient-first empathy.
                  </p>
                </div>

                {/* At a Glance Card */}
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-2xs space-y-5">
                  <h3 className="text-base font-bold text-slate-950">At a Glance</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-5 border-b border-slate-100 text-xs">
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                      <span className="text-slate-400 block uppercase text-[10px] font-semibold">Instant Consultation</span>
                      <span className="font-bold text-slate-900">Sat – Thu (9:00 AM – 11:00 PM)</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                      <span className="text-slate-400 block uppercase text-[10px] font-semibold">Follow-Up Privilege</span>
                      <span className="font-bold text-emerald-700">Free within 14 days</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center text-xs">
                    <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                      <span className="text-slate-400 block text-[10px]">Attended</span>
                      <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">266+</span>
                    </div>
                    <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                      <span className="text-slate-400 block text-[10px]">Doctor Code</span>
                      <span className="font-extrabold text-emerald-700 text-sm mt-0.5 block">DT9076</span>
                    </div>
                    <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                      <span className="text-slate-400 block text-[10px]">Session Time</span>
                      <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">20 mins</span>
                    </div>
                  </div>
                </div>

                {/* Conditions Treated */}
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-950">Conditions Treated</h3>
                    <div className="flex items-center bg-slate-100 rounded-lg p-0.5 text-xs">
                      <button
                        type="button"
                        onClick={() => setLang('en')}
                        className={`px-3 py-1 rounded-md font-semibold transition cursor-pointer ${lang === 'en' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-600'}`}
                      >
                        English
                      </button>
                      <button
                        type="button"
                        onClick={() => setLang('bn')}
                        className={`px-3 py-1 rounded-md font-semibold transition cursor-pointer ${lang === 'bn' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-600'}`}
                      >
                        বাংলা
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {(lang === 'en' ? conditionsEn : conditionsBn).map((cond, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-medium text-slate-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        <span>{cond}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-2xs space-y-4">
                <h3 className="text-base font-bold text-slate-950">Clinical Credentials</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Registered with the Bangladesh Medical and Dental Council (BMDC). Over 11 years of active hospital and telehealth practice.
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-2xs space-y-4">
                <h3 className="text-base font-bold text-slate-950">Verified Patient Reviews</h3>
                <div className="space-y-3">
                  {sampleReviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-slate-900">{rev.patientName}</span>
                        <span className="text-slate-400">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />
                        ))}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        &quot;{rev.comment}&quot;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Professional Booking Engine Widget (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 self-start bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-[0_16px_45px_-8px_rgba(5,150,105,0.08),0_4px_16px_rgba(15,23,42,0.04)] overflow-hidden transition-all duration-300 hover:shadow-[0_20px_55px_-8px_rgba(5,150,105,0.12)]">
              
              {/* Premium Floating Header */}
              <div className="relative bg-gradient-to-br from-[#064e3b] via-[#047857] to-[#059669] p-5 text-white overflow-hidden">
                {/* Background decorative light glow */}
                <div className="absolute -top-12 -right-12 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-emerald-300/20 rounded-full blur-xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/25">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                      Instant Booking Desk
                    </span>
                    <span className="text-[10px] font-bold text-emerald-100 bg-emerald-950/40 px-2 py-0.5 rounded-md border border-white/10">
                      BMDC: {doctor.bmdcNumber}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-white">
                        Book {doctor.name.startsWith('Dr.') ? doctor.name : `Dr. ${doctor.name}`}
                      </h2>
                      <p className="text-[11px] text-emerald-100/90 mt-0.5 font-medium flex items-center gap-1">
                        <span>{doctor.speciality}</span>
                        <span>•</span>
                        <span className="text-emerald-200 font-semibold">Ready to connect</span>
                      </p>
                    </div>

                    {/* Live Fee Badge */}
                    <div className="text-right shrink-0 bg-white/15 backdrop-blur-xs px-3 py-1.5 rounded-2xl border border-white/20">
                      <span className="block text-[9px] uppercase tracking-wider text-emerald-100 font-bold">Total Fee</span>
                      <span className="text-base sm:text-lg font-black text-white">৳{currentFee}</span>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleConfirmBooking} className="p-5 sm:p-6 space-y-5">
                
                {/* 1. Select Location / Mode */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-emerald-600" />
                      <span>1. Select Consultation Mode</span>
                    </label>
                    <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      ⚡ Instant Access
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {/* Video Consultation (Default/Primary) */}
                    <div
                      onClick={() => setSelectedLocation('video')}
                      className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                        selectedLocation === 'video'
                          ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-2 ring-emerald-500/10'
                          : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          selectedLocation === 'video' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-500'
                        }`}>
                          <Video className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="text-xs font-bold text-slate-900">HD Video Consultation</p>
                            <span className="text-[9px] font-extrabold bg-emerald-600 text-white px-1.5 py-0.2 rounded-full">
                              POPULAR
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500">Video call + Digital Prescription in App</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-black text-emerald-700">৳799</span>
                        <span className="block text-[9px] text-emerald-600 font-semibold">Instant Call</span>
                      </div>
                    </div>

                    {/* Physical Chamber: Square Hospital */}
                    <div
                      onClick={() => setSelectedLocation('square')}
                      className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                        selectedLocation === 'square'
                          ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-2 ring-emerald-500/10'
                          : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          selectedLocation === 'square' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-500'
                        }`}>
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">Square Hospital Chamber</p>
                          <p className="text-[10px] text-slate-500">Panthapath, Dhaka (Room 402)</p>
                        </div>
                      </div>
                      <span className="text-xs font-black text-slate-900">৳1200</span>
                    </div>

                    {/* Physical Chamber: Evercare Hospital */}
                    <div
                      onClick={() => setSelectedLocation('evercare')}
                      className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                        selectedLocation === 'evercare'
                          ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-2 ring-emerald-500/10'
                          : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          selectedLocation === 'evercare' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-500'
                        }`}>
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">Evercare Hospital Chamber</p>
                          <p className="text-[10px] text-slate-500">Bashundhara R/A, Dhaka</p>
                        </div>
                      </div>
                      <span className="text-xs font-black text-slate-900">৳1500</span>
                    </div>
                  </div>
                </div>

                {/* 2. Enhanced Custom Interactive Calendar Picker Widget */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      <span>2. Select Consultation Date</span>
                    </label>
                    <span className="text-[11px] font-bold text-emerald-700">
                      {formatDisplayDate(consultationDate)}
                    </span>
                  </div>

                  {/* Quick Date Selector Pills */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setConsultationDate(getIsoDate(0));
                        setIsCalendarOpen(false);
                      }}
                      className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center cursor-pointer ${
                        consultationDate === getIsoDate(0)
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-700 shadow-2xs ring-1 ring-emerald-500/30'
                          : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <span>Today</span>
                      <span className="text-[10px] font-normal opacity-75">
                        {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setConsultationDate(getIsoDate(1));
                        setIsCalendarOpen(false);
                      }}
                      className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center cursor-pointer ${
                        consultationDate === getIsoDate(1)
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-700 shadow-2xs ring-1 ring-emerald-500/30'
                          : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <span>Tomorrow</span>
                      <span className="text-[10px] font-normal opacity-75">
                        {new Date(Date.now() + 86400000).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setConsultationDate(getIsoDate(2));
                        setIsCalendarOpen(false);
                      }}
                      className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center cursor-pointer ${
                        consultationDate === getIsoDate(2)
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-700 shadow-2xs ring-1 ring-emerald-500/30'
                          : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300'
                      }`}
                    >
                      <span>In 2 Days</span>
                      <span className="text-[10px] font-normal opacity-75">
                        {new Date(Date.now() + 172800000).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                      </span>
                    </button>
                  </div>

                  {/* Interactive Calendar Trigger & Overlay Dropdown */}
                  <div className="relative" ref={calendarDropdownRef}>
                    <div
                      onClick={handleOpenDatePicker}
                      className={`flex items-center gap-3 w-full border rounded-2xl p-3 transition-all shadow-2xs cursor-pointer select-none ${
                        isCalendarOpen
                          ? 'border-emerald-600 bg-white ring-2 ring-emerald-500/20'
                          : 'bg-slate-50/80 border-slate-200/90 hover:border-emerald-500 hover:bg-white'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/60 shadow-2xs">
                        <CalendarDays className="w-5 h-5 text-emerald-600" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                          Custom Calendar Selection
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                            {formatDisplayDate(consultationDate)}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDatePicker();
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 shadow-2xs cursor-pointer ${
                          isCalendarOpen
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:text-emerald-700 hover:border-emerald-300'
                        }`}
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-bold">{isCalendarOpen ? 'Done' : 'Change Date'}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCalendarOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {/* Interactive Dropdown Calendar Widget with Disabled Past Dates */}
                    {isCalendarOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white/98 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
                        {/* Month Header & Controls */}
                        <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-100">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePrevMonth();
                            }}
                            className="w-8 h-8 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-600 transition hover:border-emerald-500 cursor-pointer"
                            aria-label="Previous month"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>

                          <div className="text-center">
                            <span className="text-xs font-extrabold text-slate-900">
                              {monthNames[calendarMonth]} {calendarYear}
                            </span>
                            <span className="block text-[9px] text-slate-400 font-medium">
                              Select an available day
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNextMonth();
                              }}
                              className="w-8 h-8 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center text-slate-600 transition hover:border-emerald-500 cursor-pointer"
                              aria-label="Next month"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsCalendarOpen(false);
                              }}
                              className="w-8 h-8 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 ml-1 transition cursor-pointer"
                              aria-label="Close calendar"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Weekday Labels */}
                        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 mb-1.5 uppercase">
                          <span className="text-rose-500">Su</span>
                          <span>Mo</span>
                          <span>Tu</span>
                          <span>We</span>
                          <span>Th</span>
                          <span>Fr</span>
                          <span>Sa</span>
                        </div>

                        {/* Days Grid */}
                        <div className="grid grid-cols-7 gap-1 text-center">
                          {/* Empty offset days */}
                          {Array.from({ length: new Date(calendarYear, calendarMonth, 1).getDay() }).map((_, i) => (
                            <div key={`empty-${i}`} className="w-7 h-7 sm:w-8 sm:h-8" />
                          ))}

                          {/* Day buttons with past-date disabled logic */}
                          {Array.from({ length: new Date(calendarYear, calendarMonth + 1, 0).getDate() }).map((_, i) => {
                            const day = i + 1;
                            const isPast = isPastDate(day);
                            const isSelected = isSelectedDate(day);
                            const isToday = isTodayDate(day);

                            return (
                              <button
                                key={`day-${day}`}
                                type="button"
                                disabled={isPast}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectDay(day);
                                }}
                                className={`w-7 h-7 sm:w-8 sm:h-8 mx-auto rounded-xl text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black shadow-md shadow-emerald-500/30 scale-105 ring-2 ring-emerald-300'
                                    : isPast
                                    ? 'text-slate-300 cursor-not-allowed line-through bg-slate-50/50'
                                    : isToday
                                    ? 'border border-emerald-600 text-emerald-700 font-bold bg-emerald-50/50 hover:bg-emerald-100'
                                    : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:scale-105 active:scale-95'
                                }`}
                                title={isPast ? 'Past date cannot be booked' : `Select ${monthNames[calendarMonth]} ${day}, ${calendarYear}`}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>

                        {/* Footer Quick Links */}
                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setConsultationDate(getIsoDate(0));
                              setIsCalendarOpen(false);
                            }}
                            className="font-bold text-emerald-700 hover:underline cursor-pointer"
                          >
                            Jump to Today
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setConsultationDate(getIsoDate(1));
                              setIsCalendarOpen(false);
                            }}
                            className="font-semibold text-slate-600 hover:text-emerald-700 cursor-pointer"
                          >
                            Select Tomorrow
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsCalendarOpen(false);
                            }}
                            className="font-bold text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-0.5 rounded-lg transition cursor-pointer"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 3. Consultation Slots as Interactive Pills */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>3. Select Consultation Slot</span>
                    </label>
                    <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      5 Slots Open
                    </span>
                  </div>

                  {/* Slot Pills Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {/* Booked Slot 1 */}
                    <button
                      type="button"
                      disabled
                      className="py-2.5 px-3.5 rounded-full border border-slate-200/70 bg-slate-100/80 text-slate-400 text-xs font-medium cursor-not-allowed line-through flex items-center justify-between opacity-70 select-none"
                      title="This slot is already booked by another patient"
                    >
                      <div className="flex items-center gap-1.5">
                        <Lock className="w-3 h-3 opacity-60" />
                        <span>09:00 AM</span>
                      </div>
                      <span className="text-[9px] font-normal uppercase opacity-75">Booked</span>
                    </button>

                    {/* Available Slot 2 */}
                    <button
                      type="button"
                      onClick={() => setSelectedSlot('10:30 AM')}
                      className={`py-2.5 px-3.5 rounded-full text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                        selectedSlot === '10:30 AM'
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/25 ring-2 ring-emerald-400/50 scale-[1.02]'
                          : 'border border-slate-200/90 text-slate-700 bg-slate-50/70 hover:border-emerald-500 hover:bg-emerald-50/30 hover:text-emerald-700 hover:scale-[1.01] active:scale-[0.98]'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Clock className={`w-3.5 h-3.5 ${selectedSlot === '10:30 AM' ? 'text-white' : 'text-slate-400'}`} />
                        <span>10:30 AM</span>
                      </div>
                      {selectedSlot === '10:30 AM' ? (
                        <span className="w-4 h-4 rounded-full bg-white text-emerald-700 flex items-center justify-center text-[10px] shadow-xs">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-slate-400">Morning</span>
                      )}
                    </button>

                    {/* Available Slot 3 */}
                    <button
                      type="button"
                      onClick={() => setSelectedSlot('11:45 AM')}
                      className={`py-2.5 px-3.5 rounded-full text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                        selectedSlot === '11:45 AM'
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/25 ring-2 ring-emerald-400/50 scale-[1.02]'
                          : 'border border-slate-200/90 text-slate-700 bg-slate-50/70 hover:border-emerald-500 hover:bg-emerald-50/30 hover:text-emerald-700 hover:scale-[1.01] active:scale-[0.98]'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Clock className={`w-3.5 h-3.5 ${selectedSlot === '11:45 AM' ? 'text-white' : 'text-slate-400'}`} />
                        <span>11:45 AM</span>
                      </div>
                      {selectedSlot === '11:45 AM' ? (
                        <span className="w-4 h-4 rounded-full bg-white text-emerald-700 flex items-center justify-center text-[10px] shadow-xs">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-slate-400">Morning</span>
                      )}
                    </button>

                    {/* Booked Slot 4 */}
                    <button
                      type="button"
                      disabled
                      className="py-2.5 px-3.5 rounded-full border border-slate-200/70 bg-slate-100/80 text-slate-400 text-xs font-medium cursor-not-allowed line-through flex items-center justify-between opacity-70 select-none"
                      title="This slot is already booked by another patient"
                    >
                      <div className="flex items-center gap-1.5">
                        <Lock className="w-3 h-3 opacity-60" />
                        <span>04:00 PM</span>
                      </div>
                      <span className="text-[9px] font-normal uppercase opacity-75">Booked</span>
                    </button>

                    {/* Available Slot 5 */}
                    <button
                      type="button"
                      onClick={() => setSelectedSlot('05:30 PM')}
                      className={`py-2.5 px-3.5 rounded-full text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                        selectedSlot === '05:30 PM'
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/25 ring-2 ring-emerald-400/50 scale-[1.02]'
                          : 'border border-slate-200/90 text-slate-700 bg-slate-50/70 hover:border-emerald-500 hover:bg-emerald-50/30 hover:text-emerald-700 hover:scale-[1.01] active:scale-[0.98]'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Clock className={`w-3.5 h-3.5 ${selectedSlot === '05:30 PM' ? 'text-white' : 'text-slate-400'}`} />
                        <span>05:30 PM</span>
                      </div>
                      {selectedSlot === '05:30 PM' ? (
                        <span className="w-4 h-4 rounded-full bg-white text-emerald-700 flex items-center justify-center text-[10px] shadow-xs">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-slate-400">Evening</span>
                      )}
                    </button>

                    {/* Available Slot 6 */}
                    <button
                      type="button"
                      onClick={() => setSelectedSlot('07:00 PM')}
                      className={`py-2.5 px-3.5 rounded-full text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                        selectedSlot === '07:00 PM'
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/25 ring-2 ring-emerald-400/50 scale-[1.02]'
                          : 'border border-slate-200/90 text-slate-700 bg-slate-50/70 hover:border-emerald-500 hover:bg-emerald-50/30 hover:text-emerald-700 hover:scale-[1.01] active:scale-[0.98]'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Clock className={`w-3.5 h-3.5 ${selectedSlot === '07:00 PM' ? 'text-white' : 'text-slate-400'}`} />
                        <span>07:00 PM</span>
                      </div>
                      {selectedSlot === '07:00 PM' ? (
                        <span className="w-4 h-4 rounded-full bg-white text-emerald-700 flex items-center justify-center text-[10px] shadow-xs">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-slate-400">Evening</span>
                      )}
                    </button>
                  </div>
                </div>

                {/* 4. Grouped Patient Details Form Fields with Sleek Floating Input Labels */}
                <div className="space-y-3.5 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-emerald-600" />
                      <span>4. Patient Details</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsFamilyMember(!isFamilyMember)}
                      className="text-[11px] font-bold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      <span>{isFamilyMember ? 'Book for Myself' : '+ Book for Family'}</span>
                    </button>
                  </div>

                  {/* Grouped Fields Container */}
                  <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 space-y-3 shadow-2xs">
                    
                    {/* Relationship selector when booking for family */}
                    {isFamilyMember && (
                      <div className="space-y-1.5 pb-2 border-b border-slate-200/60">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                          Patient Relationship to You
                        </span>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {(['Spouse', 'Child', 'Parent', 'Other'] as const).map((rel) => (
                            <button
                              key={rel}
                              type="button"
                              onClick={() => setRelationship(rel)}
                              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                                relationship === rel
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                              }`}
                            >
                              {rel}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Floating Label Field 1: Patient Full Name */}
                    <div className="relative group">
                      <input
                        id="patientName"
                        type="text"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder=" "
                        required
                        className="peer block w-full px-3.5 pt-5 pb-2 text-xs font-semibold text-slate-900 bg-white border border-slate-200 rounded-xl focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 focus:outline-none transition-all shadow-2xs placeholder-transparent"
                      />
                      <label
                        htmlFor="patientName"
                        className="absolute text-[11px] font-semibold text-slate-400 duration-150 transform -translate-y-2.5 scale-90 top-3.5 z-10 origin-[0] left-3.5 pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-slate-400 peer-placeholder-shown:text-xs peer-focus:scale-90 peer-focus:-translate-y-2.5 peer-focus:text-emerald-700"
                      >
                        Patient Full Name *
                      </label>
                    </div>

                    {/* Floating Label Field 2: Mobile Number with Flag Badge */}
                    <div className="relative group">
                      <div className="absolute left-3.5 top-3.5 z-10 flex items-center gap-1 text-[11px] font-bold text-slate-500 pt-0.5 pointer-events-none">
                        <span>🇧🇩</span>
                        <span>+880</span>
                      </div>
                      <input
                        id="patientPhone"
                        type="tel"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        placeholder=" "
                        required
                        className="peer block w-full pl-20 pr-3.5 pt-5 pb-2 text-xs font-semibold text-slate-900 bg-white border border-slate-200 rounded-xl focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 focus:outline-none transition-all shadow-2xs placeholder-transparent"
                      />
                      <label
                        htmlFor="patientPhone"
                        className="absolute text-[11px] font-semibold text-slate-400 duration-150 transform -translate-y-2.5 scale-90 top-3.5 z-10 origin-[0] left-20 pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-slate-400 peer-placeholder-shown:text-xs peer-focus:scale-90 peer-focus:-translate-y-2.5 peer-focus:text-emerald-700"
                      >
                        Mobile Number (e.g. 01711223344) *
                      </label>
                    </div>

                    {/* 2-Column Row: Age & Gender */}
                    <div className="grid grid-cols-2 gap-2.5">
                      {/* Floating Label Field 3: Patient Age */}
                      <div className="relative group">
                        <input
                          id="patientAge"
                          type="number"
                          min={1}
                          max={120}
                          value={patientAge}
                          onChange={(e) => setPatientAge(e.target.value)}
                          placeholder=" "
                          required
                          className="peer block w-full px-3.5 pt-5 pb-2 text-xs font-semibold text-slate-900 bg-white border border-slate-200 rounded-xl focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 focus:outline-none transition-all shadow-2xs placeholder-transparent"
                        />
                        <label
                          htmlFor="patientAge"
                          className="absolute text-[11px] font-semibold text-slate-400 duration-150 transform -translate-y-2.5 scale-90 top-3.5 z-10 origin-[0] left-3.5 pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-slate-400 peer-placeholder-shown:text-xs peer-focus:scale-90 peer-focus:-translate-y-2.5 peer-focus:text-emerald-700"
                        >
                          Age (Years) *
                        </label>
                      </div>

                      {/* Gender Selector Segment */}
                      <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
                        {(['male', 'female'] as const).map((gen) => (
                          <button
                            key={gen}
                            type="button"
                            onClick={() => setPatientGender(gen)}
                            className={`flex-1 py-2 rounded-lg text-[11px] font-bold capitalize transition-all cursor-pointer ${
                              patientGender === gen
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                            }`}
                          >
                            {gen}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Floating Label Field 4: Symptoms & Notes */}
                    <div className="relative group">
                      <textarea
                        id="symptoms"
                        rows={2}
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        placeholder=" "
                        className="peer block w-full px-3.5 pt-5 pb-2 text-xs font-medium text-slate-900 bg-white border border-slate-200 rounded-xl focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 focus:outline-none transition-all shadow-2xs placeholder-transparent resize-none"
                      />
                      <label
                        htmlFor="symptoms"
                        className="absolute text-[11px] font-semibold text-slate-400 duration-150 transform -translate-y-2.5 scale-90 top-3.5 z-10 origin-[0] left-3.5 pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-slate-400 peer-placeholder-shown:text-xs peer-focus:scale-90 peer-focus:-translate-y-2.5 peer-focus:text-emerald-700"
                      >
                        Symptoms or Medical Notes (Optional)
                      </label>
                    </div>
                  </div>
                </div>

                {/* 5. Payment Gateway */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                      <span>5. Payment Method</span>
                    </label>
                    <span className="text-[10px] text-slate-500 font-medium">Instant & Zero Extra Charge</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(['bKash', 'Nagad', 'Card'] as const).map((gw) => (
                      <button
                        key={gw}
                        type="button"
                        onClick={() => setPaymentGateway(gw)}
                        className={`py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          paymentGateway === gw
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-700 shadow-xs ring-1 ring-emerald-500/30'
                            : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-50'
                        }`}
                      >
                        {gw === 'Card' ? <CreditCard className="w-3.5 h-3.5" /> : null}
                        <span>{gw}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 6. Crisp Secure Token & HIPAA Privacy Badge Next to the Final Checkout CTA */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50/80 via-teal-50/40 to-slate-50 border border-emerald-200/90 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-extrabold text-slate-900">HIPAA & BMDC Compliant</span>
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full border border-emerald-300">
                          Verified
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium">
                        256-Bit SSL End-to-End Encrypted Health Records
                      </p>
                    </div>
                  </div>

                  {/* Crisp Secure Token Badge */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-slate-700 shadow-2xs text-[10px] font-mono font-bold shrink-0">
                    <Lock className="w-3 h-3 text-emerald-600" />
                    <span className="text-slate-400">SESSION:</span>
                    <span className="text-emerald-700">{sessionToken}</span>
                  </div>
                </div>

                {/* Final Checkout CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-filled w-full py-4 text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/25 flex items-center justify-between px-5 transition-all group disabled:opacity-75 disabled:cursor-wait cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-200 group-hover:rotate-12 transition-transform" />
                    <span>{isSubmitting ? 'Securing Consultation Slot...' : 'Confirm & Book Appointment'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-xl text-xs font-black">
                    <span>৳{currentFee}</span>
                    <span className="text-[10px] font-normal opacity-90">Pay Now →</span>
                  </div>
                </button>

                {/* Post-CTA Assurance Note */}
                <p className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span>Free follow-up consultation within 14 days • 100% money-back guarantee</span>
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
