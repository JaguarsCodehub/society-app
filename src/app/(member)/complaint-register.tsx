import React, { useEffect, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Foundation';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { uploadImageAsync } from '../../utils/uploadImageAsync';
import LoadingScreen from '../../components/ui/LoadingScreen';


type CookieUserData = {
    MemberSocietyID: string;
    MemberID: string;
    UserID: string;
    MemberYear: string;
    MemberName: string;
    MemberWing: string;
    MemberFlat: string;
};

export default function ComplaintRegister() {
    const [date, setDate] = useState<Date>(new Date());
    const [mode, setMode] = useState<'date' | 'time'>('date');
    const [show, setShow] = useState<boolean>(false);
    const [subject, setSubject] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [image, setImage] = useState<string | null>(null);

    const [cookies, setCookies] = useState<CookieUserData | null>(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchAsyncStorageData = async () => {
            try {
                const keys = ['MemberSocietyID', 'MemberID', 'UserID', 'MemberYear', 'MemberName', 'MemberWing', 'MemberFlat'];
                const result = await AsyncStorage.multiGet(keys);
                const userData = result.reduce((acc, [key, value]) => {
                    if (value !== null) {
                        acc[key as keyof CookieUserData] = value;
                    }
                    return acc;
                }, {} as CookieUserData);

                setCookies(userData);
                console.log("Async Storage DATA from UseEffect: ", userData);
            } catch (error) {
                console.error('Error retrieving user data:', error);
            }
        };
        fetchAsyncStorageData();
    }, []);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const postData = {
                subject,
                description,
                status,
                image,
                date,
                ...cookies
            };

            const response = await axios.post('https://society-backend-h2ql.onrender.com/member/complaint', postData);
            console.log('Response from server:', response.data);
            setSubject("");
            setDescription("");
            setStatus("")
            setImage(null)
        } catch (error) {
            console.error('Error submitting data:', error);
        } finally {
            setLoading(false);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            const localUri = result.assets[0].uri;
            const imageUrl = await uploadImageAsync(localUri);
            setImage(imageUrl);
        }
    };


    const onChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShow(true);
        setMode('date');
    };

    if (loading) {
        return (
            <LoadingScreen />
        )
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <View>
                    <Text style={{ fontSize: 30, fontWeight: "600" }}>Register a Complaint</Text>
                </View>
                <View style={{ marginTop: 30 }}>
                    <Text style={{ fontSize: 15, fontWeight: "600" }}>Pick a Date</Text>
                    <View style={{
                        display: "flex", flexDirection: "row", backgroundColor: "#dedede",
                        alignItems: "center", justifyContent: "space-between", borderRadius: 5, marginTop: 5
                    }}>
                        <Text style={styles.selectedDateText}>{date.toLocaleString()}</Text>
                        <TouchableOpacity onPress={showDatepicker}>
                            <View style={{ paddingRight: 15 }}>
                                <Icon name='calendar' size={30} color="green" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            onChange={onChange}
                        />
                    )}
                </View>

                <Text style={styles.label}>Subject</Text>
                <TextInput
                    style={styles.input}
                    value={subject}
                    onChangeText={setSubject}
                    cursorColor="black"
                />

                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={styles.input}
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    cursorColor="black"
                />

                <Text style={styles.label}>Status</Text>
                <Picker
                    selectedValue={status}
                    style={styles.picker}
                    onValueChange={(itemValue) => setStatus(itemValue)}
                >
                    <Picker.Item label="Select status" value="" />
                    <Picker.Item label="New" value="1" />
                    <Picker.Item label="Pending" value="2" />
                    <Picker.Item label="Completed" value="3" />
                </Picker>

                <View style={styles.cameraContainer}>
                    <Text style={{ fontSize: 15, fontWeight: "600" }}>Upload Photo Regarding a Complaint</Text>
                    <TouchableOpacity onPress={pickImage} style={{ paddingHorizontal: 10 }}>
                        <Text style={{ marginTop: 10, padding: 10, backgroundColor: "green", textAlign: "center", color: "white", borderRadius: 5 }}>Upload Photo</Text>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 10, fontSize: 20, fontWeight: "600" }}>Photo: </Text>
                    {image && <Image source={{ uri: image }} style={styles.image} />}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0',
        // marginTop: 60
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        marginTop: 8
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
        backgroundColor: "lightgray"
    },
    button: {
        marginTop: 90,
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectedDateText: {
        padding: 15,
        fontSize: 15,
        fontWeight: "600"
    },
    cameraContainer: {
        // paddingHorizontal: 30,
        // marginTop: 20,
        // paddingHorizontal: 20
    },
    image: {
        width: 300,
        height: 500,
    },
});
