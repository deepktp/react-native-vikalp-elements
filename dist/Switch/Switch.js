import React, { useMemo } from 'react';
import { Switch as NativeSwitch, Platform, } from 'react-native';
import { defaultTheme } from '../helpers';
export const Switch = ({ value = false, disabled = false, onValueChange, color = 'primary', style, theme = defaultTheme, ...rest }) => {
    const switchColor = useMemo(() => theme?.colors[color] || color || theme?.colors.primary, [color, theme?.colors]);
    const trackColor = useMemo(() => Platform.select({
        ios: switchColor,
        default: disabled ? theme?.colors.disabled : switchColor,
    }), [disabled, switchColor, theme?.colors.disabled]);
    const thumbTintColor = useMemo(() => Platform.select({
        ios: undefined,
        default: disabled ? theme?.colors?.disabled || '#fff' : switchColor,
    }), [disabled, switchColor, theme?.colors?.disabled]);
    const props = useMemo(() => Platform.select({
        web: {
            activeTrackColor: trackColor,
            activeThumbColor: switchColor,
        },
        default: {
            trackColor: {
                true: trackColor,
                false: disabled ? theme?.colors?.disabled : '',
            },
        },
    }), [trackColor, switchColor, disabled, theme.colors.disabled]);
    return (React.createElement(NativeSwitch, { testID: "RNE__SWITCH", value: value, accessibilityState: {
            checked: value,
            disabled,
        }, disabled: disabled, thumbColor: thumbTintColor, onValueChange: disabled ? undefined : onValueChange, style: style, ...props, ...rest }));
};
Switch.displayName = 'Switch';
