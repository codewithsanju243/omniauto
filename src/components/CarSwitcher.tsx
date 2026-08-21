import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  BatteryCharging, 
  Fuel, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  PlusCircle, 
  Sparkles,
  Gauge
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VehicleGraphic } from '../data/illustrations';
import { Link } from 'react-router-dom';

export const CarSwitcher: React.FC = () => {
  const { 
    cars, 
    selectedCar, 
    selectedCarIndex, 
    nextCar, 
    previousCar, 
    selectCarById 
  } = useApp();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [animatingDirection, setAnimatingDirection] = useState<'up' | 'down' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNext = () => {
    setAnimatingDirection('down');
    nextCar();
    setTimeout(() => setAnimatingDirection(null), 400);
  };

  const handlePrev = () => {
    setAnimatingDirection('up');
    previousCar();
    setTimeout(() => setAnimatingDirection(null), 400);
  };

  const isEV = selectedCar.type === 'EV';
  const percentage = isEV ? selectedCar.battery : selectedCar.fuel;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      
      {/* Top Header Row with Car Title and Up/Down Switcher */}
      <div className="flex items-center justify-between gap-3 mb-3">
        
        {/* Floating Custom Dropdown Trigger */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="group flex items-center gap-2 px-4 py-2 rounded-2xl bg-surface-850/90 hover:bg-surface-800 border border-white/10 hover:border-brand-yellow/50 transition-all shadow-card-dark text-left"
          >
            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-brand-yellow transition-colors flex items-center gap-1">
                <span>My Car</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-brand-yellow' : 'text-slate-500'}`} />
              </span>
              <span className="font-display font-bold text-base text-white truncate max-w-[180px] sm:max-w-[220px]">
                {selectedCar.name}
              </span>
            </div>

            <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ml-1 ${
              isEV 
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' 
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
            }`}>
              {selectedCar.type}
            </span>
          </button>

          {/* Floating Glass Dropdown List with Search */}
          {dropdownOpen && (
            <div className="absolute left-0 top-full mt-2 w-80 sm:w-96 rounded-3xl bg-surface-900/95 backdrop-blur-2xl border border-white/15 shadow-2xl p-4 z-50 animate-slide-down space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Select Vehicle ({cars.length} Available)
                </span>
                <Link
                  to="/my-cars"
                  onClick={() => setDropdownOpen(false)}
                  className="text-[11px] text-brand-yellow hover:underline font-semibold flex items-center gap-1"
                >
                  <PlusCircle className="w-3 h-3" />
                  Manage / Add
                </Link>
              </div>

              {/* Search Bar inside dropdown */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search model or type..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full bg-surface-800 text-xs text-white placeholder-slate-500 pl-3 pr-3 py-2 rounded-xl border border-white/10 focus:border-brand-yellow focus:outline-none"
                  autoFocus
                />
              </div>

              <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                {cars
                  .filter(c => c.name.toLowerCase().includes(searchFilter.toLowerCase()) || c.type.toLowerCase().includes(searchFilter.toLowerCase()))
                  .map((car, idx) => {
                    const isSelected = car.id === selectedCar.id;
                    const carIsEV = car.type === 'EV';
                    const carPct = carIsEV ? car.battery : car.fuel;

                    return (
                      <div
                        key={car.id}
                        onClick={() => {
                          selectCarById(car.id);
                          setDropdownOpen(false);
                          setSearchFilter('');
                        }}
                        className={`flex items-center justify-between p-2.5 rounded-2xl cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-brand-yellow/20 to-amber-600/10 border border-brand-yellow/40 shadow-inner'
                            : 'hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-8 rounded-lg bg-surface-800 flex items-center justify-center p-1 border border-white/5">
                            <VehicleGraphic modelId={car.image} className="w-full h-full object-contain" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-sm text-white">{car.name}</span>
                              {carIsEV && <Zap className="w-3 h-3 text-sky-400 fill-sky-400" />}
                            </div>
                            <span className="text-xs text-slate-400">
                              {car.type}
                            </span>
                          </div>
                        </div>

                        {isSelected && (
                          <span className="text-xs font-bold text-brand-yellow bg-brand-yellow/10 px-2.5 py-1 rounded-lg border border-brand-yellow/30">
                            Selected ✓
                          </span>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>

        {/* Quick UP / DOWN Switcher Controls */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-surface-850/80 border border-white/10 shadow-card-dark">
          <button
            onClick={handlePrev}
            className="p-2 rounded-xl hover:bg-white/10 active:bg-brand-yellow/20 text-slate-300 hover:text-brand-yellow transition-all"
            title="Previous Saved Car (UP)"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          
          <span className="text-xs font-mono font-bold text-slate-400 px-1">
            {selectedCarIndex + 1}/{cars.length}
          </span>

          <button
            onClick={handleNext}
            className="p-2 rounded-xl hover:bg-white/10 active:bg-brand-yellow/20 text-slate-300 hover:text-brand-yellow transition-all"
            title="Next Saved Car (DOWN)"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Vehicle Showcase Card with Smooth Slide Animations */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-surface-850/90 to-surface-900/90 border border-white/10 p-5 shadow-card-dark transition-all">
        
        {/* Top Badges & Registration */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-surface-800 border border-white/10 text-xs font-mono font-bold text-slate-200">
              {selectedCar.registrationNumber}
            </span>
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-semibold text-emerald-400">
              <ShieldCheck className="w-3 h-3" />
              {selectedCar.healthStatus}
            </span>
          </div>

          <div className="text-xs text-slate-400 font-medium">
            {selectedCar.model}
          </div>
        </div>

        {/* Animated Vehicle Graphic Illustration */}
        <div 
          key={selectedCar.id} 
          className={`py-2 transition-transform duration-300 ${
            animatingDirection === 'down' 
              ? 'animate-car-transition' 
              : animatingDirection === 'up' 
                ? 'animate-slide-down' 
                : ''
          }`}
        >
          <div className="relative flex justify-center items-center h-36 sm:h-44">
            <VehicleGraphic modelId={selectedCar.image} className="w-full h-full max-w-sm drop-shadow-2xl" />
          </div>
        </div>

        {/* Dynamic Fuel / Battery & Range Gauge Panel */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 mt-1">
          
          {/* Gauge 1: Battery or Fuel Level */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface-950/60 border border-white/5">
            <div className={`p-2.5 rounded-xl ${
              isEV 
                ? 'bg-sky-500/15 text-sky-400' 
                : 'bg-amber-500/15 text-brand-yellow'
            }`}>
              {isEV ? (
                <BatteryCharging className="w-5 h-5" />
              ) : (
                <Fuel className="w-5 h-5" />
              )}
            </div>
            <div>
              <span className="text-[11px] font-medium text-slate-400 block">
                {isEV ? 'Battery Energy' : 'Fuel Level'}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-display font-bold text-lg text-white">
                  {percentage}%
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold">
                  Optimal
                </span>
              </div>
            </div>
          </div>

          {/* Gauge 2: Remaining Range */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface-950/60 border border-white/5">
            <div className="p-2.5 rounded-xl bg-brand-yellow/15 text-brand-yellow">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-slate-400 block">
                Remaining Range
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-display font-bold text-lg text-white">
                  {selectedCar.range}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  km
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
