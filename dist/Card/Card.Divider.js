import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider } from '../Divider';
export const CardDivider = ({ style, ...rest }) => React.createElement(Divider, { style: StyleSheet.flatten([styles.divider, style]), ...rest });
const styles = StyleSheet.create({
    divider: {
        marginBottom: 15,
    },
});
CardDivider.displayName = 'Card.Divider';
