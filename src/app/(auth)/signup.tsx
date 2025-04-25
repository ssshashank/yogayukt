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
import { useState, useRef } from "react";
import { AtSign, AudioLines, KeyRound, User2 } from "lucide-react-native";
import { useSharedValue, withSpring } from "react-native-reanimated";
import { router } from "expo-router";
import Checkbox from "expo-checkbox";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontSize, FontWeight } from "@/constants/application";
import { useDimension } from "@/hooks/useDimension";
import { useTheme } from "@/providers/themeProvider";
import { Colors } from "@/styles/theme.type";
import { AnimatedRichButton } from "@/components/button";
import { InputField } from "@/components/inputField";
import { Select } from "@/components/select";
import { SignupFormType, signupSchema } from "./models";
import { RightArrow } from "@Assets/svg/arrow";
import { ActivityIndicator } from "react-native";
import { AuthAPI } from "@/apis";
import useGlobalStore from "@/state/store/store";
import { useMutation } from "@tanstack/react-query";
import Copyright from "@/components/copyright/copyright";

const { title, auth } = require("@/config/appScreenMeta.json");
const { tagline, subTagline } = auth?.signup || {};

export default function SignupScreen() {
    const { theme } = useTheme();
    const styles = createStyles(theme);
    const { wp, scaleFontSize } = useDimension();
    const scrollViewRef = useRef<ScrollView>(null);
    const [role, setRole] = useState<string | null>(null);

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
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormType>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            role: "",
            username: "",
            email: "",
            password: "",
        },
    });

    const gap = useSharedValue<number>(15);

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
    const { setSignup } = useGlobalStore();

    const signupMutation = useMutation({
        mutationFn: (data: any) => {
            const _signupDetails = {
                first_name: data?.username?.split(" ")?.[0],
                last_name: data?.username?.split(" ").slice(1).join(" "),
                email: data?.email,
                password: data?.password,
                role: data?.role,
                admin: false,
            };
            return AuthAPI.signup(_signupDetails);
        },
        onSuccess: (data) => {
            // Handle API success
            setSignup(data);
            console.log("Signup successful:", data);
            router.push("/verifyOTP");
        },
        onError: (error) => {
            console.error("Signup failed:", error);
        },
    });

    const signupHandler: SubmitHandler<SignupFormType> = async (
        d: SignupFormType
    ) => signupMutation.mutate(d);

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
                            <Select
                                options={[
                                    { label: "Seeker", value: "Seeker" },
                                    { label: "Teacher", value: "Teacher" },
                                    { label: "Center", value: "Center" },
                                ]}
                                name='role'
                                control={control}
                                label='Role'
                                placeholder='Select the role'
                                onSelect={(value) => {
                                    setRole(value);
                                }}
                                selectStyle={{
                                    borderWidth: 0.3,
                                    borderRadius: 50,
                                    borderColor: focusedInput === "role" ? theme.primary : "gray",
                                    marginVertical: 3,
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
                                isError={!role ? (errors?.["role"] ? true : false) : false}
                                errorMessage={errors.role?.message}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <InputField
                                label='Full name'
                                labelStyle={{ width: wp(90) }}
                                placeholder='Enter fullname'
                                name='username'
                                control={control}
                                onFocus={() => handleInputFocus("fullname", 180)}
                                onBlur={() => setFocusedInput(null)}
                                inputFieldStyle={{
                                    borderWidth: 0.3,
                                    borderRadius: 50,
                                    borderColor:
                                        focusedInput === "fullname" ? theme.primary : "gray",
                                    marginVertical: 3,
                                }}
                                prefixIcon={
                                    <User2
                                        color={focusedInput === "fullname" ? theme.primary : "gray"}
                                        size={15}
                                        style={{ marginHorizontal: 2 }}
                                    />
                                }
                                isError={errors?.["username"] ? true : false}
                                errorMessage={errors.username?.message}
                            />
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
                        <AnimatedRichButton
                            style={[
                                isChecked ? styles.button : styles.disabledButton,
                                {
                                    gap,
                                },
                            ]}
                            disabled={signupMutation?.isPending}
                            onPress={isChecked ? handleSubmit(signupHandler) : null}
                            onPressIn={isChecked ? handleButtonPressIn : null}
                            onPressOut={isChecked ? handleButtonPressOut : null}>
                            {signupMutation?.isPending ? (
                                <ActivityIndicator size='small' color={theme.background} />
                            ) : (
                                <>
                                    <Text
                                        style={isChecked ? styles.buttonText : styles.disabledText}>
                                        Get Started
                                    </Text>
                                    <RightArrow />
                                </>
                            )}
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
        disabledButton: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: wp(90),
            backgroundColor: theme.disabled,
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
        disabledText: {
            color: theme.primaryText,
            textAlign: "center",
            opacity: 0.5,
            fontSize: scaleFontSize(FontSize.DEFAULT),
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
    });
};
