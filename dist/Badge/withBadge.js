import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge } from './Badge';
export const withBadge = (value, options = {}) => (WrappedComponent) => {
    const WithBadge = (props) => {
        const { bottom, hidden = false, left, containerStyle, ...badgeProps } = options;
        let { right = -16, top = -1 } = options;
        if (!value) {
            right = -3;
            top = 3;
        }
        const badgeValue = typeof value === 'function' ? value(props) : value;
        return (React.createElement(View, { style: StyleSheet.flatten([styles.container, containerStyle]) },
            React.createElement(WrappedComponent, { ...props }),
            !hidden && (React.createElement(Badge, { value: badgeValue, status: "error", containerStyle: StyleSheet.flatten([
                    styles.badgeContainer,
                    { bottom, left, right, top },
                ]), ...badgeProps }))));
    };
    WithBadge.displayName = `WithBadge(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
    return WithBadge;
};
const styles = StyleSheet.create({
    badgeContainer: {
        position: 'absolute',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
});
