import React, {FC} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Lyrics} from '../../data/realm/models/Lyrics';
import {DrawerNavigationProp} from '@react-navigation/drawer';
//@ts-ignore
import Avatar from '../../assets/images/defaultAvatar.png';
import colours from '../../config/colors';
import {RootStackParamList} from '../../types';
import ListItem from '../custom/ListItem';
import {useNavigation} from '@react-navigation/native';
type SuggestionItemProps = {
  item: Lyrics;
};
const SuggestionItem: FC<SuggestionItemProps> = ({item}) => {
  const {navigate} = useNavigation<DrawerNavigationProp<RootStackParamList>>();

  return (
    <ListItem
      onPress={() => {
        navigate('Details', {lyricsId: item._id.toHexString()});
      }}
      key={item._id.toString()}>
      <Image style={styles.image} source={Avatar} />
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
      <EvilIcons name="chevron-right" size={54} color="#333" />
    </ListItem>
  );
};

export default SuggestionItem;

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
