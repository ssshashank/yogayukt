// Select.tsx
import React, { forwardRef, useState, useEffect } from "react";
import {
    Pressable,
    View,
    Text,
    Modal,
    TouchableWithoutFeedback,
    StyleSheet,
    StyleProp,
    ViewStyle,
    TextStyle,
} from "react-native";
import Animated, {
    useSharedValue,
    withTiming,
    Easing,
    useAnimatedStyle,
} from "react-native-reanimated";
import { Controller, Control } from "react-hook-form";
import { useTheme } from "@/providers/themeProvider";
import { useDimension } from "@/hooks/useDimension";
import { Colors } from "@/styles/theme.type";

interface SelectProps {
    name: string;
    control: Control<any>;
    options: { label: string; value: any }[];
    placeholder?: string;
    label?: string;
    labelStyle?: StyleProp<TextStyle>;
    prefixIcon?: React.ReactNode;
    suffixIcon?: React.ReactNode;
    selectStyle?: StyleProp<ViewStyle>;
    dropdownStyle?: StyleProp<ViewStyle>;
    optionStyle?: StyleProp<ViewStyle>;
    onSelect?: (value: any) => void;
    isError?: boolean;
    errorMessage?: string;
    errorStyle?: StyleProp<TextStyle>;
}

export const Select = forwardRef<
    React.ElementRef<typeof Pressable>,
    SelectProps
>((props, ref) => {
    const {
        name,
        control,
        options,
        placeholder = "Select an option",
        label,
        labelStyle,
        prefixIcon,
        suffixIcon,
        selectStyle,
        dropdownStyle,
        optionStyle,
        onSelect,
        isError,
        errorMessage,
        errorStyle,
    } = props;

    const { theme } = useTheme();
    const { wp, hp } = useDimension();
    const styles = createStyles(theme);

    // for fade‑in dropdown
    const opacity = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        opacity.value = withTiming(isOpen ? 1 : 0, {
            duration: 200,
            easing: Easing.ease,
        });
    }, [isOpen, opacity]);

    return (
        <View style={{ marginVertical: 8 }}>
            {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

            <Controller
                control={control}
                name={name}
                render={({ field: { value, onChange, onBlur } }) => (
                    <>
                        <Pressable
                            ref={ref}
                            style={[styles.pressable, selectStyle]}
                            onPress={() => setIsOpen(true)}
                            onBlur={onBlur}>
                            {prefixIcon}
                            <Text style={styles.text}>
                                {value
                                    ? options.find((opt) => opt.value === value)?.label
                                    : placeholder}
                            </Text>
                            {suffixIcon}
                        </Pressable>
                        <Modal
                            visible={isOpen}
                            transparent
                            animationType='none'
                            onRequestClose={() => {
                                onBlur();
                                setIsOpen(false);
                            }}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    onBlur();
                                    setIsOpen(false);
                                }}>
                                <View style={styles.backdrop}>
                                    <Animated.View
                                        style={[
                                            styles.dropdown,
                                            { maxHeight: hp(50), width: wp(80) },
                                            dropdownStyle,
                                            animatedStyle,
                                        ]}>
                                        {options.map((opt, i) => (
                                            <Pressable
                                                key={i}
                                                style={({ pressed }) => [
                                                    styles.option,
                                                    i !== options?.length - 1 ? styles.optionDivider : null,
                                                    optionStyle,
                                                    pressed && styles.optionPressed,
                                                ]}
                                                onPress={() => {
                                                    onChange(opt.value);
                                                    onSelect?.(opt.value);
                                                    setIsOpen(false);
                                                }}>
                                                <Text>{opt.label}</Text>
                                            </Pressable>
                                        ))}
                                    </Animated.View>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>
                    </>
                )}
            />

            {isError && (
                <Text
                    style={[
                        {
                            fontSize: 14,
                            color: "#F05252",
                            fontWeight: 400,
                        },
                        errorStyle,
                    ]}>
                    * {errorMessage === "Required" ? "Required fields" : errorMessage}
                </Text>
            )}
        </View>
    );
});

const createStyles = (theme: Colors) =>
    StyleSheet.create({
        label: {
            color: theme.primaryText,
            fontSize: 14,
        },
        pressable: {
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 12,
            paddingVertical: 18,
            borderWidth: 1,
            borderRadius: 8,
            borderColor: theme.accent,
            backgroundColor: theme.accent,
        },
        text: {
            color: theme.accent,
            flex: 1,
            marginLeft: 8,
        },
        backdrop: {
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "center",
            alignItems: "center",
        },
        dropdown: {
            backgroundColor: theme.background,
            borderRadius: 8,
            padding: 8,
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
        },
        option: {
            padding: 12,
        },
        optionDivider: {
            borderBottomWidth: 0.3,
            borderBottomColor: theme.accent,
        },
        optionPressed: {
            backgroundColor: theme.accent,
            borderRadius: 5
        },
        errorText: {
            marginTop: 4,
            color: "#D32F2F",
            fontSize: 12,
        },
    });
