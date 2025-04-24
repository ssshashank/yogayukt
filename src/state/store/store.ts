import { create } from "zustand";
import { useAuthSlice } from "../slices/useAuth";

const useGlobalStore = create<any>()((...set) => ({
    ...useAuthSlice(...set),
}));

export default useGlobalStore;
