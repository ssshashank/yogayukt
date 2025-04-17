export function Network(moduleType: string): string {
	return (
		process.env.EXPO_PUBLIC_PROTOCOL +
		moduleType +
		process.env.EXPO_PUBLIC_DOMAIN
	);
}
