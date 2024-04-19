import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware'
export const useReservationStore = create(
    persist(
        (set) => ({
            reservation: {}, // Inicialmente, reservation está vacío
            handleReservation: (dataTours) => set(() => ({
                reservation: dataTours // Asigna dataTours a reservation
            })),
        }),
        {
            name: 'orderData',
            storage: createJSONStorage(() => localStorage),
        }
    )
);