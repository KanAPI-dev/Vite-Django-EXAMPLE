import { create } from "zustand";

import { AuthState } from "@/types";

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  login: (user) => set(() => ({ user })),
  logout: () => set(() => ({ user: null })),
}));
