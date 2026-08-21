import React, { useState } from 'react';
import { ALL_SERVICES } from '../data/services';
import { ServiceCard } from './ServiceCard';
import { ServiceCategory } from '../types';
import { Sparkles, ChevronDown } from 'lucide-react';

interface ServiceGridProps {
  onSelectService: (service: ServiceCategory) => void;
  showAllInitially?: boolean;
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({ 
  onSelectService,
  showAllInitially = false
}) => {
  const [showAll, setShowAll] = useState(showAllInitially);

  // If not expanded, show top 6 cards matching reference image:
  // Car Towing, Repairs, Flat Tyre, Dead Battery, Fluid Leakage, Brake Failure
  const displayedServices = showAll ? ALL_SERVICES : ALL_SERVICES.slice(0, 6);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display font-bold text-xl text-white">
            Available Services
          </h3>
          <p className="text-xs text-slate-400">
            Instant dispatch to your exact GPS location
          </p>
        </div>

        <button
          onClick={() => setShowAll(!showAll)}
          className="text-xs font-semibold text-brand-yellow hover:text-yellow-300 flex items-center gap-1 transition-colors px-3 py-1.5 rounded-xl bg-brand-yellow/10 border border-brand-yellow/20"
        >
          <span>{showAll ? 'Show Top 6' : 'View All (12)'}</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAll ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Grid matching the 2-column mobile and 2/3 column desktop cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-4">
        {displayedServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onClick={() => onSelectService(service)}
          />
        ))}
      </div>
    </div>
  );
};
