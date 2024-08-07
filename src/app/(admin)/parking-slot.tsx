import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LoadingScreen from '../../components/ui/LoadingScreen';
import { showToastWithGravityAndOffset } from '../../utils/showToastWithGravityAndOffset';
import axios from 'axios';
import { Stack } from 'expo-router';

const AdminParkingSlot = () => {

    const [parkingData, setParkingData] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await axios.get(
                    'https://api.chsltd.net/admin/parking-slot',
                );
                setParkingData(response.data.data);
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
            <View style={{ marginTop: 40, padding: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: "600", padding: 5 }}>All Parking Slots</Text>
                <View style={styles.container}>
                    {parkingData.map((item: any) => (
                        <View style={styles.card} key={item.id}>
                            <Text style={styles.title}>Parking Slot Code: {item.slot}</Text>
                            <Text>Slot Code: {item.slotCode}</Text>
                            <Text>Member Name: {item.name}</Text>
                            <Text>Date: {item.date}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    )
}

export default AdminParkingSlot

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    card: {
        backgroundColor: '#8aae92',
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