import React from 'react';
import { View, StyleSheet, Platform, Pressable, Modal, KeyboardAvoidingView, } from 'react-native';
import Color from 'color';
import { getBehaviorType, } from '../helpers';
export const Overlay = ({ children, backdropStyle, overlayStyle, onBackdropPress = () => null, fullScreen = false, ModalComponent = Modal, isVisible, pressableProps, onPressOut, onPressIn, onLongPress, theme, ...rest }) => (React.createElement(ModalComponent, { visible: isVisible, onRequestClose: onBackdropPress, transparent: true, ...rest },
    React.createElement(Pressable, { style: StyleSheet.flatten([styles.backdrop, backdropStyle]), onPress: onBackdropPress, testID: "RNE__Overlay__backdrop", ...pressableProps, onPressOut, onPressIn, onLongPress }),
    React.createElement(KeyboardAvoidingView, { testID: "RNE__Overlay__Container", style: styles.container, pointerEvents: "box-none", behavior: getBehaviorType },
        React.createElement(View, { testID: "RNE__Overlay", style: StyleSheet.flatten([
                styles.overlay,
                fullScreen && styles.fullscreen,
                {
                    backgroundColor: Color(theme?.colors?.white)
                        .lighten(10)
                        .rgb()
                        .toString(),
                },
                overlayStyle,
            ]) }, children))));
const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, .4)',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fullscreen: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        backgroundColor: 'white',
        borderRadius: 3,
        padding: 10,
        ...Platform.select({
            android: {
                elevation: 2,
            },
            default: {
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowOffset: { width: 0, height: 1 },
                shadowRadius: 4,
            },
        }),
    },
});
Overlay.displayName = 'Overlay';
