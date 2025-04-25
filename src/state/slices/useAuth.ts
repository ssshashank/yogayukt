import { StateCreator } from "zustand";

type _authStore = {
    signupData?: any | null;
    setSignup: (signupData?: any) => void;
    loginData?: any | null;
    setLoginData: (loginData?: any) => void;

};

const useAuthSlice: StateCreator<_authStore> = (set) => ({
    signupData: null,
    loginData: null,
    setSignup: (data: any) => set({ signupData: data }),
    setLoginData: (data: any) => set({ loginData: data }),
    clearAuth: () => set({ signupData: null }),
});

export { useAuthSlice };
