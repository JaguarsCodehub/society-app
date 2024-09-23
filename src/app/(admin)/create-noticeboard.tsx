import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
// import { fetch } from 'expo-fetch';

const CreateNoticeScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    const response = await fetch('/notices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, author: 'admin' }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <View>
      <Text>Create Notice</Text>
      <TextInput
        placeholder='Title'
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        placeholder='Content'
        value={content}
        onChangeText={(text) => setContent(text)}
      />
      <Button title='Submit' onPress={handleSubmit} />
    </View>
  );
};

export default CreateNoticeScreen;
