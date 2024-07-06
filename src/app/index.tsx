import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LoginForm from '../components/LoginForm';
import { router } from 'expo-router';

export default function Home() {

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.push({ pathname: "/(form)" })}>
        <View style={{ backgroundColor: "#292929", padding: 20 }}>
          <Text style={{ color: "white" }}>Go to Form</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: "center",
    alignItems: "center"
  },
});
