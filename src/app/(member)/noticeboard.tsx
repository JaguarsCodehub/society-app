import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
// import { fetch } from 'expo-fetch';

const NoticeBoardScreen = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      const response = await fetch('/notices');
      const data = await response.json();
      setNotices(data);
      setLoading(false);
    };
    fetchNotices();
  }, []);

  return (
    <View>
      <Text>Notice Board</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={notices}
          renderItem={({ item}: any) => (
            <View>
              <Text>{item.title}</Text>
              <Text>{item.content}</Text>
              <Text>Posted by {item.author}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default NoticeBoardScreen;