import React from 'react';
import { AirbnbRating as TapRating, } from '@rn-vui/ratings';
export const AirbnbRating = (props) => {
    return React.createElement(TapRating, { ...props });
};
AirbnbRating.displayName = 'AirbnbRating';
