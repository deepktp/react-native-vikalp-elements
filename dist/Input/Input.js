import React from 'react';
import { Text, View, TextInput, Animated, Easing, Platform, StyleSheet, } from 'react-native';
import { renderNode, patchWebProps, defaultTheme } from '../helpers';
import { fonts } from '../helpers';
import { Icon } from '../Icon';
const renderText = (content, defaultProps, style) => renderNode(Text, content, {
    ...defaultProps,
    style: StyleSheet.flatten([style, defaultProps && defaultProps.style]),
});
export class Input extends React.Component {
    static displayName = 'Input';
    input;
    shakeAnimationValue = new Animated.Value(0);
    focus() {
        this.input.focus();
    }
    blur() {
        this.input.blur();
    }
    clear() {
        this.input.clear();
    }
    isFocused() {
        return this.input.isFocused();
    }
    setNativeProps(nativeProps) {
        this.input.setNativeProps(nativeProps);
    }
    shake = () => {
        const { shakeAnimationValue } = this;
        shakeAnimationValue.setValue(0);
        Animated.timing(shakeAnimationValue, {
            duration: 375,
            toValue: 3,
            easing: Easing.bounce,
            useNativeDriver: true,
        }).start();
    };
    render() {
        const { containerStyle, disabled, disabledInputStyle, inputContainerStyle, leftIcon, leftIconContainerStyle, rightIcon, rightIconContainerStyle, InputComponent = TextInput, inputStyle, ErrorComponent = Text, errorProps, errorStyle, errorMessage, label, labelStyle, labelProps, theme = defaultTheme, renderErrorMessage = true, style, ...attributes } = this.props;
        const translateX = this.shakeAnimationValue.interpolate({
            inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
            outputRange: [0, -15, 0, 15, 0, -15, 0],
        });
        const hideErrorMessage = !renderErrorMessage && !errorMessage;
        return (React.createElement(View, { testID: "RNE__Input__view-wrapper", style: StyleSheet.flatten([styles.container, containerStyle]) },
            renderText(label, { style: labelStyle, ...labelProps }, {
                fontSize: 16,
                color: theme?.colors?.grey3,
                ...Platform.select({
                    android: {
                        ...fonts.android.bold,
                    },
                    default: {
                        fontWeight: 'bold',
                    },
                }),
            }),
            React.createElement(Animated.View, { style: StyleSheet.flatten([
                    {
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        alignItems: 'center',
                        borderColor: theme?.colors?.grey3,
                    },
                    inputContainerStyle,
                    { transform: [{ translateX }] },
                ]) },
                leftIcon && (React.createElement(View, { style: StyleSheet.flatten([
                        styles.iconContainer,
                        leftIconContainerStyle,
                    ]) }, renderNode(Icon, leftIcon))),
                React.createElement(InputComponent, { testID: "RNE__Input__text-input", underlineColorAndroid: "transparent", editable: !disabled, ref: (ref) => {
                        this.input = ref;
                    }, style: StyleSheet.flatten([
                        {
                            color: theme?.colors?.black,
                            fontSize: 18,
                            flex: 1,
                            minHeight: 40,
                        },
                        inputStyle,
                        disabled && styles.disabledInput,
                        disabled && disabledInputStyle,
                        style,
                    ]), placeholderTextColor: theme?.colors?.grey3, ...patchWebProps(attributes) }),
                rightIcon && (React.createElement(View, { style: StyleSheet.flatten([
                        styles.iconContainer,
                        rightIconContainerStyle,
                    ]) }, renderNode(Icon, rightIcon)))),
            React.createElement(ErrorComponent, { ...errorProps, style: StyleSheet.flatten([
                    {
                        margin: 5,
                        fontSize: 12,
                        color: theme?.colors?.error,
                    },
                    errorStyle && errorStyle,
                    hideErrorMessage && {
                        height: 0,
                        margin: 0,
                        padding: 0,
                    },
                ]) }, errorMessage)));
    }
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10,
    },
    disabledInput: {
        opacity: 0.5,
    },
    iconContainer: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 4,
        marginVertical: 4,
    },
});
