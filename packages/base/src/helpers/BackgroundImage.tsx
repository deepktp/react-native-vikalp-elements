import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import type { ImageProps, ViewProps } from 'react-native';

type BackgroundImageProps = Omit<ImageProps, 'style'> &
  Pick<ViewProps, 'style' | 'children'> & {
    imageStyle?: ImageProps['style'];
    imageRef?: React.Ref<React.ComponentRef<typeof Image>>;
  };

const BackgroundImage = React.forwardRef<
  React.ComponentRef<typeof View>,
  BackgroundImageProps
>(
  (
    {
      children,
      style,
      imageStyle,
      imageRef,
      importantForAccessibility,
      ...imageProps
    },
    ref
  ) => {
    const containerStyle = StyleSheet.flatten(style);

    return (
      <View
        ref={ref}
        style={style}
        accessibilityIgnoresInvertColors
        importantForAccessibility={importantForAccessibility}
      >
        <Image
          {...imageProps}
          ref={imageRef}
          importantForAccessibility={importantForAccessibility}
          style={{
            ...StyleSheet.flatten(StyleSheet.absoluteFill),
            width: containerStyle?.width,
            height: containerStyle?.height,
            // Match React Native Web ImageBackground's default stacking order.
            ...(Platform.OS === 'web' && { zIndex: -1 }),
            ...StyleSheet.flatten(imageStyle),
          }}
        />
        {children}
      </View>
    );
  }
);

BackgroundImage.displayName = 'BackgroundImage';

export default BackgroundImage;
