import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import {
  Download,
  Share2,
  Printer,
  ShoppingBag,
  ArrowLeft,
  Activity,
  ShieldCheck,
  Calendar,
  AlertCircle,
  FlaskConical,
  CheckCircle2,
  Stethoscope,
  Heart,
  Thermometer,
  Clock,
  Copy,
  ExternalLink,
  Lock,
  Phone,
  Mail,
  User,
  Sparkles,
} from 'lucide-react';
import { DOCTORS_DATA } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { Prescription } from '../types';

export const PrescriptionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUser, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  const doctorId = searchParams.get('doctor') || 'doc-2';
  const doctor = DOCTORS_DATA.find((d) => d.id === doctorId) || DOCTORS_DATA[1];

  const prescription: Prescription = {
    id: id || 'RX-78921',
    appointmentId: 'APT-90412',
    doctorId: doctor.id,
    doctorName: doctor.name,
    doctorDegrees: doctor.degrees || 'MBBS (DMC), FCPS (Medicine), MD (Cardiology)',
    doctorBmdc: doctor.bmdcNumber || 'A-68421',
    doctorHospital: doctor.hospital || 'Dhaka Medical College & Hospital',
    patientName: currentUser?.name || 'Rafiq Ahmed',
    patientAge: 38,
    patientGender: 'Male',
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    diagnosis: 'Acute Viral Pyrexia with seasonal upper respiratory tract infection (Rule out Dengue / Chikungunya)',
    vitals: {
      bloodPressure: '120/80 mmHg',
      temperature: '101.4 °F',
      pulse: '78 bpm',
      weight: '72 kg',
    },
    medicines: [
      {
        medicineName: 'Tab. Napa Extra',
        strength: 'Paracetamol 500mg + Caffeine 65mg',
        dosage: '1 + 0 + 1',
        duration: '5 Days (10 Tabs)',
        instruction: 'Take orally after meals when temperature is above 100°F. Do not exceed 4 tablets in 24 hours (ভরা পেটে সেব্য)',
      },
      {
        medicineName: 'Tab. Fexo',
        strength: 'Fexofenadine HCl 120mg',
        dosage: '0 + 0 + 1',
        duration: '7 Days (7 Tabs)',
        instruction: 'Take orally at night after dinner for runny nose, nasal congestion, and sneezing (রাতে খাবার পর)',
      },
      {
        medicineName: 'Cap. Maxpro',
        strength: 'Esomeprazole Magnesium 20mg',
        dosage: '1 + 0 + 1',
        duration: '7 Days (14 Caps)',
        instruction: 'Take orally 20 minutes before breakfast & dinner with a glass of water (খাবার ২০ মি. আগে সেব্য)',
      },
      {
        medicineName: 'Oral Rehydration Solution (ORS Saline)',
        strength: 'Electrolyte Salts 500ml pack',
        dosage: 'As Needed',
        duration: '4 Days (6 Packs)',
        instruction: 'Dissolve 1 sachet in 500ml boiled cooled drinking water; sip frequently during the day (প্রয়োজনমতো বারবার খাবেন)',
      },
      {
        medicineName: 'Syr. Tusca Plus',
        strength: 'Dextromethorphan HBr 10mg / 5ml',
        dosage: '2 Tsp (10ml)',
        duration: '5 Days (1 Bottle)',
        instruction: 'Take 2 teaspoons 3 times daily after meals for persistent dry irritating cough (কাশি হলে খাবেন)',
      },
    ],
    investigations: [
      'Complete Blood Count (CBC) with Platelet Count & ESR (Urgent)',
      'Dengue NS1 Antigen & Dengue IgM/IgG (if fever persists > 72 hours)',
      'Serum Creatinine & SGPT (ALT) (Baseline safety)',
      'Routine Urine Analysis (R/M/E)',
    ],
    advice: [
      'Hydration: Drink at least 2.5 to 3.0 liters of clean boiled water, fresh fruit juice, or green coconut water daily.',
      'Bed Rest: Strict complete physical rest at home for 4-5 days; avoid sun exposure and strenuous tasks.',
      'Fever Management: Sponge whole body with normal lukewarm tap water if body temperature exceeds 102°F.',
      'Medication Warning: Strictly avoid pain killers like Diclofenac, Ibuprofen, Ketorolac, or Aspirin during viral fever.',
      'Dietary Guidelines: Eat light, easily digestible nutritious foods (khichuri, soup, boiled vegetables, soft fruits).',
    ],
    nextFollowUp: 'After 5 Days (on 25 Oct 2026) with CBC & Dengue reports, or immediately if red-flag warning signs develop.',
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    showToast('Prescription link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-100/90 py-6 sm:py-10 pb-28 text-slate-800">
      {/* ================================================================
          TOP ACTION TOOLBAR (Hidden completely during printing)
          ================================================================ */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-6 print:hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm">
          {/* Left: Back button & Breadcrumb */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-emerald-600 bg-slate-50 hover:bg-emerald-50 border border-slate-200 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-slate-600" />
              <span>Back to Dashboard</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                BMDC Verified Rx
              </span>
              <span className="text-xs font-mono font-bold text-slate-500">
                #{prescription.id}
              </span>
            </div>
          </div>

          {/* Right: Print / Download / Share Actions */}
          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
            <button
              onClick={handleShare}
              className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors border border-slate-200"
              title="Copy link"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Link Copied' : 'Share'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Printer className="w-4 h-4 text-slate-300" />
              <span>Print Prescription</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md transition-all hover:shadow-lg"
            >
              <Download className="w-4 h-4 text-emerald-100" />
              <span>Download Official PDF</span>
            </button>
          </div>
        </div>

        {/* Informational notification strip */}
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 px-2">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            Official Telemedicine Electronic Record • Cryptographically Validated by BMDC
          </span>
          <span className="hidden sm:inline">
            Print Format: Standard A4 Prescription Paper (100% Scale)
          </span>
        </div>
      </div>

      {/* ================================================================
          OFFICIAL PRESCRIPTION DOCUMENT CONTAINER
          Engineered to look like high-grade official medical stationery
          ================================================================ */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="prescription-document bg-[#FCFDFD] rounded-2xl border-2 border-slate-300/90 shadow-xl overflow-hidden print:p-0 print:border print:border-slate-400 print:shadow-none print:rounded-none relative">
          {/* Subtle Security Micro-Watermark Ribbon at Top */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 h-1.5 w-full" />

          {/* Microtext Security Header Band */}
          <div className="bg-slate-900 text-slate-200 px-6 sm:px-8 py-1.5 flex flex-wrap items-center justify-between text-[10px] font-mono tracking-wider uppercase border-b border-slate-800">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              GOVERNMENT OF BANGLADESH • DGHS TELEMEDICINE REGISTERED MEDICAL RECORD
            </span>
            <span className="hidden md:inline font-semibold text-slate-300">
              ISO 27001 SECURED • 256-BIT ENCRYPTED ELECTRONIC PRESCRIPTION
            </span>
            <span className="text-emerald-400 font-bold">
              AUTH CODE: {prescription.id}-BMDC-BD
            </span>
          </div>

          <div className="p-6 sm:p-10 lg:p-12 print:p-6 relative">
            {/* Background Security Watermark (Subtle stylized Caduceus/Rx) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.025] select-none overflow-hidden">
              <div className="text-[28rem] font-serif font-black text-slate-900 leading-none">
                ℞
              </div>
            </div>

            {/* ============================================================
                DEDICATED METADATA BLOCK FOR DOCTOR DETAILS & DYNAMIC QR CODE
                ============================================================ */}
            <div className="relative pb-6 border-b-2 border-slate-800 flex flex-col md:flex-row items-start justify-between gap-6">
              {/* Doctor Credentials & Medical Practice Metadata */}
              <div className="flex-1 space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-serif">
                    {prescription.doctorName}
                  </h1>
                </div>

                <p className="text-xs sm:text-sm font-bold text-emerald-700 leading-snug">
                  {prescription.doctorDegrees}
                </p>

                <p className="text-xs font-semibold text-slate-700">
                  {prescription.doctorHospital}
                </p>

                <p className="text-xs text-slate-600">
                  Specialist: Internal Medicine, Cardiology & Critical Healthcare
                </p>

                <div className="pt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>BMDC Reg. No: {prescription.doctorBmdc}</span>
                  </div>

                  <span className="text-slate-500 font-medium text-[11px]">
                    Telemedicine ID: <strong className="text-slate-800 font-mono">DOC-BD-89201</strong>
                  </span>

                  <span className="text-slate-500 font-medium text-[11px] flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>Chamber: +880 9610-009610 (Ext: 204)</span>
                  </span>
                </div>
              </div>

              {/* Dynamic QR Code Placeholder at Right Edge for Cryptographic Authentication */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200">
                {/* Institutional Telemedicine Logo */}
                <div className="hidden md:flex items-center gap-2 mb-1 text-right">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-black tracking-tight text-slate-900 leading-none">
                      Doctor's<span className="text-emerald-600"> care</span>
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">
                      Digital Hospital Chamber
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                </div>

                {/* Cryptographic QR Code Container */}
                <div className="flex items-center gap-3 p-2.5 bg-white rounded-xl border border-slate-300 shadow-2xs">
                  {/* High-Fidelity SVG QR Matrix */}
                  <div className="w-20 h-20 bg-white p-1 rounded-lg border border-slate-200 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
                      {/* Top-Left Finder */}
                      <rect x="5" y="5" width="28" height="28" rx="3" fill="#0f172a" />
                      <rect x="9" y="9" width="20" height="20" fill="#ffffff" />
                      <rect x="13" y="13" width="12" height="12" rx="2" fill="#059669" />

                      {/* Top-Right Finder */}
                      <rect x="67" y="5" width="28" height="28" rx="3" fill="#0f172a" />
                      <rect x="71" y="9" width="20" height="20" fill="#ffffff" />
                      <rect x="75" y="13" width="12" height="12" rx="2" fill="#059669" />

                      {/* Bottom-Left Finder */}
                      <rect x="5" y="67" width="28" height="28" rx="3" fill="#0f172a" />
                      <rect x="9" y="71" width="20" height="20" fill="#ffffff" />
                      <rect x="13" y="75" width="12" height="12" rx="2" fill="#059669" />

                      {/* Dynamic Cryptographic QR Data Matrix Elements */}
                      <rect x="38" y="8" width="6" height="6" fill="#0f172a" />
                      <rect x="48" y="8" width="6" height="6" fill="#059669" />
                      <rect x="56" y="8" width="6" height="6" fill="#0f172a" />

                      <rect x="38" y="20" width="6" height="6" fill="#0f172a" />
                      <rect x="48" y="20" width="6" height="6" fill="#0f172a" />
                      <rect x="56" y="20" width="6" height="6" fill="#059669" />

                      <rect x="8" y="38" width="6" height="6" fill="#0f172a" />
                      <rect x="20" y="38" width="6" height="6" fill="#059669" />
                      <rect x="38" y="38" width="8" height="8" fill="#0f172a" />
                      <rect x="52" y="38" width="6" height="6" fill="#0f172a" />
                      <rect x="64" y="38" width="6" height="6" fill="#059669" />
                      <rect x="78" y="38" width="6" height="6" fill="#0f172a" />

                      <rect x="8" y="50" width="6" height="6" fill="#059669" />
                      <rect x="20" y="50" width="6" height="6" fill="#0f172a" />
                      <rect x="38" y="50" width="6" height="6" fill="#059669" />
                      <rect x="50" y="50" width="8" height="8" rx="1" fill="#0f172a" />
                      <rect x="64" y="50" width="6" height="6" fill="#0f172a" />
                      <rect x="78" y="50" width="6" height="6" fill="#059669" />
                      <rect x="88" y="50" width="6" height="6" fill="#0f172a" />

                      <rect x="38" y="66" width="6" height="6" fill="#0f172a" />
                      <rect x="48" y="66" width="6" height="6" fill="#059669" />
                      <rect x="64" y="66" width="6" height="6" fill="#0f172a" />
                      <rect x="76" y="66" width="6" height="6" fill="#0f172a" />
                      <rect x="86" y="66" width="8" height="8" fill="#059669" />

                      <rect x="38" y="78" width="6" height="6" fill="#059669" />
                      <rect x="50" y="78" width="6" height="6" fill="#0f172a" />
                      <rect x="64" y="78" width="6" height="6" fill="#0f172a" />
                      <rect x="78" y="78" width="6" height="6" fill="#0f172a" />
                      <rect x="88" y="78" width="6" height="6" fill="#0f172a" />

                      <rect x="38" y="88" width="6" height="6" fill="#0f172a" />
                      <rect x="50" y="88" width="6" height="6" fill="#059669" />
                      <rect x="64" y="88" width="6" height="6" fill="#0f172a" />
                      <rect x="76" y="88" width="6" height="6" fill="#059669" />
                      <rect x="88" y="88" width="6" height="6" fill="#0f172a" />
                    </svg>
                  </div>

                  {/* QR Security & Authentication Metadata */}
                  <div className="flex flex-col text-left justify-center">
                    <span className="text-[10px] font-black text-slate-900 tracking-wider uppercase flex items-center gap-1">
                      <Lock className="w-3 h-3 text-emerald-600" />
                      <span>BMDC E-Verify</span>
                    </span>
                    <span className="text-[9px] font-mono text-slate-600 mt-0.5">
                      HASH: 4F9B-90412-A68
                    </span>
                    <span className="text-[9px] text-slate-500 leading-tight max-w-[130px] mt-0.5">
                      Scan QR code to verify BMDC digital signature & audit record
                    </span>
                    <span className="text-[8px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded mt-1 inline-block self-start">
                      SECURE SIGNATURE ✓
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================================
                PATIENT DEMOGRAPHICS & HOSPITAL CASE RECORD STRIP
                Structured like a high-grade hospital chart header
                ============================================================ */}
            <div className="my-5 p-4 rounded-xl bg-slate-50/90 border border-slate-300 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                  Patient Name
                </span>
                <strong className="text-slate-900 text-sm font-black truncate block">
                  {prescription.patientName}
                </strong>
                <span className="text-[10px] text-slate-500 font-mono">ID: PID-449102</span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                  Age / Gender
                </span>
                <strong className="text-slate-900 text-sm font-extrabold block">
                  {prescription.patientAge} Yrs / {prescription.patientGender}
                </strong>
                <span className="text-[10px] text-slate-500">Weight: {prescription.vitals.weight || '72 kg'}</span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                  Prescription ID
                </span>
                <strong className="text-slate-900 font-mono text-xs font-bold block">
                  {prescription.id}
                </strong>
                <span className="text-[10px] text-slate-500 font-mono">Ref: {prescription.appointmentId}</span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                  Date of Issue
                </span>
                <strong className="text-slate-900 font-bold block">
                  {prescription.date}
                </strong>
                <span className="text-[10px] text-slate-500">Time: 04:30 PM (BST)</span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                  Blood Group
                </span>
                <strong className="text-slate-900 font-bold block">
                  B+ (Positive)
                </strong>
                <span className="text-[10px] text-emerald-600 font-semibold">Verified</span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                  Consultation Mode
                </span>
                <strong className="text-emerald-700 font-bold block flex items-center gap-1">
                  <Activity className="w-3 h-3" />
                  Tele-Video HD
                </strong>
                <span className="text-[10px] text-slate-500">Validity: 14 Days</span>
              </div>
            </div>

            {/* ============================================================
                STARK VISUAL GRID SPLIT:
                - Left Column (4 cols): Vitals, Symptoms, Clinical Findings, Tests, Warnings
                - Right Main Column (8 cols): Iconic Rx Symbol & Ultra-Clean Spacious Medicines Table
                ============================================================ */}
            <div className="grid grid-cols-1 md:grid-cols-12 print:grid-cols-12 gap-0 border-t-2 border-slate-800">
              {/* ========================================================
                  LEFT COLUMN: VITALS, SYMPTOMS & CLINICAL HISTORY
                  ======================================================== */}
              <div className="md:col-span-4 print:col-span-4 md:border-r-2 border-slate-300 md:pr-6 pt-5 pb-6 space-y-6">
                {/* Column Section Title */}
                <div className="pb-2 border-b border-slate-200">
                  <h3 className="text-[11px] font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Clinical Profile & Vitals</span>
                  </h3>
                  <span className="text-[10px] text-slate-400">শারীরিক পরীক্ষা ও উপসর্গ</span>
                </div>

                {/* 1. Chief Complaints & Symptoms */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2 flex items-center justify-between">
                    <span>Chief Complaints (উপসর্গ)</span>
                    <span className="text-[10px] text-slate-500 font-normal">Duration</span>
                  </h4>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex items-start justify-between gap-2 border-b border-slate-200/60 pb-1.5">
                      <div>
                        <p className="font-semibold text-slate-900">Intermittent High Fever</p>
                        <p className="text-[10px] text-slate-500">Temp up to 102.5°F with chills</p>
                      </div>
                      <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200 shrink-0">
                        3 Days
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-2 border-b border-slate-200/60 pb-1.5">
                      <div>
                        <p className="font-semibold text-slate-900">Severe Body Ache & Chills</p>
                        <p className="text-[10px] text-slate-500">Retro-orbital pain & myalgia</p>
                      </div>
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 shrink-0">
                        3 Days
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-2 border-b border-slate-200/60 pb-1.5">
                      <div>
                        <p className="font-semibold text-slate-900">Dry Cough & Runny Nose</p>
                        <p className="text-[10px] text-slate-500">Mild throat congestion</p>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
                        2 Days
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-2 pt-0.5">
                      <div>
                        <p className="font-semibold text-slate-900">Anorexia & Generalized Fatigue</p>
                        <p className="text-[10px] text-slate-500">Loss of taste, mild nausea</p>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
                        2 Days
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. Physical Examination & Vitals Grid */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                    <span>Vitals Examination (শারীরিক পরিমাপ)</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 block uppercase">Blood Pressure</span>
                      <strong className="text-slate-900 text-sm font-bold">
                        {prescription.vitals.bloodPressure || '120/80 mmHg'}
                      </strong>
                      <span className="text-[9px] text-emerald-600 block">Normotensive</span>
                    </div>

                    <div className="bg-rose-50/70 p-2.5 rounded-xl border border-rose-200">
                      <span className="text-[10px] text-rose-700 block uppercase font-semibold">Temperature</span>
                      <strong className="text-rose-700 text-sm font-black">
                        {prescription.vitals.temperature || '101.4 °F'}
                      </strong>
                      <span className="text-[9px] text-rose-600 block font-medium">Pyrexia (Fever)</span>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 block uppercase">Pulse / Heart Rate</span>
                      <strong className="text-slate-900 text-sm font-bold">
                        {prescription.vitals.pulse || '78 bpm'}
                      </strong>
                      <span className="text-[9px] text-slate-500 block">Regular, good vol.</span>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 block uppercase">SpO2 (Oxygen)</span>
                      <strong className="text-slate-900 text-sm font-bold">
                        98%
                      </strong>
                      <span className="text-[9px] text-emerald-600 block">Room air normal</span>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 block uppercase">Respiratory Rate</span>
                      <strong className="text-slate-900 text-sm font-bold">
                        18 / min
                      </strong>
                      <span className="text-[9px] text-slate-500 block">Eupneic</span>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="text-[10px] text-slate-500 block uppercase">Weight / BMI</span>
                      <strong className="text-slate-900 text-sm font-bold">
                        {prescription.vitals.weight || '72 kg'}
                      </strong>
                      <span className="text-[9px] text-slate-500 block">BMI: 23.8 (Normal)</span>
                    </div>
                  </div>

                  <div className="mt-2 text-[10px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-200/80">
                    <strong>Systemic:</strong> Chest: Clear, bilateral vesicular breath sounds. Abdomen: Soft, non-tender. Petechiae/Rash: Absent.
                  </div>
                </div>

                {/* 3. Clinical Impression / Provisional Diagnosis */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-1.5">
                    Provisional Diagnosis (সম্ভাব্য রোগ)
                  </h4>
                  <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
                    <p className="text-xs font-bold text-slate-900 leading-snug">
                      {prescription.diagnosis}
                    </p>
                    <p className="text-[10px] text-emerald-800 mt-1 font-medium">
                      ICD-10 Code: R50.9 (Pyrexia) / J06.9 (Acute URI)
                    </p>
                  </div>
                </div>

                {/* 4. Advised Diagnostic Investigations / Lab Tests */}
                <div className="page-break-avoid">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                      <FlaskConical className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Investigations Advised (ল্যাব টেস্ট)</span>
                    </h4>
                  </div>

                  <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-200 space-y-1.5 text-xs text-slate-800">
                    {prescription.investigations.map((inv, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 leading-snug">
                        <span className="text-emerald-700 font-bold shrink-0">•</span>
                        <span className="font-medium text-slate-800">{inv}</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-emerald-200/80 flex items-center justify-between">
                      <span className="text-[10px] text-emerald-800 font-semibold">
                        Sample: Fasting not mandatory
                      </span>
                      <button
                        onClick={() => navigate('/diagnostic')}
                        className="print:hidden text-[11px] font-bold text-emerald-700 hover:text-emerald-800 hover:underline inline-flex items-center gap-1"
                      >
                        <span>Book Doorstep Sample</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 5. Emergency Warning Signs / Red Flags */}
                <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1.5 page-break-avoid">
                  <div className="flex items-center gap-1.5 text-amber-800 font-bold uppercase text-[11px]">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Red-Flag Warning Signs (জরুরি সতর্কতা)</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-amber-900">
                    If you experience continuous vomiting, acute abdominal pain, bleeding from gums or nose, extreme weakness, or breathing distress:
                  </p>
                  <p className="text-[11px] font-bold text-rose-700 bg-rose-50 p-1.5 rounded border border-rose-200 text-center">
                    Report immediately to Hospital ER or Call 999
                  </p>
                </div>
              </div>

              {/* ========================================================
                  RIGHT MAIN COLUMN:
                  - The Iconic ℞ Symbol
                  - Ultra-Clean Spacious Medicines Table
                  - Special Advice & Lifestyle Guidelines
                  - Sign-off & Verification Seal
                  ======================================================== */}
              <div className="md:col-span-8 print:col-span-8 md:pl-6 pt-5 pb-6 space-y-6">
                {/* Iconic Rx Header Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-5xl font-black text-emerald-700 select-none leading-none tracking-tighter">
                      ℞
                    </span>
                    <div>
                      <h2 className="text-base font-black text-slate-900 tracking-tight uppercase">
                        Prescription & Pharmacotherapy
                      </h2>
                      <p className="text-xs text-slate-500 font-medium">
                        ওষুধ ও সেবন নির্দেশিকা • Dispense as formulated
                      </p>
                    </div>
                  </div>

                  <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                    Total Items: {prescription.medicines.length}
                  </span>
                </div>

                {/* Ultra-Clean, Spacious Medicines Table */}
                <div className="border border-slate-300 rounded-xl overflow-hidden shadow-2xs bg-white">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100/90 border-b border-slate-300 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3 px-3.5 w-5/12">Medicine & Generic Formula</th>
                        <th className="py-3 px-3 text-center w-2/12">Schedule / Dosage</th>
                        <th className="py-3 px-3 text-center w-2/12">Duration</th>
                        <th className="py-3 px-3.5 w-3/12">Instructions & Timing</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {prescription.medicines.map((med, idx) => (
                        <tr
                          key={idx}
                          className={`hover:bg-slate-50/70 transition-colors ${
                            idx % 2 === 1 ? 'bg-slate-50/40' : 'bg-white'
                          }`}
                        >
                          {/* Medicine Name & Strength */}
                          <td className="py-4 px-3.5 align-top">
                            <div className="flex items-baseline gap-2">
                              <span className="text-[10px] font-bold text-slate-400 font-mono">
                                #{idx + 1}
                              </span>
                              <div>
                                <p className="font-bold text-slate-900 text-sm leading-tight">
                                  {med.medicineName}
                                </p>
                                <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                                  {med.strength}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Dosage Schedule */}
                          <td className="py-4 px-3 text-center align-top">
                            <div className="inline-flex flex-col items-center">
                              <span className="font-black text-slate-900 text-sm tracking-widest bg-emerald-50/90 text-emerald-800 px-2.5 py-1 rounded-md border border-emerald-200/80 tabular-nums">
                                {med.dosage}
                              </span>
                              <span className="text-[9px] text-slate-500 mt-1 font-semibold">
                                {med.dosage.includes('+') ? 'সকাল - দুপুর - রাত' : 'প্রয়োজনমতো'}
                              </span>
                            </div>
                          </td>

                          {/* Duration */}
                          <td className="py-4 px-3 text-center align-top">
                            <span className="font-bold text-slate-800 text-xs block">
                              {med.duration}
                            </span>
                            <span className="text-[10px] text-slate-400">Regular course</span>
                          </td>

                          {/* Instructions */}
                          <td className="py-4 px-3.5 align-top">
                            <p className="text-xs text-slate-800 leading-snug font-medium">
                              {med.instruction}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Doctor's Special Advice & Lifestyle Guidelines */}
                <div className="bg-slate-50/90 p-4 rounded-xl border border-slate-300 space-y-2 page-break-avoid">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5 pb-1 border-b border-slate-200">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Doctor's Special Advice & Lifestyle Guidelines (উপদেশ ও নিয়মাবলী)</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700 pt-1">
                    {prescription.advice.map((adv, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-emerald-600 font-bold shrink-0">•</span>
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Next Follow-up Consultation Card */}
                <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 page-break-avoid">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-emerald-900 tracking-wider">
                        Next Follow-up Consultation (পরবর্তী সাক্ষাৎ)
                      </p>
                      <p className="text-xs font-bold text-slate-900 mt-0.5">
                        {prescription.nextFollowUp}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold text-emerald-700 bg-white px-2.5 py-1 rounded-md border border-emerald-200 shrink-0">
                    Free 14-Day Review Included
                  </span>
                </div>

                {/* ========================================================
                    DOCTOR'S OFFICIAL DIGITAL SIGNATURE & VERIFICATION SEAL
                    ======================================================== */}
                <div className="pt-6 border-t-2 border-slate-800 flex flex-col sm:flex-row items-end justify-between gap-6 page-break-avoid">
                  {/* Left: Telemedicine Legal Compliance Notice */}
                  <div className="max-w-xs text-[10px] text-slate-500 space-y-1 text-left">
                    <p className="font-semibold text-slate-700">
                      BMDC Electronic Prescription Act:
                    </p>
                    <p className="leading-tight">
                      This digitally generated electronic prescription is authenticated and legally valid under BMDC Telemedicine Guidelines 2020 and National Digital Health Strategy.
                    </p>
                    <p className="font-mono text-slate-400">
                      AUDIT TOKEN: #SEC-2026-90412-BMDC
                    </p>
                  </div>

                  {/* Right: Signature & Stamp Block */}
                  <div className="flex items-center gap-6 text-right">
                    {/* Official Circular BMDC Seal Stamp */}
                    <div className="w-20 h-20 rounded-full border-2 border-dashed border-emerald-600/70 p-1 flex items-center justify-center text-center rotate-[-6deg] bg-emerald-50/40 select-none">
                      <div className="w-full h-full rounded-full border border-emerald-500 flex flex-col items-center justify-center p-1">
                        <span className="text-[7px] font-extrabold uppercase tracking-tight text-emerald-800">
                          BMDC BANGLADESH
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 my-0.5" />
                        <span className="text-[6px] font-bold uppercase text-emerald-700">
                          VERIFIED PRACTITIONER
                        </span>
                      </div>
                    </div>

                    {/* Electronic Handwritten Signature & Credentials */}
                    <div className="space-y-1">
                      {/* Stylized Digital Signature Graphic */}
                      <div className="h-10 flex items-center justify-end">
                        <span className="font-serif italic text-2xl font-black text-slate-800 tracking-wider transform -rotate-2 select-none border-b-2 border-slate-700 pb-0.5 px-3">
                          {prescription.doctorName.replace('Prof. ', '').replace('Dr. ', '')}
                        </span>
                      </div>

                      <p className="text-xs font-black text-slate-900">
                        {prescription.doctorName}
                      </p>
                      <p className="text-[10px] font-bold text-emerald-700">
                        BMDC Reg. No: {prescription.doctorBmdc}
                      </p>
                      <p className="text-[9px] text-slate-500 font-mono">
                        Electronically Signed: {prescription.date} at 16:32 BST
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer Note of Official Paper */}
            <div className="mt-8 pt-3 border-t border-slate-300 text-center text-[10px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
              <span>Doctor's Care Digital Healthcare Platform • 24/7 Helpline: 9610-009610</span>
              <span className="font-mono">Page 1 of 1 • System Generated Medical Document</span>
              <span>Valid across registered pharmacies in Bangladesh</span>
            </div>
          </div>
        </div>

        {/* ================================================================
            POST-PRESCRIPTION ACTION BUTTONS (Completely hidden during printing)
            ================================================================ */}
        <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center print:hidden">
          <button
            onClick={() => {
              showToast('Pharmacy delivery service is preparing your prescribed medicines.', 'success');
              navigate('/dashboard');
            }}
            className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-200" />
            <span>Order Prescribed Medicines for Home Delivery</span>
          </button>

          <button
            onClick={() => navigate('/diagnostic')}
            className="w-full sm:w-auto px-6 py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all"
          >
            <FlaskConical className="w-4 h-4 text-emerald-200" />
            <span>Book Advised Tests at Home (CBC & Dengue)</span>
          </button>

          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
