import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import Icon from 'react-native-vector-icons/Feather'
import MenuIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const Dashboard = () => {

    return (
        <ScrollView style={styles.container}>
            <View>
                <Stack.Screen options={{ headerShown: false }} />
                <View style={styles.headerWrapper}>
                    {/* Left Side Brand Name */}
                    <View style={styles.brandWrapper}>
                        <Text style={{ fontSize: 25, fontWeight: "900", color: "#292929", fontFamily: "Montserrat_400Regular" }}>Raviva Society</Text>
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
                        <View style={{ padding: 10, alignItems: "center", justifyContent: "center" }}>
                            <Image
                                source={require("../../../../assets/profile.jpg")}
                                // resizeMode='cover'
                                style={{ width: 40, height: 40, borderRadius: 50, borderColor: "#292929", borderWidth: 1 }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
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
    },
    brandWrapper: {
        marginLeft: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    rightWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly"
    }
})