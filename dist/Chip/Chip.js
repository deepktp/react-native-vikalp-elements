import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Button } from '../Button';
export const Chip = ({ titleStyle, buttonStyle, onPress, ...rest }) => {
    return (React.createElement(Button, { titleStyle: StyleSheet.flatten([
            { fontSize: 14, paddingHorizontal: 2 },
            titleStyle,
        ]), radius: 30, buttonStyle: buttonStyle, ...(onPress === undefined
            ? {
                TouchableComponent: TouchableWithoutFeedback,
            }
            : { onPress }), ...rest }));
};
Chip.displayName = 'Chip';
