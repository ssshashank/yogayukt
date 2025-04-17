import {
	Text,
	View,
	StyleSheet,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Platform,
	Keyboard,
} from "react-native";
import { FontSize, FontWeight } from "@/constants/application";
import { useDimension } from "@/hooks/useDimension";
import { useTheme } from "@/providers/themeProvider";
import { Colors } from "@/styles/theme.type";
import { AnimatedRichButton } from "@/components/button";
import { AtSign, KeyRound } from "lucide-react-native";
import { InputField } from "@/components/inputField";
import Animated from "react-native-reanimated";
import { Image } from "expo-image";
import { router } from "expo-router";

const { title, auth } = require("@/config/appScreenMeta.json");
const { tagline, subTagline, background_image } = auth?.login || {};

export default function LoginScreen() {
	const { theme } = useTheme();
	const styles = createStyles(theme);
	const { wp, scaleFontSize } = useDimension();

	// dismiss keyboard when clicked in viewport
	const dismissKeyboard = () => Keyboard.dismiss();
	const navigateToSignup = () => router.push("/signup");

	const loginHandler = () => {};
	return (
		<KeyboardAvoidingView
			style={styles.keyboardAvoidView}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}>
			<TouchableWithoutFeedback onPress={dismissKeyboard}>
				<View style={styles.section}>
					<View style={styles.sectionBody}>
						<View style={{ height: "45%" }}>
							<Image
								style={styles?.background}
								source={background_image}
								placeholder='Lorem ipsum'
								contentFit='cover'
								transition={1000}
							/>
						</View>
						<View>
							<Text style={styles.tagline}>{tagline}</Text>
						</View>
						<View>
							<Text style={styles.subTagline}>{subTagline}</Text>
						</View>
						<View style={{ marginVertical: 10 }}>
							<InputField
								// value={countryCodeSearch}
								// onChangeText={(text) => setCountryCodeSearch(text)}
								label='Email'
								labelStyle={{ width: wp(90) }}
								placeholder='Enter email address'
								inputFieldStyle={{
									borderWidth: 0.3,
									borderRadius: 50,
									borderColor: "gray",
									marginVertical: 3,
									backgroundColor: "#F3F4F6",
								}}
								prefixIcon={
									<AtSign
										color='black'
										size={15}
										style={{ marginHorizontal: 2 }}
									/>
								}
							/>
						</View>
						<View style={{ marginVertical: 10 }}>
							<InputField
								// value={countryCodeSearch}
								// onChangeText={(text) => setCountryCodeSearch(text)}
								placeholder='Enter password'
								label='Password'
								labelStyle={{ width: wp(90) }}
								inputFieldStyle={{
									borderWidth: 0.3,
									borderRadius: 50,
									borderColor: "gray",
									marginVertical: 3,
									backgroundColor: "#F3F4F6",
								}}
								prefixIcon={
									<KeyRound
										color='black'
										size={15}
										style={{ marginHorizontal: 2 }}
									/>
								}
							/>
						</View>
						<View style={{ width: wp(90), marginVertical: 5 }}>
							<Text style={{ textAlign: "right" }}>Forgot Password?</Text>
						</View>
						<AnimatedRichButton style={[styles.button]}>
							<Text style={styles.buttonText}>Continue</Text>
						</AnimatedRichButton>
					</View>
					<View>
						<Text style={{ color: "gray" }}>
							New to Yogayukt?{" "}
							<TouchableWithoutFeedback onPress={navigateToSignup}>
								<Text
									style={{
										color: theme.primaryText,
										fontWeight: 600,
										fontSize: scaleFontSize(FontSize.SM),
									}}>
									Signup
								</Text>
							</TouchableWithoutFeedback>
						</Text>
					</View>
					<Animated.View>
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
			alignItems: "center",
			justifyContent: "space-between",
		},
		sectionBody: {
			width: wp(90),
		},
		background: {
			flex: 1,
			width: wp(80),
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
		copyright: {
			textAlign: "center",
			color: theme.primaryText,
			fontSize: scaleFontSize(FontSize.XS),
			opacity: 0.5,
		},
	});
};
