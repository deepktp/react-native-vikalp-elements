import React from 'react';
import { View } from 'react-native';
export const TabViewItem = ({ children, ...rest }) => {
    return React.createElement(View, { ...rest }, React.isValidElement(children) && children);
};
TabViewItem.displayName = 'TabView.Item';
