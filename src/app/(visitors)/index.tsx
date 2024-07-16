import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { router, Stack } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Foundation';
import UploadIcon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../../components/ui/LoadingScreen';

type CookieUserData = {
    SocietyID: string;
    ID: string;
    year: string;
};

const VisitorsPage = () => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState<'date' | 'time'>('date');
    const [show, setShow] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [flats, setFlats] = useState<any[]>([]);
    const [flat, setFlat] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState<string>('');
    const [mobileNumber, setMobileNumber] = useState<string>('');
    const [cookies, setCookies] = useState<CookieUserData | null>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    useEffect(() => {
        const fetchAsyncStorageData = async () => {
            try {
                const keys = ['SocietyID', 'ID', 'Year'];
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

    useEffect(() => {
        const fetchData = async () => {
            if (cookies) {
                const headers = {
                    'SocietyID': cookies.SocietyID,
                };
                console.log("Headers being sent:", headers); // Log headers

                try {
                    const response = await axios.get('http://192.168.1.6:3000/flats', {
                        headers
                    });
                    setFlats(response.data);
                    console.log("Flats:", flats); // Logging the Flats from one Society ID Only
                } catch (error) {
                    console.error('Error fetching data:', error);
                    console.log("Cookies:", cookies); //
                    console.log(cookies?.SocietyID);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [cookies]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const [wingCode, flatID] = flat.split("-");
            const requestData = {
                name,
                mobileNumber,
                date,
                image,
                wingCode,
                flatID,
                year: cookies?.year,
                ...cookies
            };

            const response = await axios.post('http://192.168.1.6:3000/visitors', requestData);
            console.log('Response from server:', response.data);
        } catch (error) {
            console.error('Error submitting data:', error);
        } finally {
            setLoading(false);
        }
    };

    const onChange = (event: any, selectedDate: Date | undefined) => {
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
        );
    }

    return (
        <ScrollView>
            <View style={{ marginTop: 60 }}>
                <Stack.Screen options={{ headerShown: false }} />
                <View style={styles.container}>
                    <View>
                        <Text style={styles.visitorText}>Add New Visitor</Text>
                        <View style={styles.formWrapper}>
                            <Text style={{ fontSize: 15, fontWeight: "600" }}>Name</Text>
                            <TextInput
                                placeholder='Enter Name'
                                placeholderTextColor="#000"
                                style={styles.nameInput}
                                cursorColor="#000"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>
                    </View>
                    <View>
                        <View style={{ marginTop: 10, paddingHorizontal: 20 }}>
                            <Text style={{ fontSize: 15, fontWeight: "600" }}>Mobile Number</Text>
                            <TextInput
                                placeholder='Enter Mobile Number'
                                placeholderTextColor="#000"
                                style={styles.nameInput}
                                value={mobileNumber}
                                onChangeText={setMobileNumber}
                            />
                        </View>
                    </View>

                    <View>
                        <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
                            <Text style={{ fontSize: 15, fontWeight: "600" }}>Pick a Date</Text>

                            <View style={{
                                display: "flex", flexDirection: "row", backgroundColor: "#ececec",
                                alignItems: "center", justifyContent: "space-between"
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
                    </View>

                    <View style={styles.cameraContainer}>
                        <Text style={{ fontSize: 15, fontWeight: "600" }}>Upload Visitor's Live Photo</Text>
                        <TouchableOpacity onPress={pickImage}>
                            <Text style={{ marginTop: 10, width: 200, padding: 10, backgroundColor: "green", color: "white", borderRadius: 5 }}>Upload Photo</Text>
                        </TouchableOpacity>
                        <Text style={{ marginTop: 10, fontSize: 20, fontWeight: "600" }}>Photo: </Text>
                        {image && <Image source={{ uri: image }} style={styles.image} />}
                    </View>

                    <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
                        <Text style={styles.label}>Select Flat</Text>
                        <Picker
                            selectedValue={flat}
                            style={styles.picker}
                            onValueChange={(itemValue) => setFlat(itemValue)}
                        >
                            {flats.map((item) => (
                                <Picker.Item key={item.WingFlatCode} label={item.WingFlat} value={`${item.WingCode}-${item.FlatID}`} />
                            ))}
                        </Picker>
                    </View>
                </View>

                {/* Submit Button */}
                <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
                    <Text style={{ color: "white", fontSize: 18 }}>Submit Data</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push({ pathname: "/(visitors)/view" })} style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 30,
                    margin: 40,
                    padding: 15,
                    backgroundColor: "#fff",
                    borderRadius: 5,
                }}>
                    <Text style={{ color: "black", fontSize: 18 }}>Go to View Visitors</Text>
                </TouchableOpacity>
                <UploadIcon name='upload' size={20} color="white" />
            </View >
        </ScrollView>
    );
};

export default VisitorsPage;

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    visitorText: {
        fontSize: 30,
        fontWeight: "600",
    },
    formWrapper: {
        padding: 20,
    },
    nameInput: {
        marginTop: 5,
        padding: 10,
        fontSize: 15,
        backgroundColor: "#ececec"
    },
    selectedDateText: {
        padding: 15,
        fontSize: 15,
        fontWeight: "600"
    },
    dateButton: {
        width: "50%",
        borderRadius: 10,
        padding: 10,
        backgroundColor: "#00DF91"
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: '100%',
        backgroundColor: "#ececec",
        marginBottom: 20,
    },
    cameraContainer: {
        marginTop: 20,
        paddingHorizontal: 20
    },
    image: {
        width: 200,
        height: 200,
    },
    submitBtn: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
        margin: 40,
        padding: 15,
        backgroundColor: "#00A25B",
        borderRadius: 5,
        color: "white",
    },
});
