// imports
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { Colors, Mode } from '@Styles/theme.type';
import { ThemeMode } from '@Constants/application';
import ClassicTheme from '@Styles/classic';
import FreshTheme from "@Styles/fresh";

/**
 * Props interface for the ThemeProvider component
 */
interface ThemeProviderProps {
    children: React.ReactNode;
}

/**
 * Interface defining the shape of our theme context
 * @property theme - The current theme object containing colors and styles
 * @property mode - Current theme mode (light/dark/system)
 * @property changeTheme - Function to change the current theme
 * @property changeMode - Function to change the current mode
 */
interface ThemeContextProps {
    mode: Mode;
    theme: Colors;
    changeTheme: (theme: string) => void;
    changeMode: (mode: Mode) => void;
}

/**
 * Create the Theme Context with default values
 * This context will be used to share theme state across the app
 */
export const ThemeContext = createContext<ThemeContextProps>({
    theme: ClassicTheme.light,
    mode: ThemeMode.LIGHT,
    changeTheme: () => { },
    changeMode: () => { }
});

/**
 * Custom hook to use the theme context
 * @throws {Error} If used outside of ThemeProvider
 * @returns {ThemeContextProps} The theme context value
 */
export const useTheme = (): ThemeContextProps => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    // return
    return context;
};

/**
 * ThemeProvider component that wraps the app and provides theme functionality
 * @param {ThemeProviderProps} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    // initial states
    const colorScheme = useColorScheme();
    const [theme, setTheme] = useState<Colors>(ClassicTheme?.light);
    const [mode, setMode] = useState<Mode>(ThemeMode.SYSTEM);

    /**
     * Callback to change the current theme
     * @param {string} colorTheme - The theme to switch to
     */
    const changeTheme = useCallback((colorTheme?: string) => {
        switch (colorTheme?.toUpperCase()) {
            case 'CLASSIC':
                if (mode === ThemeMode.SYSTEM) {
                    setTheme(colorScheme === 'light' ? ClassicTheme?.light : ClassicTheme?.dark);
                } else {
                    setTheme(mode === 'light' ? ClassicTheme?.light : ClassicTheme?.dark);
                }
                break;
            case 'FRESH':
                if (mode === ThemeMode.SYSTEM) {
                    setTheme(colorScheme === 'light' ? FreshTheme?.light : FreshTheme?.dark);
                } else {
                    setTheme(mode === 'light' ? FreshTheme?.light : FreshTheme?.dark);
                }
                break;

            default:
                if (mode === ThemeMode.SYSTEM) {
                    setTheme(colorScheme === 'light' ? ClassicTheme?.light : ClassicTheme?.dark);
                } else {
                    setTheme(mode === 'light' ? ClassicTheme?.light : ClassicTheme?.dark);
                }
                break;
        }
    }, [colorScheme, mode]);


    /**
     * Callback to change the current mode (light/dark/system)
     * @param {Mode} newMode - The mode to switch to
     */
    const changeMode = useCallback((newMode: Mode) => {
        switch (newMode) {
            case ThemeMode.LIGHT:
                setMode(ThemeMode.LIGHT);
                changeTheme();
                break;
            case ThemeMode.DARK:
                setMode(ThemeMode.DARK);
                break;
            case ThemeMode.SYSTEM:
                setMode(ThemeMode.SYSTEM);
                break;
            default:
                setMode(ThemeMode.LIGHT);
                break;
        }
    }, [colorScheme]);

    const themeContextValue = useMemo(() => ({
        theme,
        mode,
        changeTheme,
        changeMode
    }), [theme, mode, changeTheme, changeMode]);

    //useEffect to update theme based on color scheme
    useEffect(() => {
        changeMode(mode);
        changeTheme();
    }, [colorScheme, mode]);

    return (
        <ThemeContext.Provider value={themeContextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

