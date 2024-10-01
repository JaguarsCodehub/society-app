import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { Stack, useRouter } from 'expo-router';
import { useNetwork } from '../context/NetworkProvider';
import { LinearGradient } from 'expo-linear-gradient';

const SocietyPickerPage = () => {
  const [society, setSociety] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));
  const router = useRouter();
  const { isConnected } = useNetwork();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const saveSociety = async () => {
    if (society) {
      await AsyncStorage.setItem('society', society);
      router.replace('/(form)');
    }
  };

  return (
    <LinearGradient
      colors={['#1a1a1a', '#2ecc71']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {isConnected ? (
          <>
            <Image
              source={{ uri: 'https://cdn.firstcuriosity.com/wp-content/uploads/2022/12/09122504/Adobe_Express_20221208_1105420_1-696x392.webp' }}
              style={styles.image}
              resizeMode='cover'
            />
            <Text style={styles.title}>Welcome to Society Sync</Text>
            <Text style={styles.description}>
              Choose your eco-community to connect and make a sustainable impact.
            </Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={society}
                style={styles.picker}
                onValueChange={(itemValue) => setSociety(itemValue)}
              >
                <Picker.Item label='Select your society' value='' />
                <Picker.Item label='Green Meadows' value='1' />
                <Picker.Item label='Solaris Heights' value='2' />
                <Picker.Item label='Eco Vista Gardens' value='3' />
              </Picker>
            </View>
            <TouchableOpacity
              style={[styles.button, { opacity: society ? 1 : 0.5 }]}
              onPress={saveSociety}
              disabled={!society}
            >
              <Text style={styles.buttonText}>Join</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.offlineContainer}>
            <Text style={styles.offlineTitle}>No Internet Connection</Text>
            <Text style={styles.offlineDescription}>
              Please check your network settings and try again.
            </Text>
          </View>
        )}
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 30,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#2ecc71',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  pickerContainer: {
    backgroundColor: 'rgba(46, 204, 113, 0.2)',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#2ecc71',
  },
  picker: {
    height: 50,
    width: 300,
    color: '#ffffff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
  },
  buttonText: {
    color: '#1a1a1a',
    fontSize: 18,
    fontWeight: '600',
  },
  offlineContainer: {
    backgroundColor: '#e74c3c',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
  },
  offlineTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 15,
  },
  offlineDescription: {
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default SocietyPickerPage;
