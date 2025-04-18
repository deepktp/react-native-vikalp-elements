import SearchBarAndroid from '../SearchBar-android';
import { commonTests } from './common';
import { describe } from '@jest/globals';

describe.skip('Android SearchBar component', () => {
  commonTests(SearchBarAndroid);
});
