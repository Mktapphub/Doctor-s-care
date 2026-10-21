import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Stethoscope,
  Users,
  Calendar,
  CheckCircle,
  Video,
  FilePlus,
  DollarSign,
  Clock,
  ShieldCheck,
  Plus,
  Trash2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DoctorDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useApp();

  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState<'queue' | 'write-rx' | 'earnings'>('queue');

  // Write prescription states
  const [rxPatientName, setRxPatientName] = useState('Anisur Rahman');
  const [rxPatientAge, setRxPatientAge] = useState(42);
  const [rxDiagnosis, setRxDiagnosis] = useState('Acute Bronchitis & Allergic Rhinitis');
  const [rxMedicines, setRxMedicines] = useState([
    { name: 'Tab. Azithromycin', strength: '500mg', dosage: '1+0+0', duration: '5 days', instruction: 'After lunch' },
    { name: 'Tab. Montelukast', strength: '10mg', dosage: '0+0+1', duration: '14 days', instruction: 'At bedtime' },
  ]);
  const [newMedName, setNewMedName] = useState('');
  const [newMedDose, setNewMedDose] = useState('1+0+1');
  const [newMedDuration, setNewMedDuration] = useState('7 days');

  const todayQueue = [
    {
      id: 'Q-1',
      patientName: 'Anisur Rahman',
      age: 42,
      gender: 'Male',
      type: 'Video Consultation',
      symptoms: 'Persistent dry cough and chest tightness for 4 days.',
      time: 'In Queue (Ready)',
      status: 'waiting',
    },
    {
      id: 'Q-2',
      patientName: 'Farhana Sultana',
      age: 29,
      gender: 'Female',
      type: 'Follow-up Call',
      symptoms: 'Review CBC report and platelet count update.',
      time: '05:00 PM',
      status: 'scheduled',
    },
    {
      id: 'Q-3',
      patientName: 'Kamal Hossain',
      age: 55,
      gender: 'Male',
      type: 'General Video',
      symptoms: 'Blood pressure reading fluctuation (150/95).',
      time: '05:30 PM',
      status: 'scheduled',
    },
  ];

  const handleAddMedicine = () => {
    if (!newMedName.trim()) return;
    setRxMedicines((prev) => [
      ...prev,
      {
        name: newMedName,
        strength: 'Standard',
        dosage: newMedDose,
        duration: newMedDuration,
        instruction: 'After meal',
      },
    ]);
    setNewMedName('');
    showToast('Medicine added to prescription list.', 'info');
  };

  const handleSaveRx = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Digital prescription signed & issued to patient successfully!', 'success');
    navigate('/prescription/RX-NEW-DOC?doctor=doc-2');
  };

  return (
    <div className="min-h-screen bg-slate-50/70 py-8 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Doctor Portal Header Bar */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300"
                alt="Doctor Profile"
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900">Dr. Tanvir Rahman</h1>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    BMDC A-56219
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  General Physician · Bangabandhu Sheikh Mujib Medical University (BSMMU)
                </p>
              </div>
            </div>

            {/* Online / Offline Availability Switch */}
            <div className="flex items-center gap-4 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-slate-700">
                Live Status: <span className={isOnline ? 'text-emerald-600 font-extrabold' : 'text-slate-400 font-bold'}>{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
              </span>
              <button
                onClick={() => {
                  setIsOnline(!isOnline);
                  showToast(isOnline ? 'You are now OFFLINE' : 'You are now ONLINE for instant patients', 'info');
                }}
                className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                  isOnline ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                    isOnline ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100 text-center">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-xs text-slate-500">Today&apos;s Patients</p>
              <p className="text-xl font-black text-slate-900 mt-0.5">14</p>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-900">
              <p className="text-xs text-emerald-700">In Waiting Queue</p>
              <p className="text-xl font-black mt-0.5">3 Patients</p>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-900">
              <p className="text-xs text-emerald-700">Monthly Consultations</p>
              <p className="text-xl font-black mt-0.5">184</p>
            </div>
            <div className="p-3 rounded-2xl bg-purple-50 border border-purple-100 text-purple-900">
              <p className="text-xs text-purple-700">Monthly Earnings</p>
              <p className="text-xl font-black mt-0.5">৳74,200</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 mt-6 gap-6 text-xs font-bold">
            <button
              onClick={() => setActiveTab('queue')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'queue' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500'
              }`}
            >
              Today&apos;s Patient Queue (3)
            </button>
            <button
              onClick={() => setActiveTab('write-rx')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'write-rx' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500'
              }`}
            >
              Write E-Prescription Form
            </button>
            <button
              onClick={() => setActiveTab('earnings')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'earnings' ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-500'
              }`}
            >
              Earnings & Settlement
            </button>
          </div>
        </div>

        {/* TAB 1: TODAY'S QUEUE */}
        {activeTab === 'queue' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900">Incoming Patient Video Call Queue</h2>
            <div className="space-y-3">
              {todayQueue.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">{item.patientName}</h3>
                      <span className="text-xs text-slate-500">({item.age} Yrs · {item.gender})</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">Chief Complaint: {item.symptoms}</p>
                    <p className="text-[11px] font-semibold text-emerald-700 mt-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {item.time}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/room/apt-doctor-call?doctor=doc-2`)}
                      className="px-4 py-2.5 bg-[#1565D8] hover:bg-[#0D47A1] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm"
                    >
                      <Video className="w-4 h-4" />
                      <span>Start Video Call</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('write-rx')}
                      className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
                    >
                      Write Rx
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: WRITE PRESCRIPTION FORM */}
        {activeTab === 'write-rx' && (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs">
            <h2 className="text-base font-bold text-slate-900 mb-1">Create Digital E-Prescription</h2>
            <p className="text-xs text-slate-500 mb-6">Prescription will be cryptographically signed and sent to patient&apos;s app</p>

            <form onSubmit={handleSaveRx} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Patient Name *</label>
                  <input
                    type="text"
                    value={rxPatientName}
                    onChange={(e) => setRxPatientName(e.target.value)}
                    className="w-full h-10 px-3 text-xs border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Patient Age</label>
                  <input
                    type="number"
                    value={rxPatientAge}
                    onChange={(e) => setRxPatientAge(Number(e.target.value))}
                    className="w-full h-10 px-3 text-xs border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Diagnosis / Clinical Impression *</label>
                  <input
                    type="text"
                    value={rxDiagnosis}
                    onChange={(e) => setRxDiagnosis(e.target.value)}
                    className="w-full h-10 px-3 text-xs border rounded-xl"
                  />
                </div>
              </div>

              {/* Medicine List Table */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Prescribed Medicines
                </label>
                <div className="border border-slate-200 rounded-2xl overflow-hidden mb-4">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600">
                      <tr>
                        <th className="p-3">Medicine</th>
                        <th className="p-3">Dosage</th>
                        <th className="p-3">Duration</th>
                        <th className="p-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {rxMedicines.map((m, idx) => (
                        <tr key={idx}>
                          <td className="p-3 font-bold text-slate-900">{m.name} ({m.strength})</td>
                          <td className="p-3 font-semibold text-emerald-700">{m.dosage}</td>
                          <td className="p-3 text-slate-600">{m.duration}</td>
                          <td className="p-3">
                            <button
                              type="button"
                              onClick={() => setRxMedicines(rxMedicines.filter((_, i) => i !== idx))}
                              className="text-rose-500 hover:text-rose-700"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Add Medicine Inline Row */}
                <div className="flex flex-col sm:flex-row gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <input
                    type="text"
                    value={newMedName}
                    onChange={(e) => setNewMedName(e.target.value)}
                    placeholder="Search medicine brand (e.g. Tab. Napa 500mg, Cap. Seclo 20mg)..."
                    className="flex-1 h-9 px-3 text-xs bg-white border border-slate-200 rounded-xl"
                  />
                  <input
                    type="text"
                    value={newMedDose}
                    onChange={(e) => setNewMedDose(e.target.value)}
                    placeholder="Dosage (1+0+1)"
                    className="w-28 h-9 px-2 text-xs bg-white border border-slate-200 rounded-xl font-mono text-center"
                  />
                  <input
                    type="text"
                    value={newMedDuration}
                    onChange={(e) => setNewMedDuration(e.target.value)}
                    placeholder="Duration"
                    className="w-28 h-9 px-2 text-xs bg-white border border-slate-200 rounded-xl text-center"
                  />
                  <button
                    type="button"
                    onClick={handleAddMedicine}
                    className="px-4 h-9 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Sign & Issue E-Prescription</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: EARNINGS & SETTLEMENT */}
        {activeTab === 'earnings' && (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs space-y-6">
            <h2 className="text-base font-bold text-slate-900">Earnings & Bank Settlement</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100">
                <span className="text-xs text-emerald-800 font-bold">Total Withdrawn</span>
                <p className="text-2xl font-black text-emerald-900 mt-1">৳420,000</p>
                <p className="text-[11px] text-emerald-700 mt-1">Paid to City Bank A/C</p>
              </div>
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100">
                <span className="text-xs text-emerald-800 font-bold">Current Cycle Balance</span>
                <p className="text-2xl font-black text-emerald-900 mt-1">৳74,200</p>
                <p className="text-[11px] text-emerald-700 mt-1">Settlement scheduled on 25th Oct</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs text-slate-600 font-bold">Consultation Rate</span>
                <p className="text-2xl font-black text-slate-900 mt-1">৳450</p>
                <p className="text-[11px] text-slate-500 mt-1">85% Doctor Share / 15% Platform</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
