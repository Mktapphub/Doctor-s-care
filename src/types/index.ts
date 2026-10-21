export type Language = 'en' | 'bn';

export type UserRole = 'patient' | 'doctor' | 'admin';

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  avatar?: string;
  bmdcNumber?: string; // For doctors
  speciality?: string;
  isOnline?: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  bmdcNumber: string;
  speciality: string;
  specialityCode: string;
  degrees: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  fee: number;
  isOnline: boolean;
  avatar: string;
  hospital: string;
  languages: string[];
  about: string;
  gender: 'male' | 'female';
  availableToday: boolean;
  nextAvailableSlot: string;
  consultationTypes: ('video' | 'audio' | 'chat')[];
}

export interface ConsultationSlot {
  id: string;
  time: string;
  period: 'morning' | 'afternoon' | 'evening';
  available: boolean;
}

export interface PatientInfo {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  relationship: 'Self' | 'Spouse' | 'Child' | 'Parent' | 'Other';
  phone: string;
  symptoms: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpeciality: string;
  doctorAvatar: string;
  doctorBmdc: string;
  patient: PatientInfo;
  date: string;
  time: string;
  consultationType: 'video' | 'audio' | 'chat';
  fee: number;
  paymentMethod: 'bKash' | 'Nagad' | 'Rocket' | 'Card';
  paymentStatus: 'paid' | 'pending';
  status: 'upcoming' | 'completed' | 'cancelled';
  createdAt: string;
  prescriptionId?: string;
}

export interface PrescriptionItem {
  medicineName: string;
  strength: string;
  dosage: string; // e.g. 1+0+1
  duration: string; // e.g. 7 days
  instruction: string; // e.g. After meal
}

export interface Prescription {
  id: string;
  appointmentId: string;
  doctorId: string;
  doctorName: string;
  doctorDegrees: string;
  doctorBmdc: string;
  doctorHospital: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  date: string;
  diagnosis: string;
  vitals: {
    bloodPressure?: string;
    temperature?: string;
    weight?: string;
    pulse?: string;
  };
  medicines: PrescriptionItem[];
  investigations: string[];
  advice: string[];
  nextFollowUp: string;
}

export interface DiagnosticTest {
  id: string;
  code: string;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  sampleType: string;
  tatHours: number; // Turnaround time in hours
  description: string;
  fastingRequired: boolean;
}

export interface DiagnosticOrder {
  id: string;
  patientName: string;
  phone: string;
  address: string;
  division: string;
  area: string;
  date: string;
  timeSlot: string;
  items: DiagnosticTest[];
  totalAmount: number;
  paymentMethod: string;
  status: 'Sample Collector Assigned' | 'Sample Collected' | 'Processing in Lab' | 'Report Ready';
  createdAt: string;
}

export interface HealthPackage {
  id: string;
  name: string;
  tagline: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  features: string[];
  isPopular?: boolean;
  memberCount: string;
  consultationLimit: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  authorName: string;
  authorTitle: string;
  date: string;
  readTime: string;
  imageUrl: string;
}
