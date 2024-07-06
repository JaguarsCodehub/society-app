import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MemberForm from '../../components/MemberForm'
import { Stack } from 'expo-router'

const Member = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <MemberForm />
        </SafeAreaView>
    )
}

export default Member

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
})