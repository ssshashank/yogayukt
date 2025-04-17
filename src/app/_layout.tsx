// imports
import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";
import { ThemeProvider } from "@Providers/themeProvider";

/*
 * @Function() Root Layout
 * @Description() This is the Root Layout
 * @Params() None
 * @Return() React.FC
 */
const RootLayout: React.FC = () => {
	return (
		<ThemeProvider>
			<View style={{ flex: 1 }}>
				<StatusBar barStyle={"default"} />
				<Stack>
					<Stack.Screen
						name='(auth)'
						options={{ headerShown: false, animation: "none" }}
					/>
				</Stack>
			</View>
		</ThemeProvider>
	);
};

export default RootLayout;
