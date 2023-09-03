import { create } from "zustand";

interface ModalStoreState {
  modalIds: string[];
  isShowing: (modalId: string) => boolean;
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
}

export const useModal = create<ModalStoreState>((set, get) => ({
  modalIds: [],
  isShowing: (modalId: string) => get().modalIds.includes(modalId),
  openModal: (modalId: string) =>
    set((state) => ({
      modalIds:
        state.modalIds.indexOf(modalId) === -1
          ? [...state.modalIds, modalId]
          : state.modalIds,
    })),
  closeModal: (modalId: string) =>
    set((state) => ({
      modalIds: state.modalIds.filter((id) => id !== modalId),
    })),
}));
