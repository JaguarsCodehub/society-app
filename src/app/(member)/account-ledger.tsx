import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';

type CookieUserData = {
  MemberSocietyID: string;
  MemberID: string;
  UserID: string;
  MemberYear: string;
  MemberName: string;
  MemberWing: string;
  MemberFlat: string;
  MemberCode: string;
  MemberMasterCode: string;
};

const AccountLedger = () => {
  const [accountData, setAccountData] = useState([]);
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
          'MemberMasterCode',
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
        const headers = {
          societyid: cookies.MemberSocietyID,
          userid: cookies.UserID,
          membermastercode: cookies.MemberMasterCode,
        };
        console.log('Headers being sent: ', headers);
        try {
          const response = await axios.get(
            'https://api.chsltd.net/member/account-ledger',
            {
              headers,
            }
          );
          setAccountData(response.data);
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
    <ScrollView>
      <View style={{ marginTop: 40 }}>
        <Text style={{ fontSize: 30, fontWeight: '600', marginLeft: 10 }}>
          Account Report
        </Text>
        <View>
          {accountData.map((item: any) => (
            <TouchableOpacity
              key={item.billNumber}
              style={{
                backgroundColor: '#262626',
                padding: 20,
                margin: 10,
                borderRadius: 5,
              }}
              onPress={() =>
                router.push({
                  pathname: '(member)/bill-details',
                  params: { item: JSON.stringify(item) },
                })
              }
            >
              <Text style={{ fontWeight: '600', fontSize: 20, color: "white" }}>
                Bill Number: {item.billNumber}
              </Text>
              <View style={{ marginTop: 15 }}>
                <Text style={{ color: "#D8CBBB" }}>Ledger Type: {item.type}</Text>
                <Text style={{ color: "#D8CBBB" }}>Ledger DocDate: {item.docDate}</Text>
                <Text style={{ color: "#D8CBBB" }}>CustomerName: {item.customerName}</Text>
                <Text style={{ color: "#D8CBBB" }}>Credit: {item.credit}</Text>
                <Text style={{ color: "#D8CBBB" }}>Debit: {item.debit}</Text>
                <Text style={{ color: "#D8CBBB" }}>Balance: {item.balance}</Text>
                <Text style={{ color: "#D8CBBB" }}>Member Room: {item.member}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default AccountLedger;

const styles = StyleSheet.create({});
