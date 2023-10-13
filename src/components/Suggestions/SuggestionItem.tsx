import {DrawerNavigationProp} from '@react-navigation/drawer';
import React, {PropsWithChildren} from 'react';
import {Image, StyleSheet} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useNavigation} from '@react-navigation/native';
import Realm from 'realm';
//@ts-ignore
import Avatar from '../../assets/images/defaultAvatar.png';
import colours from '../../config/colors';
import {RootStackParamList} from '../../types';
import ListItem from '../custom/ListItem';

type SuggestionItemProps<T extends {_id: Realm.BSON.ObjectId}> = {
  item: T;
  handlePress?: (item: T) => void;
};
const SuggestionItem = <T extends {_id: Realm.BSON.ObjectId}>({
  item,
  handlePress,
  children,
}: PropsWithChildren<SuggestionItemProps<T>>) => {
  const {navigate} = useNavigation<DrawerNavigationProp<RootStackParamList>>();

  return (
    <ListItem
      onPress={
        handlePress
          ? () => handlePress(item)
          : () => {
              navigate('Details', {
                lyricsId: item._id.toHexString(),
              });
            }
      }
      key={item._id.toString()}>
      <Image style={styles.image} source={Avatar} />
      {children}
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
