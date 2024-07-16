import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

type CookieUserData = {
    FmSocietyID: string;
    FMID: string;
    FMYear: string;
    FMName: string;
};

const FmDashboard = () => {
    const [cookies, setCookies] = useState<CookieUserData | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAsyncStorageData = async () => {
            try {
                const keys = ['FMSocietyID', 'FMID', 'FMYear', 'FMName'];
                const result = await AsyncStorage.multiGet(keys);

                const userData = result.reduce((acc, [key, value]) => {
                    if (value !== null) {
                        acc[key as keyof CookieUserData] = value;
                    }
                    return acc;
                }, {} as CookieUserData);

                setCookies(userData);
                console.log("Async Storage DATA from UseEffect: ", userData);
            } catch (error) {
                console.error('Error retrieving user data:', error);
            }
        };
        fetchAsyncStorageData();
    }, []);
    return (
        <View style={styles.container}>
            <Text style={styles.header}>FmDashboard</Text>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button} onPress={() => router.push({ pathname: "/complaints" })}>
                    <Text style={styles.buttonText}>Complaints</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => router.push({ pathname: "/services" })}>
                    <Text style={styles.buttonText}>Service Requests</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default FmDashboard

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginTop: 10
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
        marginLeft: 20
    },
    buttonRow: {
        padding: 10,
        flexDirection: 'row',
    },
    button: {
        backgroundColor: 'orange',
        padding: 15,
        marginHorizontal: 10,
        borderRadius: 3,
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
    },
})