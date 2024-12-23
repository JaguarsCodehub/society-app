import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

type CookieUserData = {
  MemberSocietyID: string;
  MemberID: string;
  UserID: string;
  MemberYear: string;
  MemberName: string;
  MemberWing: string;
  MemberFlat: string;
};

const ComplaintTrack = () => {
  const [complaints, setComplaints] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      if (cookies) {
        const memberId = parseInt(cookies.MemberID, 10);

        const headers = {
          memberId,
        };
        console.log('Headers being sent: ', headers);
        try {
          const response = await axios.get(
            'https://api.chsltd.net/member/complaints',
            {
              headers,
            }
          );
          console.log(response.data.data);
          setComplaints(response.data.data);
        } catch (error) {
          showToastWithGravityAndOffset('Complaints data was not fetched');
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [cookies]);
  return (
    <ScrollView>
      <View>
        <Text>ComplaintTrack</Text>
        {complaints.map((item: any) => (
          <View
            style={{ backgroundColor: 'lightgray', padding: 10, margin: 10 }}
          >
            <Text>MemberName: {item.memberName}</Text>
            <Text>Subject: {item.subject}</Text>
            <Text>Description: {item.description}</Text>
            <Text>{item.complaintCode}</Text>
            <Image
              source={{ uri: item.file }}
              resizeMode='contain'
              style={styles.image}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ComplaintTrack;

const styles = StyleSheet.create({
  image: {
    width: '40%',
    height: 400,
    borderRadius: 5,
  },
});
