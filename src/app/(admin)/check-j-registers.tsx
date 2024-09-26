import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, DataTable, Divider, ActivityIndicator, MD3Colors } from 'react-native-paper';
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

    useEffect(() => {
        fetchRegisters();
    }, []);

    const fetchRegisters = async () => {
        try {
            const response = await axios.get<Register[]>('http://192.168.1.11:3000/api/all-registers');
            setRegisters(response.data);
            console.log(response.data);
            if (response.data.length > 0) {
                setSelectedRegister(response.data[0]);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching registers:', error);
            setLoading(false);
        }
    };

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
            )}
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
});

export default JRegisterView;