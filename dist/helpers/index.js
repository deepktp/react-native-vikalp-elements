import { Platform, Dimensions } from 'react-native';
import color from 'color';
import renderNode from './renderNode';
import getIconType, { registerCustomIconType } from './getIconType';
import normalizeText from './normalizeText';
import { lightColors, darkColors } from './colors';
const Screen = Dimensions.get('window');
const ScreenWidth = Screen.width;
const ScreenHeight = Screen.height;
const isIOS = Platform.OS === 'ios';
const getBehaviorType = Platform.OS === 'ios' ? 'padding' : 'height';
export const defaultSpacing = { xs: 2, sm: 4, md: 8, lg: 12, xl: 24 };
export const defaultTheme = {
    colors: lightColors,
    spacing: defaultSpacing,
};
export const androidRipple = (rippleColor) => {
    return {
        borderless: false,
        color: rippleColor,
        radius: -5,
    };
};
export const patchWebProps = ({ updateTheme, replaceTheme, onClear, ...rest }) => {
    return rest;
};
export { renderNode, getIconType, normalizeText, ScreenWidth, ScreenHeight, isIOS, lightColors, darkColors, color, getBehaviorType, registerCustomIconType, };
export { default as BackgroundImage } from './BackgroundImage';
export { default as fonts } from './fonts';
export { makeStyles } from './makeStyles';
