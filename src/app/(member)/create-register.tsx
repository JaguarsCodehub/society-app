import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Stack } from 'expo-router';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const CreateRegister = () => {
    const [owners, setOwners] = useState([{ name: '', mobile: '', email: '' }]);
    const [jointMembers, setJointMembers] = useState([{ name: '', address: '', role: '' }]);

    const addOwner = () => {
        setOwners([...owners, { name: '', mobile: '', email: '' }]);
    };

    const addJointMember = () => {
        setJointMembers([...jointMembers, { name: '', address: '', role: '' }]);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://society-backend-six.vercel.app/api/create-register', {
                owners,
                jointMembers
            });
            Alert.alert('Success', `Register created successfully with code: ${response.data.code}`);
            // Reset form or navigate to another screen
        } catch (error) {
            console.error('Error creating register:', error);
            Alert.alert('Error', 'Failed to create register. Please try again.');
        }
    };

    const removeOwner = (index: number) => {
        if (owners.length > 1) {
            const newOwners = owners.filter((_, i) => i !== index);
            setOwners(newOwners);
        }
    };

    const removeJointMember = (index: number) => {
        if (jointMembers.length > 0) {
            const newJointMembers = jointMembers.filter((_, i) => i !== index);
            setJointMembers(newJointMembers);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Stack.Screen options={{ headerTitle: "Create Register" }} />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Create your J Register</Text>
                <Text style={styles.headerSubtitle}>FORM "J" - SEE RULE 33</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Owners</Text>
                {owners.map((owner, index) => (
                    <View key={index} style={styles.card}>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={owner.name}
                            onChangeText={(text) => {
                                const newOwners = [...owners];
                                newOwners[index].name = text;
                                setOwners(newOwners);
                            }}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Mobile"
                            value={owner.mobile}
                            onChangeText={(text) => {
                                const newOwners = [...owners];
                                newOwners[index].mobile = text;
                                setOwners(newOwners);
                            }}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email Address"
                            value={owner.email}
                            onChangeText={(text) => {
                                const newOwners = [...owners];
                                newOwners[index].email = text;
                                setOwners(newOwners);
                            }}
                        />
                        {index > 0 && (
                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={() => removeOwner(index)}
                            >
                                <Ionicons name="close-circle" size={24} color="#FF3B30" />
                            </TouchableOpacity>
                        )}
                    </View>
                ))}
                <TouchableOpacity style={styles.addButton} onPress={addOwner}>
                    <Ionicons name="add-circle" size={24} color="#FFF" />
                    <Text style={styles.addButtonText}>Add Owner</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Joint Members</Text>
                {jointMembers.map((member, index) => (
                    <View key={index} style={styles.card}>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={member.name}
                            onChangeText={(text) => {
                                const newMembers = [...jointMembers];
                                newMembers[index].name = text;
                                setJointMembers(newMembers);
                            }}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Address"
                            value={member.address}
                            onChangeText={(text) => {
                                const newMembers = [...jointMembers];
                                newMembers[index].address = text;
                                setJointMembers(newMembers);
                            }}
                        />
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={member.role}
                                style={styles.picker}
                                onValueChange={(itemValue) => {
                                    const newMembers = [...jointMembers];
                                    newMembers[index].role = itemValue;
                                    setJointMembers(newMembers);
                                }}
                            >
                                <Picker.Item label="Choose Type of Member" value="" />
                                <Picker.Item label="Nominal member" value="Nominal member" />
                                <Picker.Item label="Sympathizer member" value="Sympathizer member" />
                                <Picker.Item label="Associate member" value="Associate member" />
                                <Picker.Item label="Managing committee member" value="Managing committee member" />
                                <Picker.Item label="General body member" value="General body member" />
                            </Picker>
                        </View>
                        <TouchableOpacity
                            style={styles.removeButton}
                            onPress={() => removeJointMember(index)}
                        >
                            <Ionicons name="close-circle" size={24} color="#FF3B30" />
                        </TouchableOpacity>
                    </View>
                ))}
                <TouchableOpacity style={styles.addButton} onPress={addJointMember}>
                    <Ionicons name="add-circle" size={24} color="#FFF" />
                    <Text style={styles.addButtonText}>Add Joint Member</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },
    header: {
        marginTop: 30,
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#8E8E93',
    },
    section: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#000000',
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    input: {
        height: 44,
        borderColor: '#E5E5EA',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 12,
        paddingHorizontal: 12,
        fontSize: 16,
    },
    pickerContainer: {
        borderColor: '#E5E5EA',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 12,
    },
    picker: {
        height: 44,
    },
    removeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        // backgroundColor: '#E5E5EA',
        backgroundColor: "#007AFF",
        borderRadius: 8,
        marginBottom: 20,
    },
    addButtonText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#FFF',
        fontWeight: '600',
    },
    submitButton: {
        backgroundColor: '#00b761',
        paddingVertical: 16,
        borderRadius: 12,
        marginHorizontal: 20,
        marginBottom: 30,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default CreateRegister;