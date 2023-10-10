import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colours from '../../config/colors';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RootStackParamList} from '../../types';

const OpenDrawerBotton = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();
  return (
    <Ionicons
      name="menu"
      size={26}
      style={{marginLeft: 10, padding: 10}}
      color={colours.secondaryGrey}
      onPress={() => navigation.openDrawer()}
    />
  );
};

export default OpenDrawerBotton;

const styles = StyleSheet.create({});
