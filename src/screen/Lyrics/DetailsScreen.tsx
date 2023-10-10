import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import MainLayout from '../../components/layout/MainLayout';
import {RouteProp, useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Realm from 'realm';
//@ts-ignore
import LyricsImage from '../../assets/images/lyrics.png';
import NotFound from '../../components/custom/NotFound';
import Lyrics from '../../components/lyrics/Lyrics';
import colours from '../../config/colors';
import {Lyrics as Lyricsmodel} from '../../data/realm/models/Lyrics';
import {useRealmContext} from '../../data/realm/models/RealmProvider';
import {RealmModelNames, RootStackParamList} from '../../types';
const DetailsScreen = () => {
  const {useObject} = useRealmContext();
  const {
    params: {lyricsId},
  } = useRoute<RouteProp<RootStackParamList, 'Details'>>();
  const lyrics = useObject<Lyricsmodel>(
    RealmModelNames.Lyrics,
    new Realm.BSON.ObjectId(lyricsId),
  );
  if (!lyrics) {
    return <NotFound />;
  }
  return (
    <MainLayout>
      <ScrollView style={styles.container}>
        <View style={{flex: 1}}>
          <ImageBackground source={LyricsImage} style={styles.backgroundImage}>
            <LinearGradient
              colors={['transparent', colours.primaryBlack]}
              locations={[0.4, 1.2]}
              style={styles.gradient}
            />
            <View
              style={{
                flexDirection: 'column',
                alignSelf: 'flex-end',
                paddingBottom: 40,
                paddingLeft: 19,
              }}>
              <Text style={styles.artistHeading}>
                {lyrics.authors.map(author => author.name).join(' ft. ')}
              </Text>
              <Text style={styles.songHeading}>{lyrics.title}</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={{flex: 1, paddingLeft: 19, paddingRight: 19}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              marginBottom: 30,
            }}>
            <Image style={styles.albumImage} source={LyricsImage} />
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                alignSelf: 'center',
                paddingRight: 10,
              }}>
              <Text style={styles.artistHeading}>Tonalité: {lyrics.tone}</Text>
            </View>
          </View>
          <Lyrics lyrics={lyrics.lyrics} />
        </View>
      </ScrollView>
    </MainLayout>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colours.primaryBlack,
    flex: 1,
  },
  backgroundImage: {flex: 1, minHeight: 360, flexDirection: 'row'},
  gradient: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  artistHeading: {
    color: colours.primaryWhite,
    fontSize: 35,
    lineHeight: 35,
    fontWeight: '300',
    paddingBottom: 7,
    shadowOpacity: 0.6,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  songHeading: {
    color: colours.primaryWhite,
    fontSize: 45,
    lineHeight: 45,

    fontWeight: 'bold',
    paddingBottom: 0,
    shadowOpacity: 0.6,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  albumImage: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
    borderWidth: 3,
    borderColor: colours.primaryWhite,
    marginRight: 25,
  },
  detailsHeading: {color: colours.primaryGrey, marginBottom: 3},
  details: {
    color: colours.primaryWhite,
    fontWeight: 'bold',
    marginBottom: 15,
    fontSize: 16,
  },
  lyrics: {
    color: colours.primaryWhite,
    lineHeight: 22,
    paddingBottom: 20,
  },
  creditsContainer: {
    flex: 1,
    alignSelf: 'center',
    paddingTop: 40,
    paddingBottom: 30,
  },
});
