import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

const _MMKV = new MMKV({
    id: 'yogayukt_store'
});

const MMKVStore: StateStorage = {
    getItem: (key: string): string | null => _MMKV.getString(key) || null,
    setItem: (key: string, value: any) => _MMKV.set(key, value),
    removeItem: (key: string) => _MMKV.delete(key)
};

export {
    MMKVStore
} 
