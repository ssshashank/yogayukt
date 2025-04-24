// imports
import { forwardRef } from "react";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";

/**
 * Props for the RichPills component.
 * Extends PressableProps to include all standard Pressable component props.
 */
interface RichPillProps extends PressableProps {
    children?: React.ReactNode;
    variants?: any; // TODO:- create diff pills variants
    pillStyle?: StyleProp<ViewStyle>;
}

/**
 * Pills component
 *
 * A wrapper around the React Native Pressable component that allows for easy styling
 * and prop forwarding. This component uses forwardRef to allow parent components
 * to access the underlying Text component's ref.
 *
 * @param props - The props of the component, extending Pressable props
 * @param ref - Forwarded ref that will be attached to the Pressable component
 * @returns A Pressable component with the given children and forwarded props
 */
const Pills = forwardRef<React.ElementRef<typeof Pressable>, RichPillProps>(
    (props, ref) => {
        const { children, pillStyle, ...otherProps } = props;

        return (
            <>
                <Pressable ref={ref} style={[pillStyle]} {...otherProps}>
                    {children}
                </Pressable>
            </>
        );
    }
);

Pills.displayName = "Pills"; // display name to Pills

const AnimatedPills = Animated.createAnimatedComponent(Pills);
export { Pills, AnimatedPills };
