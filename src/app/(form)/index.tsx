import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Image } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolateColor } from 'react-native-reanimated';
import LoginForm from '../../components/LoginForm';
import MemberForm from '../../components/MemberForm';
import FmForm from '../../components/FmForm';
import AdminForm from '../../components/AdminForm';

type FormType = 'watchman' | 'member' | 'fm' | 'admin';

const { width } = Dimensions.get('window');
const TAB_WIDTH = (width - 40) / 4; // Assuming 20px padding on each side

const Form: React.FC = () => {
    const [currentForm, setCurrentForm] = useState<FormType>('watchman');
    const slideAnimation = useSharedValue(0);

    const formComponents = {
        watchman: LoginForm,
        member: MemberForm,
        fm: FmForm,
        admin: AdminForm,
    };

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: withSpring(slideAnimation.value * TAB_WIDTH) }],
        };
    });

    const handleTabPress = (index: number, type: FormType) => {
        slideAnimation.value = index;
        setCurrentForm(type);
    };

    const renderForm = () => {
        const Component = formComponents[currentForm];
        return <Component />;
    };

    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Stack.Screen options={{ headerShown: false }} />
          <View style={styles.header}>
            <Text style={styles.title}>
              Manage your society at your Finger Tips !
            </Text>
            <Text style={styles.subtitle}>Let's Get to Know you First ♥</Text>
            <Image
              source={require('../../../assets/society.jpg')}
              style={styles.image}
            />
          </View>
          <Text style={styles.question}>Who are you ?</Text>
          <View style={styles.tabContainer}>
            <Animated.View style={[styles.slider, animatedStyles]} />
            {(['watchman', 'member', 'fm', 'admin'] as const).map(
              (type, index) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => handleTabPress(index, type)}
                  style={styles.tab}
                >
                  <Animated.Text
                    style={[
                      styles.tabText,
                      { color: currentForm === type ? '#000' : '#8E8E93' },
                    ]}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Animated.Text>
                </TouchableOpacity>
              )
            )}
          </View>
          <View
            style={{
              paddingTop: 20,
              backgroundColor: '#FFF',
            }}
          >
            {renderForm()}
          </View>
        </View>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        marginTop: 20,
        marginBottom: 70,
    },
    header: {
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    question: {
        fontSize: 24,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 16,
        paddingHorizontal: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#F0F0F0',
        marginHorizontal: 20,
        borderRadius: 8,
        height: 40,
        position: 'relative',
        marginBottom: 20,
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
    },
    slider: {
        position: 'absolute',
        width: TAB_WIDTH,
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginHorizontal: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
});

export default Form;
