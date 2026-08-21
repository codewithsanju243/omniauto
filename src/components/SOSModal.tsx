import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  X, 
  CheckCircle2, 
  PhoneCall, 
  MapPin, 
  Car, 
  Users, 
  ArrowRight,
  Zap,
  Battery,
  Flame,
  Key,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { MOCK_PROVIDERS } from '../data/providers';

export const SOSModal: React.FC = () => {
  const { 
    sosModalOpen, 
    setSosModalOpen, 
    selectedCar, 
    currentLocation, 
    createBooking, 
    addNotification 
  } = useApp();

  const navigate = useNavigate();

  const [selectedProblem, setSelectedProblem] = useState<string>('Accident / Emergency');
  const [sosStatus, setSosStatus] = useState<'selecting' | 'broadcasting' | 'dispatched'>('selecting');

  if (!sosModalOpen) return null;

  const emergencyProblems = [
    { id: 'accident', title: 'Accident Assistance', icon: ShieldAlert, color: 'text-red-400' },
    { id: 'brake', title: 'Brake Failure', icon: AlertTriangle, color: 'text-amber-400' },
    { id: 'battery', title: 'Battery Dead', icon: Battery, color: 'text-yellow-400' },
    { id: 'tyre', title: 'Flat Tyre', icon: AlertTriangle, color: 'text-amber-400' },
    { id: 'ev', title: 'EV Not Charging / Stranded', icon: Zap, color: 'text-sky-400' },
    { id: 'fuel', title: 'Out of Fuel / Leakage', icon: Flame, color: 'text-orange-400' },
    { id: 'overheat', title: 'Engine Overheating', icon: Flame, color: 'text-rose-400' },
    { id: 'lockout', title: 'Locked Out of Vehicle', icon: Key, color: 'text-indigo-400' },
  ];

  const handleTriggerSOS = () => {
    setSosStatus('broadcasting');

    setTimeout(() => {
      setSosStatus('dispatched');
      const urgentProvider = MOCK_PROVIDERS[0]; // MV Tow Truck
      createBooking('sos-emergency', `EMERGENCY SOS: ${selectedProblem}`, urgentProvider, `Immediate emergency SOS dispatch for ${selectedCar.name}`);
      addNotification('EMERGENCY SOS DISPATCHED', `Priority rescue team dispatched to ${currentLocation.address}`, 'emergency');
      
      setTimeout(() => {
        setSosModalOpen(false);
        setSosStatus('selecting');
        navigate('/live-assistance');
      }, 1500);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl bg-surface-900 border border-red-500/30 shadow-glow-red overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-red-500/20 bg-gradient-to-r from-red-950/60 to-surface-850">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-glow-red">
              <PhoneCall className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-display font-black text-xl text-white tracking-tight">
                AUTO SOS DISPATCH
              </h3>
              <span className="text-xs text-red-400 font-semibold">
                Priority Roadside Emergency
              </span>
            </div>
          </div>

          <button
            onClick={() => setSosModalOpen(false)}
            className="p-2 rounded-xl bg-surface-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selecting Problem Step */}
        {sosStatus === 'selecting' && (
          <div className="p-6 space-y-5">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                What's wrong with your vehicle?
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Select your urgent situation for rapid response unit routing
              </p>
            </div>

            {/* Problem Options Grid */}
            <div className="grid grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
              {emergencyProblems.map((prob) => {
                const Icon = prob.icon;
                const isSelected = selectedProblem === prob.title;

                return (
                  <button
                    key={prob.id}
                    onClick={() => setSelectedProblem(prob.title)}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-red-500/15 border-red-500 text-white shadow-glow-red'
                        : 'bg-surface-850/80 border-white/10 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${prob.color}`} />
                    <span className="text-xs font-bold truncate">{prob.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Emergency Context Overview */}
            <div className="p-4 rounded-2xl bg-surface-950/70 border border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Car className="w-3.5 h-3.5 text-brand-yellow" /> Selected Car:
                </span>
                <strong className="text-white font-mono">{selectedCar.name} ({selectedCar.registrationNumber})</strong>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-brand-yellow" /> Current Location:
                </span>
                <strong className="text-white truncate max-w-[200px]">{currentLocation.address}</strong>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Users className="w-3.5 h-3.5 text-emerald-400" /> Emergency Contacts:
                </span>
                <span className="text-emerald-400 font-semibold">2 Contacts Synchronized</span>
              </div>
            </div>

            {/* Huge Emergency CTA */}
            <button
              onClick={handleTriggerSOS}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-500 text-white font-black text-sm uppercase tracking-wider shadow-glow-red hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>DISPATCH PRIORITY RESCUE</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        )}

        {/* Broadcasting State */}
        {sosStatus === 'broadcasting' && (
          <div className="p-12 text-center space-y-6 flex flex-col items-center justify-center min-h-[350px]">
            <div className="relative flex items-center justify-center w-28 h-28">
              <div className="absolute inset-0 rounded-full border-4 border-red-500/40 animate-ping" />
              <div className="absolute inset-2 rounded-full border-2 border-red-500 animate-spin" />
              <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-red-600 text-white shadow-glow-red">
                <PhoneCall className="w-8 h-8 animate-bounce" />
              </div>
            </div>

            <div>
              <h4 className="font-display font-bold text-xl text-white">
                Broadcasting Emergency SOS...
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Transmitting telemetry, vehicle status & GPS to Seattle dispatch network
              </p>
            </div>
          </div>
        )}

        {/* Dispatched State */}
        {sosStatus === 'dispatched' && (
          <div className="p-10 text-center space-y-4 flex flex-col items-center justify-center min-h-[350px]">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h4 className="font-display font-black text-2xl text-white">
              Rescue Unit En Route!
            </h4>
            <p className="text-sm text-slate-300">
              MV Tow Truck (Paul) assigned. Switching to live satellite tracking...
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
