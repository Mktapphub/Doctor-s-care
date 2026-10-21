import React, { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MessageSquare,
  Send,
  Shield,
  ShieldCheck,
  Clock,
  Maximize2,
  Minimize2,
  FileText,
  User,
  Users,
  CheckCircle,
  Wifi,
  Volume2,
  VolumeX,
  Paperclip,
  X,
  Hand,
  Share2,
  Sparkles,
  AlertCircle,
  Stethoscope,
  Activity,
  Pill,
  MoreVertical,
} from 'lucide-react';
import { DOCTORS_DATA } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const ConsultationRoomPage: React.FC = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUser, appointments, showToast } = useApp();

  const doctorId = searchParams.get('doctor') || 'doc-2';
  const doctor = DOCTORS_DATA.find((d) => d.id === doctorId) || DOCTORS_DATA[1];
  const currentApt = appointments.find((a) => a.id === appointmentId);

  // Call states
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [prescriptionDrawerOpen, setPrescriptionDrawerOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showEndCallModal, setShowEndCallModal] = useState(false);

  // Call duration timer
  const [secondsElapsed, setSecondsElapsed] = useState(145); // start with elapsed time for realism

  // Simulating live speaking status for doctor
  const [doctorSpeaking, setDoctorSpeaking] = useState(true);
  const [isDoctorTyping, setIsDoctorTyping] = useState(false);

  // Chat messages
  const [messages, setMessages] = useState<
    { sender: 'doctor' | 'patient'; text: string; time: string; attachment?: string }[]
  >([
    {
      sender: 'doctor',
      text: `Assalamu Alaikum ${currentUser?.name || 'patient'}! I am Dr. ${doctor.name.replace(/^Dr\.\s*/, '')}. I have reviewed your preliminary symptoms and intake notes. Could you describe how long you have had the fever and throat irritation?`,
      time: '10:32 AM',
    },
    {
      sender: 'patient',
      text: 'Good morning Doctor. The fever started 2 days ago, around 101.5°F, with throat dryness and mild body ache.',
      time: '10:33 AM',
    },
    {
      sender: 'doctor',
      text: 'Understood. Are you experiencing any chills, nausea, vomiting, or skin rashes?',
      time: '10:34 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Periodic doctor speaking waveform simulation
  useEffect(() => {
    const speechInterval = setInterval(() => {
      setDoctorSpeaking((prev) => !prev);
    }, 4000);
    return () => clearInterval(speechInterval);
  }, []);

  // Timer counter
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto scroll chat
  useEffect(() => {
    if (chatOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, chatOpen, isDoctorTyping]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    const newMsg = {
      sender: 'patient' as const,
      text: userMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setIsDoctorTyping(true);

    // Realistic clinical doctor reply simulation
    setTimeout(() => {
      let reply =
        "Thank you for confirming. I am adding Paracetamol 500mg (Napa Extend) and Cetirizine 10mg to your electronic prescription right now. Make sure you stay well-hydrated.";
      if (userMsg.toLowerCase().includes('fever') || userMsg.toLowerCase().includes('temp')) {
        reply =
          "I am prescribing Tab. Napa Extra (500mg+65mg) TDS for 3 days after meals. Also, let's monitor your temperature every 6 hours and drink at least 2.5L fluids daily.";
      } else if (userMsg.toLowerCase().includes('cough') || userMsg.toLowerCase().includes('throat')) {
        reply =
          "I see. I will add an antihistamine syrup and warm saline gargle 3 times daily to soothe the pharyngeal mucosa.";
      } else if (userMsg.toLowerCase().includes('report') || userMsg.toLowerCase().includes('cbc')) {
        reply =
          "I will advise a CBC (Complete Blood Count) and Dengue NS1 Antigen test to rule out viral infection. You can book home sample collection directly from the prescription screen.";
      }

      setIsDoctorTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'doctor',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 2000);
  };

  const handleSendQuickNote = (note: string) => {
    const newMsg = {
      sender: 'patient' as const,
      text: note,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setIsDoctorTyping(true);
    setTimeout(() => {
      setIsDoctorTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'doctor',
          text: `Received: "${note}". I am updating your electronic health record.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1500);
  };

  const handleEndCall = () => {
    setShowEndCallModal(false);
    showToast('Consultation ended. Loading your signed E-Prescription...', 'success');
    navigate(`/prescription/${appointmentId || 'apt-001'}?doctor=${doctor.id}`);
  };

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen overflow-hidden bg-slate-950 text-white flex flex-col relative font-['Poppins',sans-serif] select-none"
    >
      {/* =========================================================================
          TOP FLOATING ENTERPRISE STATUS HEADER (Zoom / Google Meet Style)
      ========================================================================= */}
      <header className="absolute top-0 left-0 right-0 z-30 px-4 sm:px-6 py-3.5 bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-transparent flex items-center justify-between pointer-events-auto">
        {/* Doctor & Room Info */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-lg">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-white tracking-wide">
              DocTime Secure Telehealth
            </span>
            <span className="text-slate-500 text-xs">•</span>
            <span className="text-xs text-slate-300 font-medium hidden sm:inline">
              Room #{appointmentId ? appointmentId.slice(-4).toUpperCase() : '482B'}
            </span>
          </div>

          {/* BMDC Verified Doctor Pill */}
          <div className="hidden md:flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs">
            <Stethoscope className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold text-white">{doctor.name}</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.5 rounded border border-emerald-500/30">
              BMDC {doctor.bmdcNumber}
            </span>
          </div>
        </div>

        {/* Center / Right Metadata & Network Status */}
        <div className="flex items-center gap-3">
          {/* Call Elapsed Timer */}
          <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-sm text-xs font-mono font-bold text-emerald-400">
            <Clock className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>{formatTimer(secondsElapsed)}</span>
          </div>

          {/* Network Health & Encryption */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs text-slate-300">
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-medium">1080p HD (60fps)</span>
            <span className="text-slate-600">|</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] text-slate-400">End-to-End Encrypted</span>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 transition-colors shadow-sm"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* =========================================================================
          PRIMARY VIEWPORT: DOCTOR'S VIDEO STREAM (object-cover scaling)
      ========================================================================= */}
      <main className="relative flex-1 w-full h-full overflow-hidden bg-slate-950 flex items-center justify-center">
        {/* Full-bleed Doctor Stream Simulation */}
        <div className="absolute inset-0 w-full h-full bg-slate-950 overflow-hidden">
          <img
            src={doctor.avatar}
            alt={doctor.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-[1.03] filter brightness-95 contrast-105 transition-all duration-700"
          />

          {/* Vignette Gradients for cinematic clarity and control readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60 pointer-events-none opacity-90" />
          <div className="absolute inset-0 bg-radial from-transparent via-slate-950/20 to-slate-950/70 pointer-events-none" />

          {/* Doctor Active Speaker Floating Badge */}
          <div className="absolute bottom-24 sm:bottom-28 left-4 sm:left-6 z-20 flex flex-col gap-1.5 pointer-events-auto">
            <div className="flex items-center gap-2.5 bg-slate-900/85 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/15 shadow-2xl">
              {/* Doctor Avatar Miniature */}
              <div className="relative">
                <img
                  src={doctor.avatar}
                  alt={doctor.name}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover border border-emerald-400/60"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                    {doctor.name}
                  </h3>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.2 rounded border border-emerald-500/30">
                    Host
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-medium">
                  {doctor.speciality} · {doctor.hospital}
                </p>
              </div>

              {/* Live Audio Equalizer Waveform */}
              <div className="ml-2 flex items-end gap-0.5 h-4 px-2 py-0.5 bg-emerald-950/40 rounded-lg border border-emerald-500/30">
                <span
                  className={`w-1 bg-emerald-400 rounded-full transition-all duration-300 ${
                    doctorSpeaking ? 'h-3 animate-pulse' : 'h-1 opacity-40'
                  }`}
                />
                <span
                  className={`w-1 bg-emerald-400 rounded-full transition-all duration-200 ${
                    doctorSpeaking ? 'h-4 animate-bounce' : 'h-1.5 opacity-40'
                  }`}
                />
                <span
                  className={`w-1 bg-emerald-400 rounded-full transition-all duration-300 ${
                    doctorSpeaking ? 'h-2 animate-pulse' : 'h-1 opacity-40'
                  }`}
                />
              </div>
            </div>

            {/* Quick Live Consultation Note Indicator */}
            <div className="hidden sm:inline-flex items-center gap-1.5 self-start bg-slate-900/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] text-slate-300">
              <Activity className="w-3 h-3 text-emerald-400" />
              <span>Real-time vitals monitoring & clinical notes active</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            PATIENT SELF-VIEW: PICTURE-IN-PICTURE (Bottom-Right, subtle shadow boundary)
        ========================================================================= */}
        <aside
          className="absolute bottom-24 sm:bottom-28 right-4 sm:right-6 z-20 w-44 sm:w-60 md:w-68 aspect-video rounded-2xl overflow-hidden border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl bg-slate-900/90 group transition-all duration-300 hover:scale-[1.02] hover:border-white/40"
          aria-label="Patient Self Camera Feed"
        >
          {camOn ? (
            <div className="relative w-full h-full bg-slate-900">
              {/* Patient Live Video Simulation */}
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=600"
                alt="Self patient camera stream"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover scale-x-[-1] filter brightness-95"
              />

              {/* PiP Overlay Info */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between z-10">
                <span className="text-[11px] bg-slate-950/80 backdrop-blur-md text-white font-medium px-2 py-0.5 rounded-md border border-white/10 truncate max-w-[120px]">
                  {currentUser?.name || 'You (Patient)'}
                </span>

                {/* Mic Status on PiP */}
                <span
                  className={`w-5 h-5 rounded-md flex items-center justify-center text-xs backdrop-blur-md ${
                    micOn
                      ? 'bg-emerald-500/80 text-white'
                      : 'bg-rose-600 text-white shadow-sm'
                  }`}
                  title={micOn ? 'Microphone active' : 'Microphone muted'}
                >
                  {micOn ? <Mic className="w-3 h-3" /> : <MicOff className="w-3 h-3" />}
                </span>
              </div>
            </div>
          ) : (
            /* Camera Off State in PiP */
            <div className="w-full h-full flex flex-col items-center justify-center bg-radial from-slate-800 to-slate-950 p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 mb-2 shadow-inner">
                <User className="w-6 h-6 text-slate-300" />
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <VideoOff className="w-3.5 h-3.5 text-rose-500" />
                <span>Camera Off</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-0.5">
                {currentUser?.name || 'You'}
              </span>
            </div>
          )}

          {/* PiP Quick hover badge */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] text-white font-medium">
            HD 720p
          </div>
        </aside>

        {/* =========================================================================
            CHAT SIDEBAR: ELEGANT OVERLAY WITH FLUID INNER SCROLL CONTAINER
        ========================================================================= */}
        {chatOpen && (
          <aside className="absolute top-0 right-0 bottom-0 w-full sm:w-96 z-40 bg-slate-950/95 backdrop-blur-2xl border-l border-white/15 shadow-[0_0_60px_rgba(0,0,0,0.85)] flex flex-col transition-all duration-300 animate-in slide-in-from-right">
            {/* Chat Overlay Header */}
            <div className="px-4 py-3.5 border-b border-white/10 bg-slate-900/60 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                    Consultation Chat
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Doctor Online & Listening</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setChatOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-white/10"
                title="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Consultation Chips */}
            <div className="px-4 py-2 border-b border-white/5 bg-slate-900/30 overflow-x-auto no-scrollbar flex items-center gap-2 shrink-0">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold shrink-0">
                Quick:
              </span>
              <button
                onClick={() => handleSendQuickNote('Fever: 101.4°F, started 2 days ago')}
                className="text-[11px] whitespace-nowrap bg-slate-800/80 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-full border border-white/10 transition-colors"
              >
                🌡️ Temp 101.4°F
              </button>
              <button
                onClick={() => handleSendQuickNote('Blood Pressure: 125/82 mmHg')}
                className="text-[11px] whitespace-nowrap bg-slate-800/80 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-full border border-white/10 transition-colors"
              >
                🩺 BP 125/82
              </button>
              <button
                onClick={() => handleSendQuickNote('No known drug allergies (NKDA)')}
                className="text-[11px] whitespace-nowrap bg-slate-800/80 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-full border border-white/10 transition-colors"
              >
                💊 No allergies
              </button>
            </div>

            {/* FLUID INNER SCROLL CONTAINER FOR MESSAGES */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5 custom-scrollbar bg-slate-950/60">
              {/* Encryption Notice */}
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-emerald-400 font-semibold mb-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>HIPAA & BMDC Compliant Channel</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Messages and shared health vitals are encrypted and logged directly into your patient record.
                </p>
              </div>

              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    m.sender === 'patient' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div className="flex items-end gap-2 max-w-[88%]">
                    {m.sender === 'doctor' && (
                      <img
                        src={doctor.avatar}
                        alt={doctor.name}
                        referrerPolicy="no-referrer"
                        className="w-6 h-6 rounded-full object-cover border border-emerald-500 shrink-0 mb-1"
                      />
                    )}
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 text-xs shadow-md ${
                        m.sender === 'patient'
                          ? 'bg-emerald-600 text-white rounded-br-xs font-normal'
                          : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-xs font-normal leading-relaxed'
                      }`}
                    >
                      <p className="whitespace-pre-line">{m.text}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 px-1 font-mono">
                    {m.sender === 'doctor' ? doctor.name.split(' ')[0] : 'You'} · {m.time}
                  </span>
                </div>
              ))}

              {/* Typing indicator */}
              {isDoctorTyping && (
                <div className="flex items-center gap-2 self-start bg-slate-900 border border-slate-800 px-3 py-2 rounded-2xl text-xs text-slate-400 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce delay-100" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce delay-200" />
                  <span className="text-[11px] text-slate-400 ml-1">
                    Dr. {doctor.name.split(' ')[1]} is writing...
                  </span>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Chat Input Bar */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-white/10 bg-slate-900/90 flex items-center gap-2 shrink-0"
            >
              <button
                type="button"
                onClick={() => showToast('Attach file: Upload prior prescription or lab test', 'info')}
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-white/10 shrink-0"
                title="Attach Document or Lab Report"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Message Dr. ${doctor.name.split(' ')[1] || 'Doctor'}...`}
                className="flex-1 h-10 px-3.5 text-xs bg-slate-800/90 border border-white/15 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white flex items-center justify-center transition-colors shadow-md shadow-emerald-500/20 shrink-0"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </aside>
        )}

        {/* =========================================================================
            LIVE CLINICAL DRAFT / PRESCRIPTION QUICK DRAWER (Optional slide-up)
        ========================================================================= */}
        {prescriptionDrawerOpen && (
          <aside className="absolute top-16 right-4 sm:right-6 bottom-28 w-80 sm:w-96 z-40 bg-slate-950/95 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-4 py-3.5 border-b border-white/10 bg-slate-900/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span className="text-xs sm:text-sm font-bold text-white">Live E-Prescription Draft</span>
              </div>
              <button
                onClick={() => setPrescriptionDrawerOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar text-xs">
              <div className="bg-slate-900/90 p-3 rounded-2xl border border-white/10 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Diagnosis / Clinical Impression
                </span>
                <p className="font-semibold text-white">Acute Viral Pharyngitis with Pyrexia</p>
                <div className="flex items-center gap-2 text-[11px] text-slate-300">
                  <span>BP: 125/82 mmHg</span>
                  <span>•</span>
                  <span>Temp: 101.4 °F</span>
                  <span>•</span>
                  <span>SpO2: 98%</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Medicines Prescribed by {doctor.name}
                </span>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center justify-between font-bold text-white text-xs">
                    <span>1. Tab. Napa Extend 665mg</span>
                    <span className="text-emerald-400 text-[10px]">1 + 1 + 1</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Paracetamol • 5 days (After meals)</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center justify-between font-bold text-white text-xs">
                    <span>2. Tab. Alatrol 10mg</span>
                    <span className="text-emerald-400 text-[10px]">0 + 0 + 1</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Cetirizine Di-HCl • 7 days (At bedtime)</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="flex items-center justify-between font-bold text-white text-xs">
                    <span>3. Cap. Maxpro 20mg</span>
                    <span className="text-emerald-400 text-[10px]">1 + 0 + 1</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">Esomeprazole • 7 days (Before meals)</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-[11px] text-emerald-200">
                <span className="font-semibold block mb-1">Doctor Advice:</span>
                Warm saline gargle 3 times daily. Drink 2.5L clean boiled water. Avoid chilled items.
              </div>
            </div>

            <div className="p-3 border-t border-white/10 bg-slate-900/80">
              <button
                onClick={() => {
                  setPrescriptionDrawerOpen(false);
                  handleEndCall();
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <span>End Call & Download Official PDF</span>
              </button>
            </div>
          </aside>
        )}
      </main>

      {/* =========================================================================
          LOWER CONTROLLER STRIP: SPACIOUS DARK BUTTONS WITH DISTINCT ALERT COLORS
          (Zoom / Google Meet Enterprise Grade)
      ========================================================================= */}
      <footer className="w-full bg-slate-950/95 backdrop-blur-2xl border-t border-white/10 px-4 sm:px-8 py-3.5 z-30 shrink-0 flex items-center justify-between">
        {/* Left Side: Room details & security indicator */}
        <div className="hidden md:flex items-center gap-4 w-1/4">
          <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-white">{formatTimer(secondsElapsed)}</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">ID: {appointmentId || 'APT-001'}</span>
          </div>
        </div>

        {/* Center: Spacious Controller Action Buttons */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-4 flex-1 md:flex-initial">
          {/* Microphone Toggle (Spacious dark, turns rose-600 alert color when muted) */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={() => {
                const next = !micOn;
                setMicOn(next);
                showToast(next ? 'Microphone unmuted' : 'Microphone muted', next ? 'info' : 'error');
              }}
              className={`w-12 h-12 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md ${
                micOn
                  ? 'bg-slate-800/90 hover:bg-slate-700/90 text-white border border-white/15 hover:border-white/30'
                  : 'bg-rose-600 hover:bg-rose-700 text-white border border-rose-500 shadow-lg shadow-rose-600/40 ring-2 ring-rose-500/20'
              }`}
              title={micOn ? 'Mute Microphone (Ctrl+D)' : 'Unmute Microphone (Ctrl+D)'}
              aria-label={micOn ? 'Mute Microphone' : 'Unmute Microphone'}
            >
              {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5 text-white" />}
            </button>
            <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
              {micOn ? 'Mute' : 'Unmute'}
            </span>
          </div>

          {/* Camera Toggle (Spacious dark, turns rose-600 alert color when disabled) */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={() => {
                const next = !camOn;
                setCamOn(next);
                showToast(next ? 'Camera enabled' : 'Camera disabled', next ? 'info' : 'error');
              }}
              className={`w-12 h-12 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md ${
                camOn
                  ? 'bg-slate-800/90 hover:bg-slate-700/90 text-white border border-white/15 hover:border-white/30'
                  : 'bg-rose-600 hover:bg-rose-700 text-white border border-rose-500 shadow-lg shadow-rose-600/40 ring-2 ring-rose-500/20'
              }`}
              title={camOn ? 'Turn Off Camera (Ctrl+E)' : 'Turn On Camera (Ctrl+E)'}
              aria-label={camOn ? 'Turn Off Camera' : 'Turn On Camera'}
            >
              {camOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5 text-white" />}
            </button>
            <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
              {camOn ? 'Stop Video' : 'Start Video'}
            </span>
          </div>

          {/* Speaker / Audio Toggle */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={() => {
                const next = !speakerOn;
                setSpeakerOn(next);
                showToast(next ? 'Speaker active' : 'Speaker muted', 'info');
              }}
              className={`w-12 h-12 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md ${
                speakerOn
                  ? 'bg-slate-800/90 hover:bg-slate-700/90 text-white border border-white/15 hover:border-white/30'
                  : 'bg-rose-600 hover:bg-rose-700 text-white border border-rose-500 shadow-lg shadow-rose-600/40'
              }`}
              title={speakerOn ? 'Mute Doctor Speaker' : 'Unmute Doctor Speaker'}
              aria-label="Speaker"
            >
              {speakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
              {speakerOn ? 'Speaker' : 'Muted'}
            </span>
          </div>

          {/* Screen / Vitals Share Toggle */}
          <div className="hidden sm:flex flex-col items-center gap-1">
            <button
              onClick={() => {
                const next = !screenSharing;
                setScreenSharing(next);
                showToast(next ? 'Sharing medical test screen' : 'Screen share stopped', 'info');
              }}
              className={`w-12 h-12 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md ${
                screenSharing
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500 shadow-lg shadow-emerald-600/40'
                  : 'bg-slate-800/90 hover:bg-slate-700/90 text-white border border-white/15 hover:border-white/30'
              }`}
              title={screenSharing ? 'Stop Screen Share' : 'Share Medical Records / Screen'}
              aria-label="Share Screen"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <span className="text-[10px] text-slate-400 font-medium">Share</span>
          </div>

          {/* Raise Hand Toggle */}
          <div className="hidden sm:flex flex-col items-center gap-1">
            <button
              onClick={() => {
                const next = !handRaised;
                setHandRaised(next);
                showToast(next ? 'Hand raised to speak' : 'Hand lowered', 'info');
              }}
              className={`w-12 h-12 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md ${
                handRaised
                  ? 'bg-amber-500 hover:bg-amber-600 text-white border border-amber-400 shadow-lg shadow-amber-500/40'
                  : 'bg-slate-800/90 hover:bg-slate-700/90 text-white border border-white/15 hover:border-white/30'
              }`}
              title={handRaised ? 'Lower Hand' : 'Raise Hand'}
              aria-label="Raise Hand"
            >
              <Hand className="w-5 h-5" />
            </button>
            <span className="text-[10px] text-slate-400 font-medium">Hand</span>
          </div>

          {/* In-Call Chat Overlay Toggle */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={() => setChatOpen(!chatOpen)}
              className={`w-12 h-12 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md relative ${
                chatOpen
                  ? 'bg-emerald-600 text-white border border-emerald-400 shadow-lg shadow-emerald-500/40'
                  : 'bg-slate-800/90 hover:bg-slate-700/90 text-white border border-white/15 hover:border-white/30'
              }`}
              title="Toggle In-Call Chat"
              aria-label="Toggle Chat"
            >
              <MessageSquare className="w-5 h-5" />
              {/* Unread indicator dot */}
              <span className="absolute 2.5 top-2.5 right-2.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900" />
            </button>
            <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
              Chat
            </span>
          </div>

          {/* Prescription Live Preview Toggle */}
          <div className="hidden lg:flex flex-col items-center gap-1">
            <button
              onClick={() => setPrescriptionDrawerOpen(!prescriptionDrawerOpen)}
              className={`w-12 h-12 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md relative ${
                prescriptionDrawerOpen
                  ? 'bg-emerald-600 text-white border border-emerald-400'
                  : 'bg-slate-800/90 hover:bg-slate-700/90 text-white border border-white/15 hover:border-white/30'
              }`}
              title="View Doctor's Live Prescription Notes"
              aria-label="View Prescription Draft"
            >
              <FileText className="w-5 h-5" />
            </button>
            <span className="text-[10px] text-slate-400 font-medium">Prescription</span>
          </div>

          {/* End Consultation Button (Distinct Alert Red) */}
          <div className="flex flex-col items-center gap-1 ml-1 sm:ml-2">
            <button
              onClick={() => setShowEndCallModal(true)}
              className="px-5 sm:px-6 h-12 sm:h-13 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold text-xs sm:text-sm rounded-2xl flex items-center gap-2.5 shadow-lg shadow-rose-600/40 transition-all hover:scale-105 active:scale-95 border border-rose-500"
              title="End Consultation & Get Prescription"
              aria-label="End Consultation"
            >
              <PhoneOff className="w-4 h-4" />
              <span>End Call</span>
            </button>
            <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
              Leave
            </span>
          </div>
        </div>

        {/* Right Side: Participant count & room quick actions */}
        <div className="hidden md:flex items-center justify-end gap-3 w-1/4">
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-full border border-white/10 text-xs text-slate-300">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold">2</span>
            <span className="text-slate-500 font-normal">participants</span>
          </div>

          <button
            onClick={() => setPrescriptionDrawerOpen(!prescriptionDrawerOpen)}
            className="flex items-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-full border border-emerald-500/30 text-xs font-semibold transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>View Rx</span>
          </button>
        </div>
      </footer>

      {/* =========================================================================
          CONFIRMATION MODAL: END CONSULTATION
      ========================================================================= */}
      {showEndCallModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-14 h-14 rounded-2xl bg-rose-600/20 border border-rose-500/30 text-rose-500 flex items-center justify-center mx-auto">
              <PhoneOff className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">End Consultation?</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                Ending the call will disconnect the video session with <span className="text-white font-semibold">{doctor.name}</span> and generate your official digitally-signed E-Prescription.
              </p>
            </div>

            <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-white/5 text-left text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-300">
                <span>Duration:</span>
                <span className="font-mono font-bold text-emerald-400">{formatTimer(secondsElapsed)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Attending Doctor:</span>
                <span className="font-semibold text-white">{doctor.name}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Status:</span>
                <span className="text-emerald-400 font-bold">Ready for Prescription</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowEndCallModal(false)}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-colors border border-white/10"
              >
                Continue Call
              </button>
              <button
                onClick={handleEndCall}
                className="py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-rose-600/30 transition-all hover:scale-105"
              >
                End & Get Rx
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
