import {
    Text,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { useRef, useState } from "react";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { router } from "expo-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { AtSign, KeyRound } from "lucide-react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontSize, FontWeight } from "@/constants/application";
import { useDimension } from "@/hooks/useDimension";
import { useTheme } from "@/providers/themeProvider";
import { Colors } from "@/styles/theme.type";
import { AnimatedRichButton } from "@/components/button";
import { InputField } from "@/components/inputField";
import { LoginFormType, loginSchema } from "./models";
import { RightArrow } from "@Assets/svg/arrow";
import Copyright from "@/components/copyright/copyright";
import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "@/apis";
import useGlobalStore from "@/state/store/store";

const { title, auth } = require("@/config/appScreenMeta.json");
const { tagline, subTagline } = auth?.login || {};

export default function LoginScreen() {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const { wp, scaleFontSize } = useDimension();
    const scrollViewRef = useRef<ScrollView>(null);

    const navigateToSignup = () => router.push("/signup");

    // State to track which input is focused
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const gap = useSharedValue<number>(15);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // dismiss keyboard when clicked in viewport
    const dismissKeyboard = () => {
        Keyboard.dismiss();
        setFocusedInput(null);
    };

    const handleButtonPressIn = () =>
    (gap.value = withSpring(30, {
        damping: 15,
        stiffness: 120
    }));

    const handleButtonPressOut = () =>
    (gap.value = withSpring(15, {
        damping: 15,
        stiffness: 120,
    }));

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
    const { setLoginData } = useGlobalStore();
    const loginMutation = useMutation({
        mutationFn: (data: any) => {
            return AuthAPI.login(data);
        },
        onSuccess: (data: any) => {
            setLoginData(data);
            console.log("LOGIN SUCCESSFULL:-", data);
            router.replace("/(seeker)/(tabs)");
        },
        onError: (error) => {
            console.log("LOGIN FAILED:-", error);
        }
    });

    const loginHandler: SubmitHandler<LoginFormType> = async (d: LoginFormType) => loginMutation.mutate(d);

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
                            <Text style={styles.tagline}>{tagline}</Text>
                        </View>
                        <View>
                            <Text style={styles.subTagline}>{subTagline}</Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <InputField
                                label='Email'
                                name='email'
                                labelStyle={{ width: wp(90) }}
                                placeholder='Enter email address'
                                onFocus={() => handleInputFocus("email", 240)}
                                onBlur={() => setFocusedInput(null)}
                                control={control}
                                inputFieldStyle={{
                                    borderWidth: 0.3,
                                    borderRadius: 50,
                                    borderColor:
                                        focusedInput === "email" ? theme.primary : "gray",
                                    marginVertical: 3,
                                }}
                                prefixIcon={
                                    <AtSign
                                        color={focusedInput === "email" ? theme.primary : "gray"}
                                        size={15}
                                        style={{ marginHorizontal: 2 }}
                                    />
                                }
                                isError={errors?.["email"] ? true : false}
                                errorMessage={errors.email?.message}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <InputField
                                name='password'
                                placeholder='Enter password'
                                label='Password'
                                labelStyle={{ width: wp(90) }}
                                onFocus={() => handleInputFocus("password", 300)}
                                onBlur={() => setFocusedInput(null)}
                                control={control}
                                inputFieldStyle={{
                                    borderWidth: 0.3,
                                    borderRadius: 50,
                                    borderColor:
                                        focusedInput === "password" ? theme.primary : "gray",
                                    marginVertical: 3,
                                }}
                                prefixIcon={
                                    <KeyRound
                                        color={focusedInput === "password" ? theme.primary : "gray"}
                                        size={15}
                                        style={{ marginHorizontal: 2 }}
                                    />
                                }
                                isError={errors?.["password"] ? true : false}
                                errorMessage={errors.password?.message}
                            />
                        </View>
                        <View style={{ width: wp(90), marginVertical: 5 }}>
                            <Text style={{ textAlign: "right" }}>Forgot Password?</Text>
                        </View>
                        <AnimatedRichButton
                            style={[
                                styles.button,
                                {
                                    gap,
                                },
                            ]}
                            onPress={handleSubmit(loginHandler)}
                            onPressIn={handleButtonPressIn}
                            onPressOut={handleButtonPressOut}>
                            {loginMutation?.isPending ? (
                                <ActivityIndicator size='small' color={theme.background} />
                            ) : (
                                <>
                                    <Text style={styles.buttonText}>Get Started</Text>
                                    <RightArrow />
                                </>
                            )}
                        </AnimatedRichButton>
                        <View style={styles.signupTextContainer}>
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
            paddingBottom: 50,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        },
        inputContainer: {
            marginVertical: 10,
            width: wp(90),
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
        signupTextContainer: {
            marginVertical: 15,
        },
    });
};
