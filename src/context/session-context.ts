import { Session } from "next-auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SessionStore {
  session: Session | null;
  setSession: (session: Session | null) => void;
  clearSession: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  userRole: string | null;
  setLoading: (loading: boolean) => void;
  getUserRole: () => string | null;
  initialize: () => void;
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => ({
      session: null,
      setSession: (session) => set({ session }),
      clearSession: () => set({ session: null }),
      isLoading: true,
      lastUpdated: null,
      isAuthenticated: false,
      userRole: null,

      setLoading: (loading) => set({ isLoading: loading }),

      getUserRole: () => get().session?.user?.role || null,

      initialize: () => {
        set({ isLoading: false });
        const session = get().session;
        set({
          isAuthenticated: !!session,
          userRole: session?.user?.role || null,
        });
      },
    }),
    {
      name: "session-storage",
      partialize: (state) => ({
        session: state.session,
        userRole: state.userRole,
      }),
    }
  )
);
