import React from 'react';
import { Text as NativeText, StyleSheet, Platform, } from 'react-native';
import { fonts } from '../helpers';
import { defaultTheme, patchWebProps } from '../helpers';
import normalize from '../helpers/normalizeText';
export const Text = React.forwardRef(({ style = {}, h1 = false, h2 = false, h3 = false, h4 = false, h1Style = {}, h2Style = {}, h3Style = {}, h4Style = {}, children = '', theme = defaultTheme, ...rest }, ref) => {
    return (React.createElement(NativeText, { ref: ref, accessibilityRole: "text", style: StyleSheet.flatten([
            {
                ...Platform.select({
                    android: {
                        ...fonts.android.regular,
                    },
                }),
                color: theme?.colors?.black,
            },
            style,
            (h1 || h2 || h3 || h4) && styles.bold,
            h1 && StyleSheet.flatten([{ fontSize: normalize(40) }, h1Style]),
            h2 && StyleSheet.flatten([{ fontSize: normalize(34) }, h2Style]),
            h3 && StyleSheet.flatten([{ fontSize: normalize(28) }, h3Style]),
            h4 && StyleSheet.flatten([{ fontSize: normalize(22) }, h4Style]),
        ]), ...patchWebProps(rest) }, children));
});
const styles = StyleSheet.create({
    bold: {
        ...Platform.select({
            android: {
                ...fonts.android.bold,
            },
        }),
    },
});
Text.displayName = 'Text';
