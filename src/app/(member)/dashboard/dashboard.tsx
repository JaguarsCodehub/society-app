import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { router, Stack } from 'expo-router'
import MenuIcon from 'react-native-vector-icons/MaterialIcons'
import MenuIcon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import CustomDrawer from '../../../navigation/CustomDrawer'
import InfoCard from '../../../components/ui/InfoCard'

const infoCardsData = [
    {
        title: 'Know your Members',
        description: 'Positions of your fellow members.',
        imageSource: require('../../../../assets/vendor.png'),
        onPress: () => router.push({ pathname: "(member)/positions" }),
    },
    {
        title: 'Check your Parking Slot',
        description: 'You have been given a parking slot.',
        imageSource: require('../../../../assets/spaces.png'),
        onPress: () => router.push({ pathname: "(member)/parking-slot" }),
    },
    {
        title: 'Your Account Ledger',
        description: 'Access your accounts and ledger.',
        imageSource: require('../../../../assets/camera.png'),
        onPress: () => router.push({ pathname: "(member)/account-ledger" }),
    },

];


const Dashboard = () => {



    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const openDrawer = () => {
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />

            <CustomDrawer isOpen={isDrawerOpen} closeDrawer={closeDrawer} />
            <ScrollView style={styles.container}>
                <View>
                    <View style={styles.headerWrapper}>
                        <View style={styles.brandWrapper}>
                            <MenuIcon name='adobe' size={30} color="#322C2B" style={{ marginTop: 5 }} />
                            <Text style={{ fontSize: 25, fontWeight: "900", marginLeft: 5, color: "black" }}>Raviva Society</Text>
                        </View>

                        <View style={styles.rightWrapper}>

                            <TouchableOpacity onPress={openDrawer}>
                                <View style={styles.imageWrapper}>
                                    <Image
                                        source={require("../../../../assets/profile.jpg")}
                                        style={styles.profileImage}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                        <Text style={{ fontSize: 30, fontWeight: "600" }}>Overview</Text>


                        <TouchableOpacity onPress={() => router.push({ pathname: "/(member)/package-requests" })}>
                            <View style={{ backgroundColor: "#A67B5B", paddingVertical: 10, borderRadius: 5, marginTop: 15, padding: 5 }}>
                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                    <MenuIcon2 name='package' size={50} color="black" style={{ marginLeft: 20 }} />
                                    <View style={{ flexDirection: "column", flex: 1 }}>
                                        <Text style={{ marginLeft: 20, fontSize: 15, fontWeight: "700", color: "black" }}>Package Request to Watchman</Text>
                                        <Text style={{ marginLeft: 20, color: "black", fontSize: 12 }}>You can request for a service or repair and we will make sure that is fulfilled.</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push({ pathname: "/(member)/request-service" })}>
                            <View style={{ backgroundColor: "#A67B5B", paddingVertical: 10, borderRadius: 5, marginTop: 15, padding: 5 }}>
                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                                    <MenuIcon name='add-circle' size={50} color="#FED8B1" style={{ marginLeft: 20 }} />
                                    <View style={{ flexDirection: "column", flex: 1 }}>
                                        <Text style={{ marginLeft: 20, fontSize: 15, fontWeight: "700", color: "#FED8B1" }}>Request a Service to Admin</Text>
                                        <Text style={{ marginLeft: 20, color: "#FED8B1", fontSize: 12 }}>You can request for a service or repair and we will make sure that is fulfilled.</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>





                    </View>

                    <View style={{ marginHorizontal: 10 }}>
                        {infoCardsData.map((card, index) => (
                            <InfoCard
                                key={index}
                                title={card.title}
                                description={card.description}
                                imageSource={card.imageSource}
                                onPress={card.onPress}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        // backgroundColor: "white"
    },
    headerWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        // backgroundColor: "red"
    },
    brandWrapper: {
        display: "flex",
        flexDirection: "row",
        marginLeft: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    rightWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    imageWrapper: {
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    profileImage: {
        width: 30,
        height: 30,
        borderRadius: 50,
        borderColor: "#292929",
        borderWidth: 1,
    },
})