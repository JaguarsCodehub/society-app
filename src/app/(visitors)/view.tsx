import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingScreen from '../../components/ui/LoadingScreen';

// Define the type for visitor data
type VisitorData = {
    ID: number;
    Date: string;
    Name: string;
    WingName: string;
    FlatNumber: string;
    MobileNumber: string;
    Photo: string;
};

const ViewVisitors = () => {
    const [visitorsData, setVisitorsData] = useState<VisitorData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://society-backend-h2ql.onrender.com/visitors');
                // console.log(response.data);
                // console.log(response.data.WingName)
                setVisitorsData(response.data);
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
            <LoadingScreen />
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={visitorsData}
                keyExtractor={(item) => item.Name}
                renderItem={({ item }) => (
                    <View style={styles.itemCard}>
                        <Image
                            source={{ uri: item.Photo }}
                            resizeMode='contain'
                            style={styles.image}
                        />
                        <View style={styles.infoContainer}>
                            <Text style={{ fontSize: 16, fontWeight: "600" }}>{item.Name}</Text>
                            <Text style={{ fontSize: 16, fontWeight: "600" }}>{item.Date}</Text>
                            <Text style={{ fontSize: 16, color: "black" }}>{item.WingName}</Text>
                            <Text style={{ fontSize: 16, color: "black" }}>{item.FlatNumber}</Text>
                            <Text style={{ fontSize: 16 }}>{item.MobileNumber}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default ViewVisitors;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    itemCard: {
        flexDirection: 'row',
        paddingVertical: 30,
        paddingHorizontal: 10,
        // padding: 10,
        // height: 200,
        marginVertical: 8,
        backgroundColor: '#fff',
        // alignItems: "center",
        borderRadius: 10,
        elevation: 2,
    },
    image: {
        width: '40%',
        height: 100,
        backgroundColor: '#000',
        borderRadius: 5,
        // marginRight: 10,
    },
    infoContainer: {
        marginLeft: 10,
        // justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
        color: "black",

    },
});
