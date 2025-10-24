import React, { useMemo } from 'react';
import { Modal, StyleSheet, Pressable, ScrollView, Animated, Easing, } from 'react-native';
import { SafeAreaView, } from 'react-native-safe-area-context';
import useBottomSheetAnimationConfig from './useBottomSheetAnimationConfig';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export const BottomSheet = ({ containerStyle, backdropStyle, onBackdropPress = () => null, isVisible = false, modalProps = {}, children, scrollViewProps = {}, animationDuration = 300, animationType = 'slide', easing = Easing.elastic(0.7), ...rest }) => {
    const { isVisibleWithAnimationDelay, translateYValue, fadeValue, onContentContainerLayout, contentContainerHeight, } = useBottomSheetAnimationConfig({
        animationDuration,
        isVisible,
        animationType: modalProps.animationType || animationType,
        easing,
    });
    const contentContainerStyle = useMemo(() => {
        if (animationType === 'slide') {
            return {
                transform: [
                    {
                        translateY: translateYValue,
                    },
                ],
            };
        }
        else if (animationType === 'fade') {
            return { opacity: fadeValue };
        }
        else {
            return null;
        }
    }, [animationType, fadeValue, translateYValue]);
    return (React.createElement(Modal, { onRequestClose: onBackdropPress, transparent: true, visible: isVisibleWithAnimationDelay, ...modalProps, animationType: "none" },
        React.createElement(SafeAreaView, { style: StyleSheet.flatten([
                styles.safeAreaView,
                containerStyle && containerStyle,
                { opacity: contentContainerHeight ? 1 : 0 },
            ]), pointerEvents: "box-none", ...rest },
            React.createElement(AnimatedPressable, { onPress: onBackdropPress, style: [
                    StyleSheet.absoluteFill,
                    styles.backdrop,
                    backdropStyle,
                    { opacity: fadeValue },
                ], testID: "RNE__Overlay__backdrop" }),
            React.createElement(Animated.View, { onLayout: onContentContainerLayout, style: contentContainerStyle },
                React.createElement(ScrollView, { ...scrollViewProps }, children)))));
};
const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        flexDirection: 'column-reverse',
    },
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
});
BottomSheet.displayName = 'BottomSheet';
