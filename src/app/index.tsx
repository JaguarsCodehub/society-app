import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { Stack, useRouter } from 'expo-router';
import { useNetwork } from '../context/NetworkProvider';

const SocietyPickerPage = () => {
  const [society, setSociety] = useState('');
  const router = useRouter();

  const { isConnected } = useNetwork();

  const saveSociety = async () => {
    if (society) {
      await AsyncStorage.setItem('society', society);
      router.replace('/(form)')
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      {isConnected ? (
        <>

          <Text style={{ fontSize: 30, fontWeight: "600" }}>Select your society</Text>
          <View>
            <Picker
              selectedValue={society}
              style={styles.picker}
              onValueChange={(itemValue) => setSociety(itemValue)}
            >
              <Picker.Item label='Select society' value='' />
              <Picker.Item label='Society 1' value='1' />
              <Picker.Item label='Society 2' value='2' />
              <Picker.Item label='Society 3' value='3' />
            </Picker>
          </View>
          <TouchableOpacity style={{ backgroundColor: "black", marginTop: 20, paddingHorizontal: 120, paddingVertical: 5, borderRadius: 5 }} onPress={saveSociety}>
            <View>
              <Text style={{ color: "white", fontSize: 20 }}>Save</Text>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={{ backgroundColor: "#ff7b69", padding: 10 }}>
            <Text style={{ color: "black", fontSize: 25, fontWeight: "600" }}>Maybe your internet is not working !</Text>
            <Text style={{ color: "black", fontSize: 18 }}>Try refreshing your network !</Text>
          </View>
        </>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    padding: 20,
    backgroundColor: "lightgray",
    height: 50,
    width: 300,
  },
});

export default SocietyPickerPage;
