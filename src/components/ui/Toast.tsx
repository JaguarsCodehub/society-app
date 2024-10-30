import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useToast } from '../../providers/ToastProvider';

const Toast: React.FC = () => {
    const { toast } = useToast();
    const opacity = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        if (toast) {
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.delay(2400),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [toast]);

    if (!toast) return null;

    return (
        <Animated.View style={[styles.container, { opacity }]}>
            <View style={[styles.toast, styles[toast.type]]}>
                <Text style={styles.text}>{toast.message}</Text>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 100,
        left: 20,
        right: 20,
        alignItems: 'center',
    },
    toast: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        maxWidth: '80%',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    success: {
        backgroundColor: '#4CAF50',
    },
    error: {
        backgroundColor: '#F44336',
    },
    info: {
        backgroundColor: '#2196F3',
    },
});

export default Toast;