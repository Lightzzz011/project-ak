// src/types/parking.ts
export interface ParkingLocation {
    id: number;
    lat: number;
    lng: number;
    name: string;
    availableSlots: number;
    address: string;
    pricePerHour?: number;
    totalSlots?: number;
    features?: string[];
  }
  
  export interface ParkingSlotResponse {
    availableSlots: number;
    name: string;
    totalSlots: number;
    pricePerHour?: number;
    coordinates: {
      lat: number;
      lng: number;
    };
  }