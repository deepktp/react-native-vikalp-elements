import SearchBarIOS from '../SearchBar-ios';
import { commonTests, commonPlatformTest } from './common';
import { describe } from '@jest/globals';

describe.skip('iOS SearchBar component', () => {
  commonTests(SearchBarIOS);
  commonPlatformTest(SearchBarIOS);
});
