import { withTheme } from '../config';
import { CardBase, CardProps } from '@rn-vui/base/dist/Card/Card';
import {
  CardDivider,
  CardDividerProps,
} from '@rn-vui/base/dist/Card/Card.Divider';
import { CardFeaturedSubtitle } from '@rn-vui/base/dist/Card/Card.FeaturedSubtitle';
import { CardFeaturedTitle } from '@rn-vui/base/dist/Card/Card.FeaturedTitle';
import { CardImage, CardImageProps } from '@rn-vui/base/dist/Card/Card.Image';
import { CardTitle, CardTitleProps } from '@rn-vui/base/dist/Card/Card.Title';
import { CardFeaturedSubtitleProps } from '@rn-vui/base/dist/Card';
import { CardFeaturedTitleProps } from '@rn-vui/base/dist/Card';

const ThemedCardDivider = withTheme<CardDividerProps>(
  CardDivider,
  'CardDivider'
);
const ThemedCardFeaturedSubtitle = withTheme(
  CardFeaturedSubtitle,
  'CardFeaturedSubtitle'
);
const ThemedCardFeaturedTitle = withTheme(
  CardFeaturedTitle,
  'CardFeaturedTitle'
);
const ThemedCardTitle = withTheme<CardTitleProps>(CardTitle, 'CardTitle');
const ThemedCardImage = withTheme<CardImageProps>(CardImage, 'CardImage');

const ThemedCard = Object.assign(withTheme(CardBase, 'Card'), {
  Divider: ThemedCardDivider,
  Image: ThemedCardImage,
  Title: ThemedCardTitle,
  FeaturedTitle: ThemedCardFeaturedTitle,
  FeaturedSubtitle: ThemedCardFeaturedSubtitle,
});

export default ThemedCard;

export type {
  CardProps,
  CardDividerProps,
  CardFeaturedSubtitleProps,
  CardFeaturedTitleProps,
  CardImageProps,
};
