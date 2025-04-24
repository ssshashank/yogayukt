import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AUTH_ROUTES } from "@/constants/routes";
import { useTheme } from "@Providers/themeProvider";

export default function AuthLayout() {
    const { theme } = useTheme();

    return (
        <SafeAreaProvider>
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: theme.background,
                }}>
                <StatusBar barStyle={"default"} />
                <Stack screenOptions={{ headerShown: false }}>
                    {Object.entries(AUTH_ROUTES || {}).map(([key, value]) => {
                        return (
                            <Stack.Screen
                                key={key}
                                name={value.name}
                                options={{ headerShown: false, animation: "none" }}
                            />
                        );
                    })}
                </Stack>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
