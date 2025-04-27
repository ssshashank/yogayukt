import {
    Text,
    View,
    Animated as RNAnimated,
    StyleSheet,
} from "react-native";
import { useState, useRef } from "react";
import Animated, {
    useSharedValue,
    withSpring,
    withTiming,
    Easing,
} from "react-native-reanimated";
import { router } from "expo-router";
import { useDimension } from "@/hooks/useDimension";
import { FontSize } from "@/constants/application";
import { useTheme } from "@/providers/themeProvider";
import { LeftArrow, RightArrow } from "@Assets/svg/arrow";
import { Colors } from "@/styles/theme.type";
import {FAB } from "@/components/button";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from '@react-native-masked-view/masked-view';

const { landing } = require("@/config/appScreenMeta.json");
const { slides, } = landing || {};

export default function HomeScreen() {
    const { wp, hp, scaleFontSize } = useDimension();
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const scrollX = useRef(new RNAnimated.Value(0)).current;

    const gap = useSharedValue<number>(15);
    const opacity = useSharedValue<number>(0);
    const bottom = useSharedValue<number>(0);

    // Configure animation options for smoother transitions
    const animConfig = {
        duration: 400,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Smooth cubic bezier curve
    };

    // Handle button press - you can add your action here
    const handleOnClick = () => router.replace("/login");

    const handleButtonPressIn = () =>
    (gap.value = withSpring(30, {
        damping: 15,
        stiffness: 120,
    }));

    const handleButtonPressOut = () =>
    (gap.value = withSpring(15, {
        damping: 15,
        stiffness: 120,
    }));

    return (
        <View style={styles?.section}>
            <View style={styles?.sectionBody}>
                <View style={{ marginBottom: 30 }}>
                    <Text style={{ color: theme.accent, fontSize: scaleFontSize(FontSize.MD) }}>{slides?.[activeIndex]?.tag}</Text>
                </View>
                <View style={{ marginBottom: 90 }}>
                    <Text style={{ color: "white", fontSize: scaleFontSize(FontSize.XXL) }}>{slides?.[activeIndex]?.description}</Text>
                </View>
                <MaskedView
                    style={{ flex: 1, flexDirection: 'row', height: '100%' }}
                    maskElement={
                        <View
                            style={{
                                // Transparent background because mask is based off alpha channel.
                                backgroundColor: 'transparent',
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 60,
                                    color: 'black',
                                    fontWeight: 'bold',
                                }}
                            >
                                Basic Mask
                            </Text>
                        </View>
                    }
                >
                    {/* Shows behind the mask, you can put anything here, such as an image */}
                    <View style={{ flex: 1, height: '100%', backgroundColor: '#324376' }} />
                    <View style={{ flex: 1, height: '100%', backgroundColor: '#F5DD90' }} />
                    <View style={{ flex: 1, height: '100%', backgroundColor: '#F76C5E' }} />
                    <View style={{ flex: 1, height: '100%', backgroundColor: '#e1e1e1' }} />
                </MaskedView>
                <View
                    style={{
                        flexDirection: "row",
                        gap: 5,
                        marginBottom: 30,
                    }}>
                    {slides?.map((slide: any, index: number) => {
                        return (
                            <View
                                style={{
                                    width: index === activeIndex ? 30 : 15,
                                    height: 2,
                                    borderRadius: 10,
                                    backgroundColor: "white",
                                }}

                                key={index}
                            ></View>
                        );
                    })}
                </View>
                <View style={{ flexDirection: "row", gap: 5 }}>
                    <FAB
                        buttonStyle={{
                            flex: 0,
                            borderWidth: 1,
                            borderRadius: 50,
                            borderColor: 'white',
                        }}
                        onPress={
                            activeIndex > 0 ? () => setActiveIndex(activeIndex - 1) : null
                        }>
                        <LeftArrow color='white' />
                    </FAB>
                    <FAB
                        buttonStyle={{
                            flex: 0,
                            borderColor: 'white',
                            borderWidth: 1,
                            borderRadius: 50,
                        }}
                        onPress={
                            activeIndex < slides?.length - 1
                                ? () => setActiveIndex(activeIndex + 1)
                                : null
                        }>
                        <RightArrow color='white' />
                    </FAB>
                </View>
            </View>
        </View>
    );
}

// styleSheet
const createStyles = (theme: Colors) => {
    const { wp, hp, scaleFontSize } = useDimension();
    return StyleSheet.create({
        section: {
            flex: 1,
            width: wp(100),
            alignItems: "center",
            justifyContent: "center",
        },
        sectionBody: {
            height: hp(90),
            marginHorizontal: "auto",
            justifyContent: "flex-end",
            width: wp(90),
        },
        sliderContainer: {
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: 20,
            marginHorizontal: "auto",
        },
        button: {
            position: "absolute",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: wp(90),
            backgroundColor: theme.primary,
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderRadius: 50,
            elevation: 1,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
        },
        buttonText: {
            color: theme.background,
            textAlign: "center",
            fontSize: scaleFontSize(FontSize.DEFAULT),
        },
    });
};
