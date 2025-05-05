import { forwardRef } from "react";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import { Image } from 'expo-image';
import { DEFAULT_AVATAR } from "@/constants/application";

interface AvatarProps {
    children?: React.ReactNode,
    url?: string;
    avatarStyle?: StyleProp<ViewStyle>
    onPress?: () => void;
    fallback?: string;
}
const Avatar = forwardRef<React.ElementRef<typeof Pressable>, AvatarProps>((props, ref) => {
    const { url, avatarStyle, onPress } = props;

    return (
        <View>
            <Pressable
                onPress={onPress}
                ref={ref}
                style={[
                    {
                        width: 50,
                        height: 50,
                        overflow: 'hidden',
                        borderRadius: '50%',
                    }, avatarStyle
                ]}>
                <Image
                    style={{
                        flex: 1,
                    }}
                    source={url || DEFAULT_AVATAR}
                    contentFit="cover"
                    transition={1000}
                />
            </Pressable>
        </View>
    );
});

export { Avatar };
