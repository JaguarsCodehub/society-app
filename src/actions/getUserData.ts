import AsyncStorage from "@react-native-async-storage/async-storage";

type UserData = {
    SocietyID: string;
    ID: string;
    year: string;
};

export const getUserData = async (): Promise<UserData | null> => {
    try {
        const keys = ['SocietyID', 'ID'];
        const result = await AsyncStorage.multiGet(keys);

        const userData = result.reduce((acc, [key, value]) => {
            if (value !== null) {
                acc[key as keyof UserData] = value;
            }
            return acc;
        }, {} as UserData);

        return userData;
    } catch (error) {
        console.error('Error retrieving user data:', error);
        return null;
    }
};