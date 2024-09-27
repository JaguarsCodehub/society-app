import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';
import { Stack } from 'expo-router';

const NoticeBoardScreen = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      const response = await axios.get('http://192.168.1.9:3000/notices');
      const data = response.data.data;
      setNotices(data);
      console.log(data);
      setLoading(false);
    };
    fetchNotices();
  }, []);

  return (
    <View style={{ padding: 20, marginTop: 30 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Notice Board</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={notices}
          renderItem={({ item }: any) => (
            <View style={{ padding: 10, marginTop: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.Title}</Text>
              <Text style={{ marginTop: 5 }}>{item.Content}</Text>
              <Text style={{ marginTop: 5 }}>Posted by {item.Author}</Text>
            </View>
          )}
          keyExtractor={(item: any) => item.ID.toString()}
        />
      )}
    </View>
  );
};

export default NoticeBoardScreen;