import 'react-native-gesture-handler';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import axios from 'axios';
import LoadingScreen from '../../components/ui/LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from '@gorhom/bottom-sheet';
import { Picker } from '@react-native-picker/picker';
import { Stack } from 'expo-router';

type CookieUserData = {
  FMSocietyID: string;
  FMID: string;
  FMYear: string;
  FMName: string;
};

type Complaint = {
  id: string;
  memberName: string;
  subject: string;
  description: string;
  complaintCode: string;
  file: string;
  status: string;
};

const Complaints = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [cookies, setCookies] = useState<CookieUserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(
    null
  );
  const [status, setStatus] = useState<string>('');
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

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
        const keys = ['FMSocietyID', 'FMID', 'FMYear', 'FMName'];
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
        setLoading(true);
        const headers = {
          societyid: cookies.FMSocietyID,
        };
        console.log('Headers being sent: ', headers);
        try {
          const response = await axios.get(
            'https://api.chsltd.net/fm/allcomplaints',
            {
              headers,
            }
          );
          setComplaints(response.data.data);
        } catch (error) {
          showToastWithGravityAndOffset('Complaint data was not fetched');
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [cookies]);

  const openBottomSheet = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    bottomSheetRef.current?.expand();
  };

  const updateStatus = async () => {
    if (selectedComplaint) {
      try {
        const response = await axios.put(
          `https://api.chsltd.net/fm/updatecomplaint/${selectedComplaint.complaintCode}`,
          { status }
        );
        console.log(response.data);
        setComplaints((prev) =>
          prev.map((comp) =>
            comp.id === selectedComplaint.id ? { ...comp, status } : comp
          )
        );
      } catch (error) {
        console.error('Error updating status:', error);
      } finally {
        bottomSheetRef.current?.close();
      }
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={{ flex: 1, marginTop: 60 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView>
        <View>
          <Text style={{ fontSize: 25, fontWeight: '600', marginLeft: 10 }}>
            ComplaintTrack
          </Text>
          {complaints.map((item) => (
            <View
              key={item.complaintCode}
              style={{
                backgroundColor: 'lightgray',
                padding: 10,
                margin: 10,
                borderRadius: 5,
              }}
            >
              <Text
                style={{ fontSize: 15, fontWeight: '600', marginVertical: 1 }}
              >
                MemberName: {item.memberName}
              </Text>
              <Text
                style={{ fontSize: 15, fontWeight: '600', marginVertical: 1 }}
              >
                Subject: {item.subject}
              </Text>
              <Text
                style={{ fontSize: 15, fontWeight: '600', marginVertical: 1 }}
              >
                Description: {item.description}
              </Text>
              <Text
                style={{ fontSize: 15, fontWeight: '600', marginVertical: 1 }}
              >
                {item.complaintCode}
              </Text>
              <Image
                source={{ uri: item.file }}
                resizeMode='contain'
                style={styles.image}
              />
              <TouchableOpacity
                onPress={() => openBottomSheet(item)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Update Status</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        style={{ marginHorizontal: 10 }}
      >
        <View style={styles.bottomSheetContent}>
          {selectedComplaint && (
            <>
              <Text style={styles.bottomSheetHeader}>Update Status</Text>
              <Text>Complaint Code: {selectedComplaint.id}</Text>
              <Picker
                selectedValue={status}
                onValueChange={(itemValue) => setStatus(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label='--Select Status--' value='' />
                <Picker.Item label='Pending' value='Pending' />
                <Picker.Item label='Done' value='Done' />
              </Picker>
              <TouchableOpacity
                onPress={updateStatus}
                style={styles.updateButton}
              >
                <Text style={styles.updateButtonText}>Update</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </BottomSheet>
    </View>
  );
};

export default Complaints;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    backgroundColor: "gray",
    marginTop: 10
  },
  button: {
    backgroundColor: '#00AA54',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
  },
  bottomSheetContent: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFBFBF',
  },
  bottomSheetHeader: {
    fontSize: 20,
    fontWeight: '700',
  },
  picker: {
    width: '100%',
    backgroundColor: 'white',
    height: 50,
    marginTop: 20,
  },
  updateButton: {
    backgroundColor: 'red',
    width: '100%',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  updateButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 15,
  },
});
