# AUTO SOS — Premium Automotive Roadside Assistance Platform 🚗⚡

A modern, responsive, 24/7 automotive emergency roadside assistance website built with **React**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Leaflet Maps**, precisely following the reference design theme.

---

## ✨ Features Built

1. **Brand & Visual Styling (Reference Inspired)**:
   - Deep navy / charcoal background (`#090d15`, `#121722`)
   - Translucent glassmorphism cards with subtle golden glow
   - Primary warm amber/yellow CTAs (`#f5a623`, `#fbb034`)
   - 3D yellow automotive vector illustrations (Bell, Tow Truck, Open Bonnet Repairs, Flat Tyre, Dead Battery, Fluid Leakage, Brake Failure, Cute Mascot)
   - Dark interactive Leaflet satellite & street map with glowing yellow route polylines

2. **Interactive Car Switcher**:
   - `My Car ▼` floating glass dropdown
   - **↑ / ↓ Quick Switcher Controls**
   - 5 Saved Vehicles: Porsche Taycan (EV), BMW 3 Series (Petrol), Tata Nexon EV (EV), Hyundai Creta (Petrol), Mahindra XUV700 (Diesel), BMW 7 Series
   - Dynamic fuel vs battery % gauge, remaining range, health status, and registration numbers
   - Smooth animated transitions when switching cars

3. **Auto SOS Emergency Dispatch**:
   - Prominent Auto SOS card with 3D Golden Bell illustration
   - One-tap SOS modal with problem categorization (Battery Dead, Flat Tyre, Out of Fuel, EV Charging, Brake Failure, Accident, Lockout)
   - Emergency contact synchronization & instant priority fleet dispatch

4. **Service Request Flow (Screen 2 Reference)**:
   - Pick-up Location with GPS toggle
   - Auto-populated car details and registration plate
   - Problem description note
   - Cute 3D Yellow Mechanic Mascot (*"Filled all your details?"*)
   - Animated radar search finding verified nearby units

5. **Live GPS Navigation & Driver Tracking (Screen 3 Reference)**:
   - Service Provider Card: *MV Tow Truck (Paul Sterling, C52696V, ⭐ 4.8)*
   - Drop Location with edit controls
   - Simulated real-time vehicle movement along the route coordinates
   - Dynamic ETA countdown (5 min -> 4 min -> 3 min... -> Arrived!)
   - In-app Calling simulation & Encrypted Driver Chat

6. **Garage & Vehicle Management**:
   - `My Cars` page with full telemetry, battery health, and `+ Add New Car` modal
   - `Service History` page with downloadable invoices and past records

7. **Zero AI / Clean Frontend**:
   - No external AI APIs, LLMs, or machine learning
   - Pure React state, mock JSON data, and Leaflet map polylines

---

## 🚀 How to Run

### Option 1: Standard React + Vite Dev Server
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Instant Standalone (Zero Install)
Double click or open `standalone.html` directly in any web browser (Chrome, Edge, Firefox, Safari).

---

## 📁 Project Structure

```
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── index.html
├── standalone.html
├── src/
│   ├── types/
│   │   └── index.ts
│   ├── data/
│   │   ├── cars.ts
│   │   ├── services.ts
│   │   ├── providers.ts
│   │   └── illustrations.tsx
│   ├── context/
│   │   └── AppContext.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── CarSwitcher.tsx
│   │   ├── SOSCard.tsx
│   │   ├── SOSModal.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── ServiceGrid.tsx
│   │   ├── MapView.tsx
│   │   ├── ProviderCard.tsx
│   │   ├── AssistanceSheet.tsx
│   │   ├── NotificationDrawer.tsx
│   │   ├── UserProfileModal.tsx
│   │   └── AddCarModal.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   ├── LiveAssistance.tsx
│   │   ├── MyCars.tsx
│   │   └── ServiceHistory.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
```
