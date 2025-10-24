import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Icon } from '../Icon';
export const ListItemChevron = ({ containerStyle, ...rest }) => {
    return (React.createElement(Icon, { type: Platform.OS === 'ios' ? 'ionicon' : 'material', color: "#D1D1D6", name: Platform.OS === 'ios'
            ? 'chevron-forward-outline'
            : 'keyboard-arrow-right', size: 16, containerStyle: StyleSheet.flatten([
            { alignSelf: 'center' },
            containerStyle,
        ]), ...rest }));
};
ListItemChevron.displayName = 'ListItem.Chevron';
