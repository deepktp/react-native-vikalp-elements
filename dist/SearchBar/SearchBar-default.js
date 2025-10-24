import React, { useState, useRef, forwardRef, useImperativeHandle, } from 'react';
import { ActivityIndicator, StyleSheet, View, } from 'react-native';
import { defaultTheme, renderNode } from '../helpers';
import { Input } from '../Input';
import { Icon } from '../Icon';
const defaultSearchIcon = (theme) => ({
    type: 'material',
    size: 18,
    name: 'search',
    color: theme?.colors?.grey3,
});
const defaultClearIcon = (theme) => ({
    type: 'material',
    size: 18,
    name: 'clear',
    color: theme?.colors?.grey3,
});
const SearchBarDefault = forwardRef((props, ref) => {
    const { theme = defaultTheme, value = '', loadingProps = {}, showLoading = false, lightTheme = false, round = false, onClear = () => null, onFocus = () => null, onBlur = () => null, onChangeText = () => null, clearIcon = defaultClearIcon(theme), containerStyle, searchIcon = defaultSearchIcon(theme), leftIconContainerStyle, rightIconContainerStyle, inputContainerStyle, inputStyle, placeholderTextColor = theme?.colors?.grey3, ...attributes } = props;
    const [isEmpty, setIsEmpty] = useState(value === '');
    const inputRef = useRef(null);
    useImperativeHandle(ref, () => ({
        focus: () => inputRef.current?.focus(),
        blur: () => inputRef.current?.blur(),
        clear: () => {
            inputRef.current?.clear();
            handleChangeText('');
            onClear();
        },
        cancel: () => { },
    }));
    const handleFocus = (event) => {
        onFocus(event);
        setIsEmpty(value === '');
    };
    const handleBlur = (event) => {
        onBlur(event);
    };
    const handleChangeText = (text) => {
        onChangeText(text);
        setIsEmpty(text === '');
    };
    const { style: loadingStyle, ...otherLoadingProps } = loadingProps;
    return (React.createElement(View, { testID: "RNE__SearchBar-wrapper", style: StyleSheet.flatten([
            {
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderBottomColor: '#000',
                borderTopColor: '#000',
                padding: 8,
                backgroundColor: theme?.colors?.grey0,
            },
            lightTheme && {
                borderTopColor: '#e1e1e1',
                borderBottomColor: '#e1e1e1',
                backgroundColor: theme?.colors?.grey5,
            },
            containerStyle,
        ]) },
        React.createElement(Input, { testID: "RNE__SearchBar", renderErrorMessage: false, value: value, ...attributes, onFocus: handleFocus, onBlur: handleBlur, onChangeText: handleChangeText, ref: inputRef, placeholderTextColor: placeholderTextColor, inputStyle: StyleSheet.flatten([
                {
                    color: theme?.colors?.grey3,
                    marginLeft: 10,
                },
                inputStyle,
            ]), inputContainerStyle: StyleSheet.flatten([
                {
                    borderBottomWidth: 0,
                    borderRadius: 3,
                    overflow: 'hidden',
                    minHeight: 30,
                    backgroundColor: theme?.colors?.searchBg,
                },
                lightTheme && {
                    backgroundColor: theme?.colors?.grey4,
                },
                round && styles.round,
                inputContainerStyle,
            ]), containerStyle: styles.inputContainer, leftIcon: renderNode(Icon, searchIcon, defaultSearchIcon(theme)), leftIconContainerStyle: StyleSheet.flatten([
                styles.leftIconContainerStyle,
                leftIconContainerStyle,
            ]), rightIcon: React.createElement(View, { style: { flexDirection: 'row' } },
                showLoading && (React.createElement(ActivityIndicator, { key: "loading", style: StyleSheet.flatten([{ marginRight: 5 }, loadingStyle]), ...otherLoadingProps })),
                !isEmpty &&
                    renderNode(Icon, clearIcon, {
                        ...defaultClearIcon(theme),
                        key: 'cancel',
                        onPress: () => {
                            inputRef.current?.clear();
                            handleChangeText('');
                            onClear();
                        },
                    })), rightIconContainerStyle: StyleSheet.flatten([
                styles.rightIconContainerStyle,
                rightIconContainerStyle,
            ]) })));
});
const styles = StyleSheet.create({
    rightIconContainerStyle: {
        marginRight: 8,
    },
    leftIconContainerStyle: {
        marginLeft: 8,
    },
    inputContainer: {
        paddingHorizontal: 0,
    },
    round: {
        borderRadius: 15,
    },
});
export default SearchBarDefault;
