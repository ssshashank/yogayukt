import Animated from "react-native-reanimated";
import { StyleSheet, Text } from "react-native";
import { useTheme } from "@/providers/themeProvider";
import { useDimension } from "@/hooks/useDimension";
import { APP_NAME, FontSize } from "@/constants/application";
import { Colors } from "@/styles/theme.type";

export default function Copyright() {
	const { theme } = useTheme();
	const styles = createStyles(theme);

	return (
		<Animated.View style={styles.copyrightContainer}>
			<Text style={styles.copyright}>
				{APP_NAME} | Copyright © {new Date().getFullYear()}
			</Text>
		</Animated.View>
	);
}

const createStyles = (theme: Colors) => {
	const { wp, scaleFontSize } = useDimension();

	return StyleSheet.create({
		copyrightContainer: {
			width: wp(90),
			alignItems: "center",
			justifyContent: "center",
			marginTop: 10,
		},
		copyright: {
			textAlign: "center",
			color: theme.primaryText,
			fontSize: scaleFontSize(FontSize.XS),
			opacity: 0.5,
		},
	});
};
