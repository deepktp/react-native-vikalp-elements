import React, { useCallback, useContext, useMemo } from 'react';
import deepmerge from 'deepmerge';
import { lightColors, darkColors } from './colors';
import { defaultSpacing, } from './theme';
export const ThemeContext = React.createContext({});
export const createTheme = (theme = {}) => {
    return {
        ...theme,
        ...deepmerge({ lightColors, darkColors, spacing: defaultSpacing }, {
            lightColors: theme.lightColors || {},
            darkColors: theme.darkColors || {},
            mode: theme.mode || 'light',
            spacing: theme.spacing || {},
            components: theme.components || {},
        }),
    };
};
const separateColors = (theme) => {
    const { darkColors: themeDarkColors = {}, lightColors: themeLightColors = {}, spacing = {}, mode, ...restTheme } = theme;
    const themeColors = mode === 'dark' ? themeDarkColors : themeLightColors;
    return {
        colors: themeColors,
        mode,
        spacing: spacing,
        components: theme.components || {},
        ...restTheme,
    };
};
export const ThemeProvider = ({ theme = createTheme({}), children }) => {
    const [themeState, setThemeState] = React.useState(theme);
    React.useEffect(() => {
        setThemeState(theme);
    }, [theme, theme.mode]);
    const updateTheme = React.useCallback((updatedTheme) => {
        setThemeState((oldTheme) => {
            const newTheme = typeof updatedTheme === 'function'
                ? updatedTheme(oldTheme)
                : updatedTheme;
            return deepmerge({ ...oldTheme }, newTheme);
        });
    }, []);
    const replaceTheme = React.useCallback((replacedTheme) => {
        setThemeState((oldTheme) => {
            const newTheme = typeof replacedTheme === 'function'
                ? replacedTheme(oldTheme)
                : replacedTheme;
            return deepmerge(createTheme({}), newTheme);
        });
    }, []);
    const ThemeContextValue = React.useMemo(() => ({
        theme: separateColors(themeState),
        updateTheme,
        replaceTheme,
    }), [themeState.mode, themeState, updateTheme, replaceTheme]);
    return (React.createElement(ThemeContext.Provider, { value: ThemeContextValue }, children));
};
export const ThemeConsumer = ThemeContext.Consumer;
export const useTheme = () => {
    return useContext(ThemeContext);
};
export const useThemeMode = () => {
    const themeContext = useContext(ThemeContext);
    const setMode = useCallback((colorMode) => {
        themeContext?.updateTheme({ mode: colorMode });
    }, [themeContext]);
    return useMemo(() => ({
        mode: themeContext?.theme?.mode,
        setMode,
    }), [setMode, themeContext?.theme?.mode]);
};
