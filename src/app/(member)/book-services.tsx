import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

interface Service {
    id: string;
    name: string;
    icon: string;
}

interface Category {
    id: string;
    name: string;
    icon: string;
}

const { width, height } = Dimensions.get('window');

const services: Service[] = [
    { id: '1', name: 'Plumber', icon: 'wrench' },
    { id: '2', name: 'Electrician', icon: 'bolt' },
    { id: '3', name: 'Carpenter', icon: 'building' },
    { id: '4', name: 'Gas', icon: 'fire' },
];

const categories: Category[] = [
    { id: '1', name: 'Air Conditioning', icon: 'snowflake-o' },
    { id: '2', name: 'Gas Pipeline', icon: 'fire' },
    { id: '3', name: 'Bike Repair', icon: 'bicycle' },
    { id: '4', name: 'Air Conditioning', icon: 'snowflake-o' },
    { id: '5', name: 'Gas Pipeline', icon: 'fire' },
    { id: '6', name: 'Bike Repair', icon: 'bicycle' },
];

const BookServices: React.FC = () => {
    const router = useRouter();

    const renderService = ({ item }: { item: Service }) => (
        <TouchableOpacity style={styles.serviceButton}>
            <Icon name={item.icon} size={20} color="white" />
            <Text style={styles.serviceText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderCategory = ({ item }: { item: Category }) => (
        <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => router.push({ pathname: `/(member)/services/${item.name.replace(' ', '').toLowerCase()}` })}
        >
            <Icon name={item.icon} size={24} color="black" style={styles.categoryIcon} />
            <Text style={styles.categoryText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.mainHeading}>Book Different Services</Text>
                <Image
                    source={require("../../../assets/map.jpg")}
                    resizeMode='cover'
                    style={{ width: width - 40, height: 200, marginTop: 20, borderRadius: 20 }}
                />
                <Text style={styles.subHeader}>Repairing and Fixes</Text>
                <FlatList
                    data={categories}
                    renderItem={renderCategory}
                    keyExtractor={item => item.id}
                    scrollEnabled={false}
                    contentContainerStyle={styles.categoryList}
                />
                <Text style={styles.header}>Book Services</Text>
                <FlatList
                    data={services}
                    renderItem={renderService}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={styles.serviceList}
                />
            </View>
        </ScrollView>
    );
};

export default BookServices;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 60
    },
    mainHeading: {
        fontSize: 35,
        fontWeight: "bold"
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    serviceButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#292929',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
        marginRight: 10,
    },
    serviceText: {
        color: 'white',
        marginLeft: 10,
        fontWeight: "600",
        fontSize: 15
    },
    subHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    categoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'lightgray',
        borderRadius: 8,
        marginBottom: 10,
    },
    categoryText: {
        color: 'black',
        fontSize: 18,
        fontWeight: "400",
        marginLeft: 10
    },
    serviceList: {
        paddingBottom: 20,
    },
    categoryList: {
        paddingBottom: 20,
    },
    categoryIcon: {
        marginRight: 10,
    },
});
