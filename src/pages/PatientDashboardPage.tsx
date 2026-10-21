import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Video,
  FileText,
  User,
  Users,
  FlaskConical,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  ExternalLink,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PatientDashboardPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { currentUser, appointments, cancelAppointment, diagnosticOrders, showToast } = useApp();

  const tabFromUrl = searchParams.get('tab') || 'consultations';
  const [activeTab, setActiveTab] = useState<'consultations' | 'family' | 'orders' | 'records'>(
    tabFromUrl as any
  );

  // Family members list
  const [familyMembers, setFamilyMembers] = useState([
    { id: 'fm-1', name: 'Nusrat Ahmed', relation: 'Spouse', age: 34, gender: 'Female', phone: '01711223344' },
    { id: 'fm-2', name: 'Ayaan Ahmed', relation: 'Child', age: 6, gender: 'Male', phone: '01711223344' },
    { id: 'fm-3', name: 'Alhaj M. Hossain', relation: 'Parent', age: 68, gender: 'Male', phone: '01819334455' },
  ]);

  const [newMemberModal, setNewMemberModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRelation, setNewMemberRelation] = useState('Spouse');
  const [newMemberAge, setNewMemberAge] = useState(30);
  const [newMemberGender, setNewMemberGender] = useState('Female');

  const handleAddFamilyMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;
    const newMember = {
      id: 'fm-' + Date.now(),
      name: newMemberName,
      relation: newMemberRelation,
      age: Number(newMemberAge),
      gender: newMemberGender,
      phone: currentUser?.phone || '01711223344',
    };
    setFamilyMembers((prev) => [...prev, newMember]);
    setNewMemberModal(false);
    setNewMemberName('');
    showToast(`Added ${newMember.name} to your family list!`, 'success');
  };

  const upcomingConsultations = appointments.filter((a) => a.status === 'upcoming');
  const pastConsultations = appointments.filter((a) => a.status !== 'upcoming');

  return (
    <div className="min-h-screen bg-slate-50/70 py-8 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* User Greeting & Profile Top Box */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'}
                alt={currentUser?.name || 'Patient'}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                    {currentUser?.name || 'Rafiq Ahmed'}
                  </h1>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    Active Member
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Phone: {currentUser?.phone || '01711223344'} · ID: PAT-9082
                </p>
                <div className="mt-2 flex items-center gap-3 text-xs text-slate-600">
                  <span className="font-semibold text-emerald-700">Family Shield Subscriber</span>
                  <span>·</span>
                  <span>Dhaka, Bangladesh</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/doctors"
                className="px-5 py-2.5 bg-[#059669] hover:bg-[#0D47A1] text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>New Doctor Consultation</span>
              </Link>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 mt-8 gap-6 overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setActiveTab('consultations')}
              className={`pb-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'consultations'
                  ? 'border-[#059669] text-[#059669]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Consultations ({appointments.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'orders'
                  ? 'border-[#059669] text-[#059669]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FlaskConical className="w-4 h-4" />
              <span>Diagnostic Orders ({diagnosticOrders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('family')}
              className={`pb-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'family'
                  ? 'border-[#059669] text-[#059669]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Family Members ({familyMembers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('records')}
              className={`pb-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'records'
                  ? 'border-[#059669] text-[#059669]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Prescriptions Vault</span>
            </button>
          </div>
        </div>

        {/* TAB 1: CONSULTATIONS (Upcoming & Past) */}
        {activeTab === 'consultations' && (
          <div className="space-y-8">
            {/* Upcoming Appointments */}
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Upcoming Doctor Appointments</span>
              </h2>

              {upcomingConsultations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcomingConsultations.map((apt) => (
                    <div
                      key={apt.id}
                      className="bg-white rounded-3xl border border-emerald-200/90 p-5 shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={apt.doctorAvatar}
                              alt={apt.doctorName}
                              referrerPolicy="no-referrer"
                              className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                            />
                            <div>
                              <span className="text-[10px] font-bold uppercase bg-emerald-100 text-[#059669] px-2 py-0.5 rounded">
                                {apt.doctorSpeciality}
                              </span>
                              <h3 className="text-sm font-bold text-slate-900 mt-1">{apt.doctorName}</h3>
                              <p className="text-[11px] text-slate-500">BMDC: {apt.doctorBmdc}</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                            Paid ৳{apt.fee}
                          </span>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-500">Scheduled Time:</span>
                            <strong className="text-slate-900">{apt.date}, {apt.time}</strong>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-500">Patient:</span>
                            <strong className="text-slate-900">{apt.patient.name} ({apt.patient.age} Yrs)</strong>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-500">Mode:</span>
                            <strong className="capitalize text-emerald-700">{apt.consultationType} Call</strong>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/room/${apt.id}?doctor=${apt.doctorId}`)}
                          className="flex-1 py-2.5 bg-[#059669] hover:bg-[#0D47A1] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20"
                        >
                          <Video className="w-4 h-4" />
                          <span>Join Video Consultation</span>
                        </button>
                        <button
                          onClick={() => cancelAppointment(apt.id)}
                          className="px-3 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-slate-200/80 p-8 text-center">
                  <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-700">No upcoming consultations</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Need a doctor? Connect with a verified specialist in 10 minutes.</p>
                  <Link
                    to="/doctors"
                    className="mt-3 inline-block px-4 py-2 bg-emerald-50 text-[#059669] font-bold text-xs rounded-xl"
                  >
                    Find a Doctor
                  </Link>
                </div>
              )}
            </div>

            {/* Past Consultations */}
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-4">
                Past Consultation History
              </h2>

              <div className="space-y-3">
                {pastConsultations.map((apt) => (
                  <div
                    key={apt.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={apt.doctorAvatar}
                        alt={apt.doctorName}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-xl object-cover bg-slate-100"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{apt.doctorName}</h4>
                        <p className="text-[11px] text-slate-500">{apt.doctorSpeciality} · {apt.date}</p>
                        <p className="text-[11px] text-slate-600">Patient: {apt.patient.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/prescription/${apt.prescriptionId || 'RX-98214'}?doctor=${apt.doctorId}`)}
                        className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-[#059669] text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View Prescription</span>
                      </button>

                      <button
                        onClick={() => navigate(`/booking/${apt.doctorId}`)}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
                      >
                        Re-book
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DIAGNOSTIC ORDERS WITH TRACKING */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">Doorstep Diagnostic Test Orders</h2>
                <p className="text-xs text-slate-500">Live status of sample collection and lab reports</p>
              </div>
              <Link
                to="/diagnostic"
                className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                + Book Another Lab Test
              </Link>
            </div>

            <div className="space-y-4">
              {diagnosticOrders.map((ord) => (
                <div key={ord.id} className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                        {ord.id}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 mt-1">
                        Doorstep Sample Collection: {ord.date} ({ord.timeSlot})
                      </h3>
                      <p className="text-xs text-slate-500">{ord.address}, {ord.area}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-slate-900">৳{ord.totalAmount}</span>
                      <span className="text-xs text-emerald-600 font-bold block">Paid via {ord.paymentMethod}</span>
                    </div>
                  </div>

                  {/* 4-Stage Progress Stepper */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-2">
                      Collection & Report Status: <span className="text-emerald-700">{ord.status}</span>
                    </label>
                    <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                      <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200">
                        1. Phlebotomist Assigned
                      </div>
                      <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200">
                        2. Sample Collection
                      </div>
                      <div className="p-2 rounded-xl bg-slate-100 text-slate-500 border border-slate-200">
                        3. Lab Processing
                      </div>
                      <div className="p-2 rounded-xl bg-slate-100 text-slate-500 border border-slate-200">
                        4. Report Ready
                      </div>
                    </div>
                  </div>

                  {/* Items in order */}
                  <div className="bg-slate-50 p-3 rounded-2xl text-xs space-y-1.5">
                    {ord.items.map((it) => (
                      <div key={it.id} className="flex justify-between font-medium">
                        <span>{it.name} ({it.sampleType})</span>
                        <span className="font-bold">৳{it.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: FAMILY MEMBERS */}
        {activeTab === 'family' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">Family Members</h2>
                <p className="text-xs text-slate-500">Covered under your subscription for consultations & lab tests</p>
              </div>
              <button
                onClick={() => setNewMemberModal(true)}
                className="px-4 py-2 bg-[#059669] hover:bg-[#0D47A1] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Family Member</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {familyMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase bg-emerald-100 text-[#059669] px-2 py-0.5 rounded">
                        {member.relation}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">{member.name}</h4>
                      <p className="text-xs text-slate-500">{member.age} Years · {member.gender}</p>
                    </div>
                    <User className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">{member.phone}</span>
                    <button
                      onClick={() => navigate('/doctors')}
                      className="text-xs font-bold text-[#059669] hover:underline"
                    >
                      Book for {member.relation} →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PRESCRIPTIONS VAULT */}
        {activeTab === 'records' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-slate-900">Digital Health Records & Prescriptions</h2>
              <p className="text-xs text-slate-500">Access all past doctor prescriptions, lab test PDFs, and advice anytime</p>
            </div>

            <div className="space-y-3">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#059669] flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">E-Prescription #RX-98214 (Viral Pyrexia)</h4>
                    <p className="text-[11px] text-slate-500">Dr. Tanvir Rahman · 12 Oct 2026</p>
                  </div>
                </div>
                <Link
                  to="/prescription/RX-98214?doctor=doc-2"
                  className="px-3.5 py-2 bg-emerald-50 text-[#059669] font-bold text-xs rounded-xl hover:bg-emerald-100 flex items-center gap-1"
                >
                  <span>View & Download</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-2xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <FlaskConical className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Lab Report: Complete Blood Count (CBC)</h4>
                    <p className="text-[11px] text-slate-500">Doctor&apos;s care Diagnostics Lab Dhaka · 08 Oct 2026</p>
                  </div>
                </div>
                <button
                  onClick={() => showToast('Opening CBC Lab Report PDF...', 'info')}
                  className="px-3.5 py-2 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-xl hover:bg-emerald-100 flex items-center gap-1"
                >
                  <span>Download Lab PDF</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Family Member Modal */}
      {newMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-base font-bold text-slate-900 mb-1">Add Family Member</h3>
            <p className="text-xs text-slate-500 mb-4">Add your child, spouse, or parents to book consultations easily.</p>

            <form onSubmit={handleAddFamilyMember} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="e.g. Farhan Ahmed"
                  className="w-full h-10 px-3 text-xs border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Relationship</label>
                  <select
                    value={newMemberRelation}
                    onChange={(e) => setNewMemberRelation(e.target.value)}
                    className="w-full h-10 px-2 text-xs border rounded-xl"
                  >
                    <option value="Spouse">Spouse</option>
                    <option value="Child">Child</option>
                    <option value="Parent">Parent</option>
                    <option value="Sibling">Sibling</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Age (Years)</label>
                  <input
                    type="number"
                    value={newMemberAge}
                    onChange={(e) => setNewMemberAge(Number(e.target.value))}
                    className="w-full h-10 px-3 text-xs border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Male', 'Female'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setNewMemberGender(g)}
                      className={`h-9 rounded-xl border text-xs font-semibold ${
                        newMemberGender === g ? 'border-[#047857] bg-emerald-50 text-[#047857]' : 'border-slate-200'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewMemberModal(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#059669] text-white text-xs font-bold rounded-xl"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
