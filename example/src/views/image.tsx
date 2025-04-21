import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Image } from '@rneui/themed';

import { Header } from '../components/header';

// const BASE_URI = 'https://picsum.photos/200/300';

const ImageAPI = () => {
  return (
    <>
      <Header title="Image" view="image" />
      <SafeAreaView>
        <FlatList
          data={[...new Array(10)].map((_, i) => i.toString())}
          style={styles.list}
          numColumns={2}
          keyExtractor={(e) => e}
          renderItem={({ item }) => (
            <Image
              source={{ uri: `https://picsum.photos/id/${item * 10}/1024/1025` }}
              containerStyle={styles.item}
            />
          )}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
    backgroundColor: '#000',
  },
  item: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
  },
});

export default ImageAPI;
