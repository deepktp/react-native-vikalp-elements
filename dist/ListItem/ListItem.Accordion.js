import React from 'react';
import { Animated } from 'react-native';
import { ListItemBase } from './ListItem';
import { ListItemContent } from './ListItem.Content';
import { Icon } from '../Icon';
import { renderNode } from '../helpers';
export const ListItemAccordion = ({ children, isExpanded = false, icon = React.createElement(Icon, { name: 'chevron-down', type: "material-community" }), expandIcon, content, leftRotate = false, noRotation, noIcon, animation = {
    duration: 350,
    type: 'timing',
}, ...rest }) => {
    const transition = React.useRef(new Animated.Value(0));
    const startAnimation = React.useCallback(() => {
        if (typeof animation !== 'boolean') {
            Animated[animation.type || 'timing'](transition.current, {
                toValue: Number(isExpanded),
                useNativeDriver: true,
                duration: animation.duration || 350,
            }).start();
        }
    }, [isExpanded, animation]);
    React.useEffect(() => {
        startAnimation();
    }, [isExpanded, startAnimation]);
    const iconAnimation = React.useMemo(() => ({
        transform: [
            {
                rotate: noRotation
                    ? '0deg'
                    : transition.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', leftRotate ? '180deg' : '-180deg'],
                    }),
            },
        ],
    }), [leftRotate, noRotation]);
    return (React.createElement(React.Fragment, null,
        React.createElement(ListItemBase, { ...rest },
            React.isValidElement(content) ? content : React.createElement(ListItemContent, null),
            !noIcon && (React.createElement(Animated.View, { testID: "RNE__ListItem__Accordion__Icon", style: iconAnimation }, renderNode(Icon, isExpanded ? expandIcon ?? icon : icon)))),
        isExpanded && (React.createElement(Animated.View, { testID: "RNE__ListItem__Accordion__Children", style: {
                opacity: transition.current,
            } }, children))));
};
ListItemAccordion.displayName = 'ListItem.Accordion';
