import React, { useEffect } from 'react';
import {
  Animated,
  Easing,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { RneFunctionComponent, defaultTheme } from '../helpers';
import { ParentProps, TabItemProps } from './Tab.Item';

export interface TabProps extends ViewProps, ParentProps {
  /** Makes Tab Scrolling */
  scrollable?: boolean;

  /** On Index Change Callback. */
  onChange?: (value: number) => void;

  /** Disable the indicator below. */
  disableIndicator?: boolean;

  /** Additional styling for tab indicator. */
  indicatorStyle?: StyleProp<ViewStyle>;

  /** Define the background Variant. */
  variant?: 'primary' | 'default';

  /** active index */
  activeIndex?: number;

  /** Animation type */
  animationType?: 'timing' | 'spring';

  /** Animation Config */
  animationConfig?: Partial<
    Animated.TimingAnimationConfig | Animated.SpringAnimationConfig
  >;
}

/**
 * Tabs organize content across different screens, data sets, and other interactions.
 *
 * :::note
 * This component is not for (complex) navigation. Use [React Navigation](https://reactnavigation.org) for that.
 * :::
 * @usage
 * ### Basic Tabs
 *  ```tsx live
 *   function RneTab() {
 *    const [index, setIndex] = React.useState(0);
 *    return (
 *      <>
 *        <Tab value={index} onChange={setIndex} dense>
 *          <Tab.Item>Tab</Tab.Item>
 *          <Tab.Item>Tab</Tab.Item>
 *        </Tab>
 *      </>
 *    );
 *  }
 * ```
 *
 * ### Active Tab Items
 * ```tsx live
* <Tab value={0} scrollable>
*   <Tab.Item
*     containerStyle={(active) => ({
*       backgroundColor: active ? 'red' : undefined,
*     })}
*   >
*     Tab
*   </Tab.Item>
*   <Tab.Item
*     buttonStyle={(active) => ({
*       backgroundColor: active ? 'red' : undefined,
*     })}
*   >
*     Tab
*   </Tab.Item>
* </Tab>
* ```
 *

 *  */

export const TabBase: RneFunctionComponent<TabProps> = ({
  theme = defaultTheme,
  children,
  scrollable = false,
  onChange = () => { },
  indicatorStyle,
  disableIndicator,
  variant = 'primary',
  style,
  dense,
  iconPosition,
  buttonStyle,
  titleStyle,
  containerStyle,
  activeIndex = 0,
  animationType = 'spring',
  animationConfig = {},
  ...rest
}) => {
  const translateX = React.useRef(new Animated.Value(0));
  const currentIndex = React.useRef(0);
  const onIndexChangeRef = React.useRef((value: number) => value);

  const animate = React.useCallback(
    (toValue: number, onDone: (_: number) => void = () => { }) => {
      currentIndex.current = toValue;
      onIndexChangeRef.current?.(toValue);
      //currently we are ignoring the animationConfig types but we need to fix this
      Animated[animationType](translateX.current, {
        //@ts-ignore
        toValue: toValue,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
        duration: 150,
        ...animationConfig,
      }).start();
      onDone?.(toValue);
    },
    [animationConfig, animationType]
  );
  const scrollViewRef = React.useRef<ScrollView>(null);
  const scrollViewPosition = React.useRef(0);
  const validChildren = React.useMemo(
    () => React.Children.toArray(children),
    [children]
  );

  const tabItemPositions = React.useRef<{ position: number; width: number }[]>(
    []
  );

  const [tabContainerWidth, setTabContainerWidth] = React.useState(0);

  useEffect(() => {
    if (activeIndex !== currentIndex.current) {
      animate(activeIndex);
    }
  }, [activeIndex, animate]);

  const scrollHandler = React.useCallback(
    (currValue: number) => {
      if (tabItemPositions.current.length > currValue) {
        let itemStartPosition =
          currValue === 0
            ? 0
            : tabItemPositions.current[currValue - 1].position;
        let itemEndPosition = tabItemPositions.current[currValue].position;

        const scrollCurrentPosition = scrollViewPosition.current;
        const tabContainerCurrentWidth = tabContainerWidth;

        let scrollX = scrollCurrentPosition;

        if (itemStartPosition < scrollCurrentPosition) {
          scrollX += itemStartPosition - scrollCurrentPosition;
        } else if (
          scrollCurrentPosition + tabContainerCurrentWidth <
          itemEndPosition
        ) {
          scrollX +=
            itemEndPosition -
            (scrollCurrentPosition + tabContainerCurrentWidth);
        }

        scrollViewRef.current?.scrollTo({
          x: scrollX,
          y: 0,
          animated: true,
        });
      }
    },
    [tabContainerWidth]
  );

  React.useEffect(() => {
    if (onIndexChangeRef) {
      onIndexChangeRef.current = (changedIndex) => {
        scrollHandler(changedIndex);
        onChange(changedIndex);
        return changedIndex;
      };
    }
  }, [onIndexChangeRef, scrollHandler, onChange]);

  const onScrollHandler = React.useCallback((event) => {
    scrollViewPosition.current = event.nativeEvent.contentOffset.x;
  }, []);

  const indicatorWidth = tabItemPositions.current[activeIndex]?.width;

  const indicatorTranslateX = () => {
    const countItems = validChildren.length;

    if (countItems < 2 || tabItemPositions.current.length !== countItems) {
      return 0;
    }

    const { inputRange, outputRange } = tabItemPositions.current.reduce(
      (prev, curr, index) => {
        prev.inputRange.push(index);
        prev.outputRange.push(
          curr.position + curr.width / 2 - indicatorWidth / 2
        );
        return prev;
      },
      { inputRange: [], outputRange: [] }
    );

    return translateX.current.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp',
    });
  };

  const indicatorScaleX = () => {
    const countItems = validChildren.length;

    if (countItems < 2 || tabItemPositions.current.length !== countItems) {
      return 0;
    }

    const inputRange = [];
    const outputRange = [];

    tabItemPositions.current.reduce((prev, curr, index) => {
      inputRange.push(index);

      outputRange.push(curr.width / prev.width);
      return prev;
    }, tabItemPositions.current[activeIndex]);

    return translateX.current.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'extend',
    });
  };

  return (
    <View
      {...rest}
      accessibilityRole="tablist"
      style={[
        variant === 'primary' && {
          backgroundColor: theme?.colors?.primary,
        },
        styles.viewStyle,
        style,
      ]}
      onLayout={({ nativeEvent: { layout } }) => {
        setTabContainerWidth(layout.width);
      }}
    >
      {React.createElement(scrollable ? ScrollView : React.Fragment, {
        ...(scrollable && {
          horizontal: true,
          ref: scrollViewRef,
          onScroll: onScrollHandler,
          showsHorizontalScrollIndicator: false,
        }),
        children: (
          <>
            {validChildren.map((child, index) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  flexDirection: 'column',
                }}
                onLayout={({ nativeEvent: { layout } }) => {
                  tabItemPositions.current[index] = {
                    position: layout.x,
                    width: layout.width,
                  };
                }}
              >
                {React.cloneElement(child as React.ReactElement<TabItemProps>, {
                  onPress: () => {
                    animate(index); //setActiveIndex removed second parameter
                    onChange?.(index);
                  },
                  active: index === activeIndex,
                  variant,
                  _parentProps: {
                    dense,
                    iconPosition,
                    buttonStyle,
                    containerStyle,
                    titleStyle,
                  },
                })}
              </View>
            ))}
            {!disableIndicator && (
              <Animated.View
                style={[
                  styles.indicator,
                  {
                    backgroundColor: theme?.colors?.secondary,
                    transform: [
                      { translateX: indicatorTranslateX() },
                      { scaleX: indicatorScaleX() },
                    ],
                    width: indicatorWidth,
                  },
                  indicatorStyle,
                ]}
              />
            )}
          </>
        ),
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flexDirection: 'row',
    position: 'relative',
  },
  indicator: {
    display: 'flex',
    position: 'absolute',
    height: 2,
    bottom: 0,
  },
});

TabBase.displayName = 'Tab';
