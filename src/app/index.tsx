import { SafeAreaView, Text, View } from "react-native";
import { useContext } from "react";
import Landing from "./landing";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeContext } from "@/providers/themeProvider";

export default function Index() {
	const appTheme = useContext(ThemeContext);
	const { theme } = appTheme;

	return (
		<SafeAreaProvider>
			<SafeAreaView
				style={{
					flex: 1,
					backgroundColor: theme.background,
				}}>
				<Landing />
			</SafeAreaView>
		</SafeAreaProvider>
	);
}
