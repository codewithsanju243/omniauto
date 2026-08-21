import React from 'react';
import { ServiceCategory } from '../types';
import { 
  TowTruckIllustration, 
  RepairsIllustration, 
  FlatTyreIllustration, 
  DeadBatteryIllustration, 
  FluidLeakageIllustration, 
  BrakeFailureIllustration 
} from '../data/illustrations';
import { ChevronRight, Zap, ShieldAlert, Key, Flame } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceCategory;
  onClick: () => void;
  compact?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick, compact = false }) => {
  
  // Choose corresponding 3D Illustration matching reference image
  const renderIllustration = () => {
    switch (service.iconType) {
      case 'towing':
        return <TowTruckIllustration className="w-16 h-14 sm:w-20 sm:h-16 group-hover:scale-105 transition-transform" />;
      case 'repairs':
        return <RepairsIllustration className="w-16 h-14 sm:w-20 sm:h-16 group-hover:scale-105 transition-transform" />;
      case 'flat-tyre':
        return <FlatTyreIllustration className="w-16 h-14 sm:w-20 sm:h-16 group-hover:scale-105 transition-transform" />;
      case 'dead-battery':
        return <DeadBatteryIllustration className="w-16 h-14 sm:w-20 sm:h-16 group-hover:scale-105 transition-transform" />;
      case 'fluid-leakage':
      case 'fuel':
        return <FluidLeakageIllustration className="w-16 h-14 sm:w-20 sm:h-16 group-hover:scale-105 transition-transform" />;
      case 'brake-failure':
        return <BrakeFailureIllustration className="w-16 h-14 sm:w-20 sm:h-16 group-hover:scale-105 transition-transform" />;
      case 'ev-charge':
        return (
          <div className="relative">
            <DeadBatteryIllustration className="w-16 h-14 sm:w-20 sm:h-16 group-hover:scale-105 transition-transform" />
            <span className="absolute -top-1 -right-1 p-1 bg-sky-500 rounded-full text-white">
              <Zap className="w-3.5 h-3.5 fill-white" />
            </span>
          </div>
        );
      case 'lockout':
        return (
          <div className="w-16 h-14 sm:w-20 sm:h-16 flex items-center justify-center bg-brand-yellow/15 rounded-2xl border border-brand-yellow/30 text-brand-yellow group-hover:scale-105 transition-transform">
            <Key className="w-9 h-9 text-brand-yellow" />
          </div>
        );
      case 'overheat':
        return (
          <div className="w-16 h-14 sm:w-20 sm:h-16 flex items-center justify-center bg-orange-500/15 rounded-2xl border border-orange-500/30 text-orange-400 group-hover:scale-105 transition-transform">
            <Flame className="w-9 h-9 text-orange-400" />
          </div>
        );
      default:
        return <RepairsIllustration className="w-16 h-14 sm:w-20 sm:h-16 group-hover:scale-105 transition-transform" />;
    }
  };

  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-3xl bg-surface-850/90 hover:bg-surface-800 border border-white/10 hover:border-brand-yellow/50 p-4 sm:p-5 transition-all duration-300 shadow-card-dark hover:shadow-glow-gold flex flex-col justify-between"
    >
      {/* Top Header with Badge */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <h4 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-brand-yellow transition-colors">
            {service.title}
          </h4>
          <div className="mt-1">
            <span className="text-xs text-brand-yellow font-bold font-mono">
              Starting from ₹{service.basePrice}
            </span>
          </div>
        </div>

        {service.badge && (
          <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
            service.badge === 'Urgent' || service.badge === 'Priority'
              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
              : service.badge === 'Fastest'
                ? 'bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/30'
                : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
          }`}>
            {service.badge}
          </span>
        )}
      </div>

      {/* Center Image / 3D Render */}
      <div className="my-2.5 flex justify-center items-center h-28 sm:h-36 rounded-2xl overflow-hidden bg-black/40 p-2 border border-white/5 group-hover:border-brand-yellow/30 transition-all">
        {service.image ? (
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          renderIllustration()
        )}
      </div>

      {/* Bottom Action Hint */}
      <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
        <div>
          <span className="text-[10px] text-slate-400 block font-medium">Approx Technician Fare</span>
          <strong className="text-white font-mono text-sm">₹{service.basePrice}</strong>
        </div>
        <span className="font-bold text-brand-yellow group-hover:underline flex items-center gap-1">
          Book Technician
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-brand-yellow group-hover:translate-x-1 transition-all" />
        </span>
      </div>
    </div>
  );
};
