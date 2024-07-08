import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Stack } from 'expo-router'
import Icon from 'react-native-vector-icons/Feather'
import MenuIcon from 'react-native-vector-icons/MaterialIcons'
import CustomDrawer from '../../../navigation/CustomDrawer'

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
            <CustomDrawer isOpen={isDrawerOpen} closeDrawer={closeDrawer} />
            <ScrollView style={styles.container}>
                <View>

                    <Stack.Screen options={{ headerShown: false }} />
                    <View style={styles.headerWrapper}>
                        {/* Left Side Brand Name */}
                        <View style={styles.brandWrapper}>
                            <MenuIcon name='adobe' size={30} color="gray" style={{ marginTop: 5 }} />
                            <Text style={{ fontSize: 25, fontWeight: "900", marginLeft: 5, color: "gray" }}>Raviva Society</Text>
                        </View>

                        {/* Right Side Content */}
                        <View style={styles.rightWrapper}>
                            {/* <View style={{ borderWidth: 1, borderColor: "#D3D3D3", borderRadius: 50, alignItems: "center", justifyContent: "center" }}>
                            <MenuIcon name='bell' size={20} color="#292929" />
                        </View> */}
                            <View style={{ padding: 10 }}>
                                <Icon
                                    name='bell' color="#292929" size={25}
                                    // resizeMode='cover'
                                    style={{ alignItems: "center", justifyContent: "center", display: "flex", padding: 10, backgroundColor: "transparent", borderRadius: 50, borderColor: "lightgray", borderWidth: 1 }}
                                />
                            </View>
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

                    {/* Rest of the screen */}
                    <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                        <Text style={{ fontSize: 30, fontWeight: "600" }}>Overview</Text>
                        <View style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
                            <TouchableOpacity>
                                <View style={{ backgroundColor: "black", padding: 15, borderRadius: 10, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <MenuIcon name='currency-rupee' size={25} color="white" />
                                    <Text style={{ color: "white", paddingHorizontal: 30, fontSize: 15 }}>Transfer</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={{ marginLeft: 15, backgroundColor: "green", padding: 15, borderRadius: 10, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <MenuIcon name='account-circle' size={25} color="white" />
                                    <Text style={{ color: "white", paddingHorizontal: 30 }}>Account</Text>
                                </View>
                            </TouchableOpacity>


                        </View>
                        <View style={{ marginTop: 10 }}>
                            <View style={{ padding: 15, backgroundColor: "#dfdfdf", paddingTop: 10, borderRadius: 10 }}>
                                <Text style={{ fontSize: 20, fontWeight: "500", color: "gray" }}>Your Maintainence Due</Text>
                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <Text style={{ fontSize: 30, paddingTop: 10, fontWeight: "900" }}>₹12,234.00</Text>
                                    <MenuIcon name='arrow-drop-up' size={30} color="green" style={{ marginTop: 0, marginLeft: 10 }} />
                                    <Text style={{ color: "green", fontSize: 20, fontWeight: "600" }}>4.12%</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
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
        width: 40,
        height: 40,
        borderRadius: 50,
        borderColor: "#292929",
        borderWidth: 1,
    },
})