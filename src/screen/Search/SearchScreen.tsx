import {StyleSheet, TextInput, Keyboard, View, Image} from 'react-native';
import React, {useState} from 'react';
import MainLayout from '../../components/layout/MainLayout';
import colours from '../../config/colors';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
//@ts-ignore
import logo from '../../assets/images/logo.png';

const SearchScreen = () => {
  const [text, seTtext] = useState<string>('');
  const [showLogo, setShowLogo] = useState<boolean>(true);
  const handleChangeText = (changeText: string) => {
    seTtext(changeText);
  };

  return (
    <MainLayout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          {showLogo && <Image style={styles.logo} source={logo} />}

          <View style={{flex: 1, alignItems: 'center'}}>
            <View style={styles.searchContainer}>
              <EvilIcons name="search" size={30} color={colours.primaryTeal} />

              <TextInput
                style={styles.TextInput}
                onChangeText={handleChangeText}
                value={text}
                placeholder="Search song"
                placeholderTextColor="#fff"
                clearButtonMode="always"
              />
            </View>

            {/* {results.length > 0 && text.length > 0 && (
              <Suggestions
                style={styles.Suggestions}
                results={results}
                navigation={navigation}
              />
            )} */}
          </View>
          {/* {showLogo && <Credits screen="Search" />} */}
        </View>
      </TouchableWithoutFeedback>
    </MainLayout>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: colours.primaryBlack,
  },
  container: {
    flex: 1,
    backgroundColor: colours.primaryBlack,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 30,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 60,
    marginTop: 40,
    borderRadius: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: 280,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: colours.highlightBlack,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInput: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    color: colours.primaryWhite,
  },
  Suggestions: {
    flex: 1,
    alignItems: 'center',

    color: colours.primaryWhite,
  },
  creditsContainer: {
    flexDirection: 'row',
    width: 170,
  },
  creditsText: {
    fontSize: 12,
    color: colours.secondaryGrey,
    textAlign: 'left',
    paddingLeft: 20,
  },
  creditsImage: {
    width: 30,
    height: 30,
    opacity: 0.2,
    alignSelf: 'flex-start',
  },
});
