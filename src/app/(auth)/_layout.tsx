import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";
import { ThemeProvider, useTheme } from "@Providers/themeProvider";
import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ROUTES } from "@/constants/routes";

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
					{Object.entries(ROUTES || {}).map(([key, value]) => {
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
