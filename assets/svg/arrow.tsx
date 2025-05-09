import Svg, { Path } from "react-native-svg";

interface ArrowProps {
	color?: string;
}

const RightArrow: React.FC<ArrowProps> = (props: any) => {
	const { color } = props;

	// return
	return (
		<Svg
			width={19}
			height={8}
			viewBox='0 0 32 12'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className='sc-b5xc4a-2 ggybSB'
			{...props}>
			<Path
				d='M2 4.87494H0.875L0.875 7.12494H2L2 4.87494ZM2 7.12494L30.5 7.12494V4.87494L2 4.87494L2 7.12494ZM25.0685 4.7589e-08C25.0685 3.89997 28.1374 7.125 32 7.125L32 4.875C29.449 4.875 27.3185 2.72744 27.3185 -4.7589e-08L25.0685 4.7589e-08ZM32 4.875C28.1374 4.875 25.0684 8.09999 25.0684 12H27.3184C27.3184 9.27259 29.4489 7.125 32 7.125V4.875Z'
				fill={color ?? "white"}
			/>
		</Svg>
	);
};

const LeftArrow: React.FC<ArrowProps> = (props: any) => {
	const { color } = props;

	// return
	return (
		<Svg
			width={19}
			height={8}
			viewBox='0 0 32 12'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className='sc-b5xc4a-2 ggybSB'
			{...props}>
			<Path
				d='M30 4.87494H31.125V7.12494H30V4.87494ZM30 7.12494L1.5 7.12494V4.87494L30 4.87494V7.12494ZM6.9315 0C6.9315 3.89997 3.8626 7.125 0 7.125V4.875C2.551 4.875 4.6815 2.72744 4.6815 0H6.9315ZM0 4.875C3.8626 4.875 6.9316 8.09999 6.9316 12H4.6816C4.6816 9.27259 2.5511 7.125 0 7.125V4.875Z'
				fill={color ?? "white"}
			/>
		</Svg>
	);
};

export { RightArrow, LeftArrow };
