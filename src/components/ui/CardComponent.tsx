// CardComponent.js
import React from 'react';
import { View, Text, Button, StyleSheet, Image, ImageSourcePropType, TouchableOpacity } from 'react-native';

interface CardTypes {
    title: string;
    subTitle: string;
    buttonText: string;
    buttonColor: string;
    bgColor: string;
    bgBorderColor: string;
    textColor: string;
    imageSource: ImageSourcePropType;
    onPress: () => void
}


const CardComponent = ({ title, subTitle, buttonText, buttonColor, bgColor, bgBorderColor, textColor, imageSource, onPress }: CardTypes) => {
    return (
        <View style={[styles.card, { backgroundColor: bgColor, borderColor: bgBorderColor }]}>
            {imageSource && <Image source={imageSource} style={styles.image} />}
            <Text style={[styles.title, { color: textColor }]}>{title}</Text>
            <Text style={[styles.subTitle, { color: textColor }]}>{subTitle}</Text>
            {/* <Button title={buttonText} onPress={onPress} color={buttonColor} /> */}
            <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: buttonColor }]}>
                <Text style={{ color: "white" }}>{buttonText}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 20,
        borderRadius: 5,
        borderWidth: 2,
        // borderColor: "#00BE47",
        margin: 10,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    image: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        padding: 10,
        borderRadius: 5
    }
});

export default CardComponent;
