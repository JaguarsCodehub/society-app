import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarChart, barDataItem, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, Stack } from 'expo-router';
import CardComponent from '../../components/ui/CardComponent';
import cardsData from '../../constants/cardData';
import infoCardsData from '../../constants/infoCardData';
import InfoCard from '../../components/ui/InfoCard';

type CookieUserData = {
    FmSocietyID: string;
    FMID: string;
    FMYear: string;
    FMName: string;
};

const data = [{ value: 30 }, { value: 80 }, { value: 90 }, { value: 70 }, { value: 30 }, { value: 80 }, { value: 50 }]


const FmDashboard = () => {
    const [cookies, setCookies] = useState<CookieUserData | null>(null);
    const [loading, setLoading] = useState(false);
    const [chartKey, setChartKey] = React.useState(0);

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
                console.log("Async Storage DATA from UseEffect: ", userData);
            } catch (error) {
                console.error('Error retrieving user data:', error);
            }
        };
        fetchAsyncStorageData();
    }, []);
    return (
        <ScrollView>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.container}>
                <View style={{ padding: 20 }}>

                    <Text style={styles.header}>Hello Faculty Manager</Text>
                    <Text style={{ fontSize: 16 }}>This is your Dashboard where you will be receiving member service request and issues.</Text>

                </View>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.button} onPress={() => router.push({ pathname: "/(fm)/complaints" })}>
                        <Text style={styles.buttonText}>Complaints</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => router.push({ pathname: "/services" })}>
                        <Text style={styles.buttonText}>Service Requests</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ paddingHorizontal: 20 }}>
                    <BarChart
                        key={chartKey}
                        data={data}
                        barWidth={18}
                        height={200}
                        width={290}
                        minHeight={3}
                        barBorderRadius={3}
                        showGradient
                        frontColor="#dc2626"
                        gradientColor="#EAC80C"
                        spacing={20}
                        noOfSections={4}
                        yAxisThickness={0}
                        xAxisThickness={0}
                        xAxisLabelsVerticalShift={2}
                        xAxisLabelTextStyle={{ color: "gray" }}
                        yAxisTextStyle={{ color: "gray" }}
                        isAnimated
                        animationDuration={300}
                    />
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

                <View>
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
    )
}

export default FmDashboard

const styles = StyleSheet.create({
    container: {
        marginTop: 60
    },
    header: {
        fontSize: 30,
        fontWeight: "600"
    },
    buttonRow: {
        padding: 10,
        flexDirection: 'row',
    },
    button: {
        backgroundColor: 'black',
        padding: 15,
        marginHorizontal: 10,
        borderRadius: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
})