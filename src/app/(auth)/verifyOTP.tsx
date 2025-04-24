import { OTPBox } from "@/components/otpBox";
import { FontSize, FontWeight } from "@/constants/application";
import { useDimension } from "@/hooks/useDimension";
import { useTheme } from "@/providers/themeProvider";
import { Colors } from "@/styles/theme.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Animated, ScrollView, Text, View } from "react-native";
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	TouchableWithoutFeedback,
} from "react-native";
import { VerifyOTPFormType, verifyOTPSchema } from "./models";
import { AnimatedRichButton } from "@/components/button";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { RightArrow } from "@Assets/svg/arrow";
import Copyright from "@/components/copyright/copyright";

export default function VerifyOTPScreen() {
	const { theme } = useTheme();
	const styles = createStyles(theme);
	const scrollViewRef = useRef<ScrollView>(null);

	// State to track which input is focused
	const [focusedInput, setFocusedInput] = useState<string | null>(null);
	const [showButton, setShowButton] = useState<boolean>(false);
	const gap = useSharedValue<number>(15);

	const { control, handleSubmit, setValue } = useForm<VerifyOTPFormType>({
		resolver: zodResolver(verifyOTPSchema),
	});

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

	// dismiss keyboard when clicked in viewport
	const dismissKeyboard = () => {
		Keyboard.dismiss();
		setFocusedInput(null);
	};

	const verifyOTPHandler = (data: VerifyOTPFormType) => {
		console.log(data);
	};

	return (
		<KeyboardAvoidingView
			style={styles.keyboardAvoidView}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 40}>
			<TouchableWithoutFeedback onPress={dismissKeyboard}>
				<View style={styles.section}>
					<ScrollView
						ref={scrollViewRef}
						style={styles.scrollView}
						contentContainerStyle={styles.scrollViewContent}
						keyboardShouldPersistTaps='handled'
						showsVerticalScrollIndicator={false}>
						<View>
							<Text style={styles.tagline}>Verify your email</Text>
						</View>
						<View>
							<Text style={styles.subTagline}>
								Enter code we've sent to your inbox
							</Text>
						</View>
						<View style={{ marginVertical: 30 }}>
							<OTPBox
								control={control}
								name='otp'
								length={6}
								onComplete={(val: string) => {
									setValue("otp", val.split(""));
									if (val.length === 6) {
										setShowButton(true);
									}
								}}
							/>
						</View>
						{showButton && (
							<AnimatedRichButton
								style={[
									styles.button,
									{
										gap,
									},
								]}
								onPress={handleSubmit(verifyOTPHandler)}
								onPressIn={handleButtonPressIn}
								onPressOut={handleButtonPressOut}>
								<Text style={styles.buttonText}>Verify OTP</Text>
								<RightArrow />
							</AnimatedRichButton>
						)}
					</ScrollView>
					<Copyright />
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

// styleSheet
const createStyles = (theme: Colors) => {
	const { wp, scaleFontSize } = useDimension();

	return StyleSheet.create({
		keyboardAvoidView: {
			flex: 1,
			backgroundColor: theme.background,
		},
		section: {
			flex: 1,
			backgroundColor: theme.background,
			width: wp(90),
			marginHorizontal: "auto",
			justifyContent: "space-between",
		},
		scrollView: {
			flex: 1,
			width: wp(90),
		},
		scrollViewContent: {
			flex: 1,
			alignItems: "center",
			paddingBottom: 50,
			justifyContent: "center",
		},
		tagline: {
			fontSize: scaleFontSize(FontSize.XXL),
			fontWeight: FontWeight.W600,
			textAlign: "center",
			width: wp(90),
			marginVertical: 10,
		},
		button: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "center",
			width: wp(90),
			backgroundColor: theme.primary,
			paddingHorizontal: 20,
			paddingVertical: 20,
			borderRadius: 50,
			elevation: 1,
			marginTop: 15,
			marginBottom: 20,
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
		subTagline: {
			fontSize: scaleFontSize(FontSize.DEFAULT),
			color: theme.secondaryText,
			textAlign: "center",
			width: wp(90),
			marginBottom: 20,
		},
	});
};
