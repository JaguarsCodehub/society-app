import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Notification from '../../components/Notification'

const showNotification = () => {
    return (
        <View>
            <Notification />
        </View>
    )
}

export default showNotification

const styles = StyleSheet.create({})