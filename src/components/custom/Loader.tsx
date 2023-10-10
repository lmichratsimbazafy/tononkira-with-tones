import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {FC} from 'react';
import colours from '../../config/colors';
interface LoaderProps {
  size?: number | 'small' | 'large';
}
const Loader: FC<LoaderProps> = ({size}) => {
  return (
    <View>
      <ActivityIndicator size={size || 'small'} color={colours.primaryTeal} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
