import { CardProps } from '@rn-vui/base/dist/Card/Card';
import { CardDividerProps } from '@rn-vui/base/dist/Card/Card.Divider';
import { CardImageProps } from '@rn-vui/base/dist/Card/Card.Image';
import { CardTitleProps } from '@rn-vui/base/dist/Card/Card.Title';
import { CardFeaturedSubtitleProps } from '@rn-vui/base/dist/Card';
import { CardFeaturedTitleProps } from '@rn-vui/base/dist/Card';
declare const ThemedCard: (import("react").FunctionComponent<import("react").PropsWithChildren<CardProps & {
    theme?: import("@rn-vui/base").Theme;
} & {
    children?: import("react").ReactNode | undefined;
}>> | import("react").ForwardRefExoticComponent<import("react").RefAttributes<import("react").PropsWithChildren<CardProps & {
    theme?: import("@rn-vui/base").Theme;
} & {
    children?: import("react").ReactNode | undefined;
}>>>) & {
    Divider: import("react").FunctionComponent<import("react").PropsWithChildren<CardDividerProps>> | import("react").ForwardRefExoticComponent<import("react").RefAttributes<import("react").PropsWithChildren<CardDividerProps>>>;
    Image: import("react").FunctionComponent<import("react").PropsWithChildren<CardImageProps>> | import("react").ForwardRefExoticComponent<import("react").RefAttributes<import("react").PropsWithChildren<CardImageProps>>>;
    Title: import("react").FunctionComponent<import("react").PropsWithChildren<CardTitleProps>> | import("react").ForwardRefExoticComponent<import("react").RefAttributes<import("react").PropsWithChildren<CardTitleProps>>>;
    FeaturedTitle: import("react").FunctionComponent<import("react").PropsWithChildren<CardFeaturedTitleProps & {
        theme?: import("@rn-vui/base").Theme;
    } & {
        children?: import("react").ReactNode | undefined;
    }>> | import("react").ForwardRefExoticComponent<import("react").RefAttributes<import("react").PropsWithChildren<CardFeaturedTitleProps & {
        theme?: import("@rn-vui/base").Theme;
    } & {
        children?: import("react").ReactNode | undefined;
    }>>>;
    FeaturedSubtitle: import("react").FunctionComponent<import("react").PropsWithChildren<CardFeaturedSubtitleProps & {
        theme?: import("@rn-vui/base").Theme;
    } & {
        children?: import("react").ReactNode | undefined;
    }>> | import("react").ForwardRefExoticComponent<import("react").RefAttributes<import("react").PropsWithChildren<CardFeaturedSubtitleProps & {
        theme?: import("@rn-vui/base").Theme;
    } & {
        children?: import("react").ReactNode | undefined;
    }>>>;
};
export default ThemedCard;
export type { CardProps, CardDividerProps, CardFeaturedSubtitleProps, CardFeaturedTitleProps, CardImageProps, };
