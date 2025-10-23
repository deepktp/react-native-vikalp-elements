import React from 'react';
import { StyleSheet } from 'react-native';
import { Image } from '../Image';
export const CardImage = ({ style, ...props }) => React.createElement(Image, { style: StyleSheet.flatten([styles.image, style]), ...props });
const styles = StyleSheet.create({
    image: {
        width: null,
        height: 150,
    },
});
CardImage.displayName = 'Card.Image';
