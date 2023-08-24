import { create } from "zustand";

interface ReplyingTo {
  to: string;
  plotDetails?: {
    plotId: string;
    avatarUrl: string;
    desc: string;
    timestamp: string;
    content: string;
  };
}

interface PlotModalStoreState {
  showPlotModal: boolean;
  replyingTo?: ReplyingTo;
  openPlotModal: (replyTo?: ReplyingTo) => void;
  closePlotModal: () => void;
}

export const usePlotModal = create<PlotModalStoreState>((set, get) => ({
  showPlotModal: false,
  replyingTo: undefined,
  openPlotModal: (replyingTo) => set({ showPlotModal: true, replyingTo }),
  closePlotModal: () => set({ showPlotModal: false, replyingTo: undefined }),
}));
