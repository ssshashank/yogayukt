import { forwardRef } from "react";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import { Image } from 'expo-image';

interface AvatarProps {
    children?: React.ReactNode,
    url?: string;
    avatarStyle?: StyleProp<ViewStyle>
    onPress?: () => void;

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
                        width: 70,
                        height: 70,
                        overflow: 'hidden',
                        borderRadius: '50%',
                    }, avatarStyle
                ]}>
                <Image
                    style={{
                        flex: 1,
                    }}
                    source={url || "https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"}
                    contentFit="cover"
                    transition={1000}
                />
            </Pressable>
        </View>
    );
});

export { Avatar };
