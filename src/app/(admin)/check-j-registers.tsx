import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Card, Title, Paragraph, DataTable, Divider, ActivityIndicator, MD3Colors, Button, Modal, Portal } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import axios from 'axios';

interface Owner {
    name: string;
    mobile: string;
    email: string;
}

interface JointMember {
    name: string;
    address: string;
    role: string;
}

interface Register {
    ID: number;
    CreatedAt: string;
    Owners: Owner[];
    JointMembers: JointMember[];
    RegisterCode: string;
}

const JRegisterView: React.FC = () => {
    const [registers, setRegisters] = useState<Register[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedRegister, setSelectedRegister] = useState<Register | null>(null);
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);

    useEffect(() => {
        fetchRegisters();
    }, []);

    const fetchRegisters = async () => {
        try {
            const response = await axios.get<Register[]>('https://society-backend-six.vercel.app/api/all-registers');
            setRegisters(response.data);
            // console.log(response.data);
            if (response.data.length > 0) {
                setSelectedRegister(response.data[0]);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching registers:', error);
            setLoading(false);
        }
    };

    const showPreview = () => setIsPreviewVisible(true);
    const hidePreview = () => setIsPreviewVisible(false);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={MD3Colors.primary90} />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Title style={styles.title}>J Register</Title>
                    {/* <Title style={styles.title}>
                        FORM "J"
                        SEE RULE 33
                    </Title> */}
                    <Picker
                        selectedValue={selectedRegister?.RegisterCode}
                        onValueChange={(itemValue) =>
                            setSelectedRegister(registers.find(r => r.RegisterCode === itemValue) || null)
                        }
                    >
                        {registers.map((register) => (
                            <Picker.Item key={register.RegisterCode} label={`Register ${register.RegisterCode}`} value={register.RegisterCode} />
                        ))}
                    </Picker>
                </Card.Content>
            </Card>

            {selectedRegister && (
                <>
                    <Card style={styles.card}>
                        <Card.Content>
                            <Title>Register Details</Title>
                            <Paragraph>Code: {selectedRegister.RegisterCode}</Paragraph>
                            <Paragraph>Created: {moment(selectedRegister.CreatedAt).format('MMMM D, YYYY [at] h:mm A')}</Paragraph>

                            <Divider style={styles.divider} />

                            <Title>Owners</Title>
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title>Name</DataTable.Title>
                                    <DataTable.Title>Mobile</DataTable.Title>
                                    <DataTable.Title>Email</DataTable.Title>
                                </DataTable.Header>
                                {selectedRegister.Owners.map((owner, index) => (
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell>{owner.name}</DataTable.Cell>
                                        <DataTable.Cell>{owner.mobile}</DataTable.Cell>
                                        <DataTable.Cell>{owner.email}</DataTable.Cell>
                                    </DataTable.Row>
                                ))}
                            </DataTable>

                            <Divider style={styles.divider} />

                            <Title>Joint Members</Title>
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title>Name</DataTable.Title>
                                    <DataTable.Title>Address</DataTable.Title>
                                    <DataTable.Title>Role</DataTable.Title>
                                </DataTable.Header>
                                {selectedRegister.JointMembers.map((member, index) => (
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell>{member.name}</DataTable.Cell>
                                        <DataTable.Cell>{member.address}</DataTable.Cell>
                                        <DataTable.Cell>{member.role}</DataTable.Cell>
                                    </DataTable.Row>
                                ))}
                            </DataTable>
                        </Card.Content>
                    </Card>
                    <Button mode="contained" onPress={showPreview} style={styles.previewButton}>
                        Preview Full Register
                    </Button>
                </>
            )}

            <Portal>
                <Modal visible={isPreviewVisible} onDismiss={hidePreview} contentContainerStyle={styles.modalContent}>
                    <ScrollView>
                        <Title style={styles.modalTitle}>Full J Register Preview</Title>
                        <Paragraph style={styles.previewParagraph}>Code: {selectedRegister?.RegisterCode}</Paragraph>
                        <Paragraph style={styles.previewParagraph}>Created: {moment(selectedRegister?.CreatedAt).format('MMMM D, YYYY [at] h:mm A')}</Paragraph>

                        <Divider style={styles.divider} />

                        <Title style={styles.sectionTitle}>Owners</Title>
                        <ScrollView horizontal>
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title style={styles.tableCell}><Text style={styles.tableHeaderText}>Name</Text></DataTable.Title>
                                    <DataTable.Title style={styles.tableCell}><Text style={styles.tableHeaderText}>Mobile</Text></DataTable.Title>
                                    <DataTable.Title style={styles.tableCell}><Text style={styles.tableHeaderText}>Email</Text></DataTable.Title>
                                </DataTable.Header>
                                {selectedRegister?.Owners.map((owner, index) => (
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell style={styles.tableCell}><Text style={styles.tableCellText}>{owner.name}</Text></DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}><Text style={styles.tableCellText}>{owner.mobile}</Text></DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}><Text style={styles.tableCellText}>{owner.email}</Text></DataTable.Cell>
                                    </DataTable.Row>
                                ))}
                            </DataTable>
                        </ScrollView>

                        <Divider style={styles.divider} />

                        <Title style={styles.sectionTitle}>Joint Members</Title>
                        <ScrollView horizontal>
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title style={styles.tableCell}><Text style={styles.tableHeaderText}>Name</Text></DataTable.Title>
                                    <DataTable.Title style={styles.tableCell}><Text style={styles.tableHeaderText}>Address</Text></DataTable.Title>
                                    <DataTable.Title style={styles.tableCell}><Text style={styles.tableHeaderText}>Role</Text></DataTable.Title>
                                </DataTable.Header>
                                {selectedRegister?.JointMembers.map((member, index) => (
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell style={styles.tableCell}><Text style={styles.tableCellText}>{member.name}</Text></DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}><Text style={styles.tableCellText}>{member.address}</Text></DataTable.Cell>
                                        <DataTable.Cell style={styles.tableCell}><Text style={styles.tableCellText}>{member.role}</Text></DataTable.Cell>
                                    </DataTable.Row>
                                ))}
                            </DataTable>
                        </ScrollView>
                    </ScrollView>
                    <Button mode="contained" onPress={hidePreview} style={styles.closeButton}>
                        Close Preview
                    </Button>
                </Modal>
            </Portal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        margin: 16,
        elevation: 4,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    divider: {
        marginVertical: 16,
    },
    previewButton: {
        margin: 16,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 8,
        maxHeight: '90%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    previewParagraph: {
        fontSize: 16,
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    tableCell: {
        minWidth: 150,
    },
    tableHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    tableCellText: {
        fontSize: 16,
    },
    closeButton: {
        marginTop: 16,
    },
});

export default JRegisterView;