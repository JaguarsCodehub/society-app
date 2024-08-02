// App.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import LoginForm from './LoginForm';
import MemberForm from './MemberForm';
import FmForm from './FmForm';


type FormType = 'watchman' | 'member' | 'facilityManager';

const App: React.FC = () => {
    const [currentForm, setCurrentForm] = useState<FormType>('watchman');

    const renderForm = () => {
        switch (currentForm) {
            case 'watchman':
                return <LoginForm />;
            case 'member':
                return <MemberForm />;
            case 'facilityManager':
                return <FmForm />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.switcher}>
                <TouchableOpacity onPress={() => setCurrentForm('watchman')} style={styles.switcherButton}>
                    <Text style={currentForm === 'watchman' ? styles.activeText : styles.inactiveText}>Watchman</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCurrentForm('member')} style={styles.switcherButton}>
                    <Text style={currentForm === 'member' ? styles.activeText : styles.inactiveText}>Member</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCurrentForm('facilityManager')} style={styles.switcherButton}>
                    <Text style={currentForm === 'facilityManager' ? styles.activeText : styles.inactiveText}>Facility Manager</Text>
                </TouchableOpacity>
            </View>
            {renderForm()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    switcher: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    switcherButton: {
        padding: 10,
    },
    activeText: {
        fontWeight: 'bold',
        color: 'black',
    },
    inactiveText: {
        color: 'gray',
    },
    form: {
        padding: 20,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    label: {
        marginBottom: 10,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginBottom: 10,
        padding: 10,
    },
    button: {
        backgroundColor: 'black',
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default App;
