import React from 'react';
import { Platform, StatusBar, StyleSheet, View, ImageBackground, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { defaultTheme } from '../helpers';
import { Children } from './components/HeaderChildren';
export const Header = ({ hideStatusBar = false, statusBarProps, leftComponent, centerComponent, rightComponent, leftContainerStyle, centerContainerStyle, rightContainerStyle, backgroundColor, backgroundImage, backgroundImageStyle, containerStyle, placement = 'center', barStyle, children = [], linearGradientProps, ViewComponent = linearGradientProps || !backgroundImage
    ? View
    : ImageBackground, theme = defaultTheme, elevated, edges = ['left', 'top', 'right'], ...rest }) => {
    React.useEffect(() => {
        if (linearGradientProps && !ViewComponent) {
            console.warn("You need to pass a ViewComponent to use linearGradientProps !\nExample: ViewComponent={require('react-native-linear-gradient')}");
        }
    });
    return (React.createElement(React.Fragment, null,
        !hideStatusBar && (React.createElement(StatusBar, { barStyle: barStyle, translucent: true, backgroundColor: backgroundColor || theme?.colors?.primary, ...statusBarProps })),
        React.createElement(ViewComponent, { testID: "headerContainer", ...rest, style: StyleSheet.flatten([
                {
                    borderBottomColor: '#f2f2f2',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    backgroundColor: theme?.colors?.primary,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                },
                backgroundColor && { backgroundColor },
                elevated && styles.elevatedHeader,
                containerStyle,
            ]), source: backgroundImage, imageStyle: backgroundImageStyle, ...linearGradientProps },
            React.createElement(SafeAreaView, { edges: edges, style: styles.headerSafeView },
                React.createElement(Children, { style: StyleSheet.flatten([
                        placement === 'center' && styles.rightLeftContainer,
                        leftContainerStyle,
                    ]), placement: "left" }, (React.isValidElement(children) && children) ||
                    children[0] ||
                    leftComponent),
                React.createElement(Children, { style: StyleSheet.flatten([
                        styles.centerContainer,
                        placement !== 'center' && {
                            paddingHorizontal: Platform.select({
                                android: 16,
                                default: 15,
                            }),
                        },
                        centerContainerStyle,
                    ]), placement: placement }, children[1] || centerComponent),
                React.createElement(Children, { style: StyleSheet.flatten([
                        placement === 'center' && styles.rightLeftContainer,
                        rightContainerStyle,
                    ]), placement: "right" }, children[2] || rightComponent)))));
};
const styles = StyleSheet.create({
    headerSafeView: {
        width: '100%',
        flexDirection: 'row',
    },
    centerContainer: {
        flex: 3,
    },
    rightLeftContainer: {
        flex: 1,
    },
    elevatedHeader: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.6,
        shadowRadius: 8.0,
        elevation: 24,
    },
});
Header.displayName = 'Header';
