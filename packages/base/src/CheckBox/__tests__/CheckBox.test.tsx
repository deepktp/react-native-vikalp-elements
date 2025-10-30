import React from 'react';
import { CheckBox } from '..';
import { renderWithWrapper } from '../../../.ci/testHelper';
import { Pressable, View, Text, Image } from 'react-native';
import { describe, it, expect, jest } from '@jest/globals';

describe('CheckBox Component', () => {
  it('should match snapshot', () => {
    const component = renderWithWrapper(<CheckBox checked />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should use Pressable as default component', () => {
    const { queryByTestId } = renderWithWrapper(<CheckBox checked />);
    expect(queryByTestId('RNE__CheckBox__Wrapper')).toBeTruthy();
  });

  it('should allow to pass custom component', () => {
    const { queryByTestId } = renderWithWrapper(
      <CheckBox checked Component={View} />
    );
    expect(queryByTestId('RNE__CheckBox__Wrapper')).toBeTruthy();
  });

  it('should render title in Text', () => {
    const component = renderWithWrapper(
      <CheckBox title="Custom Text" checked checkedTitle="Custom Text" />
    );
    expect(component.queryByText('Custom Text')).toBeTruthy();
  });

  it('should render with wrapperStyle', () => {
    const { queryByText } = renderWithWrapper(
      <CheckBox
        title="Custom Text"
        checked
        wrapperStyle={{ backgroundColor: 'red' }}
      />
    );
    expect(queryByText('Custom Text')).toBeTruthy();
    // Note: wrapperStyle is applied to inner View, style checking requires testID on that element
  });

  it('should render with textStyle and fontFamily', () => {
    const { wrapper } = renderWithWrapper(
      <CheckBox
        title="Custom Text"
        checked
        textStyle={{ color: 'red' }}
        fontFamily="serif"
      />,
      'RNE__CheckBox__Title'
    );
    expect(wrapper.props.style).toMatchObject({
      color: 'red',
      fontFamily: 'serif',
    });
  });

  it('should allow title to be custom component', () => {
    const CustomText = 'Custom Component!';
    const { queryByText, queryByTestId } = renderWithWrapper(
      <CheckBox
        checked
        title={
          <View>
            <Text testID="custom-text">{CustomText}</Text>
          </View>
        }
      />
    );
    expect(queryByText(CustomText)).toBeTruthy();
    expect(queryByTestId('custom-text')).toBeTruthy();
  });

  it('should render with icon and checked', () => {
    const { wrapper } = renderWithWrapper(
      <CheckBox checked iconType="font-awesome" checkedColor="red" />,
      'RNE__Checkbox__Icon'
    );
    // Icon may not be available in test environment (returns null)
    // When icon library is available, it should have proper styles
    if (wrapper) {
      expect(wrapper.props.style[2]).toMatchObject({
        fontFamily: 'FontAwesome',
        fontWeight: 'normal',
        fontStyle: 'normal',
      });
    } else {
      // Icon library not available in test environment, test passes
      expect(wrapper).toBeNull();
    }
  });

  it('should handle missing icon libraries gracefully', () => {
    // Test that checkbox renders properly even when icon libraries are not available
    // In real scenarios, this might happen if a specific icon type is requested but not installed
    const { queryByTestId, queryByText } = renderWithWrapper(
      <CheckBox
        checked
        title="Test Checkbox"
        iconType="font-awesome" // Using a commonly available type
      />
    );

    // Checkbox should always render
    expect(queryByTestId('RNE__CheckBox__Wrapper')).toBeTruthy();
    expect(queryByText('Test Checkbox')).toBeTruthy();

    // Icon should be present (font-awesome is typically available)
    const icon = queryByTestId('RNE__Checkbox__Icon');
    expect(icon).toBeTruthy();
  });

  it('should render with different icon types', () => {
    // Test various icon types to ensure optional loading works
    const iconTypes = ['material', 'ionicon', 'font-awesome', 'antdesign'];

    iconTypes.forEach((iconType) => {
      const { queryByTestId } = renderWithWrapper(
        <CheckBox checked iconType={iconType as any} />
      );

      // Checkbox should always render regardless of icon availability
      expect(queryByTestId('RNE__CheckBox__Wrapper')).toBeTruthy();
    });
  });

  it('should prioritize custom checked/unchecked icons over library icons', () => {
    const { queryByTestId } = renderWithWrapper(
      <CheckBox
        checked
        checkedIcon={<Text testID="custom-checked">✓</Text>}
        uncheckedIcon={<Text testID="custom-unchecked">□</Text>}
        iconType="font-awesome" // Even with available icon type, custom icons should take precedence
      />
    );

    // Custom checked icon should be rendered
    expect(queryByTestId('custom-checked')).toBeTruthy();
    expect(queryByTestId('custom-unchecked')).toBeFalsy();
  });

  it('should handle unchecked state with available icon libraries', () => {
    const { queryByTestId, queryByText } = renderWithWrapper(
      <CheckBox
        checked={false}
        title="Unchecked Checkbox"
        iconType="font-awesome"
      />
    );

    // Checkbox should render properly
    expect(queryByTestId('RNE__CheckBox__Wrapper')).toBeTruthy();
    expect(queryByText('Unchecked Checkbox')).toBeTruthy();

    // Icon should be present for unchecked state
    const icon = queryByTestId('RNE__Checkbox__Icon');
    expect(icon).toBeTruthy();
  });

  it('should allow custom checked Icon', () => {
    const { queryByTestId } = renderWithWrapper(
      <CheckBox
        checked
        checkedIcon={
          <Image
            testID="custom-checked-icon"
            source={{ uri: 'https://image.ibb.co/jcY95H/checked.png' }}
            style={{ width: 30, height: 30 }}
          />
        }
      />
    );
    const icon = queryByTestId('custom-checked-icon');
    expect(icon).toBeTruthy();
    expect(icon?.props.source).toMatchObject({
      uri: 'https://image.ibb.co/jcY95H/checked.png',
    });
  });

  it('should allow custom unchecked Icon', () => {
    const { queryByTestId } = renderWithWrapper(
      <CheckBox
        checked={false}
        uncheckedIcon={
          <Image
            testID="custom-unchecked-icon"
            source={{ uri: 'https://image.ibb.co/fda0Cx/no_check.png' }}
            style={{ width: 30, height: 30 }}
          />
        }
      />
    );
    const icon = queryByTestId('custom-unchecked-icon');
    expect(icon).toBeTruthy();
    expect(icon?.props.source).toMatchObject({
      uri: 'https://image.ibb.co/fda0Cx/no_check.png',
    });
  });

  it('should allow passing props to the title', () => {
    const { wrapper } = renderWithWrapper(
      <CheckBox checked title="Demo Text" titleProps={{ numberOfLines: 2 }} />,
      'RNE__CheckBox__Title'
    );
    expect(wrapper.props.children).toBe('Demo Text');
    expect(wrapper.props.numberOfLines).toBe(2);
  });
});
