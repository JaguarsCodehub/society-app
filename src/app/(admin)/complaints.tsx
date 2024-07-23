import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { showToastWithGravityAndOffset } from '../../utils/showToastWithGravityAndOffset';
import LoadingScreen from '../../components/ui/LoadingScreen';

const AdminComplaints = () => {

    const [complaintsData, setComplaintsData] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await axios.get(
                    'https://society-backend-h2ql.onrender.com/admin/complaint-track',
                );
                setComplaintsData(response.data);
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
                {complaintsData.map((item: any) => (
                    <View style={styles.card}>
                        <Text style={styles.title}>Complaint Code: {item.ComplaintCode}</Text>
                        <Text>Member Name: {item.MemberName}</Text>
                        <Text>Flat: {item.Wing} - {item.Flat}</Text>
                        <Text>Subject: {item.Subject}</Text>
                        <Text>Description: {item.Description}</Text>
                        <Text>Status: {item.Status}</Text>
                        {item.File && <Image source={{ uri: item.File }} style={styles.image} />}
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