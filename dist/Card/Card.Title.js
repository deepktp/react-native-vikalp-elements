import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import normalize from '../helpers/normalizeText';
import { fonts } from '../helpers';
import { Text } from '../Text';
import { defaultTheme } from '../helpers';
export const CardTitle = ({ style, theme = defaultTheme, ...rest }) => (React.createElement(Text, { testID: "cardTitle", style: StyleSheet.flatten([
        {
            fontSize: normalize(14),
            color: theme?.colors?.grey1,
            ...Platform.select({
                android: {
                    ...fonts.android.black,
                },
                default: {
                    fontWeight: 'bold',
                },
            }),
            textAlign: 'center',
            marginBottom: 15,
        },
        style,
    ]), ...rest }));
CardTitle.displayName = 'Card.Title';
