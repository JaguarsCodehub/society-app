import 'react-native-gesture-handler'
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import axios from 'axios';
import LoadingScreen from '../../components/ui/LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from '@gorhom/bottom-sheet';
import { Picker } from '@react-native-picker/picker';

type CookieUserData = {
    FMSocietyID: string;
    FMID: string;
    FMYear: string;
    FMName: string;
};

type Complaint = {
    ID: string;
    MemberName: string;
    Subject: string;
    Description: string;
    ComplaintCode: string;
    File: string;
    status: string;
};

const Complaints = () => {
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [cookies, setCookies] = useState<CookieUserData | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
    const [status, setStatus] = useState<string>('');
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

    useEffect(() => {
        const fetchAsyncStorageData = async () => {
            try {
                const keys = ['FMSocietyID', 'FMID', 'FMYear', 'FMName'];
                const result = await AsyncStorage.multiGet(keys);
                const userData = result.reduce((acc, [key, value]) => {
                    if (value !== null) {
                        acc[key as keyof CookieUserData] = value;
                    }
                    return acc;
                }, {} as CookieUserData);

                setCookies(userData);
                console.log('Async Storage DATA from UseEffect: ', userData);
            } catch (error) {
                console.error('Error retrieving user data:', error);
            }
        };
        fetchAsyncStorageData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (cookies) {
                setLoading(true);
                const headers = {
                    societyid: cookies.FMSocietyID,
                };
                console.log('Headers being sent: ', headers);
                try {
                    const response = await axios.get('http://192.168.1.6:3000/fm/allcomplaints', {
                        headers,
                    });
                    setComplaints(response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [cookies]);

    const openBottomSheet = (complaint: Complaint) => {
        setSelectedComplaint(complaint);
        bottomSheetRef.current?.expand();
    };

    const updateStatus = async () => {
        if (selectedComplaint) {
            // Update the status logic here, e.g., making an API call
            try {
                const response = await axios.put(`http://192.168.1.6:3000/fm/updatecomplaint/${selectedComplaint.ComplaintCode}`, { status });
                console.log(response.data);
                // Update the local state to reflect the changes
                setComplaints((prev) =>
                    prev.map((comp) =>
                        comp.ID === selectedComplaint.ID ? { ...comp, status } : comp
                    )
                );
            } catch (error) {
                console.error('Error updating status:', error);
            } finally {
                bottomSheetRef.current?.close();
            }
        }
    };

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View>
                    <Text style={{ fontSize: 30, fontWeight: '700', marginLeft: 10 }}>ComplaintTrack</Text>
                    {complaints.map((item) => (
                        <View key={item.ComplaintCode} style={{ backgroundColor: '#C4FFE1', padding: 10, margin: 10, borderRadius: 15 }}>
                            <Text style={{ fontSize: 20, fontWeight: '600', marginVertical: 1 }}>MemberName: {item.MemberName}</Text>
                            <Text style={{ fontSize: 20, fontWeight: '600', marginVertical: 1 }}>Subject: {item.Subject}</Text>
                            <Text style={{ fontSize: 20, fontWeight: '600', marginVertical: 1 }}>Description: {item.Description}</Text>
                            <Text style={{ fontSize: 20, fontWeight: '600', marginVertical: 1 }}>{item.ComplaintCode}</Text>
                            <Image source={{ uri: item.File }} resizeMode="contain" style={styles.image} />
                            <TouchableOpacity onPress={() => openBottomSheet(item)} style={styles.button}>
                                <Text style={styles.buttonText}>Update Status</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints} style={{ marginHorizontal: 10 }}>
                <View style={styles.bottomSheetContent}>
                    {selectedComplaint && (
                        <>
                            <Text style={styles.bottomSheetHeader}>Update Status</Text>
                            <Text>Complaint Code: {selectedComplaint.ID}</Text>
                            <Picker selectedValue={status} onValueChange={(itemValue) => setStatus(itemValue)} style={styles.picker}>
                                <Picker.Item label="--Select Status--" value="" />
                                <Picker.Item label="Pending" value="Pending" />
                                <Picker.Item label="Done" value="Done" />
                            </Picker>
                            <TouchableOpacity onPress={updateStatus} style={styles.updateButton}>
                                <Text style={styles.updateButtonText}>Update</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </BottomSheet>
        </View>
    );
};

export default Complaints;

const styles = StyleSheet.create({
    image: {
        width: '80%',
        height: 600,
        borderRadius: 5,
        // backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#00AA54',
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '700',
    },
    bottomSheetContent: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#FFBFBF"
    },
    bottomSheetHeader: {
        fontSize: 20,
        fontWeight: '700',
    },
    picker: {
        width: '100%',
        backgroundColor: "white",
        height: 50,
        marginTop: 20,
    },
    updateButton: {
        backgroundColor: 'red',
        width: "100%",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    updateButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 15
    },
});
