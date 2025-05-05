import React from 'react';
import { Rating as SwipeRating, } from 'react-native-ratings';
export const Rating = (props) => {
    return React.createElement(SwipeRating, Object.assign({}, props));
};
Rating.displayName = 'Rating';
