// imports
import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { ThemeProvider } from "@Providers/themeProvider";

// Create a client
const queryClient = new QueryClient()
/*
 * @Function() Root Layout
 * @Description() This is the Root Layout
 * @Params() None
 * @Return() React.FC
 */
const RootLayout: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <View style={{ flex: 1 }}>
                    <StatusBar barStyle={"default"} />
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen
                            name='(auth)'
                            options={{ headerShown: false, animation: "none" }}
                        />
                    </Stack>
                </View>
            </ThemeProvider>
        </QueryClientProvider>);
};

export default RootLayout;
