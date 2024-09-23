import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';

const EmergencyNumbersScreen = () => {
  const emergencyNumbers = [
    { name: 'Police', number: '911' },
    { name: 'Ambulance', number: '112' },
    { name: 'Fire Department', number: '101' },
    // Add more numbers as needed
  ];

  const handleCallPress = (number: any) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
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
            <Text style={{ fontSize: 16, color: '#666' }}>{item.number}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default EmergencyNumbersScreen;
