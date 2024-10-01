import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Stack } from 'expo-router';

const CheckVisitors = () => {
    const [visitors, setVisitors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchVisitors();
    }, []);

    const fetchVisitors = async () => {
        try {
            const wingCode = await AsyncStorage.getItem('MemberWing');
            const flatId = await AsyncStorage.getItem('MemberFlat');
            console.log(wingCode, flatId);

            if (!wingCode || !flatId) {
                throw new Error('Wing code or Flat ID not found in storage');
            }

            const response = await axios.get('https://society-backend-h2ql.onrender.com/member/visitors', {
                headers: {
                    'wingcode': wingCode,
                    'flatid': flatId,
                }
            });

            setVisitors(response.data.data);
            setLoading(false);
        } catch (err: any) {
            console.error('Error fetching visitors:', err);
            setError(err.message);
            setLoading(false);
        }
    };

    const renderVisitorItem = ({ item }: { item: any }) => (
        <View style={styles.visitorItem}>
            <Image
                source={{ uri: item.Photo }}
                style={styles.visitorPhoto}
            />
            <View style={styles.visitorInfo}>
                <Text style={styles.visitorName}>{item.Name}</Text>
                <Text style={styles.visitorMobile}>{item.MobileNumber}</Text>
                <Text style={styles.visitorDate}>{new Date(item.Date).toLocaleString()}</Text>
            </View>
        </View>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text style={styles.errorText}>Error: {error}</Text>;
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <Text style={styles.title}>Recent Visitors</Text>
            {visitors.length > 0 ? (
                <FlatList
                    data={visitors}
                    renderItem={renderVisitorItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.listContainer}
                />
            ) : (
                <View style={styles.noVisitorsContainer}>
                    <Text style={styles.noVisitorsText}>No recent visitors</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        padding: 20,
        marginVertical: 20,
        // textAlign: 'center',
        color: '#343a40',
    },
    listContainer: {
        paddingHorizontal: 16,
    },
    visitorItem: {
        flexDirection: 'row',
        padding: 16,
        marginBottom: 12,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    visitorPhoto: {
        width: 64,
        height: 64,
        borderRadius: 32,
        marginRight: 16,
    },
    visitorInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    visitorName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#212529',
        marginBottom: 4,
    },
    visitorMobile: {
        fontSize: 16,
        color: '#495057',
        marginBottom: 2,
    },
    visitorDate: {
        fontSize: 14,
        color: '#6c757d',
    },
    errorText: {
        color: '#dc3545',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    noVisitorsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noVisitorsText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#6c757d',
    },
});

export default CheckVisitors;