import { Tabs } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AUTH_ROUTES, SEEKER_ROUTES } from "@/constants/routes";
import { useTheme } from "@Providers/themeProvider";

export default function SeekerTabLayout() {
    const { theme } = useTheme();

    return (
        <SafeAreaProvider>
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: theme.background,
                }}>
                <StatusBar barStyle={"default"} />
                <Tabs screenOptions={{ headerShown: false }}>
                    <Tabs.Screen
                        name='index'
                        key={"index"}
                        options={{ headerShown: false, animation: "none", title: "Home" }}
                    />
                </Tabs>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
