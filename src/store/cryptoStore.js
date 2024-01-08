import { create } from "zustand";

export const useCryptoStore = create((set) => ({
	cryptos: [],
	setCrypto: (val) => set((state) => ({ cryptos: val })),
}));
