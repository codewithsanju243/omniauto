import { ServiceCategory } from '../types';

export const ALL_SERVICES: ServiceCategory[] = [
  {
    id: 'car-towing',
    title: 'Car Towing',
    description: 'Flatbed & wheel-lift towing to nearest certified workshop or desired drop point.',
    category: 'towing',
    basePrice: 999,
    estimatedTime: '5-10 min ETA',
    iconType: 'towing',
    image: 'assets/01_car_towing.png',
    badge: 'Fastest',
    popular: true
  },
  {
    id: 'repairs',
    title: 'Repairs & Diagnostics',
    description: 'On-site roadside vehicle diagnostics, belt replacements and mechanical quick-fixes.',
    category: 'repair',
    basePrice: 499,
    estimatedTime: '8-15 min ETA',
    iconType: 'repairs',
    image: 'assets/02_car_repairs.png',
    popular: true
  },
  {
    id: 'flat-tyre',
    title: 'Bike Repair / Flat Tyre',
    description: 'Puncture repair, spare wheel replacement, rim check & high-pressure tire inflation.',
    category: 'tyre',
    basePrice: 299,
    estimatedTime: '6-12 min ETA',
    iconType: 'flat-tyre',
    image: 'assets/03_bike_repair.png',
    popular: true
  },
  {
    id: 'dead-battery',
    title: 'Bike / Car Dead Battery',
    description: '12V jump-start service, alternator check, or direct mobile on-site battery replacement.',
    category: 'battery',
    basePrice: 399,
    estimatedTime: '5-10 min ETA',
    iconType: 'dead-battery',
    image: 'assets/04_bike_battery.png',
    badge: 'Popular',
    popular: true
  },
  {
    id: 'fluid-leakage',
    title: 'Scooty Repair & Fluids',
    description: 'Scooter puncture, coolant, brake fluid, engine oil check and emergency top-up.',
    category: 'repair',
    basePrice: 349,
    estimatedTime: '10-15 min ETA',
    iconType: 'fluid-leakage',
    image: 'assets/05_scooty_repair.png',
    popular: true
  },
  {
    id: 'brake-failure',
    title: 'Scooty Battery & Brakes',
    description: 'EV scooter booster, auxiliary battery rescue, and hydraulic brake line inspection.',
    category: 'emergency',
    basePrice: 449,
    estimatedTime: '5-8 min ETA',
    iconType: 'brake-failure',
    image: 'assets/06_scooty_battery.png',
    badge: 'Urgent',
    popular: true
  },
  {
    id: 'lockout',
    title: 'Lockout Assistance',
    description: 'Non-destructive door unlocking, transponder bypass and key retrieval service.',
    category: 'emergency',
    basePrice: 399,
    estimatedTime: '10-15 min ETA',
    iconType: 'lockout'
  },
  {
    id: 'fuel-delivery',
    title: 'Out of Fuel Delivery',
    description: 'Emergency 5-liter petrol or diesel doorstep delivery directly to your stranded spot.',
    category: 'fuel',
    basePrice: 299,
    estimatedTime: '8-12 min ETA',
    iconType: 'fuel'
  },
  {
    id: 'ev-mobile-charge',
    title: 'EV Mobile Fast Charging',
    description: 'Rapid mobile DC level-3 booster giving 25-40 km range in under 15 minutes.',
    category: 'ev',
    basePrice: 699,
    estimatedTime: '6-10 min ETA',
    iconType: 'ev-charge',
    badge: 'EV Special'
  },
  {
    id: 'engine-overheat',
    title: 'Engine Overheating Triage',
    description: 'Radiator diagnosis, thermal hose clamp fix, thermostat check & coolant refill.',
    category: 'repair',
    basePrice: 599,
    estimatedTime: '12-18 min ETA',
    iconType: 'overheat'
  },
  {
    id: 'accident-triage',
    title: 'Accident Flatbed Transport',
    description: 'Specialized hydraulic tilt flatbed transport with winch for damaged or immobilized cars.',
    category: 'emergency',
    basePrice: 1499,
    estimatedTime: '5-8 min ETA',
    iconType: 'towing',
    badge: 'Priority'
  },
  {
    id: 'key-programming',
    title: 'Key Replacement & OBD Scan',
    description: 'Full vehicle computer ECU error code scanning, sensor resets and electronic diagnostic.',
    category: 'repair',
    basePrice: 799,
    estimatedTime: '15-20 min ETA',
    iconType: 'lockout'
  }
];
