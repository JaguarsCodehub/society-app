import React, { useState, useRef } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { format, parse } from 'date-fns';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

type BillDetailsProps = {
    item: string;
};

const BillDetails = () => {
    const { item } = useLocalSearchParams() as BillDetailsProps;
    const billData = item ? JSON.parse(item) : null;

    if (!billData) {
        return <Text>Loading...</Text>;
    }

    const dateString = billData.docDate;
    const dateFormat = "MM/dd/yyyy";
    let formattedDate;

    try {
        const parsedDate = parse(dateString, dateFormat, new Date());
        formattedDate = format(parsedDate, "MMMM yyyy");
    } catch (error) {
        console.error('Error parsing date:', error);
        formattedDate = 'Invalid Date';
    }

    const [modalVisible, setModalVisible] = useState(false);

    const generatePDF = async () => {
        const html = `
        <html>
        <head>
            <style>
                body { font-size: 14px; }
                .container { padding: 20px; }
                .title { text-align: center; font-size: 20px; font-weight: bold; }
                .row { display: flex; justify-content: space-between; }
                .cell, .table, .tableRow, .tableHeader, .tableCell, .noteContainer, .noteText, .footer {
                    border: 1px solid black; padding: 10px; margin-bottom: 10px;
                }
                .tableRow { display: flex; }
                .tableHeader, .tableCell { flex: 1; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="title">Bill for the Month of ${formattedDate}</div>
                <div class="row">
                    <div class="cell">Flat: ${billData.member}</div>
                    <div class="cell">Bill No: ${billData.billNumber}</div>
                </div>
                <div class="row">
                    <div class="cell">Name: MEMBER B</div>
                    <div class="cell">Bill Date: ${billData.docDate}</div>
                </div>
                <div class="table">
                    <div class="tableRow">
                        <div class="tableHeader">Name Of Charges</div>
                        <div class="tableHeader">Static Data</div>
                    </div>
                    <div class="tableRow">
                        <div class="tableCell">1. MAINTENANCE CHARGES A</div>
                        <div class="tableCell">1900.0000</div>
                    </div>
                    <div class="tableRow">
                        <div class="tableCell">2. ELECTRICITY A</div>
                        <div class="tableCell">1000.0000</div>
                    </div>
                    <div class="tableRow">
                        <div class="tableCell">3. Interest</div>
                        <div class="tableCell">0.00</div>
                    </div>
                    <div class="tableRow">
                        <div class="tableCell">Total</div>
                        <div class="tableCell">2900.0000</div>
                    </div>
                </div>
                <div class="noteContainer">
                    <div class="noteText">Note: CURRENT MONTH BILL PAY BY 31-07-2023. INTEREST 21.00 @ WILL BE CHARGED AFTER DUE DATE. THIS IS COMPUTER GENERATED BILL REQUIRE NO SIGNATURE. PAY BY CHEQUE/NEFT/RTGS/ECS. OR SCAN QR CODE & PAY. PLEASE WRITE IN ADD NOTE FLAT NO AND YOUR NAME.</div>
                    <div class="noteText">THE SARASWAT CO-OPERATIVE BANK LTD. ACCOUNT NO.341209100000183 IFSC CODE : SRCB0000341. THAKUR VILLAGE BRANCH, KANDIVALI, MUMBAI 400 101.</div>
                </div>
                <div class="table">
                    <div class="tableRow">
                        <div class="tableHeader">Balance</div>
                        <div class="tableHeader">${billData.balance}.00</div>
                    </div>
                    <div class="tableRow">
                        <div class="tableCell">Credit</div>
                        <div class="tableCell">${billData.credit}.00</div>
                    </div>
                    <div class="tableRow">
                        <div class="tableCell">Debit</div>
                        <div class="tableCell">${billData.debit}.00</div>
                    </div>
                    <div class="tableRow">
                        <div class="tableCell">Current Bill</div>
                        <div class="tableCell">2900.00</div>
                    </div>
                    <div class="tableRow">
                        <div class="tableCell">Amount Due</div>
                        <div class="tableCell">-2900.00</div>
                    </div>
                </div>
                <div class="footer">
                    <div>Receipt Received From: </div>
                    <div>The Sum Of Rupees: </div>
                    <div>Receipt No: </div>
                    <div>Date: </div>
                    <div>Approved By: </div>
                    <div>Prepared By: </div>
                </div>
            </div>
        </body>
        </html>
        `;

        const { uri } = await Print.printToFileAsync({ html });
        await shareAsync(uri, { mimeType: 'application/pdf', dialogTitle: 'Share PDF', UTI: 'com.adobe.pdf' });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Bill for the Month of {formattedDate}</Text>
            <View style={styles.row}>
                <View style={styles.cell}>
                    <Text>Flat: {billData.member}</Text>
                </View>
                <View style={styles.cell}>
                    <Text>Bill No: {billData.billNumber}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.cell}>
                    <Text>Name: MEMBER B</Text>
                </View>
                <View style={styles.cell}>
                    <Text>Bill Date: {billData.docDate}</Text>
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
                    <Text style={styles.tableHeader}>{billData.balance}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Credit</Text>
                    <Text style={styles.tableCell}>{billData.credit}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Debit</Text>
                    <Text style={styles.tableCell}>{billData.debit}</Text>
                </View>

                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Current Bill</Text>
                    <Text style={styles.tableCell}>{billData.debit}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Amount Due</Text>
                    <Text style={styles.tableCell}>-{billData.debit}</Text>
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

            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                <TouchableOpacity
                    style={{ backgroundColor: "green", padding: 10, paddingHorizontal: 30 }}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={{ textAlign: "center", color: "white", fontSize: 20 }}>Preview</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ backgroundColor: "green", padding: 10, paddingHorizontal: 30 }}
                    onPress={generatePDF}
                >
                    <Text style={{ textAlign: "center", color: "white", fontSize: 20 }}>Export</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.container}>
                    <ScrollView>
                        {/* The same content as in the main view, or you can use a separate component */}
                        <Text style={{ fontSize: 30, fontWeight: "600", textAlign: "center" }}>Preview of Your Bill</Text>
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

                        <Button title="Close" onPress={() => setModalVisible(false)} />
                    </ScrollView>
                </View>
            </Modal>
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
