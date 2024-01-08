import { create } from "zustand";
import { combine, persist } from "zustand/middleware"
import { Account } from "./type";

export const useAuthStore = create(
    persist(
        combine(
            { account: undefined as undefined | null | Account },
            (set) => ({
                setAccount: (account: Account | null) => set({ account }),
            })
        ),
        {
            name: 'account'
        }
    )
)