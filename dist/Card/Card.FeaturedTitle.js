import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import normalize from '../helpers/normalizeText';
import { fonts } from '../helpers';
import { Text } from '../Text';
import { defaultTheme } from '../helpers';
export const CardFeaturedTitle = ({ theme = defaultTheme, style, ...rest }) => (React.createElement(Text, { style: StyleSheet.flatten([
        {
            fontSize: normalize(18),
            marginBottom: 8,
            color: theme?.colors?.white,
            ...Platform.select({
                android: {
                    ...fonts.android.black,
                },
                default: {
                    fontWeight: '800',
                },
            }),
        },
        style,
    ]), ...rest }));
CardFeaturedTitle.displayName = 'Card.FeaturedTitle';
