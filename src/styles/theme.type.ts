import { ThemeMode } from "@/constants/application";

export type ThemeType = 'CLASSIC' | 'MODERN' | 'VINTAGE' | 'MINIMAL';

export type Mode = typeof ThemeMode[keyof typeof ThemeMode];

export interface Colors {
    primary: string;
    secondary: string;
    tertiary: string;
    background: string;
    primaryText: string;
    secondaryText: string;
    disabled: string;
    border: string;
}

export interface ColorTheme {
    light: Colors;
    dark: Colors;
}
