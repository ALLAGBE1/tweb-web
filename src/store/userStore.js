import { create } from 'zustand'

export const useUserStore = create((set) => ({
    users: [],
    setUser: (val) => set((state) => ({ users: val })),
}));