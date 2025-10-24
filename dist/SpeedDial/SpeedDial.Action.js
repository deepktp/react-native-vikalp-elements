import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { FAB } from '../FAB/index';
export const SpeedDialAction = ({ title, titleStyle, placement, labelPressable, onPress, ...actionProps }) => {
    return (React.createElement(Pressable, { onPress: labelPressable ? onPress : undefined, style: [
            styles.action,
            placement === 'left' && {
                flexDirection: 'row-reverse',
            },
        ] },
        title && React.createElement(Text, { style: [styles.title, titleStyle] }, title),
        React.createElement(FAB, { ...actionProps, onPress: onPress, size: "small", style: [actionProps.style] })));
};
const styles = StyleSheet.create({
    title: {
        backgroundColor: 'white',
        color: 'black',
        borderRadius: 5,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginVertical: 8,
        marginHorizontal: 16,
        elevation: 2,
    },
    action: {
        marginBottom: 16,
        marginRight: 24,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});
SpeedDialAction.displayName = 'SpeedDial.Action';
