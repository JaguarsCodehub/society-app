import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CardComponent from '../../components/ui/CardComponent';
import { router, Stack } from 'expo-router';
const { width, height } = Dimensions.get('window');


const cardsData = [
    {
        title: 'Chat with the community',
        subTitle: 'Raise an issue regarding the society concern or any query regarding any specific topic',
        buttonText: 'Join the society channel',
        bgColor: '#D4F4FF',
        bgBorderColor: "#1FB5FF",
        textColor: '#1FB5FF',
        buttonColor: '#1FB5FF',
        imageSource: require('../../../assets/favicon.png'), // example image
        onPress: () => console.log('Go to Discord'),
    },
    {
        title: 'Watch who visits your society',
        subTitle: 'Expo\'s Snack lets you try Expo with zero local setup.',
        buttonText: 'Create a Snack',
        buttonColor: '#00BE47',
        bgColor: '#D4FFE4',
        bgBorderColor: "#00BE47",
        textColor: '#00BE47',
        imageSource: require('../../../assets/favicon.png'), // example image
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
        backgroundColor: 'black',
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
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '45%',
    }
});