import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import LoginForm from '../../components/LoginForm';
import { Stack } from 'expo-router';

export default function Visitor() {

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <LoginForm />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
});
