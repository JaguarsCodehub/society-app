import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Stack } from 'expo-router';

type CookieUserData = {
  MemberSocietyID: string;
  MemberID: string;
  UserID: string;
  MemberYear: string;
  MemberName: string;
  MemberWing: string;
  MemberFlat: string;
  MemberCode: string;
};

const ParkingSlot = () => {
  const [parkingSlotData, setParkingSlotData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cookies, setCookies] = useState<CookieUserData | null>(null);

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

        const societyid = parseInt(cookies.MemberSocietyID, 10);
        const userid = parseInt(cookies.UserID, 10);

        const headers = {
          societyid,
          userid,
          membercode: cookies.MemberCode,
        };
        console.log('Headers being sent: ', headers);
        try {
          const response = await axios.get(
            'https://api.chsltd.net/member/parking-slot',
            {
              headers,
            }
          );
          console.log(response.data.data);

          setParkingSlotData(response.data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [cookies]);

  return (
    <View>
      <Stack.Screen options={{ headerShown: false }} />
      <Text
        style={{ fontSize: 20, fontWeight: '700', marginLeft: 10, padding: 10 }}
      >
        ParkingSlot
      </Text>
      {parkingSlotData.map((item: any) => (
        <View style={{ backgroundColor: '#dedede', padding: 10, margin: 10, borderRadius: 5 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "green" }}>Parking Slot: {item.slot}</Text>
          <View style={{ marginTop: 10 }}>
            <Text>MemberName: {item.name}</Text>
            <Text>Parking SlotCode: {item.slotCode}</Text>
            <Text>Date: {item.date}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default ParkingSlot;

const styles = StyleSheet.create({});
