import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import SearchBarIOS from './SearchBar-ios';
import SearchBarAndroid from './SearchBar-android';
import SearchBarDefault from './SearchBar-default';
const SEARCH_BAR_COMPONENTS = {
    ios: SearchBarIOS,
    android: SearchBarAndroid,
    default: SearchBarDefault,
};
export const SearchBar = forwardRef((props, ref) => {
    const { platform = 'default' } = props;
    const searchBarRef = useRef(null);
    useImperativeHandle(ref, () => ({
        focus: () => searchBarRef.current?.focus(),
        blur: () => searchBarRef.current?.blur(),
        clear: () => searchBarRef.current?.clear(),
        cancel: () => searchBarRef.current?.cancel(),
    }));
    const Component = SEARCH_BAR_COMPONENTS[platform] || SearchBarDefault;
    return React.createElement(Component, { ref: searchBarRef, ...props });
});
