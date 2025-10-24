import React from 'react';
import { View, StyleSheet, Text, } from 'react-native';
import { defaultTheme } from '../helpers';
export const Divider = ({ color, inset = false, insetType = 'left', orientation = 'horizontal', style, subHeader, subHeaderStyle, width, ...rest }) => (React.createElement(React.Fragment, null,
    React.createElement(View, { testID: "RNE__Divider", style: StyleSheet.flatten([
            styles.divider,
            style,
            inset &&
                (insetType === 'left'
                    ? styles.leftInset
                    : insetType === 'right'
                        ? styles.rightInset
                        : { ...styles.leftInset, ...styles.rightInset }),
            orientation === 'vertical' && styles.vertical,
            width &&
                !isNaN(width) &&
                (orientation === 'horizontal'
                    ? { borderBottomWidth: width }
                    : { borderRightWidth: width }),
            color &&
                (orientation === 'horizontal'
                    ? { borderBottomColor: color }
                    : { borderRightColor: color }),
        ]), ...rest }),
    subHeader && orientation === 'horizontal' ? (React.createElement(Text, { style: StyleSheet.flatten([
            styles.subHeader,
            subHeaderStyle,
            inset && styles.leftInset,
        ]) }, subHeader)) : null));
const styles = StyleSheet.create({
    divider: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: defaultTheme?.colors?.divider,
    },
    leftInset: {
        marginLeft: 72,
    },
    rightInset: {
        marginRight: 72,
    },
    vertical: {
        borderRightWidth: StyleSheet.hairlineWidth,
        borderRightColor: defaultTheme?.colors?.divider,
        height: 'auto',
        alignSelf: 'stretch',
    },
    subHeader: {
        includeFontPadding: false,
    },
});
Divider.displayName = 'Divider';
