import React, { createContext, useContext, useState, useEffect } from 'react';
import { Vehicle, Provider, AssistanceBooking, NotificationItem, ProviderServiceType } from '../types';
import { INITIAL_CARS } from '../data/cars';
import { MOCK_PROVIDERS, MOCK_ROUTE_COORDINATES, USER_DEFAULT_LOCATION } from '../data/providers';

interface AppContextType {
  cars: Vehicle[];
  selectedCarIndex: number;
  selectedCar: Vehicle;
  nextCar: () => void;
  previousCar: () => void;
  selectCarById: (id: string) => void;
  addCar: (car: Vehicle) => void;
  removeCar: (id: string) => void;
  
  currentLocation: typeof USER_DEFAULT_LOCATION;
  updatePickupAddress: (newAddress: string) => void;
  updateDropAddress: (newAddress: string) => void;
  
  activeBooking: AssistanceBooking | null;
  createBooking: (serviceId: string, serviceTitle: string, provider: Provider, note?: string) => void;
  cancelBooking: () => void;
  
  activeFilter: ProviderServiceType | 'ALL';
  setActiveFilter: (filter: ProviderServiceType | 'ALL') => void;
  
  sosModalOpen: boolean;
  setSosModalOpen: (open: boolean) => void;
  
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  markNotificationRead: (id: string) => void;
  addNotification: (title: string, message: string, type: NotificationItem['type']) => void;
  
  isSearchingProviders: boolean;
  setIsSearchingProviders: (val: boolean) => void;
  
  liveTrackingStep: number;
  currentDriverCoords: [number, number];
  driverETA: number;
  driverStatus: 'assigned' | 'en_route' | 'arrived' | 'completed';
  
  userProfileOpen: boolean;
  setUserProfileOpen: (open: boolean) => void;
  notificationDrawerOpen: boolean;
  setNotificationDrawerOpen: (open: boolean) => void;
  
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<Vehicle[]>(INITIAL_CARS);
  const [selectedCarIndex, setSelectedCarIndex] = useState<number>(0);
  
  const [currentLocation, setCurrentLocation] = useState(USER_DEFAULT_LOCATION);
  const [activeBooking, setActiveBooking] = useState<AssistanceBooking | null>(null);
  const [activeFilter, setActiveFilter] = useState<ProviderServiceType | 'ALL'>('ALL');
  
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const [isSearchingProviders, setIsSearchingProviders] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Live Driver Movement Simulation State
  const [liveTrackingStep, setLiveTrackingStep] = useState(0);
  const [driverETA, setDriverETA] = useState(5);
  const [driverStatus, setDriverStatus] = useState<'assigned' | 'en_route' | 'arrived' | 'completed'>('en_route');

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Auto SOS Armed & Active',
      message: 'Your emergency roadside contacts and GPS beacon are synchronized.',
      timestamp: '10 min ago',
      type: 'emergency',
      read: false
    },
    {
      id: 'notif-2',
      title: 'Vehicle Battery Optimal',
      message: 'Porsche Taycan high-voltage battery health at 99.2% capacity.',
      timestamp: '2 hours ago',
      type: 'vehicle',
      read: false
    },
    {
      id: 'notif-3',
      title: 'Free Roadside Checkup',
      message: 'Winter safety check available at Seattle Auto Care partners.',
      timestamp: '1 day ago',
      type: 'system',
      read: true
    }
  ]);

  const selectedCar = cars[selectedCarIndex] || cars[0];

  const nextCar = () => {
    setSelectedCarIndex((prev) => (prev + 1) % cars.length);
  };

  const previousCar = () => {
    setSelectedCarIndex((prev) => (prev - 1 + cars.length) % cars.length);
  };

  const selectCarById = (id: string) => {
    const idx = cars.findIndex(c => c.id === id);
    if (idx !== -1) {
      setSelectedCarIndex(idx);
    }
  };

  const addCar = (newCar: Vehicle) => {
    setCars(prev => [newCar, ...prev]);
    setSelectedCarIndex(0);
    addNotification('New Vehicle Added', `${newCar.name} registered to your AUTO SOS profile.`, 'vehicle');
  };

  const removeCar = (id: string) => {
    if (cars.length <= 1) return;
    setCars(prev => prev.filter(c => c.id !== id));
    setSelectedCarIndex(0);
  };

  const updatePickupAddress = (newAddress: string) => {
    setCurrentLocation(prev => ({ ...prev, address: newAddress }));
  };

  const updateDropAddress = (newAddress: string) => {
    setCurrentLocation(prev => ({ ...prev, dropAddress: newAddress }));
  };

  const addNotification = (title: string, message: string, type: NotificationItem['type']) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title,
      message,
      timestamp: 'Just now',
      type,
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const createBooking = (serviceId: string, serviceTitle: string, provider: Provider, note?: string) => {
    const booking: AssistanceBooking = {
      id: `SOS-${Math.floor(100000 + Math.random() * 900000)}`,
      serviceId,
      serviceTitle,
      vehicle: selectedCar,
      pickupLocation: currentLocation.address,
      dropLocation: currentLocation.dropAddress,
      problemNote: note,
      provider,
      status: 'en_route',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      etaMinutes: provider.eta,
      totalCost: provider.price,
      routeCoordinates: MOCK_ROUTE_COORDINATES
    };
    setActiveBooking(booking);
    setLiveTrackingStep(0);
    setDriverETA(provider.eta);
    setDriverStatus('en_route');
    addNotification(
      'Assistance Confirmed',
      `${provider.name} is on the way to ${currentLocation.address}. ETA ${provider.eta} min.`,
      'booking'
    );
  };

  const cancelBooking = () => {
    if (activeBooking) {
      addNotification('Assistance Cancelled', `Booking #${activeBooking.id} has been cancelled.`, 'booking');
      setActiveBooking(null);
      setLiveTrackingStep(0);
    }
  };

  // Simulated live movement along route coordinates
  useEffect(() => {
    if (!activeBooking) return;

    const interval = setInterval(() => {
      setLiveTrackingStep((prev) => {
        const next = prev + 1;
        if (next >= MOCK_ROUTE_COORDINATES.length - 1) {
          setDriverStatus('arrived');
          setDriverETA(0);
          return MOCK_ROUTE_COORDINATES.length - 1;
        }
        const remainingSteps = MOCK_ROUTE_COORDINATES.length - 1 - next;
        const newETA = Math.max(1, Math.ceil((remainingSteps / MOCK_ROUTE_COORDINATES.length) * (activeBooking?.provider.eta || 5)));
        setDriverETA(newETA);
        return next;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [activeBooking]);

  const currentDriverCoords = MOCK_ROUTE_COORDINATES[liveTrackingStep] || MOCK_ROUTE_COORDINATES[0];
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        cars,
        selectedCarIndex,
        selectedCar,
        nextCar,
        previousCar,
        selectCarById,
        addCar,
        removeCar,
        currentLocation,
        updatePickupAddress,
        updateDropAddress,
        activeBooking,
        createBooking,
        cancelBooking,
        activeFilter,
        setActiveFilter,
        sosModalOpen,
        setSosModalOpen,
        notifications,
        unreadNotificationsCount,
        markNotificationRead,
        addNotification,
        isSearchingProviders,
        setIsSearchingProviders,
        liveTrackingStep,
        currentDriverCoords,
        driverETA,
        driverStatus,
        userProfileOpen,
        setUserProfileOpen,
        notificationDrawerOpen,
        setNotificationDrawerOpen,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
