import Color from 'color';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '../Button';
import { defaultTheme } from '../helpers';
export const TabItem = ({ active, theme = defaultTheme, _parentProps = {}, titleStyle = _parentProps.titleStyle, containerStyle = _parentProps.containerStyle, buttonStyle = _parentProps.buttonStyle, iconPosition = _parentProps.iconPosition || 'top', dense = _parentProps.dense, iconContainerStyle, variant, title, icon, ...rest }) => {
    const activeProp = React.useCallback((prop) => (typeof prop === 'function' ? prop(active) : prop), [active]);
    return (React.createElement(Button, { accessibilityRole: "tab", accessibilityState: { selected: active }, accessibilityValue: typeof title === 'string' ? { text: title } : undefined, buttonStyle: [styles.buttonStyle, activeProp(buttonStyle)], titleStyle: [
            !dense && styles.titleStyle,
            {
                color: variant === 'primary' ? 'white' : theme?.colors?.secondary,
                paddingVertical: !dense && !icon ? 8 : 2,
            },
            activeProp(titleStyle),
        ], containerStyle: [
            styles.containerStyle,
            variant === 'primary' && {
                backgroundColor: active
                    ? Color(theme?.colors?.primary).darken(0.05).rgb().toString()
                    : 'transparent',
            },
            activeProp(containerStyle),
        ], iconContainerStyle: activeProp(iconContainerStyle), icon: activeProp(icon), iconPosition: iconPosition, title: title, ...rest }));
};
const styles = StyleSheet.create({
    buttonStyle: {
        borderRadius: 0,
        backgroundColor: 'transparent',
    },
    titleStyle: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    containerStyle: {
        borderRadius: 0,
    },
});
TabItem.displayName = 'Tab.Item';
