import {
  PressableProps,
  ViewStyle,
  StyleProp,
  TextStyle,
  ActivityIndicatorProps,
} from 'react-native';
import { Theme } from '../helpers';
import { IconNode } from '../Icon';
import { InputProps } from '../Input';

export type SearchBarAndroidProps = SearchBarBaseProps & {
  platform?: 'android';
  /**
   * Clear Icon `Only with 'platform' prop set to 'android'`
   */
  cancelIcon?: IconNode;
  /**
   * Callback Function on cancel icon press `Only with 'platform' prop set to 'android' or 'ios`
   */
  onCancel?: () => any;
  /**
   * Callback Function on keyboard hides `Only with 'platform' prop set to 'android'`
   */
  onKeyboardHide?: () => any;
};

export type SearchBarIosProps = SearchBarBaseProps & {
  platform?: 'ios';
  /**
   * Cancel Button Props `Only with 'platform' prop set to 'ios'`
   *
   */
  cancelButtonProps?: Partial<PressableProps> & {
    buttonStyle?: StyleProp<ViewStyle>;
    buttonTextStyle?: StyleProp<TextStyle>;
    color?: string;
    buttonDisabledStyle?: StyleProp<ViewStyle>;
    buttonDisabledTextStyle?: StyleProp<ViewStyle>;
  };
  /**
   * Cancel Button Title `Only with 'platform' prop set to 'ios'`
   */
  cancelButtonTitle?: string;
  /**
   * Show cancel `Only with 'platform' prop set to 'ios'`
   */
  showCancel?: boolean;
  /**
   * Icon for search `Only with 'platform' prop set to 'ios'`
   */
  searchIcon?: IconNode;
  /**
   * Clear Icon `Only with 'platform' prop set to 'ios'`
   */
  clearIcon?: IconNode;

  onCancel?: () => any;
};

export type SearchBarDefaultProps = SearchBarBaseProps & {
  /**
   * `Warning: Some props are platform specific and will not work on other platform`
   * @default default
   */
  platform?: 'default';
  lightTheme?: boolean;
  round?: boolean;
};

export interface SearchBarBaseProps extends InputProps {
  /**
   * Style for container
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Style for input container
   */
  inputContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Clear Icon
   */
  clearIcon?: IconNode;
  /**
   * Icon for search
   */
  searchIcon?: IconNode;
  /**
   * Input Style
   */
  inputStyle?: StyleProp<TextStyle>;
  /**
   * ActivityIndicatorProps
   */
  loadingProps?: ActivityIndicatorProps;
  /**
   * Show loading
   */
  showLoading?: boolean;
  /**
   * Left Icon Container Style
   */
  leftIconContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Right Icon Container Style
   */
  rightIconContainerStyle?: StyleProp<ViewStyle>;
  /**
   * @type Callback Function on clear icon press
   */
  onClear?(): void;
  theme?: Theme;
}

export type SearchBarProps =
  | SearchBarDefaultProps
  | SearchBarAndroidProps
  | SearchBarIosProps;
