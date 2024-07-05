import AsyncStorage from '@react-native-async-storage/async-storage';

type UserData = {
    SocietyID: string;
    ID: string;
};

export const storeUserData = async (userData: UserData) => {
    try {
        const userEntries = Object.entries(userData);
        await AsyncStorage.multiSet(userEntries);
        console.log("User Entries stored in AsyncStorage", userEntries)
    } catch (error) {
        console.error('Error storing user data:', error);
    }
};
