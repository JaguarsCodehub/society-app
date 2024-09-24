import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
// import { fetch } from 'expo-fetch';

const CreateNoticeScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    const response = await fetch('http://192.168.1.12:3000/notices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, author: 'admin' }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <>

      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ padding: 20, marginTop: 30 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Create Notice</Text>
        <TextInput
          placeholder='Title'
          value={title}
          onChangeText={(text) => setTitle(text)}
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginTop: 10 }}
        />
        <TextInput
          placeholder='Content'
          value={content}
          onChangeText={(text) => setContent(text)}
          style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginTop: 10 }}
        />
        <TouchableOpacity
          style={{ backgroundColor: '#00A070', padding: 10, marginTop: 10 }}
          onPress={handleSubmit}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CreateNoticeScreen;
