import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import axios from 'axios';
import { Stack } from 'expo-router';

const CheckPolls = () => {
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPolls = async () => {
            try {
                const response = await axios.get('http://192.168.1.12:3000/polls');
                setPolls(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching polls:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPolls();
    }, []);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#f5f5f5', marginTop: 30 }}>
            <Stack.Screen options={{ headerShown: false }} />
            <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>Check Polls</Text>
            <FlatList
                data={polls}
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Content>
                            <Title style={styles.title}>{item.question}</Title>
                            <Paragraph style={styles.paragraph}>Description</Paragraph>
                            {item.options.map((option: any, index: any) => (
                                <View key={index} style={styles.option}>
                                    <Text>{option}: {item.votes[index]}</Text>
                                </View>
                            ))}
                        </Card.Content>
                    </Card>
                )}
            />
        </View>
    );
};

export default CheckPolls;

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5', // Light grey background
    },
    card: {
        margin: 10,
        padding: 10,
        backgroundColor: '#ffffff', // White background
        borderRadius: 10, // Rounded corners
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    option: {
        marginTop: 5,
        backgroundColor: '#f0f0f0', // Light grey background
        padding: 5,
        borderRadius: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333', // Dark grey color
    },
    paragraph: {
        fontSize: 16,
        color: '#666666', // Medium grey color
    },
    button: {
        marginTop: 10,
        backgroundColor: '#007bff', // Professional blue background
    },
    buttonText: {
        color: '#ffffff', // White text
    },
});