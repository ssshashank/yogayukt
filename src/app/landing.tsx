import RelaxCard from "@/components/RelaxCard";
import { useDimension } from "@/hooks/useDimension";
import {
	FlatList,
	Text,
	View,
	Animated,
	TouchableOpacity,
	NativeScrollEvent,
	NativeSyntheticEvent,
} from "react-native";
import { useState, useRef } from "react";
import Paginator from "@/components/paginator/paginator";
import { Pills } from "@/components/pills";
import { LinearGradient } from "expo-linear-gradient";
import { FontSize } from "@/constants/application";
const _metaData = require("@/config/appScreenMeta.json");

export default function Landing() {
	const [isShow, setShow] = useState<boolean>(false);
	const { wp, hp, scaleFontSize } = useDimension();
	const scrollX = useRef(new Animated.Value(0)).current;
	const slideRef = useRef<FlatList>(null);
	const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 })?.current;

	// Track which slide is currently visible
	const [currentIndex, setCurrentIndex] = useState(0);
	const slidesData = _metaData?.landing?.slides || [];

	// Calculate current index from scroll position
	const updateCurrentIndex = (
		event: NativeSyntheticEvent<NativeScrollEvent>
	) => {
		const contentOffsetX = event.nativeEvent.contentOffset.x;
		const currentIndex = Math.round(contentOffsetX / wp(100));
		setCurrentIndex(currentIndex);

		// show button when at the last slide, hide otherwise
		setShow(currentIndex === slidesData.length - 1);
	};

	// Handle button press - you can add your action here
	const handleButtonPress = () => {
		console.log("Button pressed!");
		// Add your navigation logic or other actions here
	};

	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
			}}>
			<FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				pagingEnabled
				data={slidesData}
				scrollEventThrottle={32}
				viewabilityConfig={viewConfig}
				ref={slideRef}
				onScroll={Animated.event(
					[
						{
							nativeEvent: {
								contentOffset: {
									x: scrollX,
								},
							},
						},
					],
					{
						useNativeDriver: false,
						listener: updateCurrentIndex,
					}
				)}
				renderItem={({ item, index }) => {
					return (
						<View
							key={`slide-${index}`}
							style={{
								width: wp(100),
								margin: "auto",
								justifyContent: "space-between",
								alignItems: "center",
							}}>
							<View style={{ height: "40%" }}></View>
							<View
								style={{
									height: "30%",
									borderRadius: 20,
								}}>
								<LinearGradient
									colors={item?.pills_gradient}
									start={{ x: 0, y: 0 }}
									end={{ x: 1, y: 0 }}
									style={{
										alignSelf: "flex-start",
										borderRadius: 20,
										marginBottom: 10,
									}}>
									<Pills
										style={{
											paddingHorizontal: 15,
											paddingVertical: 8,
											borderRadius: 20,
											alignSelf: "flex-start",
										}}>
										<Text style={{ fontSize: scaleFontSize(FontSize.SM) }}>
											{item?.tag}
										</Text>
									</Pills>
								</LinearGradient>
								<RelaxCard data={item} />
							</View>
						</View>
					);
				}}
				keyExtractor={(item) => item.screenName}
			/>

			<View style={{ position: "absolute", bottom: hp(10) }}>
				<Paginator data={slidesData} scrollX={scrollX} />
			</View>

			{/* Button that appears only at the end of the list */}
			{isShow && (
				<TouchableOpacity
					onPress={handleButtonPress}
					style={{
						position: "absolute",
						bottom: hp(3),
						backgroundColor: "#4285F4",
						paddingHorizontal: 20,
						paddingVertical: 12,
						borderRadius: 25,
						elevation: 3,
						shadowColor: "#000",
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.2,
						shadowRadius: 4,
					}}>
					<Text
						style={{
							color: "white",
							fontWeight: "bold",
							fontSize: scaleFontSize(FontSize.MD),
						}}>
						Get Started
					</Text>
				</TouchableOpacity>
			)}
		</View>
	);
}
