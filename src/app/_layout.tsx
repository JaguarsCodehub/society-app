import 'react-native-gesture-handler'; // Import at the top of the file
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { NetworkProvider } from '../context/NetworkProvider';
import NotificationProvider from '../providers/NotificationProvider';
import { ToastProvider } from '../providers/ToastProvider';
import Toast from '../components/ui/Toast';


export default function Layout() {

    const [initialRoute, setInitialRoute] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkSociety = async () => {
            const society = await AsyncStorage.getItem('society');
            setInitialRoute(society ? '/(form)' : '/index');
        };

        checkSociety();
    }, []);

    useEffect(() => {
        if (initialRoute) {
            router.replace(`/${initialRoute}`);
        }
    }, [initialRoute]);

    if (!initialRoute) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NetworkProvider>
                <ToastProvider>
                    <Stack>
                        <Stack.Screen name="index" options={{ headerShown: false }} />
                        <Stack.Screen name="(member)" options={{ headerShown: false }} />
                    </Stack>
                    <Toast />
                </ToastProvider>
            </NetworkProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

