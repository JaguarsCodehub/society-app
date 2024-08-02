import React, { useEffect, useState } from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Foundation';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { uploadImageAsync } from '../../utils/uploadImageAsync';

type CookieUserData = {
  MemberSocietyID: string;
  MemberID: string;
  UserID: string;
  MemberYear: string;
  MemberName: string;
  MemberWing: string;
  MemberFlat: string;
  MemberCode: string;
  MemberMobileNumber: string;
};

const RequestService = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState<boolean>(false);
  const [subject, setSubject] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [status, setStatus] = useState<number>(0);
  const [image, setImage] = useState<string | null>(null);

  const [cookies, setCookies] = useState<CookieUserData | null>(null);
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

  useEffect(() => {
    const fetchAsyncStorageData = async () => {
      try {
        const keys = [
          'MemberSocietyID',
          'MemberID',
          'UserID',
          'MemberYear',
          'MemberName',
          'MemberWing',
          'MemberFlat',
          'MemberCode',
          'MemberMobileNumber',
        ];
        const result = await AsyncStorage.multiGet(keys);
        const userData = result.reduce((acc, [key, value]) => {
          if (value !== null) {
            acc[key as keyof CookieUserData] = value;
          }
          return acc;
        }, {} as CookieUserData);

        setCookies(userData);
        console.log('Async Storage DATA from UseEffect: ', userData);
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };
    fetchAsyncStorageData();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const [serviceName, serviceCode] = category.split('-');
      const postData = {
        subject,
        description,
        image,
        date,
        status,
        serviceName,
        serviceCode,
        ...cookies,
      };

      const response = await axios.post(
        'https://api.chsltd.net/member/service-requests',
        postData
      );
      console.log('Response from server:', response.data);
      showToastWithGravityAndOffset('Service request was submitted !');
      setCategory('');
      setSubject('');
      setDescription('');
      setStatus(0);
      setImage(null);
    } catch (error) {
      showToastWithGravityAndOffset('Request Failed to Submit');
      console.error('Error submitting data:', error);
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const localUri = result.assets[0].uri;
      const imageUrl = await uploadImageAsync(localUri);
      setImage(imageUrl);
    }
  };

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
    setMode('date');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={{ fontSize: 30, fontWeight: '600' }}>
            What Service are you Requesting ?
          </Text>
          <Text style={{ fontSize: 15, fontWeight: '500', color: 'gray' }}>
            Add some details regarding your Service Request and we will make
            sure we try to fulfil it
          </Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={styles.label}>Category</Text>
          <Picker
            selectedValue={category}
            style={styles.picker}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            <Picker.Item label='--Select Service--' value='' />
            <Picker.Item label='Plumber' value='Plumber-00001' />
            <Picker.Item label='Electrician' value='Electrician-00002' />
            <Picker.Item label='Carpenter' value='Carpenter-00003' />
            <Picker.Item label='Gas Service' value='Gas Service-00004' />
            <Picker.Item label='Insurance' value='Insurance-00005' />
            <Picker.Item label='Home Painting' value='Home Painting-00006' />
            <Picker.Item label='Home Repair' value='Home Repair-00007' />
            <Picker.Item label='Home Cleaning' value='Home Cleaning-00008' />
            <Picker.Item label='Home Pest' value='Home Pest-00009' />
            <Picker.Item label='AC' value='AC-00010' />
            <Picker.Item label='Car' value='Car-00011' />
            <Picker.Item label='Bike' value='Bike-00012' />
          </Picker>
        </View>

        <Text style={styles.label}>Subject</Text>
        <TextInput
          style={styles.input}
          value={subject}
          onChangeText={setSubject}
          cursorColor='black'
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          multiline
          cursorColor='black'
        />

        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: '600' }}>Pick a Date</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: '#dedede',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: 5,
              marginTop: 5,
            }}
          >
            <Text style={styles.selectedDateText}>{date.toLocaleString()}</Text>
            <TouchableOpacity onPress={showDatepicker}>
              <View style={{ paddingRight: 15 }}>
                <Icon name='calendar' size={30} color='green' />
              </View>
            </TouchableOpacity>
          </View>
          {show && (
            <DateTimePicker
              testID='dateTimePicker'
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={{ fontWeight: '600' }}>Choose your Service Status</Text>
          <Picker
            selectedValue={status}
            style={{
              height: 50,
              width: '100%',
              marginBottom: 20,
              marginTop: 10,
              backgroundColor: 'lightgray',
              borderRadius: 20,
              fontWeight: '700',
            }}
            onValueChange={(itemValue) => setStatus(itemValue)}
          >
            <Picker.Item label='Select fulfillment status' value='' />
            <Picker.Item label='New Request' value='0' />
            <Picker.Item label='Pending' value='1' enabled={false} />
            <Picker.Item label='Fullfilled' value='2' enabled={false} />
          </Picker>
        </View>

        <View style={styles.cameraContainer}>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>
            Want to show by clicking a Photo ?
          </Text>
          <TouchableOpacity
            onPress={pickImage}
            style={{
              backgroundColor: 'green',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: 'white' }}>Upload</Text>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, fontSize: 20, fontWeight: '600' }}>
            Photo:{' '}
          </Text>
          {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Service</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RequestService;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#AFFFD9',
    borderRadius: 20,
    fontWeight: '700',
  },
  button: {
    marginTop: 40,
    backgroundColor: '#292929',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedDateText: {
    padding: 15,
    fontSize: 15,
    fontWeight: '600',
  },
  cameraContainer: {
    marginTop: 20,
  },
  image: {
    width: 300,
    height: 300,
  },
});
