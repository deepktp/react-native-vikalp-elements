import React from 'react';
import Divider from '../index';
import { renderWithWrapper } from '../../../.ci/testHelper';
import { CreateThemeOptions, FullTheme } from '../../config';
import { describe, it, expect, jest } from '@jest/globals';

describe('Divider Component', () => {
  it('should apply values from theme', () => {
    const theme: Partial<CreateThemeOptions> = {
      components: {
        Divider: {
          style: {
            backgroundColor: 'red',
          },
        },
      },
    };
    const { wrapper } = renderWithWrapper(<Divider />, 'RNE__Divider', theme);
    expect(wrapper.props.style).toMatchObject({ backgroundColor: 'red' });
  });
});
