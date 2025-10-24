import React from 'react';
import { Platform, StyleSheet, Pressable, View, } from 'react-native';
import { PadView } from './components/PadView';
import { defaultTheme } from '../helpers';
export const ListItemBase = (props) => {
    const { containerStyle, onPress, onLongPress, Component = onPress || onLongPress ? Pressable : View, disabled, disabledStyle, bottomDivider, topDivider, pad = 16, linearGradientProps, ViewComponent = View, theme = defaultTheme, children, ...rest } = props;
    if (props.linearGradientProps && !props.ViewComponent) {
        console.warn("You need to pass a ViewComponent to use linearGradientProps !\nExample: ViewComponent={require('react-native-linear-gradient')}");
    }
    return (React.createElement(Component, { ...rest, onPress: onPress, onLongPress: onLongPress, disabled: disabled },
        React.createElement(PadView, { Component: ViewComponent, ...linearGradientProps, style: StyleSheet.flatten([
                {
                    ...Platform.select({
                        ios: {
                            padding: 14,
                        },
                        default: {
                            padding: 16,
                        },
                    }),
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: theme?.colors?.background,
                    borderColor: theme?.colors?.divider,
                },
                topDivider && { borderTopWidth: StyleSheet.hairlineWidth },
                bottomDivider && { borderBottomWidth: StyleSheet.hairlineWidth },
                containerStyle,
                disabled && disabledStyle,
            ]), pad: pad }, children)));
};
ListItemBase.displayName = 'ListItem';
