import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { defaultTheme } from '../helpers';
export const CardBase = ({ children, containerStyle, wrapperStyle, theme = defaultTheme, ...rest }) => {
    return (React.createElement(View, { ...rest, style: StyleSheet.flatten([
            {
                backgroundColor: theme?.colors?.white,
                borderWidth: 1,
                padding: 15,
                margin: 15,
                marginBottom: 0,
                borderColor: theme?.colors?.grey5,
                ...Platform.select({
                    android: {
                        elevation: 1,
                    },
                    default: {
                        shadowColor: 'rgba(0,0,0, .2)',
                        shadowOffset: { height: 0, width: 0 },
                        shadowOpacity: 1,
                        shadowRadius: 1,
                    },
                }),
            },
            containerStyle && containerStyle,
        ]) },
        React.createElement(View, { style: StyleSheet.flatten([
                styles.wrapper,
                wrapperStyle && wrapperStyle,
            ]) }, children)));
};
const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: 'transparent',
    },
});
CardBase.displayName = 'Card';
