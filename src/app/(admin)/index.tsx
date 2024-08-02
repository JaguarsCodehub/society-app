import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import CardComponent from '../../components/ui/CardComponent';

const cardsData = [
    {
        title: 'Check Sales Register',
        subTitle: 'Expo\'s Snack lets you try Expo with zero local setup.',
        buttonText: 'Create a Snack',
        buttonColor: '#00A070',
        bgColor: '#D4FFE4',
        bgBorderColor: "#00A070",
        textColor: '#00A070',
        imageSource: require('../../../assets/vendor.png'),
        onPress: () => console.log('Add a Visitor'),
    },
    {
        title: 'Watch who visits your society',
        subTitle: 'Expo\'s Snack lets you try Expo with zero local setup.',
        buttonText: 'Create a Snack',
        buttonColor: '#00BE47',
        bgColor: '#D4FFE4',
        bgBorderColor: "#00BE47",
        textColor: '#00BE47',
        imageSource: require('../../../assets/camera.png'),
        onPress: () => console.log('Add a Visitor'),
    },



];

const AdminHomePage = () => {
    return (
        <ScrollView>
            <View style={{ marginTop: 50 }}>
                <Stack.Screen options={{ headerShown: false }} />
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 30, fontWeight: "600", paddingHorizontal: 12 }}>Welcome Admin</Text>
                    <Text style={{ fontSize: 15, fontWeight: "500", paddingHorizontal: 16, color: "gray" }}>Here you can access everything that happens in youur society and co-ordinate accordingly</Text>
                </View>
                <View style={{ padding: 10 }}>
                    <Image source={require("../../../assets/society.jpg")} resizeMode='repeat' style={{ borderRadius: 10, marginTop: 10, width: "100%", height: 200 }} />
                </View>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.button} onPress={() => router.push('/complaints')}>
                        <Text style={styles.buttonText}>Complaints</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => router.push('/parking-slot')}>
                        <Text style={styles.buttonText}>Parking Slots</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => router.push('/service-requests')}>
                        <Text style={styles.buttonText}>Service Requests</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => router.push('/sales-register')}>
                        <Text style={styles.buttonText}>Sales Register</Text>
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
    )
}

export default AdminHomePage

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
    },
    button: {
        width: '48%', // 50% of the screen width minus padding
        backgroundColor: '#00A070',
        padding: 20,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
})