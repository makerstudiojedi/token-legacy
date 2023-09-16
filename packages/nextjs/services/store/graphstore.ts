import { create } from "zustand";

type TGraphStore = {
  latestActionBlock: number;
  latestGraphBlock: number;
  setLatestActionBlock: (newTxBlock: number) => void;
  setLatestGraphBlock: (newGraphBlock: number) => void;
};

export const useGraphStore = create<TGraphStore>(set => ({
  latestActionBlock: 0,
  latestGraphBlock: 0,
  setLatestActionBlock: (newValue: number): void => set(() => ({ latestActionBlock: newValue })),
  setLatestGraphBlock: (newValue: number): void => set(() => ({ latestActionBlock: newValue })),
}));
