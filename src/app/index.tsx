// App.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import LoginForm from '../components/LoginForm';
import MemberForm from '../components/MemberForm';
import FmForm from '../components/FmForm';
import { Stack } from 'expo-router';
import { Image } from 'react-native';


type FormType = 'watchman' | 'member' | 'facilityManager';

const Home: React.FC = () => {
  const [currentForm, setCurrentForm] = useState<FormType>('watchman');

  const renderForm = () => {
    switch (currentForm) {
      case 'watchman':
        return <LoginForm />;
      case 'member':
        return <MemberForm />;
      case 'facilityManager':
        return <FmForm />;
      default:
        return null;
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={{ padding: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 35, fontWeight: "600" }}>Manage your society at your Finger Tips !</Text>
          <Text style={{ fontSize: 20, fontWeight: "500", color: "gray", marginTop: 5 }}>Let's Get to Know you First ♥</Text>
          <Image source={require("../../assets/society.jpg")} resizeMode='cover' style={{ borderRadius: 10, marginTop: 10, width: "100%", height: 100 }} />
        </View>
        <View style={{ marginTop: 2 }}>
          <Text style={{ paddingHorizontal: 20, fontSize: 30, fontWeight: "600" }}>Who are you ?</Text>
        </View>
        <View style={styles.switcher}>
          <TouchableOpacity onPress={() => setCurrentForm('watchman')} style={styles.switcherButton}>
            <Text style={currentForm === 'watchman' ? styles.activeText : styles.inactiveText}>Watchman</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentForm('member')} style={styles.switcherButton}>
            <Text style={currentForm === 'member' ? styles.activeText : styles.inactiveText}>Member</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentForm('facilityManager')} style={styles.switcherButton}>
            <Text style={currentForm === 'facilityManager' ? styles.activeText : styles.inactiveText}>Facility Manager</Text>
          </TouchableOpacity>
        </View>
        {renderForm()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginBottom: 70
    // display: "flex"
    // padding: 20,
  },
  switcher: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: "#ececec",
    marginTop: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  switcherButton: {
    // marginTop: 20,
  },
  activeText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
    borderRadius: 3,
    padding: 15,
    // paddingTop: 20,
    backgroundColor: "white"
  },
  inactiveText: {
    color: 'gray',
    fontSize: 15,
    padding: 15,
    // backgroundColor: "#ececec",
    borderRadius: 3,
  },
  form: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  label: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;
