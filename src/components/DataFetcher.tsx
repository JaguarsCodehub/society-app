// DataFetcher.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

interface Data {
    ID: number;
    UserName: string;
    Email: string;
    Role: string;
    Tag5: string;
}

const DataFetcher: React.FC = () => {
    const [data, setData] = useState<Data[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.1.6:3000/api/data');
                console.log(response.data)
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.ID.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.text}>{item.ID}</Text>
                        <Text style={styles.text}>{item.UserName}</Text>
                        <Text style={styles.text}>{item.Email}</Text>
                        <Text style={styles.text}>{item.Tag5}</Text>
                        <Text style={styles.text}>{item.Role}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    item: {
        padding: 10,
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 2,
    },
    text: {
        fontSize: 16,
    },
});

export default DataFetcher;
