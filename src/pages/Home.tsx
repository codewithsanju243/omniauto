import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CarSwitcher } from '../components/CarSwitcher';
import { SOSCard } from '../components/SOSCard';
import { ServiceGrid } from '../components/ServiceGrid';
import { MapView } from '../components/MapView';
import { ProviderCard } from '../components/ProviderCard';
import { AssistanceSheet } from '../components/AssistanceSheet';
import { ServiceCategory, Provider } from '../types';
import { ALL_SERVICES } from '../data/services';
import { MOCK_PROVIDERS } from '../data/providers';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Fuel, 
  Clock, 
  Radio, 
  Compass, 
  PhoneCall,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const { 
    selectedCar, 
    setSosModalOpen, 
    activeBooking, 
    createBooking 
  } = useApp();

  const navigate = useNavigate();
  const [selectedServiceForSheet, setSelectedServiceForSheet] = useState<ServiceCategory | null>(null);
  const [highlightedProvider, setHighlightedProvider] = useState<Provider | null>(MOCK_PROVIDERS[0]);

  const isEV = selectedCar.type === 'EV';

  const handleSelectService = (service: ServiceCategory) => {
    setSelectedServiceForSheet(service);
  };

  const handleConfirmDirectProvider = (provider: Provider) => {
    createBooking('car-towing', 'Car Towing', provider);
    navigate('/live-assistance');
  };

  return (
    <div className="min-h-screen py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* HERO SECTION */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-surface-900 via-surface-850 to-surface-900 border border-white/10 p-6 sm:p-10 shadow-card-dark">
          
          {/* Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Hero Left: Heading & CTA */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Hero Heading */}
              <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.15]">
                Revive your vehicle with our <span className="bg-gradient-to-r from-brand-yellow via-amber-400 to-yellow-200 bg-clip-text text-transparent">speedy repair</span> services.
              </h1>

              {/* Hero Subheading */}
              <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
                Reliable roadside rescue for every breakdown, flat tyre, dead battery and towing emergency — dispatched directly to your GPS coordinates in ~5 minutes with live satellite tracking.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setSosModalOpen(true)}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-yellow via-amber-500 to-yellow-400 text-black font-black text-sm uppercase tracking-wider shadow-glow-gold hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-black stroke-[3]" />
                  <span>GET HELP NOW</span>
                </button>

                <button
                  onClick={() => navigate('/services')}
                  className="px-6 py-4 rounded-2xl bg-surface-800/90 hover:bg-surface-750 border border-white/10 hover:border-white/20 text-white font-bold text-sm tracking-wide transition-all flex items-center gap-2"
                >
                  <span>Explore Services</span>
                  <ArrowRight className="w-4 h-4 text-brand-yellow" />
                </button>
              </div>
            </div>

            {/* Hero Right: Prominent OmniAuto Tech Logo Card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-3xl bg-surface-950/80 border border-white/10 relative overflow-hidden group shadow-card-dark">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-yellow/20 via-amber-500/10 to-transparent rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 w-full flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-white/95 rounded-3xl border border-white/30 shadow-2xl hover:scale-105 transition-transform duration-300">
                  <img
                    src="assets/Logo.png"
                    alt="OmniAuto Tech Logo"
                    className="h-24 sm:h-28 w-auto object-contain drop-shadow-md"
                  />
                </div>
                <div>
                  <h3 className="font-display font-black text-2xl text-white tracking-wide">
                    OmniAuto <span className="text-brand-yellow">Tech</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5 font-medium">
                    ICE • EV • HYBRID • 24/7 ASSISTANCE
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* CONDITIONAL: DEFAULT SERVICES CATALOG vs ACTIVE RESCUE LIVE TRACKING */}
        {!activeBooking ? (
          <div className="space-y-8">
            
            {/* Top Row: Car Switcher & SOS Emergency Banner */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <section aria-label="Car Switcher">
                <CarSwitcher />
              </section>

              <section aria-label="Auto SOS Emergency Card">
                <SOSCard />
              </section>
            </div>

            {/* Service Grid with 3D Render Images & Approx Pricing */}
            <section aria-label="Service Catalog" className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                    Select Roadside Service
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Choose a problem below to review approx fare and book nearest technician with live GPS tracking.
                  </p>
                </div>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-full font-bold self-start sm:self-auto">
                  ● Certified Rapid Fleet Ready
                </span>
              </div>

              <ServiceGrid onSelectService={handleSelectService} />
            </section>

            {/* Value Props & Guarantee */}
            <div className="rounded-3xl bg-surface-900/60 border border-white/10 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-yellow/15 border border-brand-yellow/30 flex items-center justify-center text-lg shrink-0">⚡</div>
                <div>
                  <strong className="text-white text-sm block">~5 Min Rapid Arrival</strong>
                  <span className="text-slate-400 text-xs">Instant automated dispatch to your GPS coordinates.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-lg shrink-0">📍</div>
                <div>
                  <strong className="text-white text-sm block">Live GPS Tracking</strong>
                  <span className="text-slate-400 text-xs">Satellite route & technician ETA live after booking.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-lg shrink-0">💵</div>
                <div>
                  <strong className="text-white text-sm block">Approx Upfront Fare</strong>
                  <span className="text-slate-400 text-xs">Transparent upfront price with zero hidden charges.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-lg shrink-0">🛡️</div>
                <div>
                  <strong className="text-white text-sm block">ICE • EV • Hybrid</strong>
                  <span className="text-slate-400 text-xs">Certified assistance for all fuel & battery types.</span>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* ACTIVE BOOKING: LIVE MAP & TECHNICIAN ARRIVAL CARD */
          <div className="space-y-6 animate-fade-in">
            
            {/* Active Dispatch Alert Banner */}
            <div className="rounded-3xl bg-gradient-to-r from-surface-900 via-surface-850 to-surface-900 border border-brand-yellow/50 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-glow-gold">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-2xl animate-pulse shrink-0">
                  🚨
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      Technician Dispatched & En Route
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Ref: {activeBooking.id}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                    {activeBooking.serviceTitle} — {activeBooking.vehicle.name}
                  </h2>
                  <p className="text-xs text-slate-300">
                    Live satellite tracking is active for your rescue unit.
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate('/live-assistance')}
                className="px-6 py-3 rounded-2xl bg-brand-yellow text-black font-extrabold text-xs uppercase shadow-glow-gold hover:scale-105 transition-all self-end sm:self-center"
              >
                View Fullscreen Tracker →
              </button>
            </div>

            {/* Two-Column Grid: Live Map + Technician Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between px-1 text-xs">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <span className="w-2 h-2 rounded-full bg-brand-yellow animate-ping"></span>
                    <span>Live Satellite GPS Tracking</span>
                  </div>
                  <span className="text-slate-400 font-mono">Real-time driver location</span>
                </div>

                <div className="h-[460px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
                  <MapView
                    selectedProvider={activeBooking.provider}
                    showRoute={true}
                  />
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4 sticky top-24">
                <ProviderCard
                  provider={activeBooking.provider}
                  onConfirm={() => navigate('/live-assistance')}
                />
              </div>

            </div>

          </div>
        )}

      </div>

      {/* Service Request Modal (Screen 2 Details Sheet) */}
      <AssistanceSheet
        service={selectedServiceForSheet}
        onClose={() => setSelectedServiceForSheet(null)}
      />

    </div>
  );
};
