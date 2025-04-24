import { BASE_WIDTH } from "@Constants/application";
import { useCallback } from "react";
import { useWindowDimensions } from "react-native";

/**
 * @function useResponsive
 * @description A custom hook returning screen dimension-based helpers (wp, hp, scaleFontSize)
 */
const useDimension = () => {
    const { width, height } = useWindowDimensions();

    /**
     * returns the computed width in px based on the provided percentage
     */
    const wp = useCallback(
        (percentage: number): number => {
            if (percentage < 0 || percentage > 100) {
                throw new Error("Percentage must be between 0 and 100");
            }
            return Math.round((percentage * width) / 100);
        },
        [width]
    );

    /**
     * returns the computed height in px based on the provided percentage
     */
    const hp = useCallback(
        (percentage: number): number => {
            if (percentage < 0 || percentage > 100) {
                throw new Error("Percentage must be between 0 and 100");
            }
            return Math.round((percentage * height) / 100);
        },
        [height]
    );

    /**
     * scales a font size based on the ratio of the device's current width
     * to the base design width
     */
    const scaleFontSize = useCallback(
        (fontSize: number): number => {
            const scaleFactor = width / BASE_WIDTH;
            return fontSize * scaleFactor;
        },
        [width]
    );

    return { wp, hp, scaleFontSize };
};

export { useDimension }
