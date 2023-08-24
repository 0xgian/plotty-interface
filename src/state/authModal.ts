import { create } from "zustand";

interface AuthModalStoreState {
  showAuthModal: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

export const useAuthModal = create<AuthModalStoreState>((set, get) => ({
  showAuthModal: false,
  openAuthModal: () => set({ showAuthModal: true }),
  closeAuthModal: () => set({ showAuthModal: false }),
}));
