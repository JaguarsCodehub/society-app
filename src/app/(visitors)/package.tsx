import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { uploadImageAsync } from '../../utils/uploadImageAsync';
import { Stack } from 'expo-router';

const Package = () => {

    const [name, setName] = useState<string>('')
    const [memberName, setMemberName] = useState<string>('')
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const localUri = result.assets[0].uri;
            const imageUrl = await uploadImageAsync(localUri);
            setImage(imageUrl);
        }
    };


    return (
        <ScrollView style={{ marginTop: 40, padding: 20, backgroundColor: "#ffe3af" }}>
            <Stack.Screen options={{ headerShown: false }} />
            <View>
                {/* <Image source={require('../../../assets/package.png')} resizeMode='center' width={100} /> */}
                <Text style={{ fontSize: 25, fontWeight: "600", color: "#292929" }}>Send Package Request</Text>
            </View>
            <View style={{ marginTop: 40 }}>
                <Text style={{ fontSize: 18, fontWeight: "600" }}>
                    Name of the Package
                </Text>
                <TextInput
                    placeholder='Enter the Name of Package'
                    placeholderTextColor='#000'
                    style={styles.nameInput}
                    cursorColor='black'
                    value={name}
                    onChangeText={setName}
                />
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: "600" }}>
                    Member Name
                </Text>
                <TextInput
                    placeholder='Write the Receivers Name'
                    style={styles.nameInput}
                    placeholderTextColor="#000"
                    cursorColor='black'
                    value={memberName}
                    onChangeText={setMemberName}
                />
            </View>
            <View style={styles.cameraContainer}>
                <Text style={{ fontSize: 15, fontWeight: '600' }}>
                    Click a Picture of the Package
                </Text>
                <TouchableOpacity
                    onPress={pickImage}
                    style={{ paddingHorizontal: 10 }}
                >
                    <Text
                        style={{
                            marginTop: 10,
                            padding: 10,
                            backgroundColor: '#5a3b00',
                            textAlign: 'center',
                            color: 'white',
                            borderRadius: 5,
                        }}
                    >
                        Upload Photo
                    </Text>
                </TouchableOpacity>
                <Text style={{ marginTop: 10, fontSize: 20, fontWeight: '600' }}>
                    Photo:{' '}
                </Text>
                {image && <Image source={{ uri: image }} style={styles.image} />}
            </View>
            <View style={{ marginTop: 30, paddingBottom: 60 }}>
                <TouchableOpacity style={{ paddingHorizontal: 30, paddingVertical: 10, backgroundColor: "black", borderRadius: 5 }}>
                    <Text style={{ textAlign: "center", color: "white" }}>Submit Package Request</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Package

const styles = StyleSheet.create({
    cameraContainer: {
        // paddingHorizontal: 30,
        marginTop: 20,
        // paddingHorizontal: 20
    },
    image: {
        width: 200,
        height: 200,
    },
    nameInput: {
        borderColor: "#5a3b00",
        borderWidth: 2,
        marginTop: 10,
        padding: 10,
        // borderRadius: 5,
        fontSize: 13,
        backgroundColor: '#ffe3af',
    },
})