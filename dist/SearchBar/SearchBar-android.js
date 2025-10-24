import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, } from 'react';
import { StyleSheet, View, ActivityIndicator, Keyboard, } from 'react-native';
import { defaultTheme, renderNode } from '../helpers';
import { Input } from '../Input';
import { Icon } from '../Icon';
const defaultSearchIcon = (theme) => ({
    type: 'material',
    size: 25,
    color: theme?.colors?.platform?.android?.grey,
    name: 'search',
});
const defaultCancelIcon = (theme) => ({
    type: 'material',
    size: 25,
    color: theme?.colors?.platform?.android?.grey,
    name: 'arrow-back',
});
const defaultClearIcon = (theme) => ({
    type: 'material',
    size: 25,
    color: theme?.colors?.platform?.android?.grey,
    name: 'clear',
});
const SearchBarAndroid = forwardRef((props, ref) => {
    const { theme = defaultTheme, clearIcon = { name: 'clear' }, containerStyle, leftIconContainerStyle, rightIconContainerStyle, inputContainerStyle, inputStyle, searchIcon = { name: 'search' }, cancelIcon = { name: 'arrow-back' }, showLoading = false, loadingProps = {}, onClear = () => null, onCancel = () => null, onFocus = () => null, onBlur = () => null, onChangeText = () => null, onKeyboardHide, value = '', ...attributes } = props;
    const [hasFocus, setHasFocus] = useState(false);
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
        cancel: () => {
            inputRef.current?.blur();
            onCancel();
        },
    }));
    const handleFocus = (event) => {
        onFocus(event);
        setHasFocus(true);
        setIsEmpty(value === '');
    };
    const handleBlur = (event) => {
        onBlur(event);
        setHasFocus(false);
    };
    const handleChangeText = (text) => {
        onChangeText(text);
        setIsEmpty(text === '');
    };
    const handleCancel = () => {
        inputRef.current?.blur();
        onCancel();
    };
    useEffect(() => {
        let keyboardListener;
        if (onKeyboardHide) {
            keyboardListener = Keyboard.addListener('keyboardDidHide', () => {
                inputRef.current?.blur();
                onKeyboardHide();
            });
        }
        return () => {
            if (keyboardListener) {
                keyboardListener.remove();
            }
        };
    }, [onKeyboardHide]);
    const { style: loadingStyle, ...otherLoadingProps } = loadingProps;
    return (React.createElement(View, { testID: "RNE__SearchBar-wrapper", style: StyleSheet.flatten([
            {
                backgroundColor: theme?.colors?.background,
                paddingTop: 8,
                paddingBottom: 8,
            },
            containerStyle,
        ]) },
        React.createElement(Input, { testID: "RNE__SearchBar", value: value, renderErrorMessage: false, ...attributes, onFocus: handleFocus, onBlur: handleBlur, onChangeText: handleChangeText, ref: inputRef, containerStyle: { paddingHorizontal: 0 }, inputStyle: StyleSheet.flatten([styles.input, inputStyle]), inputContainerStyle: StyleSheet.flatten([
                styles.inputContainer,
                inputContainerStyle,
            ]), leftIcon: hasFocus
                ? renderNode(Icon, cancelIcon, {
                    ...defaultCancelIcon(theme),
                    onPress: handleCancel,
                })
                : renderNode(Icon, searchIcon, defaultSearchIcon(theme)), leftIconContainerStyle: StyleSheet.flatten([
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
    input: {
        marginLeft: 24,
        marginRight: 8,
    },
    inputContainer: {
        borderBottomWidth: 0,
        width: '100%',
    },
    rightIconContainerStyle: {
        marginRight: 8,
    },
    leftIconContainerStyle: {
        marginLeft: 8,
    },
});
export default SearchBarAndroid;
