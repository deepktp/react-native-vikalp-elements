import React from 'react';
import { StyleSheet, ActivityIndicator, View, } from 'react-native';
import { defaultTheme } from '../helpers';
export const DialogLoading = ({ loadingStyle, loadingProps = { size: 'large' }, theme = defaultTheme, }) => {
    return (React.createElement(View, { style: styles.loadingView },
        React.createElement(ActivityIndicator, { style: StyleSheet.flatten([styles.loading, loadingStyle]), color: loadingProps?.color ?? theme?.colors?.primary, size: loadingProps?.size ?? 'large', testID: "Dialog__Loading", ...loadingProps })));
};
const styles = StyleSheet.create({
    loading: {
        marginVertical: 20,
    },
    loadingView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
DialogLoading.displayName = 'Dialog.Loading';
