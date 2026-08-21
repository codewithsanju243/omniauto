import React, { useState } from 'react';
import { 
  ArrowLeft, 
  HelpCircle, 
  MapPin, 
  Search, 
  Car, 
  CheckCircle2, 
  Sparkles, 
  Navigation, 
  Star, 
  Clock, 
  Phone, 
  ShieldCheck, 
  X,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { ServiceCategory, Provider } from '../types';
import { useApp } from '../context/AppContext';
import { CuteMechanicMascot, RedTowTruckVector } from '../data/illustrations';
import { MOCK_PROVIDERS } from '../data/providers';
import { useNavigate } from 'react-router-dom';

interface AssistanceSheetProps {
  service: ServiceCategory | null;
  onClose: () => void;
}

export const AssistanceSheet: React.FC<AssistanceSheetProps> = ({ service, onClose }) => {
  const { 
    selectedCar, 
    cars, 
    selectCarById, 
    currentLocation, 
    updatePickupAddress, 
    createBooking 
  } = useApp();

  const navigate = useNavigate();

  const [step, setStep] = useState<'form' | 'searching' | 'providers'>('form');
  const [pickupAddress, setPickupAddress] = useState(currentLocation.address);
  const [problemNote, setProblemNote] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [carDropdownOpen, setCarDropdownOpen] = useState(false);

  if (!service) return null;

  // Filter providers relevant to current service
  const relevantProviders = MOCK_PROVIDERS.filter(p => {
    if (service.category === 'towing') return p.type === 'Towing';
    if (service.category === 'ev') return p.type === 'EV Charging';
    if (service.category === 'fuel') return p.type === 'Fuel';
    if (service.category === 'tyre') return p.type === 'Tyres';
    return true;
  });

  const handleSearchProviders = () => {
    setStep('searching');
    setTimeout(() => {
      setStep('providers');
      setSelectedProvider(relevantProviders[0] || MOCK_PROVIDERS[0]);
    }, 1200);
  };

  const handleConfirmProvider = (provider: Provider) => {
    createBooking(service.id, service.title, provider, problemNote);
    onClose();
    navigate('/live-assistance');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl bg-surface-900 border border-white/15 shadow-2xl overflow-hidden my-auto">
        
        {/* Header matching Reference Image Screen 2 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-surface-850">
          <button
            onClick={() => {
              if (step === 'providers') setStep('form');
              else onClose();
            }}
            className="p-2 rounded-xl bg-surface-800 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            {service.image && (
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-11 h-11 object-contain rounded-xl bg-black/50 p-1 border border-brand-yellow/30 shadow-md"
              />
            )}
            <div className="text-left">
              <h3 className="font-display font-bold text-base sm:text-lg text-white">
                {step === 'form' ? 'Service Details' : step === 'searching' ? 'Locating Rescue Units' : 'Available Providers'}
              </h3>
              <span className="text-xs text-brand-yellow font-bold">
                {service.title}
              </span>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-surface-800 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: Details Form */}
        {step === 'form' && (
          <div className="p-6 space-y-5">
            
            {/* Field 1: Pick-up Location */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                <span>Pick-up Location</span>
                <button
                  onClick={() => {
                    const sample = '211 W Highland, Seattle, WA 98119';
                    setPickupAddress(sample);
                    updatePickupAddress(sample);
                  }}
                  className="text-brand-yellow hover:underline flex items-center gap-1 font-semibold"
                >
                  <Navigation className="w-3 h-3" />
                  Use GPS Location
                </button>
              </div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={pickupAddress}
                  onChange={(e) => {
                    setPickupAddress(e.target.value);
                    updatePickupAddress(e.target.value);
                  }}
                  className="w-full bg-surface-800/90 text-sm text-slate-100 placeholder-slate-500 pl-10 pr-4 py-3 rounded-2xl border border-white/10 focus:border-brand-yellow/60 focus:outline-none focus:ring-2 focus:ring-brand-yellow/20"
                />
                <MapPin className="w-4 h-4 text-brand-yellow absolute left-3.5" />
              </div>
            </div>

            {/* Field 2: Select your Car */}
            <div className="space-y-1.5 relative">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Select your Car
              </label>
              <div 
                onClick={() => setCarDropdownOpen(!carDropdownOpen)}
                className="flex items-center justify-between px-4 py-3 rounded-2xl bg-surface-800/90 border border-white/10 cursor-pointer hover:border-brand-yellow/40 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Car className="w-5 h-5 text-brand-yellow" />
                  <div>
                    <span className="font-bold text-sm text-white block">{selectedCar.name}</span>
                    <span className="text-xs text-slate-400">{selectedCar.type} • {selectedCar.range} km range</span>
                  </div>
                </div>
                <Search className="w-4 h-4 text-slate-400" />
              </div>

              {/* Car dropdown options */}
              {carDropdownOpen && (
                <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl bg-surface-850 border border-white/15 p-2 z-30 shadow-2xl space-y-1">
                  {cars.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => {
                        selectCarById(c.id);
                        setCarDropdownOpen(false);
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/10 cursor-pointer text-sm"
                    >
                      <span className="font-semibold text-white">{c.name}</span>
                      <span className="text-xs text-brand-yellow font-mono">{c.registrationNumber}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Field 3: Registration Number (Auto-Populated) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Registration Number
              </label>
              <input
                type="text"
                readOnly
                value={selectedCar.registrationNumber}
                className="w-full bg-surface-800/50 text-sm font-mono font-bold text-slate-200 px-4 py-3 rounded-2xl border border-white/5 cursor-not-allowed"
              />
            </div>

            {/* Field 4: Add note (optional) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Add note (optional)
              </label>
              <textarea
                rows={3}
                placeholder="Mention the problems you have faced in your car..."
                value={problemNote}
                onChange={(e) => setProblemNote(e.target.value)}
                className="w-full bg-surface-800/90 text-sm text-slate-100 placeholder-slate-500 p-3.5 rounded-2xl border border-white/10 focus:border-brand-yellow/60 focus:outline-none focus:ring-2 focus:ring-brand-yellow/20"
              />
            </div>

            {/* Mascot Banner matching Reference Screen 2 ("Filled all your details?") */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="font-display font-black text-lg text-white block">
                  Filled all your details?
                </span>
                <span className="text-xs text-slate-400">
                  Ready to dispatch nearest rescue unit
                </span>
              </div>
              
              <div className="shrink-0 -mr-2">
                <CuteMechanicMascot className="w-20 h-20" />
              </div>
            </div>

            {/* CTA button: Find Towing Services */}
            <button
              onClick={handleSearchProviders}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-yellow via-amber-500 to-yellow-400 text-black font-black text-sm uppercase tracking-wider shadow-glow-gold hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Find {service.title} Services
            </button>
          </div>
        )}

        {/* STEP 2: Radar Search Animation */}
        {step === 'searching' && (
          <div className="p-12 text-center space-y-6 flex flex-col items-center justify-center min-h-[360px]">
            <div className="relative flex items-center justify-center w-28 h-28">
              <div className="absolute inset-0 rounded-full border-2 border-brand-yellow/40 animate-ping" />
              <div className="absolute inset-2 rounded-full border border-brand-yellow/60 animate-spin" />
              <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-brand-yellow text-black shadow-glow-gold">
                <Navigation className="w-8 h-8 animate-pulse" />
              </div>
            </div>

            <div>
              <h4 className="font-display font-bold text-xl text-white">
                Finding nearby assistance...
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Scanning certified {service.title} fleet within 3 km radius
              </p>
            </div>
          </div>
        )}

        {/* STEP 3: Available Verified Providers List */}
        {step === 'providers' && (
          <div className="p-6 space-y-4 max-h-[480px] overflow-y-auto">
            <p className="text-xs text-slate-400 font-medium">
              Found {relevantProviders.length} verified units near {currentLocation.address}
            </p>

            <div className="space-y-3">
              {relevantProviders.map((provider) => (
                <div
                  key={provider.id}
                  onClick={() => setSelectedProvider(provider)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedProvider?.id === provider.id
                      ? 'bg-surface-800 border-brand-yellow shadow-glow-gold'
                      : 'bg-surface-850/70 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={provider.driverAvatar}
                        alt={provider.driverName}
                        className="w-12 h-12 rounded-xl object-cover border border-white/10"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-white">{provider.name}</h4>
                          <span className="flex items-center gap-1 text-[11px] font-bold text-brand-yellow bg-brand-yellow/10 px-1.5 py-0.5 rounded">
                            <Star className="w-3 h-3 fill-brand-yellow" />
                            {provider.rating}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400">
                          {provider.driverName} • {provider.vehicleModel}
                        </span>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1 font-mono">
                          <span>📍 {provider.distance}</span>
                          <span>•</span>
                          <span className="text-emerald-400 font-semibold">⚡ Arrives in {provider.eta} min</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-display font-extrabold text-lg text-white">
                        ₹{provider.price}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        Estimated Total
                      </span>
                    </div>
                  </div>

                  {selectedProvider?.id === provider.id && (
                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs text-slate-300 font-medium">
                        Vehicle No: <strong className="text-brand-yellow font-mono">{provider.vehicleNumber}</strong>
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConfirmProvider(provider);
                        }}
                        className="px-5 py-2 rounded-xl bg-brand-yellow text-black font-extrabold text-xs uppercase tracking-wider hover:bg-yellow-400 transition-all shadow-glow-gold"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {selectedProvider && (
              <button
                onClick={() => handleConfirmProvider(selectedProvider)}
                className="w-full mt-4 py-4 rounded-2xl bg-gradient-to-r from-brand-yellow via-amber-500 to-yellow-400 text-black font-black text-sm uppercase tracking-wider shadow-glow-gold hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Confirm {selectedProvider.name} (${selectedProvider.price})
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
