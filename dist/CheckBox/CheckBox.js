import React from 'react';
import { StyleSheet, Pressable, View, Platform, } from 'react-native';
import { Text as TextElement } from '../Text';
import { CheckBoxIcon } from './components/CheckBoxIcon';
import { fonts } from '../helpers';
import { color, defaultTheme } from '../helpers';
export const CheckBox = ({ checked = false, Component = Pressable, iconRight = false, title, titleProps = {}, center = false, right = false, containerStyle, wrapperStyle, textStyle, checkedTitle, fontFamily, theme = defaultTheme, onPress, onLongPress, disabled = false, disabledStyle, disabledTitleStyle, checkedColor = theme?.colors?.primary, ...rest }) => {
    const accessibilityState = {
        checked: !!checked,
    };
    const iconProps = {
        checked,
        onLongPress,
        checkedColor,
        ...rest,
    };
    return (React.createElement(Component, { accessibilityRole: "checkbox", accessibilityState: accessibilityState, testID: "RNE__CheckBox__Wrapper", ...rest, disabled: disabled, onLongPress: onLongPress, onPress: onPress, style: StyleSheet.flatten([
            {
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.white,
            },
            styles.container,
            containerStyle && containerStyle,
            disabled && disabledStyle,
        ]) },
        React.createElement(View, { style: StyleSheet.flatten([
                styles.wrapper,
                right && { justifyContent: 'flex-end' },
                center && { justifyContent: 'center' },
                wrapperStyle && wrapperStyle,
            ]) },
            !iconRight && (React.createElement(CheckBoxIcon, { ...iconProps, checkedColor: checkedColor })),
            React.isValidElement(title)
                ? title
                : title !== '' &&
                    title && (React.createElement(TextElement, { testID: "RNE__CheckBox__Title", style: StyleSheet.flatten([
                        {
                            marginLeft: 10,
                            marginRight: 10,
                            color: theme?.colors?.grey1,
                            ...Platform.select({
                                android: {
                                    ...fonts.android.bold,
                                },
                                default: {
                                    fontWeight: 'bold',
                                },
                            }),
                        },
                        textStyle && textStyle,
                        fontFamily && { fontFamily },
                        disabled && {
                            color: color(theme?.colors?.disabled)
                                .darken(0.3)
                                .string(),
                        },
                        disabled && disabledTitleStyle,
                    ]), ...titleProps }, checked ? checkedTitle || title : title)),
            iconRight && (React.createElement(CheckBoxIcon, { ...iconProps, checkedColor: checkedColor })))));
};
const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        margin: 5,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
    },
    containerHasTitle: {
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: '#fafafa',
        borderColor: '#ededed',
    },
});
CheckBox.displayName = 'CheckBox';
