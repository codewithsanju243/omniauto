import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Bell, 
  User, 
  MapPin, 
  Search, 
  ShieldAlert, 
  Car, 
  Wrench, 
  Compass, 
  History, 
  Menu, 
  X,
  ChevronDown,
  PhoneCall
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { 
    currentLocation, 
    unreadNotificationsCount, 
    setNotificationDrawerOpen, 
    setUserProfileOpen, 
    setSosModalOpen,
    activeBooking,
    searchQuery,
    setSearchQuery,
    selectedCar
  } = useApp();

  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/', icon: Car },
    { label: 'Services', path: '/services', icon: Wrench },
    { label: 'My Cars', path: '/my-cars', icon: Car, badge: '5' },
    { 
      label: 'Live Assistance', 
      path: '/live-assistance', 
      icon: Compass, 
      pulse: !!activeBooking,
      badge: activeBooking ? 'LIVE' : undefined 
    },
    { label: 'History', path: '/history', icon: History },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/services?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchFocused(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background-dark/85 border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center h-11 px-2 py-1 bg-white/95 rounded-2xl border border-white/20 shadow-glow-gold transition-transform group-hover:scale-105">
                <img 
                  src="assets/Logo.png" 
                  alt="OmniAutoTech Logo" 
                  className="h-8 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black text-xl sm:text-2xl tracking-wider bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                    OmniAuto
                  </span>
                  <span className="font-display font-black text-xl sm:text-2xl tracking-wider text-brand-yellow">
                    Tech
                  </span>
                </div>
                <span className="text-[10px] tracking-widest uppercase text-emerald-400 font-bold -mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  24/7 Roadside Assistance
                </span>
              </div>
            </Link>

            {/* Location Selector (Top Bar Reference Style) */}
            <div 
              onClick={() => navigate('/services')}
              className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-full bg-surface-850/80 border border-white/10 hover:border-brand-yellow/40 hover:bg-surface-800 text-slate-300 hover:text-white transition-all cursor-pointer shadow-inner"
              title="Click to change location"
            >
              <MapPin className="w-4 h-4 text-brand-yellow shrink-0 animate-bounce" />
              <span className="text-xs font-medium max-w-[200px] truncate">
                {currentLocation.address}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </div>
          </div>

          {/* Search Input Bar (Matches Reference: "Search for services") */}
          <div className="hidden md:flex flex-1 max-w-xs xl:max-w-sm relative">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                placeholder="Search for services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                className="w-full bg-surface-850/90 text-sm text-slate-100 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-2xl border border-white/10 focus:border-brand-yellow/60 focus:outline-none focus:ring-2 focus:ring-brand-yellow/20 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </form>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'text-brand-yellow bg-brand-yellow/10 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-yellow' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      link.pulse 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'bg-surface-800 text-brand-yellow border border-brand-yellow/30'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            
            {/* Quick SOS Trigger Button */}
            <button
              onClick={() => setSosModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold text-xs shadow-glow-red hover:scale-105 active:scale-95 transition-all"
              title="Emergency SOS Trigger"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
              <span className="hidden sm:inline">SOS</span>
            </button>

            {/* Notifications Bell */}
            <button
              onClick={() => setNotificationDrawerOpen(true)}
              className="relative p-2.5 rounded-xl bg-surface-850 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-all hover:bg-surface-800"
              title="View Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-black text-white ring-2 ring-background-dark">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Profile Avatar / Modal */}
            <button
              onClick={() => setUserProfileOpen(true)}
              className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-surface-850 border border-white/10 hover:border-brand-yellow/40 transition-all hover:bg-surface-800"
              title="Profile & Settings"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-brand-yellow to-amber-600 flex items-center justify-center text-black font-bold text-xs">
                <User className="w-4 h-4 text-black" />
              </div>
              <span className="hidden md:inline text-xs font-semibold text-slate-200">
                Alex W.
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-surface-850 border border-white/10 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Sub-location bar */}
        <div className="lg:hidden pb-3 flex items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-brand-yellow shrink-0" />
            <span className="truncate">{currentLocation.address}</span>
          </div>
          <span className="text-[11px] font-semibold text-brand-yellow bg-brand-yellow/10 px-2 py-0.5 rounded-full border border-brand-yellow/20 shrink-0">
            {selectedCar.name}
          </span>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-900 border-b border-white/10 px-4 py-4 space-y-2 animate-slide-down">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium ${
                  isActive
                    ? 'text-brand-yellow bg-brand-yellow/10 font-bold'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-brand-yellow' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-brand-yellow text-black">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
