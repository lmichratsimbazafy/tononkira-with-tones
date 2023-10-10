import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import colours from '../../config/colors';
import {FlatList} from 'react-native';
import {Keyboard} from 'react-native';
import Realm from 'realm';
import {Lyrics} from '../../data/realm/models/Lyrics';
import SuggestionItem from './SuggestionItem';
interface SuggestionsProps {
  lyricsList: Realm.Results<Lyrics>;
}
const Suggestions: FC<SuggestionsProps> = ({lyricsList}) => {
  return (
    <FlatList
      onScrollBeginDrag={Keyboard.dismiss}
      data={lyricsList}
      style={{alignSelf: 'stretch'}}
      renderItem={({item}) => <SuggestionItem item={item} />}
      keyExtractor={item => item._id.toString()}
    />
  );
};

export default Suggestions;

const styles = StyleSheet.create({
  suggestionItem: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    backgroundColor: colours.tertiaryBlack,
    elevation: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 18,
    paddingRight: 12,
    marginLeft: 14,
    marginRight: 14,
    marginTop: 0,
    marginBottom: 10,
  },
  image: {
    width: 66,
    height: 66,
    borderRadius: 66 / 2,
    alignSelf: 'center',
    borderColor: colours.primaryWhite,
    borderWidth: 2,
    marginRight: 17,
    flex: 0,
  },
  detailsContainer: {
    width: 145,
    marginRight: 20,
  },
  songTitle: {
    color: 'white',
    paddingBottom: 2,
  },
  artistDetails: {
    color: colours.primaryGrey,
    paddingBottom: 2,
  },
});
