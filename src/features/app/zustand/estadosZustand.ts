import { create } from 'zustand';
interface ReloadState {
  isReloading: number;
  triggerReload: () => void;
}

export const useEstadoReload = create<ReloadState>((set) => ({
  isReloading: 0,
  triggerReload: () => set((state) => ({ isReloading: state.isReloading + 1 })),
}));


