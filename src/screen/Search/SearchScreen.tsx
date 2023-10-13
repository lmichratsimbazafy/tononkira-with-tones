import React, {useEffect, useState} from 'react';
import {Animated, Image, StyleSheet, View} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {debounce} from 'throttle-debounce';
import MainLayout from '../../components/layout/MainLayout';
import colours from '../../config/colors';
//@ts-ignore
import logo from '../../assets/images/logo.png';
import Suggestions from '../../components/Suggestions/Suggestions';
import CustomTextInput from '../../components/custom/CustomTextInput';
import OpenDrawerBotton from '../../components/custom/OpenDrawerBotton';
import {Lyrics} from '../../data/realm/models/Lyrics';
import {useRealmContext} from '../../data/realm/models/RealmProvider';
import {RealmModelNames} from '../../types';

const SearchScreen = () => {
  const [text, seTtext] = useState<string>('');
  const [showLogo, setShowLogo] = useState<boolean>(true);
  const {useQuery} = useRealmContext();
  const [animation] = useState(new Animated.Value(40));
  const handleChangeText = (changeText: string) => {
    seTtext(changeText);
  };
  const lyrics = useQuery<Lyrics>(RealmModelNames.Lyrics);
  const [filteredLyrics, setFilteredLyrics] = useState<Realm.Results<Lyrics>>(
    [] as unknown as Realm.Results<Lyrics>,
  );
  const handleSearch = (text: string) => {
    if (text.length >= 3) {
      setFilteredLyrics(lyrics.filtered(`title contains[c] '${text}'`));
    } else {
      setFilteredLyrics([] as unknown as Realm.Results<Lyrics>);
      setShowLogo(true);
    }
  };

  const animatedStyle = {
    transform: [
      {
        translateY: animation,
      },
    ],
  };
  const startAnimation = (direction: 'up' | 'down') => {
    Animated.timing(animation, {
      toValue: direction === 'up' ? -300 : 40,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const debounceFunc = debounce(300, handleSearch);
  useEffect(() => {
    debounceFunc(text);
    return () => {
      debounceFunc.cancel();
    };
  }, [text]);

  useEffect(() => {
    if (filteredLyrics.length > 0) {
      startAnimation('up');
      setTimeout(() => {
        setShowLogo(false);
      }, 300);
    } else {
      startAnimation('down');
      setShowLogo(true);
    }
  }, [filteredLyrics]);

  return (
    <MainLayout header={<OpenDrawerBotton />}>
      <View style={styles.container}>
        <Animated.View style={animatedStyle}>
          {showLogo && <Image style={styles.logo} source={logo} />}
        </Animated.View>

        <View style={{flex: 1, alignItems: 'center'}}>
          <CustomTextInput
            leftIcon={
              <EvilIcons name="search" size={30} color={colours.primaryTeal} />
            }
            onChangeText={handleChangeText}
            value={text}
            placeholder="Search song"
          />
          {filteredLyrics.length > 0 && text.length > 0 && (
            <Suggestions lyricsList={filteredLyrics} />
          )}
        </View>
      </View>
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
