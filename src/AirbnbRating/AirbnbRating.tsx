import React from 'react';
import {
  AirbnbRating as TapRating,
  TapRatingProps as RatingProps,
} from '@rn-vui/ratings';
import { RneFunctionComponent } from '../helpers';

export interface TapRatingProps extends RatingProps {}

/** Ratings are used to collect measurable feedback from users.
 * Use Rating over an Input where imagery can increase user interaction.
 * This component is imported from [@rn-vui/ratings](https://github.com/deepktp/react-native-vikalp-ratings).
 * There are two types of rating - TapRating and SwipeRating.
 * This documentation is for Tap Rating version. */
export const AirbnbRating: RneFunctionComponent<TapRatingProps> = (props) => {
  return <TapRating {...props} />;
};

AirbnbRating.displayName = 'AirbnbRating';
