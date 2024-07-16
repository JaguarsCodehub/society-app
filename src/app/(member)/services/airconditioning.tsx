import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

interface Contractor {
    id: string;
    name: string;
    number: string;
    address: string
}
const { width, height } = Dimensions.get('window');

const contractors: Contractor[] = [
    { id: '1', name: 'Abdul AC Repair', number: '7673981293', address: "DeviPada, Sampurti Building, Thakur Village" },
    { id: '2', name: 'Abdul AC Repair', number: '7673981293', address: "DeviPada, Sampurti Building, Thakur Village" },
    // Add more contractors as needed
];

const ServicesPage: React.FC = () => {
    const router = useRouter();
    const { category } = useLocalSearchParams<{ category: string }>();

    const renderContractor = ({ item }: { item: Contractor }) => (
        <View style={styles.contractorCard}>
            <Text style={styles.contractorName}>Name: {item.name}</Text>
            <Text style={styles.contractorNumber}>Number: {item.number}</Text>
            <Text style={styles.contractorAddress}>Address: {item.address}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Air Conditioning</Text>
            <View>
                <Image
                    source={require('../../../../assets/ac.jpg')}
                    resizeMethod='resize'
                    style={{ backgroundColor: "black", marginRight: 20, width: width * 0.9, height: 200, borderRadius: 10 }}
                />
            </View>
            <FlatList
                data={contractors}
                renderItem={renderContractor}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.contractorList}
            />
            <View>

            </View>
        </View>
    );
};

export default ServicesPage;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 60
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: "black"
    },
    contractorCard: {
        padding: 15,
        backgroundColor: '#e7e7e7',
        borderRadius: 8,
        marginBottom: 10,
    },
    contractorName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    contractorNumber: {
        fontSize: 16,
        color: '#607D8B',
    },
    contractorList: {
        marginTop: 20,
        paddingBottom: 20,
    },
    contractorAddress: {
        fontSize: 16,
        color: "#292929"
    }
});
