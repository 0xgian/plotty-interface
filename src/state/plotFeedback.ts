import { create } from "zustand";
import { FeedbackStore, fbDataTofbStore } from "./types";

interface PlotFeedbackStoreState {
  feedbackStore: FeedbackStore;
  useful: (plotId: string) => number;
  isUseful: (plotId: string) => boolean;
  toggleUseful: (plotId: string) => void;
  isNotUseful: (plotId: string) => boolean;
  toggleNotUseful: (plotId: string) => void;
  isReplotted: (plotId: string) => boolean;
  totalReplots: (plotId: string) => number;
  toggleReplot: (plotId: string) => void;
  syncFeedback: (nodes: any[]) => void;
}

export const usePlotFeedbackStore = create<PlotFeedbackStoreState>(
  (set, get) => ({
    feedbackStore: {},
    useful: (plotId: string) => get().feedbackStore?.[plotId]?.useful ?? 0,
    isUseful: (plotId: string) => get().feedbackStore?.[plotId]?.status === 1,
    toggleUseful: (plotId: string) =>
      set((state) => {
        const prev = state.feedbackStore[plotId];
        return {
          feedbackStore: Object.assign(state.feedbackStore, {
            [plotId]: {
              useful: prev.useful + (prev.status === 1 ? -1 : 1),
              status: prev.status === 1 ? null : 1,
              replotStatus: prev.replotStatus,
              totalReplots: prev.totalReplots,
            },
          }),
        };
      }),
    isNotUseful: (plotId: string) =>
      get().feedbackStore?.[plotId]?.status === 0,
    toggleNotUseful: (plotId: string) =>
      set((state) => {
        const prev = state.feedbackStore[plotId];
        return {
          feedbackStore: Object.assign(state.feedbackStore, {
            [plotId]: {
              useful: prev.useful + (prev.status === 1 ? -1 : 0),
              status: prev.status === 0 ? null : 0,
              replotStatus: prev.replotStatus,
              totalReplots: prev.totalReplots,
            },
          }),
        };
      }),
    isReplotted: (plotId: string) =>
      get().feedbackStore?.[plotId]?.replotStatus === 1,
    totalReplots: (plotId: string) =>
      get().feedbackStore?.[plotId]?.totalReplots ?? 0,
    toggleReplot: (plotId: string) =>
      set((state) => {
        const prev = state.feedbackStore[plotId];      
        return {
          feedbackStore: Object.assign(state.feedbackStore, {
            [plotId]: {
              useful: prev.useful,
              status: prev.status,
              replotStatus: prev.replotStatus === 1 ? null : 1,
              totalReplots:
                prev.totalReplots + (prev.replotStatus === 1 ? -1 : 1),
            },
          }),
        };
      }),
    syncFeedback: (nodes: any[]) =>
      set((state) => ({
        feedbackStore: Object.assign(
          state.feedbackStore,
          fbDataTofbStore(nodes)
        ),
      })),
  })
);
