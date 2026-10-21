import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, User, Appointment, DiagnosticTest, DiagnosticOrder, UserRole } from '../types';
import { translations } from '../data/translations';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
  currentUser: User | null;
  login: (role: UserRole, phone: string, name?: string) => void;
  logout: () => void;
  authModalOpen: boolean;
  openAuthModal: (preferredRole?: UserRole) => void;
  closeAuthModal: () => void;
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  cancelAppointment: (id: string) => void;
  diagnosticCart: DiagnosticTest[];
  addToCart: (test: DiagnosticTest) => void;
  removeFromCart: (testId: string) => void;
  clearCart: () => void;
  diagnosticOrders: DiagnosticOrder[];
  addDiagnosticOrder: (order: DiagnosticOrder) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeMobileTab: string;
  setActiveMobileTab: (tab: string) => void;
  mobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_USER: User = {
  id: 'usr-default',
  name: 'Rafiq Ahmed',
  phone: '01711223344',
  email: 'rafiq.ahmed@example.com',
  role: 'patient',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
};

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-001',
    doctorId: 'doc-2',
    doctorName: 'Dr. Tanvir Rahman',
    doctorSpeciality: 'General Physician',
    doctorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    doctorBmdc: 'A-56219',
    patient: {
      name: 'Rafiq Ahmed',
      age: 38,
      gender: 'male',
      relationship: 'Self',
      phone: '01711223344',
      symptoms: 'High fever (102F), body ache, and mild headache for 2 days.',
    },
    date: 'Today',
    time: '04:30 PM',
    consultationType: 'video',
    fee: 450,
    paymentMethod: 'bKash',
    paymentStatus: 'paid',
    status: 'upcoming',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'apt-002',
    doctorId: 'doc-1',
    doctorName: 'Farjana Akter',
    doctorSpeciality: 'Nutritionist',
    doctorAvatar: 'https://images.unsplash.com/photo-1594824813589-2911b33e4b47?auto=format&fit=crop&q=80&w=400',
    doctorBmdc: 'A-74892',
    patient: {
      name: 'Nusrat Ahmed (Spouse)',
      age: 34,
      gender: 'female',
      relationship: 'Spouse',
      phone: '01711223344',
      symptoms: 'Post-pregnancy dietary guidance & gestational diabetes maintenance.',
    },
    date: '12 Oct, 2026',
    time: '11:00 AM',
    consultationType: 'video',
    fee: 550,
    paymentMethod: 'bKash',
    paymentStatus: 'paid',
    status: 'completed',
    createdAt: '2026-10-12T11:00:00.000Z',
    prescriptionId: 'RX-98214',
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('dc_lang');
    return (saved === 'bn' || saved === 'en') ? saved : 'en';
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('dc_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('dc_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [diagnosticCart, setDiagnosticCart] = useState<DiagnosticTest[]>(() => {
    const saved = localStorage.getItem('dc_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [diagnosticOrders, setDiagnosticOrders] = useState<DiagnosticOrder[]>(() => {
    const saved = localStorage.getItem('dc_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: 'ORD-78192',
        patientName: 'Rafiq Ahmed',
        phone: '01711223344',
        address: 'House 42, Road 11, Block D, Banani',
        division: 'Dhaka',
        area: 'Banani',
        date: 'Tomorrow',
        timeSlot: '08:00 AM - 10:00 AM',
        items: [
          {
            id: 'test-cbc',
            code: 'LAB-101',
            name: 'Complete Blood Count (CBC) with ESR',
            category: 'Hematology',
            price: 450,
            sampleType: 'Blood (EDTA)',
            tatHours: 12,
            description: 'Vital for infection and anemia.',
            fastingRequired: false,
          }
        ],
        totalAmount: 450,
        paymentMethod: 'bKash',
        status: 'Sample Collector Assigned',
        createdAt: '2026-10-18T09:15:00.000Z',
      }
    ];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeMobileTab, setActiveMobileTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const openMobileMenu = () => setMobileMenuOpen(true);
  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

  useEffect(() => {
    localStorage.setItem('dc_lang', language);
  }, [language]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('dc_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('dc_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('dc_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('dc_cart', JSON.stringify(diagnosticCart));
  }, [diagnosticCart]);

  useEffect(() => {
    localStorage.setItem('dc_orders', JSON.stringify(diagnosticOrders));
  }, [diagnosticOrders]);

  const toggleLanguage = () => {
    setLanguageState(prev => prev === 'en' ? 'bn' : 'en');
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const openAuthModal = () => {
    window.location.href = '/login';
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const login = (role: UserRole, phone: string, name?: string) => {
    let user: User;
    if (role === 'doctor') {
      user = {
        id: 'doc-logged-in',
        name: name || 'Dr. Tanvir Rahman',
        phone,
        email: 'dr.tanvir@doctorscare.bd',
        role: 'doctor',
        bmdcNumber: 'A-56219',
        speciality: 'General Physician',
        isOnline: true,
        avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
      };
    } else if (role === 'admin') {
      user = {
        id: 'adm-01',
        name: name || 'Operations Admin',
        phone,
        email: 'admin@doctorscare.bd',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
      };
    } else {
      user = {
        id: 'usr-' + Date.now(),
        name: name || 'Patient User',
        phone,
        email: 'patient@doctorscare.bd',
        role: 'patient',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      };
    }
    setCurrentUser(user);
    closeAuthModal();
    showToast(`Logged in successfully as ${user.name}`);
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Logged out of Doctor\'s care', 'info');
  };

  const addAppointment = (appointment: Appointment) => {
    setAppointments(prev => [appointment, ...prev]);
    showToast('Appointment booked successfully! Confirmation SMS sent.', 'success');
  };

  const cancelAppointment = (id: string) => {
    setAppointments(prev =>
      prev.map(apt => apt.id === id ? { ...apt, status: 'cancelled' } : apt)
    );
    showToast('Appointment cancelled.', 'info');
  };

  const addToCart = (test: DiagnosticTest) => {
    if (diagnosticCart.some(item => item.id === test.id)) {
      showToast(`${test.name} is already in your test cart.`, 'info');
      return;
    }
    setDiagnosticCart(prev => [...prev, test]);
    showToast(`Added ${test.name} to Home Diagnostic Cart!`, 'success');
  };

  const removeFromCart = (testId: string) => {
    setDiagnosticCart(prev => prev.filter(t => t.id !== testId));
    showToast('Test removed from cart.', 'info');
  };

  const clearCart = () => {
    setDiagnosticCart([]);
  };

  const addDiagnosticOrder = (order: DiagnosticOrder) => {
    setDiagnosticOrders(prev => [order, ...prev]);
    clearCart();
    showToast('Diagnostic sample collection booked! Our technician will call you.', 'success');
  };

  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        language,
        toggleLanguage,
        setLanguage,
        t,
        currentUser,
        login,
        logout,
        authModalOpen,
        openAuthModal,
        closeAuthModal,
        appointments,
        addAppointment,
        cancelAppointment,
        diagnosticCart,
        addToCart,
        removeFromCart,
        clearCart,
        diagnosticOrders,
        addDiagnosticOrder,
        searchQuery,
        setSearchQuery,
        activeMobileTab,
        setActiveMobileTab,
        mobileMenuOpen,
        openMobileMenu,
        closeMobileMenu,
        toggleMobileMenu,
        toasts,
        showToast,
      }}
    >
      {children}
      {/* Toast Notification Container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all transform duration-200 flex items-center justify-between ${
              toast.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : toast.type === 'error'
                ? 'bg-rose-50 border-rose-200 text-rose-900'
                : 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
            }`}
          >
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
