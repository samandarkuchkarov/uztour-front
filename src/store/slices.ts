import { UserType } from "@/types";
import { StateCreator } from "zustand";
export interface UserState {
  user: UserType | null;
  setUser: (user: UserType) => void;
}

export const createUserSlice: StateCreator<UserState> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
});
