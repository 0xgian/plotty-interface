import { create } from "zustand";

interface ModalStoreType {
  modalIds: string[];
  isShowing: (modalId: string) => boolean;
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
}

export const useModal = create<ModalStoreType>((set, get) => ({
  modalIds: [],
  isShowing: (modalId) => get().modalIds.includes(modalId),
  openModal: (modalId) =>
    set((state) => ({
      modalIds:
        state.modalIds.indexOf(modalId) === -1
          ? [...state.modalIds, modalId]
          : state.modalIds,
    })),
  closeModal: (modalId) =>
    set((state) => ({
      modalIds: state.modalIds.filter((id) => id !== modalId),
    })),
}));
