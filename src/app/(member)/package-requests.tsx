import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'

// Name, MemberName, Image
const PackageRequests = () => {
    return (
        <ScrollView style={{ padding: 20, marginTop: 20 }}>
            <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 25, fontWeight: "600" }}>Your Package Requests</Text>
            </View>
            <View>
                <Image source={require("../../../assets/packages.jpg")} style={styles.image} />
            </View>
            <View style={{ backgroundColor: "#A67B5B", borderRadius: 5, padding: 15, marginTop: 10, paddingVertical: 20 }}>
                <View>
                    <Text style={{ color: "black", fontWeight: "600", fontSize: 15 }}>Name of the Package: Amazon package</Text>
                    <Text style={{ color: "black", fontWeight: "600", fontSize: 15 }}>Member Name: Jay Shah</Text>
                    <Text style={{ color: "black", fontWeight: "600", fontSize: 15 }}>Flat Number: 4a 507</Text>
                </View>
                <View>
                    <TouchableOpacity style={{ backgroundColor: "black", paddingHorizontal: 40, paddingVertical: 10, borderRadius: 5, marginTop: 20 }}>
                        <Text style={{ color: "white" }}>Update</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ backgroundColor: "#A67B5B", borderRadius: 5, padding: 15, marginTop: 10, paddingVertical: 20, paddingBottom: 40 }}>
                <View>
                    <Text style={{ color: "black", fontWeight: "600", fontSize: 15 }}>Name of the Package: Amazon package</Text>
                    <Text style={{ color: "black", fontWeight: "600", fontSize: 15 }}>Member Name: Jay Shah</Text>
                    <Text style={{ color: "black", fontWeight: "600", fontSize: 15 }}>Flat Number: 4a 507</Text>
                </View>
                <View>
                    <TouchableOpacity style={{ backgroundColor: "black", paddingHorizontal: 40, paddingVertical: 10, borderRadius: 5, marginTop: 20 }}>
                        <Text style={{ color: "white" }}>Update</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default PackageRequests

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 200,
        borderRadius: 5,
        marginTop: 20
    }
})