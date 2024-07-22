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
            'https://society-backend-h2ql.onrender.com/member/account-ledger',
            {
              headers,
            }
          );
          // console.log(response.data);
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
      <View>
        <Text style={{ fontSize: 30, fontWeight: '600', marginLeft: 10 }}>
          Account Report
        </Text>
        <View>
          {accountData.map((item: any) => (
            <TouchableOpacity
              key={item.BillNumber}
              style={{
                backgroundColor: '#D8D8D8',
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
              <Text style={{ fontWeight: '600', fontSize: 20 }}>
                Bill Number: {item.BillNumber}
              </Text>
              <Text>Ledger Type: {item.Type}</Text>
              <Text>Ledger DocDate: {item.DocDate}</Text>
              <Text>CustomerName: {item.CustomerName}</Text>
              <Text>Credit: {item.Credit}</Text>
              <Text>Debit: {item.Debit}</Text>
              <Text>Balance: {item.Balance}</Text>
              <Text>Member Room: {item.Member}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default AccountLedger;

const styles = StyleSheet.create({});
