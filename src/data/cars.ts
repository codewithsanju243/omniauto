import { Vehicle } from '../types';

export const INITIAL_CARS: Vehicle[] = [
  {
    id: 'porsche-taycan',
    name: 'Porsche Taycan',
    model: 'Taycan 4S Cross Turismo',
    type: 'EV',
    battery: 82,
    range: 276,
    healthStatus: 'Healthy',
    registrationNumber: 'WA78-EV91',
    vin: 'WP0AA2Y14MSA88102',
    lastServiceDate: 'Jan 15, 2026',
    insuranceExpiry: 'Nov 2026',
    image: 'taycan'
  },
  {
    id: 'bmw-3-series',
    name: 'BMW 3 Series',
    model: '330i M Sport Gran Limousine',
    type: 'Petrol',
    fuel: 64,
    range: 412,
    healthStatus: 'Healthy',
    registrationNumber: 'AZM9590',
    vin: 'WBA5R1C00MFK12948',
    lastServiceDate: 'Dec 02, 2025',
    insuranceExpiry: 'Oct 2026',
    image: 'bmw-3'
  },
  {
    id: 'tata-nexon-ev',
    name: 'Tata Nexon EV',
    model: 'Nexon.ev Empowered+ 45',
    type: 'EV',
    battery: 64,
    range: 218,
    healthStatus: 'Healthy',
    registrationNumber: 'DL01-EV-8820',
    vin: 'MAT612089NKA99214',
    lastServiceDate: 'Feb 10, 2026',
    insuranceExpiry: 'Aug 2026',
    image: 'nexon-ev'
  },
  {
    id: 'hyundai-creta',
    name: 'Hyundai Creta',
    model: 'Creta SX(O) 1.5 Turbo DCT',
    type: 'Petrol',
    fuel: 45,
    range: 320,
    healthStatus: 'Healthy',
    registrationNumber: 'WA-7892K',
    vin: 'MALC381CLNM109384',
    lastServiceDate: 'Nov 18, 2025',
    insuranceExpiry: 'Dec 2026',
    image: 'creta'
  },
  {
    id: 'mahindra-xuv700',
    name: 'Mahindra XUV700',
    model: 'XUV700 AX7 Luxury Diesel AT',
    type: 'Diesel',
    fuel: 48,
    range: 350,
    healthStatus: 'Healthy',
    registrationNumber: 'MH-12-AB-3007',
    vin: 'MA1TA2SKMM8A40192',
    lastServiceDate: 'Jan 05, 2026',
    insuranceExpiry: 'Jul 2026',
    image: 'xuv700'
  },
  {
    id: 'bmw-7-series',
    name: 'BMW 7 Series',
    model: '740i xDrive Executive',
    type: 'Petrol',
    fuel: 72,
    range: 580,
    healthStatus: 'Healthy',
    registrationNumber: 'AZM9590',
    vin: 'WBA7U0C09NCD44910',
    lastServiceDate: 'Feb 01, 2026',
    insuranceExpiry: 'May 2027',
    image: 'bmw-7'
  }
];
