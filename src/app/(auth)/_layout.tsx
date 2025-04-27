import { Stack } from "expo-router";
import { View, Dimensions } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AUTH_ROUTES } from "@/constants/routes";
import { useTheme } from "@Providers/themeProvider";
import { MeshGradientView } from "expo-mesh-gradient";

export default function AuthLayout() {
    const { theme } = useTheme();
    const { width, height } = Dimensions.get("window");

    return (
        <SafeAreaProvider>
            <View style={{ flex: 1, position: "relative" }}>
                <MeshGradientView
                    style={{
                        position: "absolute",
                        width,
                        height,
                        top: 0,
                        left: 0,
                        zIndex: 1,
                    }}
                    columns={2}
                    rows={2}
                    colors={[
                        theme.primary,
                        theme.accent,
                        theme.black,
                        theme.black,


                    ]}
                    points={[
                        [-3.0, 0.0],
                        [15.5, -6.0],
                        [-1.0, 1.0],
                        [1.0, 1.0]
                    ]}
                />
                <View style={{ flex: 1, zIndex: 2 }}>
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            contentStyle: { backgroundColor: "transparent" },
                        }}>
                        {Object.entries(AUTH_ROUTES || {}).map(([key, value]) => {
                            return (
                                <Stack.Screen
                                    key={key}
                                    name={value.name}
                                    options={{
                                        headerShown: false,
                                        animation: "none",
                                        contentStyle: { backgroundColor: "transparent" },
                                    }}
                                />
                            );
                        })}
                    </Stack>
                </View>
            </View>
        </SafeAreaProvider>
    );
}
