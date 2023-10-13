import React, {FC} from 'react';
import {FlatList, Keyboard, StyleSheet, Text, View} from 'react-native';
import Realm from 'realm';
import {Lyrics} from '../../data/realm/models/Lyrics';
import SuggestionItem from './SuggestionItem';
import colours from '../../config/colors';
interface SuggestionsProps {
  lyricsList: Realm.Results<Lyrics>;
  itemAction?: (item: Lyrics) => void;
}
const Suggestions: FC<SuggestionsProps> = ({lyricsList, itemAction}) => {
  const renderItem = ({item}: {item: Lyrics}) => {
    return (
      <SuggestionItem handlePress={itemAction} item={item}>
        <View style={styles.detailsContainer}>
          <Text numberOfLines={1} style={styles.songTitle}>
            {item.title}
          </Text>
          <Text numberOfLines={1} style={styles.artistDetails}>
            {item.authors.map(author => author.name).join(' ft. ')}
          </Text>
          {/* <Text numberOfLines={1} style={styles.artistDetails}>
        {item.album.title}
      </Text> */}
        </View>
      </SuggestionItem>
    );
  };
  return (
    <FlatList
      onScrollBeginDrag={Keyboard.dismiss}
      data={lyricsList}
      style={{alignSelf: 'stretch'}}
      renderItem={renderItem}
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
