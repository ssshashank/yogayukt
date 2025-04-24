// import
import { Fragment, useRef, useState } from "react";
import { TextInput, View } from "react-native";
import { StyleSheet } from "react-native";
import { InputField } from "../inputField";
import { DEVICE_WIDTH } from "@/constants/application";
import { useTheme } from "@/providers/themeProvider";
import { useDimension } from "@/hooks/useDimension";
import { Colors } from "@/styles/theme.type";
import { Control } from "react-hook-form";

interface OTPBoxProps {
	length?: number;
	keyboardType?: string;
	onComplete?: (otp: string) => void;
	control: Control<any>;
	name: string;
	isError?: boolean;
	errorMessage?: string;
}

const OTPBox: React.FC<OTPBoxProps> = (props) => {
	const {
		length = 6,
		onComplete,
		control,
		name,
		isError,
		errorMessage,
	} = props;
	const [otp, setOtp] = useState(new Array(length).fill(""));
	const inputRefs = useRef<Array<TextInput | null>>(
		new Array(length).fill(null)
	);
	const { theme } = useTheme();
	const styles = createStyles(theme, length!);

	const handleChange = (
		text: string,
		index: number,
		onChange: (value: string) => void
	) => {
		const newOtp = [...otp];
		newOtp[index] = text;
		setOtp(newOtp);

		// Move to the next input if there is text and it's not the last field
		if (text && index < length! - 1) {
			inputRefs.current[index + 1]?.focus();
		}
		onChange(text);

		// Call onComplete with the updated OTP including the current input
		if (index === length! - 1 && text) {
			onComplete?.(newOtp.join(""));
		}
	};

	const handleKeyPress = (e: any, index: number) => {
		if (e.nativeEvent.key === "Backspace" && index > 0 && !otp[index]) {
			inputRefs.current[index - 1]?.focus();
		}
	};

	return (
		<Fragment>
			<View style={styles?.container}>
				{Array?.from({ length: length! })?.map((item: any, index: number) => {
					return (
						<InputField
							ref={(el) => (inputRefs.current[index] = el)}
							maxLength={1}
							control={control}
							name={`${name}.${index}`}
							autoFocus={index === 0} // set autofocus on the first input box
							key={index}
							inputFieldStyle={styles?.otpBox}
							inputStyle={styles?.inputStyle}
							value={otp[index]}
							onKeyPress={(e) => handleKeyPress(e, index)}
							isError={isError}
							errorMessage={errorMessage}
							onChangeText={(text) =>
								handleChange(text, index, (value) => value)
							}
						/>
					);
				})}
			</View>
		</Fragment>
	);
};

// styleSheet
const createStyles = (theme: Colors, length: number) => {
	const { wp } = useDimension();

	return StyleSheet.create({
		container: {
			width: wp(90),
			flexDirection: "row",
			flexWrap: "nowrap",
			alignItems: "center",
			justifyContent: "center",
			gap: 10,
		},
		otpBox: {
			alignSelf: "center",
			flex: wp(DEVICE_WIDTH / length),
		},
		inputStyle: {
			alignItems: "center",
			justifyContent: "center",
			textAlign: "center",
		},
	});
};

export { OTPBox };
