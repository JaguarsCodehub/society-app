import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Stack } from 'expo-router';

const AdminPollCreator = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['']);
    const [currentOption, setCurrentOption] = useState('');

    const addOption = () => {
        if (currentOption.trim()) {
            setOptions([...options, currentOption.trim()]);
            setCurrentOption('');
        }
    };

    const createPoll = async () => {
        try {
            const response = await axios.post('https://society-backend-h2ql.onrender.com/polls', {
                question,
                options: options.filter(option => option.trim() !== '')
            });
            console.log('Poll created:', response.data);
            // Reset form or navigate away
        } catch (error) {
            console.error('Error creating poll:', error);
        }
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={{ padding: 20, marginTop: 30 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Create Poll</Text>
                <TextInput
                    placeholder="Enter poll question"
                    value={question}
                    onChangeText={setQuestion}
                    style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginTop: 10 }}
                />
                <FlatList
                    data={options}
                    renderItem={({ item }) => <Text>{item}</Text>}
                    keyExtractor={(item, index) => index.toString()}
                />
                <TextInput
                    placeholder="Enter option"
                    value={currentOption}
                    onChangeText={setCurrentOption}
                    style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginTop: 10 }}
                />
                <TouchableOpacity
                    onPress={addOption}
                    style={{ backgroundColor: '#00A070', padding: 10, marginTop: 10 }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Add Option</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={createPoll}
                    style={{ backgroundColor: '#00A070', padding: 10, marginTop: 10 }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Create Poll</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default AdminPollCreator;