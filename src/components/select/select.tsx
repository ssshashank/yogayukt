// imports
import { forwardRef, useState, useRef, useEffect } from "react";
import {
	Pressable,
	PressableProps,
	StyleProp,
	ViewStyle,
	View,
	Text,
	TouchableWithoutFeedback,
	Modal,
	TextStyle,
	StyleSheet,
} from "react-native";
import Animated, {
	useSharedValue,
	withTiming,
	Easing,
	useAnimatedStyle,
} from "react-native-reanimated";
import { useTheme } from "@/providers/themeProvider";
import { useDimension } from "@/hooks/useDimension";
import { Colors } from "@/styles/theme.type";
import { FontSize } from "@/constants/application";

/**
 * Props for the Select component.
 * Extends PressableProps to include all standard Pressable component props.
 */
interface SelectProps extends PressableProps {
	children?: React.ReactNode;
	options?: { label: string; value: any }[];
	label?: React.ReactNode;
	labelStyle?: StyleProp<TextStyle>;
	prefixIcon?: React.ReactNode;
	suffixIcon?: React.ReactNode;
	selectStyle?: StyleProp<ViewStyle>;
	dropdownStyle?: StyleProp<ViewStyle>;
	optionStyle?: StyleProp<ViewStyle>;
	onSelect?: (value: any) => void;
	placeholder?: string;
	value?: any;
	isError?: boolean;
	errorMessage?: string;
	errorStyle?: StyleProp<TextStyle>;
}

/**
 * Select component
 *
 * A customizable select component with dropdown functionality and animations
 *
 * @param props - The props of the component, extending Pressable props
 * @param ref - Forwarded ref that will be attached to the Pressable component
 * @returns A Select component with dropdown functionality
 */
const Select = forwardRef<React.ElementRef<typeof Pressable>, SelectProps>(
	(props, ref) => {
		const {
			children,
			selectStyle,
			options = [],
			prefixIcon,
			suffixIcon,
			dropdownStyle,
			optionStyle,
			onSelect,
			label,
			labelStyle,
			placeholder = "Select an option",
			value,
			isError,
			errorStyle,
			errorMessage,
			...otherProps
		} = props;

		const [isOpen, setIsOpen] = useState(false);
		const [selectedValue, setSelectedValue] = useState(value);
		const { theme } = useTheme();
		const styles = createStyles(theme);
		const { wp, hp } = useDimension();
		const opacity = useSharedValue(0);

		const animatedStyle = useAnimatedStyle(() => {
			return {
				opacity: opacity.value,
			};
		});

		useEffect(() => {
			if (isOpen) {
				opacity.value = withTiming(1, { duration: 300, easing: Easing.ease });
			} else {
				opacity.value = withTiming(0, { duration: 300, easing: Easing.ease });
			}
		}, [isOpen]);

		const handleSelect = (option: { label: string; value: any }) => {
			setSelectedValue(option.value);
			onSelect?.(option.value);
			setIsOpen(false);
		};

		const handleClose = () => {
			setIsOpen(false);
		};

		return (
			<View>
				{label && <Text style={[{}, labelStyle]}>{label}</Text>}
				<Pressable
					ref={ref}
					style={[styles.pressable, selectStyle]}
					onPress={() => setIsOpen(true)}
					{...otherProps}>
					{prefixIcon}
					<Text style={{ flex: 1, marginLeft: prefixIcon ? 10 : 0 }}>
						{selectedValue
							? options.find((opt) => opt.value === selectedValue)?.label
							: placeholder}
					</Text>
					{suffixIcon}
				</Pressable>
				<Modal
					visible={isOpen}
					transparent
					animationType='fade'
					onRequestClose={handleClose}>
					<TouchableWithoutFeedback onPress={handleClose}>
						<View
							style={{
								flex: 1,
								backgroundColor: "rgba(0,0,0,0.5)",
								justifyContent: "center",
								alignItems: "center",
							}}>
							<Animated.View
								style={[
									{
										position: "relative",
										backgroundColor: theme.background,
										borderRadius: 5,
										padding: 10,
										margin: 10,
										maxHeight: hp(50),
										width: wp(80),
										shadowColor: "#000",
										shadowOffset: {
											width: 0,
											height: 2,
										},
										shadowOpacity: 0.25,
										shadowRadius: 3.84,
										elevation: 5,
									},
									animatedStyle,
									dropdownStyle,
								]}>
								{options.map((option, index) => (
									<Pressable
										key={index}
										style={({ pressed }) => [
											{
												padding: 10,
												borderBottomWidth: index < options.length - 1 ? 1 : 0,
												borderBottomColor: theme.border,
												backgroundColor: pressed ? "#F3F4F6" : "transparent",
											},
											optionStyle,
										]}
										onPress={() => handleSelect(option)}>
										<Text>{option.label}</Text>
									</Pressable>
								))}
							</Animated.View>
						</View>
					</TouchableWithoutFeedback>
				</Modal>
				{isError && (
					<Text style={[styles.errorMessage, errorStyle]}>
						* {errorMessage ?? "This is the error message"}
					</Text>
				)}
			</View>
		);
	}
);

const createStyles = (theme: Colors) => {
	const { scaleFontSize } = useDimension();
	return StyleSheet.create({
		pressable: {
			flexDirection: "row",
			alignItems: "center",
			padding: 10,
			borderWidth: 1,
			borderRadius: 5,
			borderColor: theme.border,
			backgroundColor: theme.background,
			paddingVertical: 15,
		},
		errorMessage: {
			fontSize: scaleFontSize(FontSize.DEFAULT),
			color: "#F05252",
			fontWeight: 500,
		},
	});
};

Select.displayName = "Select";
const AnimatedSelect = Animated.createAnimatedComponent(Select);
export { Select, AnimatedSelect };
