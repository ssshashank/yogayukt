import React from "react";
import { useDimension } from "@/hooks/useDimension";
import { useTheme } from "@/providers/themeProvider";
import { Animated, View } from "react-native";

function Paginator({ data, scrollX }: any) {
	const { wp } = useDimension();
	const { theme } = useTheme();

	return (
		<View style={{ flexDirection: "row", padding: 10 }}>
			{data?.map((_: any, index: number) => {
				const inputRange = [
					(index - 1) * wp(100),
					index * wp(100),
					(index + 1) * wp(100),
				];

				const dotWidth = scrollX.interpolate({
					inputRange,
					outputRange: [10, 20, 10],
					extrapolate: "clamp",
				});
				const opacity = scrollX.interpolate({
					inputRange,
					outputRange: [0.3, 1, 0.3],
					extrapolate: "clamp",
				});

				return (
					<Animated.View
						style={{
							width: dotWidth,
							opacity: opacity,
							height: 10,
							borderRadius: 5,
							backgroundColor: theme.secondaryText,
							marginHorizontal: 5,
						}}
						key={index}
					/>
				);
			})}
		</View>
	);
}

export default Paginator;
