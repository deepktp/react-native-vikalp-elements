import React from 'react';
import {
  Animated,
  PanResponder,
  View,
  StyleSheet,
  PanResponderGestureState,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  Easing,
} from 'react-native';
import { RneFunctionComponent } from '../helpers';

export interface TabViewProps {
  /** Child position index value. */
  value?: number;

  /** On Index Change Callback. */
  onChange?: (value: number) => any;

  /** Choose the animation type among `spring` and `timing`. This is visible when there is tab change. */
  animationType?: 'spring' | 'timing';

  /** Define the animation configurations.
   *
   * @type AnimationConfig
   */
  animationConfig?: Omit<
    Animated.SpringAnimationConfig & Animated.TimingAnimationConfig,
    'toValue'
  >;

  /** Styling for Component container. */
  containerStyle?: StyleProp<ViewStyle>;

  /** Styling for TabView.Item Component container. */
  tabItemContainerStyle?: StyleProp<ViewStyle>;

  /** Swipe disabled or not */
  disableSwipe?: Boolean;

  /** Disables transition */
  disableTransition?: Boolean;

  /**
   * Handler when the user swipes the view.
   * @type (direction) => void
   */
  onSwipeStart?: (dir: 'left' | 'right') => void;

  /**
   * Minimum distance to swipe before the view changes.
   */
  minSwipeRatio?: number;

  /**
   * Minimum speed to swipe before the view changes.
   */
  minSwipeSpeed?: number;
}

/** Tabs organize content across different screens, data sets, and other interactions.
 * TabView enables swipeable tabs. */
export const TabViewBase: RneFunctionComponent<TabViewProps> = ({
  value: activeIndex = 0,
  children,
  onChange = () => {},
  onSwipeStart = () => {},
  containerStyle,
  tabItemContainerStyle,
  disableSwipe = false,
  disableTransition = false,
  minSwipeRatio = 0.4,
  minSwipeSpeed = 1,
  animationType = 'spring',
  animationConfig = {},
}) => {
  const [containerWidth, setContainerWidth] = React.useState(1);

  const childCount = React.useMemo(
    () => React.Children.toArray(children).length,
    [children]
  );

  const translateX = React.useRef(new Animated.Value(0));
  const currentIndex = React.useRef(0);
  const onIndexChangeRef = React.useRef((value: number) => value);

  const animate = React.useCallback(
    (toValue: number, onDone: (_: number) => void = () => {}) => {
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

  const releaseResponder = React.useCallback(
    (_: GestureResponderEvent, { dx, vx }: PanResponderGestureState) => {
      const position = dx / -containerWidth;
      const shouldSwipe =
        Math.abs(position) > minSwipeRatio || Math.abs(vx) > minSwipeSpeed;
      currentIndex.current += shouldSwipe ? Math.sign(position) : 0;
      // if (hue?.current) hue.current.setValue(currentIndex.current);
      animate(currentIndex.current);
      onChange(currentIndex.current);
    },
    [
      animate,
      containerWidth,
      currentIndex,
      minSwipeRatio,
      minSwipeSpeed,
      onChange,
    ]
  );

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onPanResponderGrant: (_, { vx }) => {
          onSwipeStart(vx > 0 ? 'left' : 'right');
        },
        onMoveShouldSetPanResponder: (_, { dx, dy, vx, vy }) => {
          const panXInt = Math.floor(currentIndex.current);
          return (
            !(
              (dx > 0 && panXInt <= 0) ||
              (dx < 0 && panXInt >= childCount - 1)
            ) &&
            Math.abs(dx) > Math.abs(dy) * 2 &&
            Math.abs(vx) > Math.abs(vy) * 2.5
          );
        },
        onPanResponderMove: (_, { dx }) => {
          const position = dx / -containerWidth;
          translateX.current.setValue(
            Math.floor(currentIndex.current) + position
          );
        },
        onPanResponderRelease: releaseResponder,
        onPanResponderTerminate: releaseResponder,
      }),
    [
      childCount,
      containerWidth,
      onSwipeStart,
      releaseResponder,
      translateX,
      currentIndex,
    ]
  );

  React.useEffect(() => {
    if (Number.isInteger(activeIndex) && activeIndex !== currentIndex.current) {
      animate(activeIndex);
      currentIndex.current = activeIndex;
    }
  }, [animate, activeIndex, currentIndex]);

  return (
    <View
      style={[styles.container, containerStyle]}
      onLayout={({ nativeEvent: { layout } }) => {
        setContainerWidth(layout.width);
      }}
    >
      <Animated.View
        testID="RNE__TabView"
        style={StyleSheet.flatten([
          StyleSheet.absoluteFillObject,
          styles.container,
          {
            width: containerWidth * childCount,
            transform: [
              {
                translateX: disableTransition
                  ? -activeIndex * containerWidth
                  : translateX.current.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -containerWidth],
                    }),
              },
            ],
          },
        ])}
        {...(!disableSwipe && panResponder.panHandlers)}
      >
        {React.Children.toArray(children).map((child, index) => (
          <View
            key={index}
            style={StyleSheet.flatten([
              styles.container,
              tabItemContainerStyle,
              { width: containerWidth },
            ])}
          >
            {child}
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
});

TabViewBase.displayName = 'TabView';
