import React from 'react';
import { StyleSheet } from 'react-native';
import { Overlay } from '../Overlay';
export const DialogBase = ({ children, overlayStyle, onBackdropPress, isVisible, ...rest }) => {
    return (React.createElement(Overlay, { isVisible: isVisible, onBackdropPress: onBackdropPress, overlayStyle: StyleSheet.flatten([styles.dialog, overlayStyle]), testID: "Internal__Overlay", ...rest }, children));
};
const styles = StyleSheet.create({
    dialog: {
        width: '75%',
        padding: 20,
    },
    buttonView: {
        marginTop: 10,
        marginRight: -35,
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
    },
});
DialogBase.displayName = 'Dialog';
