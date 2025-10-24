import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '../../Button';
import { defaultTheme } from '../../helpers';
import { Icon } from '../../Icon';
export const PricingButton = ({ title, buttonStyle, color, titleStyle, onButtonPress, icon, theme = defaultTheme, ...buttonProps }) => {
    return (React.createElement(Button, { testID: "RNE__PricingButton", title: title, buttonStyle: StyleSheet.flatten([
            styles.button,
            buttonStyle,
            { backgroundColor: theme.colors[color] || color },
        ]), titleStyle: titleStyle, onPress: onButtonPress, icon: React.isValidElement(icon) ? (icon) : typeof icon === 'string' ? (React.createElement(Icon, { name: icon, size: 15, color: "white" })) : (React.createElement(Icon, { ...icon })), ...buttonProps }));
};
const styles = StyleSheet.create({
    button: {
        marginTop: 15,
        marginBottom: 10,
    },
});
