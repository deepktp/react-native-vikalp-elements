import { Button, Tab as TabBar, TabView, Text } from '@rn-vui/themed';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Header } from '../components/header';

export default () => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(5);

  return (
    <>
      <Header title="Tab" />
      <TabBar
        indicatorStyle={{
          backgroundColor: 'white',
          height: 3,
        }}
        scrollable
        activeIndex={activeTabIndex}
        onChange={setActiveTabIndex}
      >
        <TabBar.Item
          title="Recent"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
        />
        <TabBar.Item
          title="Custom"
          containerStyle={(active) => ({
            backgroundColor: active ? '#208990' : 'transparent',
          })}
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
        />
        <TabBar.Item
          title="Cart"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
        />
        <TabBar.Item
          title="Example tab 1"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
        />
        <TabBar.Item
          title="Example tab 2"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
        />
        <TabBar.Item
          title="Example tab 3"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
        />
      </TabBar>

      <TabView
        onSwipeStart={console.log}
        activeIndex={activeTabIndex}
        onChange={setActiveTabIndex}
      >
        <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
          <ScrollView>
            <Button onPress={() => setActiveTabIndex(4)}>Jump to Tab 4</Button>
            <Text h1>{Math.random()}</Text>
            <Text h1>Recent 0</Text>
            <Text h1>Recent 0</Text>
            <Text h1>Recent 0</Text>
            <Text h1>Recent 0</Text>
            <Text h1>Recent 0</Text>
            <Text h1>Recent 0</Text>
            <Text h1>Recent 0</Text>
            <Text h1>Recent 0</Text>
            <Text h1>Recent 0</Text>
            <Text h1>Recent 0</Text>
            <Text h1>Recent 0</Text>
            <Text h1>Recent 0</Text>
            <Text h1>Recent 0</Text>
            <Text h1>Recent 0</Text>
            <Text h1>Recent 0</Text>
            <Text h1>Recent 0</Text>
          </ScrollView>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
          <Text h1>Favorite 1</Text>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
          <Text h1>Cart 2${Math.random()}</Text>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
          <Text h1>Example 3</Text>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
          <Text h1>Example 4</Text>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
          <Text h1>Example 5</Text>
        </TabView.Item>
      </TabView>
    </>
  );
};
