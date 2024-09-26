import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { showToastWithGravityAndOffset } from '../../utils/showToastWithGravityAndOffset';
import LoadingScreen from '../../components/ui/LoadingScreen';
import { Stack } from 'expo-router';

const AdminComplaints = () => {

    const [complaintsData, setComplaintsData] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await axios.get(
                    'https://api.chsltd.net/admin/complaint-track',
                );
                setComplaintsData(response.data.data);
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
        <ScrollView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <Text style={{ fontSize: 20, fontWeight: "600" }}>AdminComplaints</Text>
            <View>
                {complaintsData.map((item: any) => (
                    <View style={styles.card}>
                        <Text style={styles.title}>Complaint Code: {item.complaintCode}</Text>
                        <Text>Member Name: {item.memberName}</Text>
                        <Text>Flat: {item.wing} - {item.flat}</Text>
                        <Text>Subject: {item.subject}</Text>
                        <Text>Description: {item.description}</Text>
                        <Text>Status: {item.status}</Text>
                        {item.File && <Image source={{ uri: item.file }} style={styles.image} />}
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

export default AdminComplaints

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'lightgray',
        marginTop: 40
    },
    card: {
        backgroundColor: '#5c969e',
        borderRadius: 5,
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