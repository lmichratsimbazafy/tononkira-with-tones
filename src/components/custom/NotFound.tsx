import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colours from '../../config/colors';

const NotFound = () => {
  return (
    <View>
      <Text style={styles.text}>No items found</Text>
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({
  text: {
    color: colours.primaryWhite,
    lineHeight: 22,
    paddingBottom: 20,
  },
});
