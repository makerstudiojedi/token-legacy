import { create } from "zustand";

type TGraphStore = {
  latestActionBlock: number;
  latestGraphBlock: number;
  isLoading: boolean;
  setLatestActionBlock: (newTxBlock: number) => void;
  setLatestGraphBlock: (newGraphBlock: number) => void;
  setIsLoading: (newValue: boolean) => void;
};

export const useGraphStore = create<TGraphStore>(set => ({
  latestActionBlock: 0,
  latestGraphBlock: 0,
  isLoading: true,
  setLatestActionBlock: (newValue: number): void => set(() => ({ latestActionBlock: newValue })),
  setLatestGraphBlock: (newValue: number): void => set(() => ({ latestActionBlock: newValue })),
  setIsLoading: (newValue: boolean): void => set(() => ({ isLoading: newValue })),
}));
