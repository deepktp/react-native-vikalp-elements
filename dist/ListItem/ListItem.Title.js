import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Text } from '../Text';
const ANDROID_SECONDARY = 'rgba(0, 0, 0, 0.54)';
export const ListItemTitle = ({ style, right, children, ...rest }) => {
    return (React.createElement(Text, { testID: "listItemTitle", style: StyleSheet.flatten([
            styles.title,
            right && styles.rightTitle,
            style,
        ]), ...rest }, children));
};
const styles = StyleSheet.create({
    title: {
        backgroundColor: 'transparent',
        ...Platform.select({
            ios: {
                fontSize: 17,
            },
            default: {
                fontSize: 16,
            },
        }),
    },
    rightTitle: {
        color: ANDROID_SECONDARY,
    },
});
ListItemTitle.displayName = 'ListItem.Title';
