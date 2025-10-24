import React from 'react';
import { View, Animated, Platform, } from 'react-native';
import Color from 'color';
import { defaultTheme } from '../helpers';
export const LinearProgress = ({ value, variant = value === undefined ? 'indeterminate' : 'determinate', color = 'secondary', style, theme = defaultTheme, trackColor, animation = { duration: 2000 }, ...rest }) => {
    const [width, setWidth] = React.useState(0);
    const { current: transition } = React.useRef(new Animated.Value(0));
    const intermediate = React.useRef(null);
    const startAnimation = React.useCallback(() => {
        if (variant === 'indeterminate') {
            intermediate.current = Animated.timing(transition, {
                duration: typeof animation !== 'boolean' ? animation.duration : 2000,
                toValue: 1,
                useNativeDriver: true,
                isInteraction: false,
            });
            transition.setValue(0);
            if (intermediate.current) {
                Animated.loop(intermediate.current).start();
            }
        }
        else {
            Animated.timing(transition, {
                duration: typeof animation !== 'boolean' ? animation.duration : 1000,
                toValue: value || 0,
                useNativeDriver: Platform.OS !== 'web',
                isInteraction: false,
            }).start();
        }
    }, [variant, transition, animation, value]);
    const tintColor = color === 'secondary' || color === 'primary'
        ? theme?.colors?.[color]
        : Color(color).rgb().string() || theme?.colors?.secondary;
    const trackTintColor = trackColor || Color(tintColor).alpha(0.4).rgb().string();
    React.useEffect(() => {
        if (animation) {
            startAnimation();
        }
    }, [animation, startAnimation]);
    return (React.createElement(View, { testID: "RNE__LinearProgress_Bar", accessible: true, accessibilityRole: "progressbar", accessibilityValue: {
            now: Math.floor(clamp(value)),
            min: 0,
            max: 1,
        }, ...rest, onLayout: (e) => {
            setWidth(e.nativeEvent.layout.width);
        }, style: [
            {
                height: 4,
                overflow: 'hidden',
                width: '100%',
                backgroundColor: trackTintColor,
                position: 'relative',
            },
            style,
        ] }, animation ? (React.createElement(Animated.View, { testID: "RNE__LinearProgress_Progress", style: {
            transform: [
                {
                    translateX: transition.interpolate(variant === 'indeterminate'
                        ? {
                            inputRange: [0, 1],
                            outputRange: [-width, 0.5 * width],
                        }
                        : {
                            inputRange: [0, 1],
                            outputRange: [-0.5 * width, 0],
                        }),
                },
                {
                    scaleX: transition.interpolate(variant === 'indeterminate'
                        ? {
                            inputRange: [0, 0.5, 1],
                            outputRange: [0.0001, 1, 0.001],
                        }
                        : {
                            inputRange: [0, 1],
                            outputRange: [0.0001, 1],
                        }),
                },
            ],
            backgroundColor: tintColor,
            flex: 1,
        } })) : (React.createElement(View, { testID: "RNE__LinearProgress_Progress", style: {
            flex: 1,
            width: width * clamp(value || 0),
            backgroundColor: tintColor,
        } }))));
};
LinearProgress.displayName = 'LinearProgress';
export const clamp = (value) => Math.max(0, Math.min(value, 1)) || 0;
