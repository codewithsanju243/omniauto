import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { SOSModal } from './components/SOSModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { UserProfileModal } from './components/UserProfileModal';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { LiveAssistance } from './pages/LiveAssistance';
import { MyCars } from './pages/MyCars';
import { ServiceHistory } from './pages/ServiceHistory';
import { 
  Car, 
  Wrench, 
  Compass, 
  ShieldAlert, 
  PhoneCall, 
  Radio, 
  MapPin, 
  Sparkles,
  Heart
} from 'lucide-react';

const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { setSosModalOpen, activeBooking } = useApp();

  const items = [
    { label: 'Home', path: '/', icon: Car },
    { label: 'Services', path: '/services', icon: Wrench },
    { label: 'Live GPS', path: '/live-assistance', icon: Compass, pulse: !!activeBooking },
    { label: 'Garage', path: '/my-cars', icon: Car },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-950/90 backdrop-blur-2xl border-t border-white/10 px-4 py-2 flex items-center justify-around shadow-2xl">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all relative ${
              isActive ? 'text-brand-yellow font-extrabold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-brand-yellow' : 'text-slate-400'}`} />
            <span className="text-[10px] font-medium tracking-tight">{item.label}</span>
            {item.pulse && (
              <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-red-500 animate-ping" />
            )}
          </Link>
        );
      })}

      {/* Floating Center SOS Button */}
      <button
        onClick={() => setSosModalOpen(true)}
        className="flex flex-col items-center justify-center -mt-6 w-13 h-13 p-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-glow-red hover:scale-110 active:scale-95 transition-all"
        title="Emergency SOS"
      >
        <PhoneCall className="w-5 h-5 animate-pulse" />
        <span className="text-[9px] font-black tracking-widest mt-0.5">SOS</span>
      </button>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-surface-950/80 mt-20 text-slate-400 text-xs py-12 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-brand-yellow flex items-center justify-center text-black font-black">
                <ShieldAlert className="w-4 h-4 text-black" />
              </div>
              <span className="font-display font-black text-xl text-white">AUTO SOS</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Next-generation 24/7 intelligent automotive roadside assistance, towing logistics, and on-demand mobile repair fleet.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">Rescue Services</h4>
            <ul className="space-y-2">
              <li><Link to="/services" className="hover:text-brand-yellow">Emergency Towing (Flatbed)</Link></li>
              <li><Link to="/services" className="hover:text-brand-yellow">Mobile EV Fast Charging</Link></li>
              <li><Link to="/services" className="hover:text-brand-yellow">Flat Tyre Puncture Patrol</Link></li>
              <li><Link to="/services" className="hover:text-brand-yellow">12V Battery Jumpstart</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">Coverage & Fleet</h4>
            <ul className="space-y-2">
              <li><span className="text-slate-300">Seattle Metro Area</span></li>
              <li><span className="text-slate-300">Queen Anne & Highland</span></li>
              <li><span className="text-slate-300">Downtown & Capitol Hill</span></li>
              <li><span className="text-slate-300">Bellevue & Eastside</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">Emergency Hotline</h4>
            <div className="p-4 rounded-2xl bg-surface-900 border border-brand-yellow/30 space-y-2">
              <div className="flex items-center gap-2 text-brand-yellow font-mono font-bold text-sm">
                <PhoneCall className="w-4 h-4 text-brand-yellow" />
                <span>1-800-AUTO-SOS</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Direct satellite relay to Seattle central dispatch coordinator
              </p>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © 2026 OmniAuto Tech Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Driver Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background-dark text-slate-100 selection:bg-brand-yellow selection:text-black">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/live-assistance" element={<LiveAssistance />} />
          <Route path="/my-cars" element={<MyCars />} />
          <Route path="/history" element={<ServiceHistory />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
      <MobileBottomNav />

      {/* Global Modals & Drawers */}
      <SOSModal />
      <NotificationDrawer />
      <UserProfileModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </Router>
  );
};

export default App;
