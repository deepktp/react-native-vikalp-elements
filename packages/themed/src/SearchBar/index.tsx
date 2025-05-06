import { withTheme } from '../config';
import {
  SearchBar,
  SearchBarProps,
} from '@rn-vui/base/dist/SearchBar/SearchBar';
import { SearchBarAndroidProps } from '@rn-vui/base/dist/SearchBar/SearchBar-android';
import { SearchBarIosProps } from '@rn-vui/base/dist/SearchBar/SearchBar-ios';
import { SearchBarDefaultProps } from '@rn-vui/base/dist/SearchBar/SearchBar-default';

export { SearchBar };
export type {
  SearchBarProps,
  SearchBarAndroidProps,
  SearchBarDefaultProps,
  SearchBarIosProps,
};

export default withTheme<SearchBarProps>(
  SearchBar as React.ComponentType<SearchBarProps>,
  'SearchBar'
);
