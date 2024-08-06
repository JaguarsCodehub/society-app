import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CardComponent from '../../components/ui/CardComponent';
import { router, Stack } from 'expo-router';
const { width, height } = Dimensions.get('window');


const cardsData = [
    {
        title: 'Send a package Request',
        subTitle: 'Raise a courier request to the designated member',
        buttonText: 'Send Package Request',
        bgColor: '#ffe3af',
        bgBorderColor: "#5a3b00",
        textColor: '#5a3b00',
        buttonColor: '#5a3b00',
        imageSource: require('../../../assets/package.png'), // example image
        onPress: () => router.push('/package'),
    },
    {
        title: 'Watch who visits your society',
        subTitle: 'Expo\'s Snack lets you try Expo with zero local setup.',
        buttonText: 'Create a Snack',
        buttonColor: '#322C2B',
        bgColor: '#E4C59E',
        bgBorderColor: "#322C2B",
        textColor: '#322C2B',
        imageSource: require('../../../assets/read.png'), // example image
        onPress: () => console.log('Add a Visitor'),
    },
];

const Dashboard = () => {
    const handleAddVisitors = () => {
        router.push({ pathname: "/(visitors)" })
    };

    const handleViewVisitors = () => {
        router.push({ pathname: "/(visitors)/view" })
    };

    return (
        <ScrollView>
            <Stack.Screen options={{ headerTitle: "Watchman Dashboard", headerShown: false }} />
            <View style={{ marginTop: 30 }}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Welcome Watchman</Text>
                    <Text style={styles.subtitle}>We are here to make your work Easy!</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleAddVisitors}>
                        <Text style={styles.buttonText}>Add Visitors</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rightButton} onPress={handleViewVisitors}>
                        <Text style={styles.buttonText}>View Visitors</Text>
                    </TouchableOpacity>
                </View>


                <View>
                    {cardsData.map((card, index) => (
                        <CardComponent
                            key={index}
                            title={card.title}
                            subTitle={card.subTitle}
                            buttonText={card.buttonText}
                            bgColor={card.bgColor}
                            textColor={card.textColor}
                            imageSource={card.imageSource}
                            onPress={card.onPress}
                            buttonColor={card.buttonColor}
                            bgBorderColor={card.bgBorderColor}
                        />
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default Dashboard

const styles = StyleSheet.create({
    headerContainer: {
        padding: 20
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
    },
    subtitle: {
        fontSize: 18,

    },
    buttonContainer: {
        padding: width / 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: -20
    },
    button: {
        backgroundColor: '#322C2B',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '45%',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    rightButton: {
        backgroundColor: '#322C2B',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '45%',
    }
});