import { View, Text, ImageBackground } from "react-native";
import { useDimension } from "@/hooks/useDimension";
import { useTheme } from "@/providers/themeProvider";
import { FontSize } from "@/constants/application";

export default function RelaxCard({ data }: any) {
    const { wp, hp, scaleFontSize } = useDimension();
    const { theme } = useTheme();

    return (
        <View
            style={{
                flex: 1,
                width: wp(90),
                marginHorizontal: "auto",
                borderRadius: 20,
            }}>
            <Text
                style={{
                    textAlign: "center",
                    fontSize: scaleFontSize(FontSize.XL),
                    color: theme.primaryText,
                    fontWeight: "600",
                    marginBottom: hp(2),
                }}>
                {data?.title}
            </Text>
            <Text
                style={{
                    fontSize: scaleFontSize(FontSize.DEFAULT),
                    textAlign: "center",
                    color: theme.secondary,
                    opacity: 0.8,
                    lineHeight: scaleFontSize(FontSize.MD),
                    marginBottom: hp(2),
                }}>
                {data?.description}
            </Text>
        </View>
    );
}
