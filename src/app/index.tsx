import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import LoginForm from '../components/LoginForm';
import { useEffect } from 'react';
import connectToDb from '../../utility/connectToDb';
import DataFetcher from '../components/DataFetcher';

export default function HomeScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <LoginForm />
      {/* <DataFetcher /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});
