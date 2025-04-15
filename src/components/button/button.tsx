import React, { forwardRef } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Animated, Pressable, PressableProps, View } from "react-native";

// types of Button
enum ButtonVariant {
	FLAT = "flat",
	ELEVATED = "elevated",
	OUTLINED = "outlined",
	FAB = "fab",
}

/**
 * Props for the RichFABButton component.
 */
interface FABButtonProps extends PressableProps {
	children: React.ReactNode;
	/** Style to apply to the Pressable component */
	buttonStyle?: StyleProp<ViewStyle>;
	/**
	 * Style prop for Pressable. Can be ViewStyle, an array of ViewStyle,
	 * or a function returning ViewStyle
	 */
	style?:
		| StyleProp<ViewStyle>
		| ((state: { pressed: boolean }) => StyleProp<ViewStyle>);
	variants?: ButtonVariant;
}

const FAB = forwardRef<React.ElementRef<typeof Pressable>, FABButtonProps>(
	(props, ref) => {
		const {
			children,
			style,
			buttonStyle,
			variants = ButtonVariant.FAB,
			...otherProps
		} = props;

		// return
		return (
			<Pressable
				ref={ref}
				style={({ pressed }) => {
					const baseStyle =
						typeof style === "function" ? style({ pressed }) : style;
					return [
						{
							borderRadius: 10,
							flex: 1,
							width: 60,
							height: 60,
							justifyContent: "center",
							alignItems: "center",
							shadowColor: "#000",
							shadowOffset: { width: 0, height: 1 },
							shadowOpacity: 0.3,
							shadowRadius: 2,
							elevation: 5,
						},
						buttonStyle,
						baseStyle,
						pressed && { opacity: 0.8 }, // Optional: add a press effect
					];
				}}
				{...otherProps}>
				{children}
			</Pressable>
		);
	}
);

// Set a display name for debugging
FAB.displayName = "FAB_Button";
const AnimatedRichFABButton = Animated.createAnimatedComponent(FAB);

export { FAB, AnimatedRichFABButton };
