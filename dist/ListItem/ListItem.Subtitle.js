import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Text } from '../Text';
const ANDROID_SECONDARY = 'rgba(0, 0, 0, 0.54)';
export const ListItemSubtitle = ({ style, right, children, ...props }) => {
    return (React.createElement(Text, { testID: "listItemTitle", style: StyleSheet.flatten([
            styles.subtitle,
            right && styles.rightSubtitle,
            style,
        ]), ...props }, children));
};
const styles = StyleSheet.create({
    subtitle: {
        backgroundColor: 'transparent',
        ...Platform.select({
            ios: {
                fontSize: 15,
            },
            default: {
                fontSize: 14,
            },
        }),
    },
    rightSubtitle: {
        color: ANDROID_SECONDARY,
    },
});
ListItemSubtitle.displayName = 'ListItem.Subtitle';
