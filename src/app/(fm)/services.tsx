import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingScreen from '../../components/ui/LoadingScreen';

interface ServiceRequest {
  ID: number;
  Code: string;
  ServiceName: string;
  Date: string;
  Wing: string;
  Flat: string;
  Name: string;
  Mobile: string;
  MemberID: number;
  MemberCode: string;
  MemberName: string;
  Subject: string;
  Description: string;
  ServiceCode: string;
  Status: number;
  Prefix: string;
  UserID: number;
  SocietyID: number;
  IsActive: boolean;
  IsDeleted: boolean;
  file: string;
}

const Services = () => {
  const [loading, setLoading] = useState(false);
  const [requestsData, setRequestsData] = useState([]);

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
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://api.chsltd.net/member/service-requests'
        );
        setRequestsData(response.data.data);
      } catch (error) {
        showToastWithGravityAndOffset('Error fetching data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View>
      <ScrollView>
        <View>
          <Text style={{ fontSize: 30, fontWeight: '700', marginLeft: 10 }}>
            Service Requests
          </Text>
          {requestsData.map((item: any) => (
            <View
              key={item.id}
              style={{
                backgroundColor: '#EAEAEA',
                padding: 10,
                margin: 10,
                borderRadius: 4,
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: '600', marginVertical: 1 }}
              >
                ServiceName: {item.serviceName}
              </Text>
              <Text
                style={{ fontSize: 20, fontWeight: '600', marginVertical: 1 }}
              >
                ServiceCode: {item.serviceCode}
              </Text>
              <Text
                style={{ fontSize: 20, fontWeight: '600', marginVertical: 1 }}
              >
                Subject: {item.subject}
              </Text>
              <Text
                style={{ fontSize: 20, fontWeight: '600', marginVertical: 1 }}
              >
                Description: {item.description}
              </Text>
              <Text
                style={{ fontSize: 20, fontWeight: '600', marginVertical: 1 }}
              >
                MemberName{item.memberName}
              </Text>
              <Image
                source={{ uri: item.file }}
                resizeMode='contain'
                style={styles.image}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({
  image: {
    width: '80%',
    height: 400,
    borderRadius: 5,
  },
});
