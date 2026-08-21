export type FuelType = 'EV' | 'Petrol' | 'Diesel' | 'Hybrid';

export interface Vehicle {
  id: string;
  name: string;
  model: string;
  type: FuelType;
  registrationNumber: string;
  battery?: number; // % for EV
  fuel?: number;    // % for ICE
  range: number;   // km
  healthStatus: 'Healthy' | 'Needs Attention' | 'Critical';
  image: string;
  lastServiceDate: string;
  vin: string;
  insuranceExpiry: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  category: 'emergency' | 'repair' | 'towing' | 'ev' | 'fuel' | 'battery' | 'tyre';
  basePrice: number;
  estimatedTime: string;
  iconType: string;
  image?: string;
  badge?: string;
  popular?: boolean;
}

export type ProviderServiceType = 'Towing' | 'Mechanic' | 'EV Charging' | 'Fuel' | 'Tyres' | 'Service' | 'Locksmith';

export interface Provider {
  id: string;
  name: string;
  type: ProviderServiceType;
  rating: number;
  reviewCount: number;
  distance: string;
  distanceKm: number;
  eta: number; // minutes
  price: number;
  latitude: number;
  longitude: number;
  driverName: string;
  driverAvatar: string;
  driverPhone: string;
  vehicleModel: string;
  vehicleNumber: string;
  vehicleImage: string;
  servicesOffered: string[];
  equipment: string[];
  isAvailable: boolean;
}

export interface AssistanceBooking {
  id: string;
  serviceId: string;
  serviceTitle: string;
  vehicle: Vehicle;
  pickupLocation: string;
  dropLocation?: string;
  problemNote?: string;
  provider: Provider;
  status: 'searching' | 'assigned' | 'en_route' | 'arrived' | 'completed' | 'cancelled';
  createdAt: string;
  etaMinutes: number;
  totalCost: number;
  routeCoordinates: [number, number][];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'emergency' | 'booking' | 'system' | 'vehicle';
  read: boolean;
}
