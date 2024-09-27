import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import LoadingScreen from './ui/LoadingScreen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const MemberForm = () => {
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ userId?: string; password?: string }>({});


  const showToastWithGravityAndOffset = (msg: string) => {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      50,
      50
    );
  };

  const validate = () => {
    let valid = true;
    const newErrors: { mobileNumber?: string; password?: string } = {};

    if (!mobileNumber) {
      newErrors.mobileNumber = 'User ID is required';
      valid = false;
    } else if (mobileNumber.length < 11) {
      newErrors.mobileNumber = 'Mobile Number must be at least 10 characters long';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    setLoading(true);

    try {
      const expoPushToken = await registerForPushNotificationsAsync();

      const response = await axios.post(
        'http://192.168.1.9:3000/member/login',
        {
          mobileNumber,
          password,
          year,
          expoPushToken,
        }
      );
      setLoading(false);

      if (response.status === 200 && response.data.data) {
        const {
          memberName,
          societyID,
          userID,
          id,
          wing,
          flat,
          codePWD,
          mobileNumber: responseMobileNumber,
          masterCode,
        } = response.data.data;

        const asyncStorageData = [
          ['MemberSocietyID', societyID?.toString() || ''],
          ['MemberID', id?.toString() || ''],
          ['UserID', userID?.toString() || ''],
          ['MemberYear', year || ''],
          ['MemberName', memberName || ''],
          ['MemberWing', wing || ''],
          ['MemberFlat', flat || ''],
          ['MemberCode', codePWD || ''],
          ['MemberMobileNumber', responseMobileNumber || ''],
          ['MemberMasterCode', masterCode || ''],
          ['ExpoPushToken', expoPushToken || ''],
        ];

        await AsyncStorage.multiSet(asyncStorageData as [string, string][]);
        console.log('Data was added to AsyncStorage');

        showToastWithGravityAndOffset('Login Successful');
        router.push({ pathname: '/(member)/dashboard/dashboard' });

        setMobileNumber('');
        setPassword('');
      } else {
        Alert.alert('Login Failed', response.data.msg || 'Unknown error occurred');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error logging in:', error);
      Alert.alert('Login Error', 'An error occurred during Login. Please try again.');
    }
  };

  const registerForPushNotificationsAsync = async () => {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Failed to get push token for push notification!');
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);

    return token;
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Member Login</Text>
        <TextInput
          style={[
            styles.input,
            errors.userId ? styles.errorInput : {}
          ]}
          placeholder='Enter your Mobile Number'
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />
        {errors.userId && <Text style={styles.errorText}>{errors.userId}</Text>}
        <TextInput
          style={[
            styles.input,
            errors.password ? styles.errorInput : {}
          ]}
          placeholder='Enter your Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        <Text style={styles.label}>Select Year</Text>
        <Picker
          selectedValue={year}
          style={styles.picker}
          onValueChange={(itemValue) => setYear(itemValue)}
        >
          <Picker.Item label='01 APR 2018 - 31 MAR 2019' value='18041903' />
          <Picker.Item label='01 APR 2019 - 31 MAR 2020' value='19042003' />
          <Picker.Item label='01 APR 2020 - 31 MAR 2021' value='20042103' />
          <Picker.Item label='01 APR 2022 - 31 MAR 2023' value='22042303' />
          <Picker.Item label='01 APR 2023 - 31 MAR 2024' value='23042403' />
          <Picker.Item label='01 APR 2024 - 31 MAR 2025' value='24042503' />
        </Picker>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MemberForm;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#f0f0f0',
  },
  card: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
