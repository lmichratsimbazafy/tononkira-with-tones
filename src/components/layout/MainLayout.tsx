import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import colours from '../../config/colors';

interface MainLayoutProps {
  children: React.JSX.Element;
}
const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
  return (
    <ScrollView style={{backgroundColor: colours.primaryBlack}}>
      <SafeAreaView style={styles.container}>{children}</SafeAreaView>
    </ScrollView>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 30,
  },
  itemStyle: {
    borderLeftWidth: 3,
    borderLeftColor: colours.primaryTeal,
  },
  socialLinksContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 45,
    fontSize: 4,
    paddingTop: 30,
    borderTopColor: colours.secondaryGrey,
    borderTopWidth: 1,
  },
});
