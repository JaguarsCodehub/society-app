import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ToastAndroid,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './ui/LoadingScreen';
import { NetworkInfo } from 'react-native-network-info';

const AdminForm: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const showToastWithGravityAndOffset = (msg: string) => {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      50,
      50
    );
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://society-backend-h2ql.onrender.com/admin/login`,
        {
          userId,
          password,
          year,
        }
      );
      setLoading(false);

      if (response.status === 200) {
        // Alert.alert(
        //   'Login Successful',
        //   `Welcome, ${response.data.data.UserName}`
        // );
        showToastWithGravityAndOffset('Admin Login Successful');
      } else {
        showToastWithGravityAndOffset('A Network error occurred');
      }

      if (response.status === 200) {
        const { UserName, SocietyID, ID } = response.data.data;

        // Values are getting stored in the AsyncStorage (Device)
        await AsyncStorage.multiSet([
          ['SocietyID', SocietyID.toString()],
          ['ID', ID.toString()],
          ['Year', year],
        ]);

        console.log('Data was added to AsyncStorage');
        Alert.alert('Login Successful', `Welcome, ${UserName}`);
      }
      router.push({ pathname: '/(admin)' });
      setUserId('');
      setPassword('');
    } catch (error) {
      setLoading(false);
      console.error('Error logging in:', error);
      // Alert.alert('Login Error', error,);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Admin Login</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter Your User ID'
          value={userId}
          onChangeText={setUserId}
        />
        <TextInput
          style={styles.input}
          placeholder='Enter your Password'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
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

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
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
    backgroundColor: '#f1f1f1',
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
    // fontFamily: "Montserrat_400Regular"
  },
});

export default AdminForm;
