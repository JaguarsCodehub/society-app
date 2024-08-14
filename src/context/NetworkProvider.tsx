import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { View, Text, StyleSheet } from 'react-native';

interface NetworkContextProps {
    isConnected: boolean;
}

const NetworkContext = createContext<NetworkContextProps>({ isConnected: true });

interface NetworkProviderProps {
    children: ReactNode;
}

export const NetworkProvider: React.FC<NetworkProviderProps> = ({ children }) => {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected ?? false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <NetworkContext.Provider value={{ isConnected }}>
            <View style={{ flex: 1 }}>
                {!isConnected && (
                    <View style={styles.offlineContainer}>
                        <Text style={styles.offlineText}>No Internet Connection</Text>
                    </View>
                )}
                {children}
            </View>
        </NetworkContext.Provider>
    );
};

const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: '#b52424',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        position: 'absolute',
        top: 0,
    },
    offlineText: { color: '#fff' },
});

export const useNetwork = (): NetworkContextProps => useContext(NetworkContext);
