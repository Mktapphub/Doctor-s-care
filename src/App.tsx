import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { MobileTopBar } from './components/MobileTopBar';
import { MobileTabBar } from './components/MobileTabBar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';

// Pages
import { HomePage } from './pages/HomePage';
import { DoctorsPage } from './pages/DoctorsPage';
import { DoctorProfilePage } from './pages/DoctorProfilePage';
import { BookingPage } from './pages/BookingPage';
import { ConsultationRoomPage } from './pages/ConsultationRoomPage';
import { PrescriptionPage } from './pages/PrescriptionPage';
import { PatientDashboardPage } from './pages/PatientDashboardPage';
import { HomeDiagnosticPage } from './pages/HomeDiagnosticPage';
import { HealthPackagesPage } from './pages/HealthPackagesPage';
import { CorporatePage } from './pages/CorporatePage';
import { BlogPage } from './pages/BlogPage';
import { DoctorDashboardPage } from './pages/DoctorDashboardPage';
import { AdminPanelPage } from './pages/AdminPanelPage';
import { FAQPage, AboutPage, ContactPage, TermsPage, PrivacyPage } from './pages/StaticPages';
import { JoinDoctorPage } from './pages/JoinDoctorPage';
import { HospitalPartnersPage } from './pages/HospitalPartnersPage';
import { HealthcareITServicesPage } from './pages/HealthcareITServicesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { LoginPage } from './pages/LoginPage';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isVideoRoom = location.pathname.startsWith('/room/');
  const isHomePage = location.pathname === '/';
  const isDoctorsPage = location.pathname.startsWith('/doctors') || location.pathname.startsWith('/consultation');

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      {/* Top Bars (hidden on Homepage to strictly comply with 10-section spec, and in video room) */}
      {!isVideoRoom && !isHomePage && (
        <>
          <Header />
          <MobileTopBar />
        </>
      )}

      {/* Main Page Body */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/consultation" element={<DoctorsPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/doctor/:id" element={<DoctorProfilePage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/room/:appointmentId" element={<ConsultationRoomPage />} />
          <Route path="/prescription/:id" element={<PrescriptionPage />} />
          <Route path="/dashboard" element={<PatientDashboardPage />} />
          <Route path="/diagnostic" element={<HomeDiagnosticPage />} />
          <Route path="/packages" element={<HealthPackagesPage />} />
          <Route path="/corporate" element={<CorporatePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboardPage />} />
          <Route path="/admin" element={<AdminPanelPage />} />
          <Route path="/join-doctor" element={<JoinDoctorPage />} />
          <Route path="/doctor-register" element={<JoinDoctorPage />} />
          <Route path="/hospital-partners" element={<HospitalPartnersPage />} />
          <Route path="/it-services" element={<HealthcareITServicesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          {/* Fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Global Bottom Footer (hidden on Homepage and video room) */}
      {!isVideoRoom && !isHomePage && <Footer />}

      {/* Mobile Fixed Bottom Tab Bar (hidden on Homepage and video room) */}
      {!isVideoRoom && !isHomePage && <MobileTabBar />}

      {/* Global Authentication Modal */}
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppLayout />
      </AppProvider>
    </BrowserRouter>
  );
}
