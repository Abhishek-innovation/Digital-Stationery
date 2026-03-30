import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AstrologyState {
  profile: { name: string; logo: string; whatsapp: string; instagram: string };
  charts: Record<string, string | null>;
  dashas: Array<{ mahadasha: string; antardasha: string; period: string }>;
  doshas: { mangal: boolean; sadesati: boolean; dhaiya: boolean };
  updateProfile: (data: any) => void;
  setChart: (id: string, url: string) => void;
  addDasha: (row: any) => void;
  updateDoshas: (data: any) => void;
}

export const useAstrologyStore = create<AstrologyState>()(
  persist(
    (set) => ({
      profile: { name: '', logo: '', whatsapp: '', instagram: '' },
      charts: { lagan: null, chandra: null, navansh: null, astak: null, dashmansh: null, gochar: null },
      dashas: [],
      doshas: { mangal: false, sadesati: false, dhaiya: false },
      updateProfile: (profile) => set((state) => ({ profile: { ...state.profile, ...profile } })),
      setChart: (id, url) => set((state) => ({ charts: { ...state.charts, [id]: url } })),
      addDasha: (row) => set((state) => ({ dashas: [...state.dashas, row] })),
      updateDoshas: (doshas) => set((state) => ({ doshas: { ...state.doshas, ...doshas } })),
    }),
    { name: 'astrology-data' }
  )
);
