import {
    FlatList,
    Text,
    View,
    Animated as RNAnimated,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Pressable,
    StyleSheet,
} from "react-native";
import { useState, useRef } from "react";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
    useSharedValue,
    withSpring,
    withTiming,
    Easing,
} from "react-native-reanimated";
import { router } from "expo-router";
import Paginator from "@/components/paginator/paginator";
import RelaxCard from "@/components/RelaxCard";
import { useDimension } from "@/hooks/useDimension";
import { Pills } from "@/components/pills";
import { FontSize } from "@/constants/application";
import { useTheme } from "@/providers/themeProvider";
import { RightArrow } from "@Assets/svg/arrow";
import { Colors } from "@/styles/theme.type";
import { AnimatedRichButton } from "@/components/button";

const { landing } = require("@/config/appScreenMeta.json");
const { slides, background_image } = landing || {};

export default function HomeScreen() {
    const [_, setCurrentIndex] = useState<number>(0);
    const [isShow, setShow] = useState<boolean>(false);
    const [__, setScrollPercentage] = useState(0);
    const { wp, hp, scaleFontSize } = useDimension();
    const { theme } = useTheme();
    const styles = createStyles(theme);

    const scrollX = useRef(new RNAnimated.Value(0)).current;
    const slideRef = useRef<FlatList>(null);
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 })?.current;

    const gap = useSharedValue<number>(15);
    const opacity = useSharedValue<number>(0);
    const bottom = useSharedValue<number>(0);

    // Configure animation options for smoother transitions
    const animConfig = {
        duration: 400,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Smooth cubic bezier curve
    };

    // Calculate current index from scroll position
    const updateCurrentIndex = (
        event: NativeSyntheticEvent<NativeScrollEvent>
    ) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / wp(100));
        const maxScroll = wp(100) * (slides.length - 1);

        // Calculate scroll percentage (0 to 100)
        const percentage = Math.min(
            100,
            Math.max(0, (contentOffsetX / maxScroll) * 100)
        );
        setScrollPercentage(percentage);
        setCurrentIndex(currentIndex);

        // Show button when at the last slide, hide otherwise
        const isLastSlide = currentIndex === slides.length - 1;
        setShow(isLastSlide);

        if (isLastSlide) {
            opacity.value = withSpring(1, animConfig);
            bottom.value = withTiming(hp(5), animConfig);
        } else {
            opacity.value = withSpring(0, animConfig);
            bottom.value = withTiming(0, animConfig);
        }
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
            <View style={{ height: "5%" }}></View>
            <View style={{ height: "50%" }}>
                <Image
                    style={styles?.background}
                    source={background_image}
                    placeholder='Lorem ipsum'
                    contentFit='cover'
                    transition={1000}
                />
            </View>
            <View style={styles?.sliderContainer}>
                <Animated.FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    data={slides}
                    scrollEventThrottle={32}
                    viewabilityConfig={viewConfig}
                    ref={slideRef}
                    onScroll={RNAnimated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        x: scrollX,
                                    },
                                },
                            },
                        ],
                        {
                            useNativeDriver: false,
                            listener: updateCurrentIndex,
                        }
                    )}
                    renderItem={({ item, index }) => {
                        return (
                            <View key={index}>
                                <LinearGradient
                                    colors={item?.pills_gradient}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={{
                                        alignSelf: "center",
                                        borderRadius: 20,
                                        marginBottom: 10,
                                    }}>
                                    <Pills
                                        style={{
                                            paddingHorizontal: 15,
                                            paddingVertical: 8,
                                            borderRadius: 20,
                                            alignSelf: "center",
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: scaleFontSize(FontSize.SM),
                                                fontWeight: 500,
                                            }}>
                                            {item?.tag}
                                        </Text>
                                    </Pills>
                                </LinearGradient>
                                <RelaxCard data={item} />
                            </View>
                        );
                    }}
                    keyExtractor={(item) => item.screenName}
                />
                <Paginator data={slides} scrollX={scrollX} />
                <AnimatedRichButton
                    style={[
                        styles.button,
                        {
                            gap,
                            opacity,
                            bottom,
                            pointerEvents: isShow ? "auto" : "none",
                        },
                    ]}
                    onPress={handleOnClick}
                    onPressIn={handleButtonPressIn}
                    onPressOut={handleButtonPressOut}>
                    <Text style={styles.buttonText}>Get Started</Text>
                    <RightArrow />
                </AnimatedRichButton>
            </View>
        </View>
    );
}

// styleSheet
const createStyles = (theme: Colors) => {
    const { wp, scaleFontSize } = useDimension();
    return StyleSheet.create({
        section: {
            flex: 1,
            backgroundColor: theme.background,
            width: wp(90),
            marginHorizontal: "auto",
            alignItems: "center",
            justifyContent: "space-between",
        },
        background: {
            flex: 1,
            width: wp(100),
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
