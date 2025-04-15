import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";
import { ThemeProvider } from "@Providers/themeProvider";

export default function RootLayout() {
	return (
		<ThemeProvider>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name='index' options={{}} />
			</Stack>
		</ThemeProvider>
	);
}
