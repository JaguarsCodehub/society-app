import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { showToastWithGravityAndOffset } from '../../utils/showToastWithGravityAndOffset';
import LoadingScreen from '../../components/ui/LoadingScreen';
import { ScrollView } from 'react-native';
import { Stack } from 'expo-router';

const AdminServiceRequests = () => {

    const [serviceRequestsData, setServiceRequestsData] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await axios.get(
                    'https://api.chsltd.net/member/service-requests',
                );
                setServiceRequestsData(response.data.data);
            } catch (error) {
                showToastWithGravityAndOffset('Complaints data was not fetched');
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData()
    }, [])

    if (loading) {
        return <LoadingScreen />
    }
    return (
        <ScrollView>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={{ marginTop: 40 }}>
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: "600" }}>AdminComplaints</Text>
                </View>
                <View style={styles.container}>
                    {serviceRequestsData.map((item: any) => (
                        <View style={styles.card}>
                            <Text style={styles.title}>Service: {item.serviceName}</Text>
                            <Text>Complaint Code: {item.code}</Text>
                            <Text>Member Name: {item.memberName}</Text>
                            <Text>Flat: {item.sing} - {item.flat}</Text>
                            <Text>Subject: {item.subject}</Text>
                            <Text>Description: {item.description || 'No description provided'}</Text>
                            <Text>Status: {item.status}</Text>
                            <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
                            <Text>Mobile: {item.mobile}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    )
}

export default AdminServiceRequests

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    card: {
        backgroundColor: '#a0937d',
        borderRadius: 8,
        padding: 15,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: "white"
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginTop: 10,
    },
})