import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';

const EmergencyNumbersScreen = () => {
  const emergencyNumbers = [
    { name: 'Police', description: "For emergencies, call 911.", number: '911' },
    { name: 'Ambulance', description: "For medical emergencies, call 112.", number: '112' },
    { name: 'Fire Department', description: "For fire emergencies, call 101.", number: '101' },
    // Add more numbers as needed
  ];

  const handleCallPress = (number: any) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={{ padding: 20, marginTop: 30 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Emergency Numbers</Text>
      </View>
      <View>
        {emergencyNumbers.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCallPress(item.number)}
          >
            <View
              style={{
                padding: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#ccc',
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                {item.name}
              </Text>
              <Text style={{ fontSize: 16, color: '#666' }}>{item.description}</Text>
              <Text style={{ fontSize: 16, color: '#666' }}>{item.number}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default EmergencyNumbersScreen;
