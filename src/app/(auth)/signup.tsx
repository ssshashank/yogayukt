import {
	Text,
	View,
	StyleSheet,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Platform,
	Keyboard,
	ScrollView,
} from "react-native";
import { FontSize, FontWeight } from "@/constants/application";
import { useDimension } from "@/hooks/useDimension";
import { useTheme } from "@/providers/themeProvider";
import { Colors } from "@/styles/theme.type";
import { AnimatedRichButton } from "@/components/button";
import { AtSign, AudioLines, KeyRound, User2 } from "lucide-react-native";
import { InputField } from "@/components/inputField";
import Animated from "react-native-reanimated";
import { router } from "expo-router";
import Checkbox from "expo-checkbox";
import { useState, useRef } from "react";
import { Select } from "@/components/select";

const { title, auth } = require("@/config/appScreenMeta.json");
const { tagline, subTagline } = auth?.signup || {};

export default function SignupScreen() {
	const { theme } = useTheme();
	const styles = createStyles(theme);
	const { wp, scaleFontSize } = useDimension();
	const scrollViewRef = useRef<ScrollView>(null);

	// State to track which input is focused
	const [focusedInput, setFocusedInput] = useState<string | null>(null);

	// Function to handle input focus
	const handleInputFocus = (inputName: string, y: number) => {
		setFocusedInput(inputName);
		// Scroll to the focused input
		if (scrollViewRef.current) {
			scrollViewRef.current.scrollTo({
				y: y,
				animated: true,
			});
		}
	};

	// dismiss keyboard when clicked in viewport
	const dismissKeyboard = () => {
		Keyboard.dismiss();
		setFocusedInput(null);
	};

	const navigateToLogin = () => router.push("/login");
	const [isChecked, setChecked] = useState(false);

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
						<View style={{ height: "10%" }}></View>

						<View>
							<Text style={styles.tagline}>{tagline}</Text>
						</View>
						<View>
							<Text style={styles.subTagline}>{subTagline}</Text>
						</View>
						<View style={styles.inputContainer}>
							<Select
								options={[
									{ label: "Seeker", value: "1" },
									{ label: "Teacher", value: "2" },
									{ label: "Center", value: "3" },
								]}
								label='Role'
								placeholder='Select the role'
								onSelect={(value) => console.log("Selected:", value)}
								onFocus={() => handleInputFocus("role", 120)}
								selectStyle={{
									borderWidth: 0.3,
									borderRadius: 50,
									borderColor: focusedInput === "role" ? theme.primary : "gray",
									marginVertical: 3,
									backgroundColor: "#F3F4F6",
								}}
								dropdownStyle={{
									backgroundColor: "white",
								}}
								prefixIcon={
									<AudioLines
										color={focusedInput === "role" ? theme.primary : "gray"}
										size={15}
										style={{ marginHorizontal: 2 }}
									/>
								}
							/>
						</View>
						<View style={styles.inputContainer}>
							<InputField
								label='Full name'
								labelStyle={{ width: wp(90) }}
								placeholder='Enter fullname'
								onFocus={() => handleInputFocus("fullname", 180)}
								onBlur={() => setFocusedInput(null)}
								inputFieldStyle={{
									borderWidth: 0.3,
									borderRadius: 50,
									borderColor:
										focusedInput === "fullname" ? theme.primary : "gray",
									marginVertical: 3,
									backgroundColor: "#F3F4F6",
								}}
								prefixIcon={
									<User2
										color={focusedInput === "fullname" ? theme.primary : "gray"}
										size={15}
										style={{ marginHorizontal: 2 }}
									/>
								}
							/>
						</View>
						<View style={styles.inputContainer}>
							<InputField
								label='Email'
								labelStyle={{ width: wp(90) }}
								placeholder='Enter email address'
								onFocus={() => handleInputFocus("email", 240)}
								onBlur={() => setFocusedInput(null)}
								inputFieldStyle={{
									borderWidth: 0.3,
									borderRadius: 50,
									borderColor:
										focusedInput === "email" ? theme.primary : "gray",
									marginVertical: 3,
									backgroundColor: "#F3F4F6",
								}}
								prefixIcon={
									<AtSign
										color={focusedInput === "email" ? theme.primary : "gray"}
										size={15}
										style={{ marginHorizontal: 2 }}
									/>
								}
							/>
						</View>
						<View style={styles.inputContainer}>
							<InputField
								placeholder='Enter password'
								label='Password'
								labelStyle={{ width: wp(90) }}
								onFocus={() => handleInputFocus("password", 300)}
								onBlur={() => setFocusedInput(null)}
								inputFieldStyle={{
									borderWidth: 0.3,
									borderRadius: 50,
									borderColor:
										focusedInput === "password" ? theme.primary : "gray",
									marginVertical: 3,
									backgroundColor: "#F3F4F6",
								}}
								prefixIcon={
									<KeyRound
										color={focusedInput === "password" ? theme.primary : "gray"}
										size={15}
										style={{ marginHorizontal: 2 }}
									/>
								}
							/>
						</View>
						<View style={styles.checkBoxView}>
							<Checkbox
								style={styles.checkbox}
								value={isChecked}
								onValueChange={setChecked}
								color={isChecked ? theme.primary : undefined}
							/>
							<TouchableWithoutFeedback onPress={() => setChecked(!isChecked)}>
								<Text style={styles.paragraph}>
									{" "}
									I agree to the Terms and Privacy Policy
								</Text>
							</TouchableWithoutFeedback>
						</View>
						<AnimatedRichButton style={[styles.button]}>
							<Text style={styles.buttonText}>Create your account</Text>
						</AnimatedRichButton>

						<View style={styles.loginTextContainer}>
							<Text style={{ color: "gray" }}>
								Already have an account?{" "}
								<TouchableWithoutFeedback onPress={navigateToLogin}>
									<Text
										style={{
											color: theme.primaryText,
											fontWeight: 600,
											fontSize: scaleFontSize(FontSize.SM),
										}}>
										Login
									</Text>
								</TouchableWithoutFeedback>
							</Text>
						</View>
					</ScrollView>
					<Animated.View style={styles.copyrightContainer}>
						<Text style={styles.copyright}>
							{title} | Copyright ©{new Date().getFullYear()}
						</Text>
					</Animated.View>
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
			alignItems: "center",
			paddingBottom: 50,
		},
		inputContainer: {
			marginVertical: 10,
			width: wp(90),
		},
		sectionBody: {
			width: wp(90),
		},
		background: {
			flex: 1,
			width: wp(70),
			marginHorizontal: "auto",
		},
		title: {
			fontSize: scaleFontSize(FontSize.XXL),
			fontWeight: FontWeight.W500,
			textAlign: "center",
			width: wp(90),
		},
		tagline: {
			fontSize: scaleFontSize(FontSize.XXL),
			fontWeight: FontWeight.W600,
			textAlign: "center",
			width: wp(90),
			marginVertical: 10,
		},
		subTagline: {
			fontSize: scaleFontSize(FontSize.DEFAULT),
			color: theme.secondaryText,
			textAlign: "center",
			width: wp(90),
			marginBottom: 20,
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
			marginTop: 25,
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
		checkbox: {
			margin: 8,
			borderWidth: 1,
		},
		checkBoxView: {
			flexDirection: "row",
			alignItems: "center",
			width: wp(90),
			marginTop: 10,
		},
		paragraph: {
			fontSize: 15,
		},
		loginTextContainer: {
			marginVertical: 15,
		},
		copyrightContainer: {
			marginTop: 10,
		},
		copyright: {
			textAlign: "center",
			color: theme.primaryText,
			fontSize: scaleFontSize(FontSize.XS),
			opacity: 0.5,
		},
	});
};
