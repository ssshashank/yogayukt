import { StateCreator } from "zustand";

type signupStore = {
	signupData?: any | null;
	setSignup: (signupData?: any) => void;
};

const useAuthSlice: StateCreator<signupStore> = (set) => ({
	signupData: null,
	setSignup: (data: any) => set({ signupData: data }),
	clearAuth: () => set({ signupData: null }),
});

export { useAuthSlice };
