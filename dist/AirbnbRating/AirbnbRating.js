import React from 'react';
import { AirbnbRating as TapRating, } from '@rn-vui/ratings';
export const AirbnbRating = (props) => {
    return React.createElement(TapRating, Object.assign({}, props));
};
AirbnbRating.displayName = 'AirbnbRating';
