import { ToastAndroid } from "react-native";

export const showToastWithGravityAndOffset = (msg: string) => {
    ToastAndroid.showWithGravityAndOffset(
        msg,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        50,
        50
    );
};