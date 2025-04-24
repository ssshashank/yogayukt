import { Stack } from "expo-router";

export default function SeekerLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='(tabs)'
                options={{ headerShown: false, animation: "none" }}
            />
        </Stack>);
}
