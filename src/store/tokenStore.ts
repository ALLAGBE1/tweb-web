import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

export const useTokenStore = create(
    persist(
        combine(
            { token: null as undefined | null | string },
            (set) => ({
                setToken: (token: string | null) => set({ token }),
            })
        ),
        {
            name: 'token'
        }
    )
)