import Color from 'color';
import React, { useCallback, useEffect, useMemo } from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View, } from 'react-native';
import { color, defaultTheme, renderNode, } from '../helpers';
import { Icon } from '../Icon';
const defaultLoadingProps = (type, theme) => ({
    color: type === 'solid' ? 'white' : theme?.colors?.primary,
    size: 'small',
});
const positionStyle = {
    top: 'column',
    bottom: 'column-reverse',
    left: 'row',
    right: 'row-reverse',
};
export const Button = ({ TouchableComponent, containerStyle, onPress = () => { }, buttonStyle, type = 'solid', loading = false, loadingStyle, loadingProps: passedLoadingProps, size = 'md', radius = 'xs', uppercase = false, color: buttonColor = 'primary', title = '', titleProps, titleStyle: passedTitleStyle, icon, iconContainerStyle, iconRight = false, disabled = false, disabledStyle, disabledTitleStyle, raised = false, linearGradientProps, ViewComponent = View, theme = defaultTheme, iconPosition = 'left', children = title, ...rest }) => {
    useEffect(() => {
        if (linearGradientProps && !ViewComponent) {
            console.warn("You need to pass a ViewComponent to use linearGradientProps !\nExample: ViewComponent={require('react-native-linear-gradient')}");
        }
    });
    const handleOnPress = useCallback((evt) => {
        if (!loading && !disabled) {
            onPress(evt);
        }
    }, [loading, onPress, disabled]);
    const TouchableComponentInternal = TouchableComponent ||
        Platform.select({
            android: linearGradientProps ? TouchableOpacity : TouchableNativeFeedback,
            default: TouchableOpacity,
        });
    const titleStyle = useMemo(() => StyleSheet.flatten([
        {
            color: type === 'solid' ? 'white' : theme?.colors?.primary,
        },
        uppercase && { textTransform: 'uppercase' },
        styles.title,
        passedTitleStyle,
        disabled && {
            color: color(theme?.colors?.disabled).darken(0.3).string(),
        },
        disabled && disabledTitleStyle,
    ]), [
        disabled,
        disabledTitleStyle,
        passedTitleStyle,
        theme?.colors?.disabled,
        theme?.colors?.primary,
        type,
        uppercase,
    ]);
    const background = Platform.OS === 'android' && Platform.Version >= 21
        ? TouchableNativeFeedback.Ripple(Color(titleStyle?.color?.toString()).alpha(0.32).rgb().string(), false)
        : undefined;
    const loadingProps = useMemo(() => ({
        ...defaultLoadingProps(type, theme),
        ...passedLoadingProps,
    }), [passedLoadingProps, theme, type]);
    const accessibilityState = useMemo(() => ({
        disabled: !!disabled,
        busy: !!loading,
    }), [disabled, loading]);
    const borderRadius = useMemo(() => Number(theme.spacing[radius] ?? (radius || '0')) || 0, [radius, theme]);
    return (React.createElement(View, { style: [
            styles.container,
            { borderRadius },
            containerStyle,
            raised && !disabled && type !== 'clear' && styles.raised,
        ], testID: "RNE_BUTTON_WRAPPER" },
        React.createElement(TouchableComponentInternal, { onPress: handleOnPress, delayPressIn: 0, activeOpacity: 0.3, accessibilityRole: "button", accessibilityState: accessibilityState, disabled: disabled, background: background, ...rest },
            React.createElement(ViewComponent, { ...linearGradientProps, style: StyleSheet.flatten([
                    styles.button,
                    {
                        padding: theme.spacing[size],
                        paddingHorizontal: theme.spacing[size] + 2,
                        borderRadius,
                        flexDirection: positionStyle[iconRight ? 'right' : iconPosition] || 'row',
                        backgroundColor: type === 'solid'
                            ? theme.colors[buttonColor] ||
                                buttonColor ||
                                theme?.colors?.primary
                            : 'transparent',
                        borderColor: theme?.colors?.primary,
                        borderWidth: type === 'outline' ? StyleSheet.hairlineWidth : 0,
                    },
                    buttonStyle,
                    disabled &&
                        type === 'solid' && {
                        backgroundColor: theme?.colors?.disabled,
                    },
                    disabled &&
                        type === 'outline' && {
                        borderColor: color(theme?.colors?.disabled)
                            .darken(0.3)
                            .string(),
                    },
                    disabled && disabledStyle,
                ]) },
                loading && (React.createElement(ActivityIndicator, { style: StyleSheet.flatten([styles.loading, loadingStyle]), color: loadingProps.color, size: loadingProps.size, ...loadingProps })),
                !loading &&
                    icon &&
                    renderNode(Icon, icon, {
                        containerStyle: StyleSheet.flatten([
                            styles.iconContainer,
                            iconContainerStyle,
                        ]),
                    }),
                !loading &&
                    React.Children.toArray(children).map((child, index) => (React.createElement(React.Fragment, { key: index }, typeof child === 'string'
                        ? renderNode(Text, child, {
                            style: {
                                ...titleStyle,
                            },
                            ...titleProps,
                        })
                        : child)))))));
};
const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: defaultTheme.spacing.md,
        paddingHorizontal: defaultTheme.spacing.lg,
    },
    container: {
        overflow: 'hidden',
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 1,
        ...Platform.select({
            android: {
                fontFamily: 'sans-serif-medium',
            },
            default: {
                fontSize: 18,
            },
        }),
    },
    iconContainer: {
        marginHorizontal: 5,
    },
    raised: {
        backgroundColor: '#fff',
        overflow: 'visible',
        ...Platform.select({
            android: {
                elevation: 4,
            },
            default: {
                shadowColor: 'rgba(0,0,0, .4)',
                shadowOffset: { height: 1, width: 1 },
                shadowOpacity: 1,
                shadowRadius: 1,
            },
        }),
    },
    loading: {
        marginVertical: 2,
    },
});
Button.displayName = 'Button';
