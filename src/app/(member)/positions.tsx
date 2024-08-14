import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';

type MemberPosition = {
    id: number;
    memberName: string;
    position: string;
    mobileNumber: string;
};

const Positions = () => {
    const [data, setData] = useState<MemberPosition[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.chsltd.net/memberPositions');
                const formattedData = response.data.map((item: any) => ({
                    id: item.id,
                    memberName: item.memberName,
                    position: item.position,
                    mobileNumber: item.mobileNumber,
                }));
                setData(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const renderItem = ({ item }: { item: MemberPosition }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.id}</Text>
            <Text style={styles.cell}>{item.memberName}</Text>
            <Text style={styles.cell}>{item.position}</Text>
            <Text style={styles.cell}>{item.mobileNumber}</Text>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Know your Member Positions</Text>
            <View style={{ paddingVertical: 5 }}>
                <Image source={require("../../../assets/society.jpg")} resizeMode='repeat' style={{ borderRadius: 10, marginTop: 10, width: "100%", height: 200 }} />
            </View>
            <View style={styles.tableHeader}>
                <Text style={styles.headerCell}>ID</Text>
                <Text style={styles.headerCell}>Name</Text>
                <Text style={styles.headerCell}>Position</Text>
                <Text style={styles.headerCell}>Mobile</Text>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.tableContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 40
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderTopColor: "#000",
        borderBottomColor: '#000',
        paddingBottom: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    headerCell: {
        flex: 1,
        // fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    cell: {
        flex: 1,
        fontWeight: "600"
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableContent: {
        paddingBottom: 20,
    },
});

export default Positions;
