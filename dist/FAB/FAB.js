import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import { Button } from '../Button';
import { defaultTheme } from '../helpers';
export const FAB = ({ color, size = 'large', visible = true, disabled, upperCase, theme = defaultTheme, style, titleStyle, buttonStyle, containerStyle, iconContainerStyle, placement, ...rest }) => {
    const { current: animation } = React.useRef(new Animated.Value(Number(visible)));
    React.useEffect(() => {
        Animated.timing(animation, {
            toValue: Number(visible),
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [animation, visible]);
    return (React.createElement(Animated.View, { style: StyleSheet.flatten([
            {
                opacity: animation,
                transform: [{ scale: animation }],
            },
            styles.content,
            placement && {
                [placement]: 0,
                position: 'absolute',
                margin: 16,
                bottom: 0,
            },
            style,
        ]) },
        React.createElement(Button, { buttonStyle: StyleSheet.flatten([
                rest.title
                    ? size === 'small'
                        ? styles.smallExtendedLabel
                        : styles.extendedLabel
                    : size === 'small'
                        ? styles.smallFAB
                        : styles.largeFAB,
                {
                    backgroundColor: color || theme?.colors?.secondary,
                },
                buttonStyle,
            ]), iconContainerStyle: [
                rest.title
                    ? {}
                    : size === 'small'
                        ? styles.smallFAB
                        : styles.largeFAB,
                iconContainerStyle,
            ], containerStyle: StyleSheet.flatten([
                styles.container,
                disabled && styles.disabled,
                containerStyle,
            ]), titleStyle: [
                styles.label,
                { color: theme?.colors?.white },
                upperCase && styles.upperCaseLabel,
                titleStyle,
            ], ...rest, disabled, theme })));
};
const styles = StyleSheet.create({
    container: {
        elevation: 4,
        borderRadius: 28,
    },
    largeFAB: {
        height: 56,
        width: 56,
        padding: 16,
    },
    smallFAB: {
        height: 40,
        width: 40,
        padding: 8,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 28,
    },
    label: {
        marginHorizontal: 8,
    },
    upperCaseLabel: {
        textTransform: 'uppercase',
    },
    extendedLabel: {
        height: 48,
        paddingHorizontal: 16,
    },
    smallExtendedLabel: {
        height: 40,
        paddingHorizontal: 12,
    },
    disabled: {
        elevation: 0,
    },
});
FAB.displayName = 'FAB';
