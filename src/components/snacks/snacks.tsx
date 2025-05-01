import {
    StyleProp,
    ViewStyle,
    View,
    StyleSheet,
    Text,
    Pressable,
    TextStyle,
} from "react-native";
import Animated, {
    useSharedValue,
    withTiming,
    Easing,
    runOnJS,
} from "react-native-reanimated";
import { X } from "lucide-react-native";
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { FontSize, FontWeight } from "@/constants/application";
import { useDimension } from "@/hooks/useDimension";
import { useTheme } from "@/providers/themeProvider";
import { Colors } from "@/styles/theme.type";

export enum Alignment {
    top = "TOP",
    bottom = "BOTTOM",
}

export enum SnackType {
    info = "INFO",
    warning = "WARNING",
    error = "ERROR",
    success = "SUCCESS",
}

interface SnacksProps {
    message?: string;
    messageStyle?: StyleProp<TextStyle>;
    type?: SnackType;
    prefixIcon?: React.ReactNode;
    isAutoDismissable?: boolean;
    dismissIcon?: React.ReactNode;
    dismissTime?: number;
    alignment?: Alignment;
    iconSize?: number;
    iconColor?: string;
    snackStyle?: StyleProp<ViewStyle>;
    dismissStyle?: StyleProp<ViewStyle>;
    onDismiss?: () => void;
    onPressIn?: () => void;
    onPressOut?: () => void;
}

export const Snack = forwardRef<React.ElementRef<typeof View>, SnacksProps>(
    (props, ref) => {
        const { theme } = useTheme();
        const styles = createStyles(theme);
        const translateSnack = useSharedValue<number>(0);
        const opacity = useSharedValue<number>(0);
        const {
            message = "Hello, world",
            messageStyle,
            alignment = Alignment.top,
            type = SnackType.info,
            isAutoDismissable = true,
            iconSize = 16,
            iconColor = theme.white,
            prefixIcon,
            dismissTime = 3000,
            dismissStyle,
            dismissIcon = <X color={iconColor} size={iconSize} />,
            onDismiss,
        } = props;

        const [showSnack, setShowSnack] = useState<boolean>(true);

        const animConfig = useMemo(
            () => ({
                duration: 400,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            }),
            []
        );

        const finishDismiss = useCallback(() => {
            setShowSnack(false);
            onDismiss?.();
        }, [onDismiss]);

        const handlePress = useCallback(() => {
            const finalPosition = alignment === Alignment.top ? -50 : 50;
            translateSnack.value = withTiming(finalPosition, animConfig);
            opacity.value = withTiming(0, animConfig, (finished) => {
                if (finished) {
                    runOnJS(finishDismiss)();
                }
            });
        }, [alignment, animConfig, finishDismiss, opacity, translateSnack]);

        useEffect(() => {
            let timeoutId: NodeJS.Timeout;
            // Initial animation
            translateSnack.value =
                alignment === Alignment.top
                    ? withTiming(20, animConfig)
                    : withTiming(35, animConfig);
            opacity.value = withTiming(1, animConfig);

            if (isAutoDismissable) {
                timeoutId = setTimeout(handlePress, dismissTime);
            }

            return () => {
                if (timeoutId) clearTimeout(timeoutId);
                // Cancel any ongoing animations
                translateSnack.value = withTiming(0, { duration: 0 });
                opacity.value = withTiming(0, { duration: 0 });
            };
        }, [
            alignment,
            animConfig,
            dismissTime,
            handlePress,
            isAutoDismissable,
            opacity,
            translateSnack,
        ]);

        const snackDirection = useMemo(() => {
            if (alignment === Alignment.top) {
                return { top: translateSnack, opacity: opacity };
            } else if (alignment === Alignment.bottom) {
                return { bottom: translateSnack, opacity: opacity };
            } else {
                return {};
            }
        }, [alignment]);

        const snackBgColor = useMemo(() => {
            if (type === SnackType.info) {
                return { backgroundColor: "cyan" };
            } else if (type === SnackType.warning) {
                return { backgroundColor: "yellow" };
            } else if (type === SnackType.error) {
                return { backgroundColor: "red" };
            } else if (type === SnackType.success) {
                return { backgroundColor: "green" };
            } else {
                return {};
            }
        }, [type]);

        return (
            showSnack && (
                <Animated.View
                    ref={ref}
                    style={[styles.container, snackDirection, snackBgColor]}>
                    <View style={styles.containerBody}>
                        <View style={[styles.left, { gap: prefixIcon ? 10 : 0 }]}>
                            <View>{prefixIcon}</View>
                            <View>
                                <Text style={[styles.message, messageStyle]}> {message} </Text>
                            </View>
                        </View>
                        {!isAutoDismissable && (
                            <Pressable
                                style={[styles.touch, dismissStyle]}
                                onPress={handlePress}>
                                {dismissIcon}
                            </Pressable>
                        )}
                    </View>
                </Animated.View>
            )
        );
    }
);

const createStyles = (theme: Colors) => {
    const { wp, scaleFontSize } = useDimension();

    return StyleSheet.create({
        container: {
            width: wp(90),
            paddingHorizontal: 10,
            paddingVertical: 15,
            borderRadius: 50,
            marginHorizontal: "auto",
            position: "absolute",
            zIndex: 10,
        },
        containerBody: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        left: {
            flexDirection: "row",
            alignItems: "center",
        },
        message: {
            fontSize: scaleFontSize(FontSize.DEFAULT),
            fontWeight: FontWeight.W400,
        },
        touch: {
            backgroundColor: theme.black,
            padding: 5,
            borderRadius: 50,
        },
    });
};
