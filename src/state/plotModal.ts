import { create } from "zustand";

interface ReplyingTo {
  to: string;
  plotDetails?: {
    plotId: string;
    avatarUrl: string;
    badge: React.ReactNode;
    subtitleEntity: string[];
    content: string;
  };
}

interface PlotModalStore {
  showPlotModal: boolean;
  replyingTo?: ReplyingTo;
  openPlotModal: (replyTo?: ReplyingTo) => void;
  closePlotModal: () => void;
}

export const usePlotModal = create<PlotModalStore>((set, get) => ({
  showPlotModal: false,
  replyingTo: undefined,
  openPlotModal: (replyingTo) => set({ showPlotModal: true, replyingTo }),
  closePlotModal: () => set({ showPlotModal: false, replyingTo: undefined }),
}));
