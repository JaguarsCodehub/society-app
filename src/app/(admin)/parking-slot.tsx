import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LoadingScreen from '../../components/ui/LoadingScreen';
import { showToastWithGravityAndOffset } from '../../utils/showToastWithGravityAndOffset';
import axios from 'axios';

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
                setParkingData(response.data);
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
            <Text>AdminComplaints</Text>
            <View>
                {parkingData.map((item: any) => (
                    <View style={styles.card} key={item.ID}>
                        <Text style={styles.title}>Parking Slot Code: {item.Slot}</Text>
                        <Text>Slot Code: {item.SlotCode}</Text>
                        <Text>Member Name: {item.Name}</Text>
                        <Text>Date: {item.Date}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    )
}

export default AdminParkingSlot

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    card: {
        backgroundColor: '#fff',
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
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginTop: 10,
    },
})