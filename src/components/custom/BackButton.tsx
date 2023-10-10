import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import colours from '../../config/colors';

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <AntDesignIcons
      name="arrowleft"
      size={26}
      style={{marginLeft: 10, padding: 10}}
      color={colours.secondaryGrey}
      onPress={() => navigation.goBack()}
    />
  );
};

export default BackButton;

const styles = StyleSheet.create({});
