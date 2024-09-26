import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from 'react-native';
import { Stack } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../../components/ui/LoadingScreen';
import { uploadImageAsync } from '../../utils/uploadImageAsync';
import SearchablePicker from '../../components/SearchablePicker';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

type CookieUserData = {
  SocietyID: string;
  ID: string;
  year: string;
};

const VisitorsPage = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [flats, setFlats] = useState([]);
  const [flat, setFlat] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [cookies, setCookies] = useState<CookieUserData | null>(null);

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

  useEffect(() => {
    const fetchAsyncStorageData = async () => {
      try {
        const keys = ['SocietyID', 'ID', 'Year'];
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

  useEffect(() => {
    const fetchData = async () => {
      if (cookies) {
        const societyid = parseInt(cookies.SocietyID, 10);

        const headers = {
          societyid: societyid,
        };
        console.log('Headers being sent:', headers); // Log headers

        try {
          const response = await axios.get(
            'https://api.chsltd.net/flats',
            {
              headers,
            }
          );
          if (response.data.data) {
            setFlats(response.data.data)
          } else {
            console.error('Unexpected response data:', response.data);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          console.log('Cookies:', cookies);
          console.log(cookies?.SocietyID);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [cookies]);

  const handleSubmit = async () => {

    if (name === '' || mobileNumber === '' || image === null || flat === '') {
      return;
    }
    setLoading(true);
    try {
      const [wingCode, flatIDString] = flat.split('-');
      const flatID = parseInt(flatIDString, 10);

      const societyID = parseInt(cookies?.SocietyID || '0', 10);
      const ID = parseInt(cookies?.ID || '0', 10);
      const requestData = {
        name,
        mobileNumber,
        date,
        image,
        wingCode,
        flatID,
        year: cookies?.year,
        societyID,
        ID
      };

      const response = await axios.post(
        'https://api.chsltd.net/addvisitors',
        requestData
      );
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
    setMode('date');
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <Animated.View entering={FadeInDown.duration(600).springify()}>
          <Text style={styles.title}>Add New Visitor</Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(600).delay(300).springify()}>
          <View style={styles.formSection}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              placeholder='Enter Name'
              placeholderTextColor='#8E8E93'
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              placeholder='Enter Mobile Number'
              placeholderTextColor='#8E8E93'
              style={styles.input}
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>Pick a Date</Text>
            <TouchableOpacity onPress={showDatepicker} style={styles.datePickerButton}>
              <Text style={styles.dateText}>{date.toLocaleString()}</Text>
              <Icon name='calendar-outline' size={24} color='#007AFF' />
            </TouchableOpacity>
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

          <View style={styles.formSection}>
            <Text style={styles.label}>Select Flat</Text>
            <SearchablePicker
              selectedValue={flat}
              onValueChange={setFlat}
              items={flats.map((flat: any) => ({
                label: flat.wingFlat,
                value: `${flat.wingCode}-${flat.flatID}`
              }))}
              placeholder="Select Flat"
            />
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>Upload Visitor's Live Photo</Text>
            <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
              <Icon name='camera-outline' size={24} color='#FFFFFF' />
              <Text style={styles.uploadButtonText}>Take Photo</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={styles.image} />}
          </View>

          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit Data</Text>
            <Icon name='arrow-up-circle-outline' size={24} color='#FFFFFF' />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

export default VisitorsPage;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#F2F2F7',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 20,
  },
  formSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    fontSize: 17,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  datePickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  dateText: {
    fontSize: 17,
    color: '#000000',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 16,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#34C759',
    borderRadius: 10,
    padding: 16,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    marginRight: 8,
  },
});