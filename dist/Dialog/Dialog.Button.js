import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '../Button';
export const DialogButton = ({ title = 'ACTION', titleStyle, type = 'clear', ...rest }) => {
    return (React.createElement(Button, { style: { marginLeft: 5 }, title: title, titleStyle: StyleSheet.flatten([styles.buttonTitle, titleStyle]), type: type, containerStyle: {
            width: 'auto',
        }, testID: "Dialog__Button", ...rest }));
};
const styles = StyleSheet.create({
    buttonTitle: {
        fontSize: 15,
        fontWeight: '500',
    },
});
DialogButton.displayName = 'Dialog.Button';
