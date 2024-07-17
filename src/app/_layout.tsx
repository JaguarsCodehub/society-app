import 'react-native-gesture-handler'; // Import at the top of the file
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';


export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack>
                <Stack.Screen name="index" options={{}} />
                <Stack.Screen name="(member)" options={{ headerShown: false }} />
            </Stack>
        </GestureHandlerRootView>
    );
}
