import { Stack } from 'expo-router';
import { Montserrat_300Light, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat'

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{}} />
            <Stack.Screen name="(member)" options={{ headerShown: false }} />
        </Stack>
    );
}
