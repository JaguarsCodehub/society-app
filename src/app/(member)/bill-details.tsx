import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { format, parse } from 'date-fns';

type BillDetailsProps = {
    item: string;
};

const BillDetails = () => {
    const { item } = useLocalSearchParams() as BillDetailsProps;
    const billData = JSON.parse(item);

    // Parse the date string '12/05/2023' into a Date object
    const dateString = billData.DocDate; // Assuming 'DocDate' is '12/05/2023'
    const dateFormat = "MM/dd/yyyy"; // Format of the incoming date string
    const parsedDate = parse(dateString, dateFormat, new Date());

    // Format the date to 'MMMM yyyy'
    const formattedDate = format(parsedDate, "MMMM yyyy");

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Bill for the Month of {formattedDate}</Text>
            <View style={styles.row}>
                <View style={styles.cell}>
                    <Text>Flat: {billData.Member}</Text>
                </View>
                <View style={styles.cell}>
                    <Text>Bill No: {billData.BillNumber}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.cell}>
                    <Text>Name: MEMBER B</Text>
                </View>
                <View style={styles.cell}>
                    <Text>Bill Date: {billData.DocDate}</Text>
                </View>
            </View>

            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <Text style={styles.tableHeader}>Name Of Charges</Text>
                    <Text style={styles.tableHeader}>Static Data</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>1. MAINTENANCE CHARGES A</Text>
                    <Text style={styles.tableCell}>1900.0000</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>2. ELECTRICITY A</Text>
                    <Text style={styles.tableCell}>1000.0000</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>3. Interest</Text>
                    <Text style={styles.tableCell}>0.00</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Total</Text>
                    <Text style={styles.tableCell}>2900.0000</Text>
                </View>
            </View>

            <View style={styles.noteContainer}>
                <Text style={styles.noteText}>
                    Note: CURRENT MONTH BILL PAY BY 31-07-2023. INTEREST 21.00 @ WILL BE CHARGED AFTER DUE DATE. THIS IS COMPUTER GENERATED BILL REQUIRE NO SIGNATURE. PAY BY CHEQUE/NEFT/RTGS/ECS. OR SCAN QR CODE & PAY. PLEASE WRITE IN ADD NOTE FLAT NO AND YOUR NAME.
                </Text>
                <Text style={styles.noteText}>
                    THE SARASWAT CO-OPERATIVE BANK LTD. ACCOUNT NO.341209100000183 IFSC CODE : SRCB0000341. THAKUR VILLAGE BRANCH, KANDIVALI, MUMBAI 400 101.
                </Text>
            </View>

            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <Text style={styles.tableHeader}>Balance</Text>
                    <Text style={styles.tableHeader}>{billData.Balance}.00</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Credit</Text>
                    <Text style={styles.tableCell}>{billData.Credit}.00</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Debit</Text>
                    <Text style={styles.tableCell}>{billData.Debit}.00</Text>
                </View>

                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Current Bill</Text>
                    <Text style={styles.tableCell}>2900.00</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Amount Due</Text>
                    <Text style={styles.tableCell}>-2900.00</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <Text>Receipt Received From: </Text>
                <Text>The Sum Of Rupees: </Text>
                <Text>Receipt No: </Text>
                <Text>Date: </Text>
                <Text>Approved By: </Text>
                <Text>Prepared By: </Text>
            </View>
        </ScrollView>
    );
};

export default BillDetails;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cell: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
    },
    table: {
        borderWidth: 1,
        borderColor: '#000',
        marginTop: 20,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableHeader: {
        flex: 1,
        padding: 10,
        fontWeight: 'bold',
        backgroundColor: '#f1f1f1',
        borderWidth: 1,
        borderColor: '#000',
    },
    tableCell: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#000',
    },
    noteContainer: {
        marginTop: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#000',
    },
    noteText: {
        marginBottom: 10,
    },
    footer: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
        gap: 15
    },
});
