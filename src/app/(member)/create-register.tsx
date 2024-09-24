import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Stack } from 'expo-router';

const CreateRegister = () => {
    const [owners, setOwners] = useState([{ name: '', mobile: '', email: '' }]);
    const [jointMembers, setJointMembers] = useState([{ name: '', address: '', role: '' }]);

    const addOwner = () => {
        setOwners([...owners, { name: '', mobile: '', email: '' }]);
    };

    const addJointMember = () => {
        setJointMembers([...jointMembers, { name: '', address: '', role: '' }]);
    };

    return (
        <ScrollView style={styles.container}>
            <Stack.Screen options={{ headerTitle: "Create Register" }} />
            <Text style={styles.header}>Create your J Register</Text>
            <View style={styles.section}>
                <Text style={styles.subHeader}>Owner</Text>
                {owners.map((owner, index) => (
                    <View key={index} style={styles.inputGroup}>
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
                            placeholder="EmailAddress"
                            value={owner.email}
                            onChangeText={(text) => {
                                const newOwners = [...owners];
                                newOwners[index].email = text;
                                setOwners(newOwners);
                            }}
                        />
                    </View>
                ))}
                <Button title="Add Owner" onPress={addOwner} />
            </View>
            <View style={styles.section}>
                <Text style={styles.subHeader}>Register Details</Text>
                {jointMembers.map((member, index) => (
                    <View key={index} style={styles.inputGroup}>
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
                        <Picker
                            selectedValue={member.role}
                            style={styles.input}
                            onValueChange={(itemValue: any) => {
                                const newMembers = [...jointMembers];
                                newMembers[index].role = itemValue;
                                setJointMembers(newMembers);
                            }}
                        >
                            <Picker.Item label="Choose Type of Member" value="#" enabled={false} />
                            <Picker.Item label="Nominal member" value="Nominal member" />
                            <Picker.Item label="Sympathizer member" value="Sympathizer member" />
                            <Picker.Item label="Associate member" value="Associate member" />
                            <Picker.Item label="Managing committee member" value="Managing committee member" />
                            <Picker.Item label="General body member" value="General body member" />
                        </Picker>
                    </View>
                ))}
                <Button title="Add Joint Member" onPress={addJointMember} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    header: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
    },
    subHeader: {
        fontSize: 20,
        marginBottom: 10,
    },
    inputGroup: {
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default CreateRegister;