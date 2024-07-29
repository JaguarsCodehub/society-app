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

const MemberForm = () => {
  const [mobileNumber, setMobileNumber] = useState<string>('');
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
      console.log('Inside TryCatch Block for Getting Members');
      const response = await axios.post(
        'https://api.chsltd.net//member/login',
        {
          mobileNumber,
          password,
          year,
        }
      );
      setLoading(false);

      if (response.status === 200) {
        // Alert.alert(
        //   'Login Successfull',
        //   `Welcome, ${response.data.data.UserName}`
        // );
      } else {
        Alert.alert('Login Failed', response.data.msg);
      }

      if (response.status === 200) {
        const {
          MemberName,
          SocietyID,
          UserID,
          ID,
          Wing,
          Flat,
          CodePWD,
          MobileNumber,
          MasterCode,
        } = response.data.data;

        // Values are getting stored in the AsyncStorage (Device)
        await AsyncStorage.multiSet([
          ['MemberSocietyID', SocietyID.toString()],
          ['MemberID', ID.toString()],
          ['UserID', UserID.toString()],
          ['MemberYear', year],
          ['MemberName', MemberName],
          ['MemberWing', Wing],
          ['MemberFlat', Flat],
          ['MemberCode', CodePWD],
          ['MemberMobileNumber', MobileNumber],
          ['MemberMasterCode', MasterCode],
        ]);
        console.log('Data was addded to AsyncStorage');
        // Alert.alert('Login Successfull', `Welcome, ${MemberName}`);
      }

      showToastWithGravityAndOffset('Login Successfull');
      router.push({ pathname: '/(member)/dashboard/dashboard' });

      setMobileNumber('');
      setPassword('');
    } catch (error) {
      setLoading(false);
      console.error('Error logging in:', error);
      Alert.alert('Login Error', 'An error occured during Login');
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Member Login</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter your Mobile Number'
          value={mobileNumber}
          onChangeText={setMobileNumber}
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

export default MemberForm;

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
