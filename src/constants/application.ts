import { Dimensions } from "react-native";

const DEFAULT_AVATAR = "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fHww";
const APP_NAME = "Yogayukt";
const APP_VERSION = "1.0.0";
const BASE_WIDTH = 375;
const DEVICE_HEIGHT = Dimensions.get("window").height;
const DEVICE_WIDTH = Dimensions.get("window").width;

type ThemeType = "CLASSIC" | "MODERN" | "VINTAGE" | "MINIMAL";

type Mode = (typeof ThemeMode)[keyof typeof ThemeMode];

const enum ThemeMode {
    DARK = "dark",
    LIGHT = "light",
    SYSTEM = "system",
}

const enum FontWeight {
    W100 = "100",
    W200 = "200",
    W300 = "300",
    W400 = "400",
    W500 = "500",
    W600 = "600",
    W700 = "700",
    W800 = "800",
    W900 = "900",
}

const enum FontSize {
    XXS = 10,
    XS = 12,
    SM = 14,
    DEFAULT = 16,
    MD = 20,
    LG = 26,
    XL = 32,
    XXL = 38,
    XXXL = 44,
    XXXXL = 50,
    TALL = 56,
    MEGA = 65,
}

const Breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    superLarge: 2000,
    tvLike: 4000,
} as const;

export {
    DEFAULT_AVATAR,
    APP_NAME,
    APP_VERSION,
    ThemeType,
    Mode,
    ThemeMode,
    FontWeight,
    FontSize,
    BASE_WIDTH,
    DEVICE_WIDTH,
    DEVICE_HEIGHT,
    Breakpoints,
};
