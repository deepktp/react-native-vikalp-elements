import React from 'react';
import { Tooltip, Text, TooltipProps } from '@rn-vui/themed';
import { Header } from '../components/header';
import { View, StyleSheet, Dimensions, ScrollView, Modal } from 'react-native';
import colors from '../config/colors';

const { height } = Dimensions.get('window');

type ToolTipComponentProps = {};

const ControlledTooltip: React.FC<TooltipProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Tooltip
      visible={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      {...props}
    >
      {props.children}
    </Tooltip>
  );
};

const TooltipComponent: React.FunctionComponent<ToolTipComponentProps> = () => {

  return (
    <>
      <Header title="Tooltip" view="tooltip" />
      <ScrollView>
        <View style={{ marginVertical: height / 8 }}>
          <View style={styles.view}>
            <ControlledTooltip
              popover={<Text>no caret!</Text>}
              withPointer={false}
            >
              <Text>without caret</Text>
            </ControlledTooltip>
            <ControlledTooltip
              popover={<Text>Tooltip info goes here</Text>}
              width={200}
              backgroundColor={colors.primary}
            >
              <Text>Press me</Text>
            </ControlledTooltip>
          </View>
          <View style={styles.view}>
            <ControlledTooltip
              backgroundColor={colors.secondary}
              popover={
                <Text>Tooltip info goes here too. Find tooltip everywhere</Text>
              }
              containerStyle={{ width: 200, height: 60 }}
            >
              <Text>Press me 1</Text>
            </ControlledTooltip>
            <ControlledTooltip
              containerStyle={{ width: 145, height: 130 }}
              popover={
                <Text>
                  {
                    'Some big text full of important stuff for the super duper user that our design has been created for'
                  }
                </Text>
              }
            >
              <Text>HUGE</Text>
            </ControlledTooltip>
          </View>
          <View style={styles.view}>
            <ControlledTooltip
              width={200}
              backgroundColor={colors.primary1}
              popover={<Text>Tooltip info goes here</Text>}
            >
              <Text>More attention</Text>
            </ControlledTooltip>
          </View>
          <View style={styles.view}>
            <ControlledTooltip
              width={200}
              backgroundColor={colors.primary2}
              popover={<Text>Tooltip info goes here</Text>}
            >
              <Text>I'm different</Text>
            </ControlledTooltip>
            <ControlledTooltip
              width={200}
              popover={<Text>Tooltip info goes here</Text>}
            >
              <Text>Press me</Text>
            </ControlledTooltip>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 50,
  },
});

export default TooltipComponent;
