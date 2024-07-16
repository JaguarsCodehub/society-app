import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LoadingScreen from '../../components/ui/LoadingScreen';

type CookieUserData = {
    MemberSocietyID: string;
    MemberID: string;
    UserID: string;
    MemberYear: string;
};

type NominationData = {
    ID: number;
    MName: string;
    NomineeName: string;
    NomineeAddress: string;
    NomineeAge: string;
    NomineeRelation: string;
    AllotedPercentage: string;
    Date: string;
    MWing: string;
    MFlat: string;
}

const Nomination = () => {

    const [nominationData, setNominationData] = useState<NominationData[]>([])
    const [cookies, setCookies] = useState<CookieUserData | null>(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchAsyncStorageData = async () => {
            try {
                const keys = ['MemberSocietyID', 'UserID', 'MemberID', 'MemberYear'];
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
                    'SocietyID': cookies.MemberSocietyID,
                    'UserId': cookies.UserID
                };
                console.log("Headers being sent:", headers); // Log headers

                try {
                    const response = await axios.get('http://192.168.1.6:3000/member/nomination', {
                        headers
                    });
                    setNominationData(response.data);
                    console.log("NominationData:", nominationData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    console.log("Cookies:", cookies); //
                    console.log(cookies?.MemberSocietyID);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [cookies]);

    if (loading) {
        return (
            <LoadingScreen />
        );
    }

    return (
        <View style={{ marginTop: 60 }}>
            <Text>Nomination</Text>
            {nominationData.map((item) => (
                <View key={item.ID}>
                    <Text>{item.MName}</Text>
                    <Text>{item.NomineeName}</Text>
                    <Text>{item.NomineeAddress}</Text>
                    <Text>{item.NomineeAge}</Text>
                    <Text>{item.NomineeRelation}</Text>
                    <Text>{item.AllotedPercentage}</Text>
                    <Text>{item.Date}</Text>
                    <Text>{item.MWing}</Text>
                    <Text>{item.MFlat}</Text>
                </View>
            ))}
        </View>
    )
}

export default Nomination

const styles = StyleSheet.create({})