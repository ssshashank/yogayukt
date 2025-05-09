import { forwardRef, useEffect } from "react";
import { TouchableOpacity, useWindowDimensions, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { LayoutDashboard, School, Contact, MessageSquareMore } from 'lucide-react-native';
import { Colors } from "@/styles/theme.type";

// Icon list
const _iconList = [
    LayoutDashboard,
    MessageSquareMore,
    School,
    Contact,
];

// Tab Icon Component
function TabIcon({ Icon, color, size }: {
    Icon: React.ComponentType<any>;
    color: string;
    size: number;
}) {
    return <Icon color={color} size={size} />;
}

interface TabBarProps extends BottomTabBarProps {
    theme: Colors,
    barWidth: number,
    itemWidth: number,
};

const AnimatedTabBar = forwardRef<React.ElementRef<typeof View>, TabBarProps>((props, ref) => {
    const { itemWidth, state, barWidth, theme, navigation } = props;
    const circleSize = itemWidth * 0.8;
    const translateX = useSharedValue(state.index * itemWidth);

    useEffect(() => {
        translateX.value = withTiming(state.index * itemWidth, { duration: 300 });
    }, [state?.index]);

    const bubbleStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const { width: screenWidth } = useWindowDimensions();
    const leftOffset = (screenWidth - barWidth) / 2;

    console.log(state?.routes);
    return (
        <View
            ref={ref}
            style={{
                backgroundColor: '#011f22',
                borderRadius: 50,
                position: 'absolute',
                bottom: 0,
                left: leftOffset,
                width: barWidth,
                height: 75,
                elevation: 8,
                shadowColor: theme.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.7,
                shadowRadius: 12,
                paddingVertical: 10
            }}
        >
            <Animated.View
                style={[
                    {
                        position: 'absolute',
                        width: circleSize,
                        height: circleSize,
                        borderRadius: circleSize / 2,
                        left: (itemWidth - circleSize) / 2,
                        backgroundColor: theme.primary,
                        top: (75 - itemWidth * 0.8) / 2,
                    },
                    bubbleStyle,
                ]}
            />
            <View style={{ flexDirection: 'row', flex: 1, }}>
                {state.routes.map((route: any, idx: number) => {
                    const isFocused = state.index === idx;
                    const IconComponent = _iconList[idx];
                    return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={() => navigation.navigate(route.name)}
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <TabIcon
                                Icon={IconComponent}
                                color={isFocused ? theme.secondaryText : theme.accent}
                                size={isFocused ? 20 : 20}
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}
)
export { AnimatedTabBar };
