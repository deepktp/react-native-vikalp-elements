import React from 'react';
import {
  Rating as SwipeRating,
  SwipeRatingProps as RatingProps,
} from '@rn-vui/ratings';
import { RneFunctionComponent } from '../helpers';

export interface SwipeRatingProps extends RatingProps {}

/** Ratings are used to collect measurable feedback from users.
 * Use Rating over an Input where imagery can increase user interaction.
 * This component is imported from [@rn-vui/ratings](https://github.com/deepktp/react-native-vikalp-ratings).
 * There are two tyoes of rating - TapRating and SwipeRating.
 * This documentation is for Swipe Rating version. */
export const Rating: RneFunctionComponent<SwipeRatingProps> = (props) => {
  return <SwipeRating {...props} />;
};

Rating.displayName = 'Rating';
