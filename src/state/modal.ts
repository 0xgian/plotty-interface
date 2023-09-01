import { create } from "zustand";

interface ModalStoreState {
  modalId: string;
  isShowing: (modalId: string) => boolean;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}

export const useModal = create<ModalStoreState>((set, get) => ({
  modalId: "",
  isShowing: (modalId: string) => get().modalId === modalId,
  openModal: (modalId: string) => set({ modalId }),
  closeModal: () => set({ modalId: "" }),
}));
