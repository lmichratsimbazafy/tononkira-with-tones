import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import SwipeableItem, {
  OpenDirection,
  useSwipeableItemParams,
} from 'react-native-swipeable-item';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {debounce} from 'throttle-debounce';
import Suggestions from '../../components/Suggestions/Suggestions';
import CustomTextInput from '../../components/custom/CustomTextInput';
import OpenDrawerBotton from '../../components/custom/OpenDrawerBotton';
import MainLayout from '../../components/layout/MainLayout';
import colours from '../../config/colors';
import {DEVICE_WIDTH} from '../../constants';
import {Lyrics} from '../../data/realm/models/Lyrics';
import {useRealmContext} from '../../data/realm/models/RealmProvider';
import {RealmModelNames, RootStackParamList} from '../../types';
const OVERSWIPE_DIST = 20;

const Program = () => {
  const itemRefs = useRef(new Map());
  const [text, seTtext] = useState<string>('');
  const {useQuery} = useRealmContext();
  const {navigate} = useNavigation<DrawerNavigationProp<RootStackParamList>>();
  const lyrics = useQuery<Lyrics>(RealmModelNames.Lyrics);
  const [filteredLyrics, setFilteredLyrics] = useState<Realm.Results<Lyrics>>(
    [] as unknown as Realm.Results<Lyrics>,
  );
  const [seletctedLyrics, setSelectedLyrics] = useState<Realm.Results<Lyrics>>(
    // [] as unknown as Realm.Results<Lyrics>,
    lyrics,
  );

  const handleSearch = (text: string) => {
    if (text.length >= 3) {
      setFilteredLyrics(lyrics.filtered(`title contains[c] '${text}'`));
    } else {
      setFilteredLyrics([] as unknown as Realm.Results<Lyrics>);
    }
  };
  const handleChangeText = (changeText: string) => {
    seTtext(changeText);
  };
  const handleClickItem = (item: Lyrics) => {
    navigate('Details', {lyricsId: item._id.toString()});
  };
  const handleSelectLiricsItem = (lyric: Lyrics) => {
    const lyricsIds = seletctedLyrics.map(lyric => lyric._id.toString());
    if (!lyricsIds.includes(lyric._id.toString())) {
      setSelectedLyrics([
        ...seletctedLyrics,
        lyric,
      ] as unknown as Realm.Results<Lyrics>);
    }
    setFilteredLyrics([] as unknown as Realm.Results<Lyrics>);
    seTtext('');
  };
  const debounceFunc = debounce(300, handleSearch);
  useEffect(() => {
    debounceFunc(text);
    return () => {
      debounceFunc.cancel();
    };
  }, [text]);
  const renderItem = useCallback((params: RenderItemParams<Lyrics>) => {
    const onPressDelete = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setSelectedLyrics(prev => {
        return prev.filter(item => {
          return !item._id.equals(params.item._id);
        }) as unknown as Realm.Results<Lyrics>;
      });
    };

    return (
      <RowItem
        {...params}
        onPress={handleClickItem}
        itemRefs={itemRefs}
        onPressDelete={onPressDelete}
      />
    );
  }, []);
  return (
    <MainLayout header={<OpenDrawerBotton />}>
      <View style={styles.container}>
        <CustomTextInput
          leftIcon={
            <EvilIcons name="search" size={30} color={colours.primaryTeal} />
          }
          onChangeText={handleChangeText}
          value={text}
          placeholder="Search song"
        />
        {filteredLyrics.length > 0 && text.length > 0 && (
          <Suggestions
            lyricsList={filteredLyrics}
            itemAction={handleSelectLiricsItem}
          />
        )}

        <View style={styles.container}>
          <DraggableFlatList
            data={seletctedLyrics as unknown as [Lyrics]}
            renderItem={renderItem}
            keyExtractor={(item: Lyrics) => item._id.toString()}
            onDragEnd={({data}) =>
              setSelectedLyrics(data as unknown as Realm.Results<Lyrics>)
            }
            activationDistance={20}
            style={[
              {
                flex: 1,
                width: DEVICE_WIDTH - 40,
                alignSelf: 'stretch',
              },
            ]}
          />
        </View>
      </View>
    </MainLayout>
  );
};

type RowItemProps = {
  item: Lyrics;
  drag: () => void;
  onPressDelete: () => void;
  itemRefs: React.MutableRefObject<Map<any, any>>;
  isActive: boolean;
  onPress: (item: Lyrics) => void;
};
const RowItem = ({
  item,
  isActive,
  itemRefs,
  drag,
  onPressDelete,
  onPress,
}: RowItemProps) => {
  return (
    <ScaleDecorator>
      <SwipeableItem
        key={item._id.toString()}
        item={item}
        ref={ref => {
          if (ref && !itemRefs.current.get(item._id.toString())) {
            itemRefs.current.set(item._id.toString(), ref);
          }
        }}
        onChange={({openDirection}) => {
          if (openDirection !== OpenDirection.NONE) {
            // Close all other open items
            [...itemRefs.current.entries()].forEach(([key, ref]) => {
              if (key !== item._id.toString() && ref) ref.close();
            });
          }
        }}
        overSwipe={OVERSWIPE_DIST}
        renderUnderlayLeft={() => (
          <UnderlayLeft drag={drag} onPressDelete={onPressDelete} />
        )}
        renderUnderlayRight={() => <UnderlayRight />}
        snapPointsLeft={[100]}
        snapPointsRight={[100]}>
        <TouchableOpacity
          activeOpacity={1}
          onLongPress={drag}
          onPress={() => onPress(item)}
          style={[
            styles.renderItemContainer,
            {
              backgroundColor: isActive
                ? colours.primaryTeal
                : colours.secondaryGrey,
            },
          ]}>
          <View>
            <Text numberOfLines={1} style={styles.songTitle}>
              {item.title}
            </Text>
            <Text numberOfLines={1} style={styles.artistDetails}>
              {item.authors.map(author => author.name).join(' ft. ')}
            </Text>
          </View>
        </TouchableOpacity>
      </SwipeableItem>
    </ScaleDecorator>
  );
};

const UnderlayLeft = ({
  drag,
  onPressDelete,
}: {
  drag: () => void;
  onPressDelete: () => void;
}) => {
  const {item, percentOpen} = useSwipeableItemParams<Lyrics>();
  const animStyle = useAnimatedStyle(
    () => ({
      opacity: percentOpen.value,
    }),
    [percentOpen],
  );
  const [iconName, setIconName] = useState('delete');
  const handeDelete = () => {
    setIconName('delete-empty');
    setTimeout(() => {
      onPressDelete();
    }, 500);
  };
  return (
    <Animated.View
      style={[styles.renderItemContainer, styles.underlayLeft, animStyle]} // Fade in on open
    >
      <TouchableOpacity onPress={handeDelete}>
        {/* <Text style={styles.text}>{`[delete]`}</Text> */}
        <MaterialCommunityIcons
          name={iconName}
          size={30}
          color={colours.primaryWhite}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const UnderlayRight = () => {
  const {close} = useSwipeableItemParams<Lyrics>();
  return (
    <Animated.View style={[styles.renderItemContainer, styles.underlayRight]}>
      <TouchableOpacity onPressOut={() => close()}>
        <Text style={styles.text}>Fermer</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Program;

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
  renderItemContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    backgroundColor: colours.tertiaryBlack,
    elevation: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 12,
    paddingLeft: 18,
    paddingRight: 12,
    marginLeft: 14,
    marginRight: 14,
    marginVertical: 5,
  },
  songTitle: {
    color: 'white',
    paddingBottom: 2,
  },
  artistDetails: {
    color: colours.primaryGrey,
    paddingBottom: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  underlayRight: {
    flex: 1,
    backgroundColor: 'teal',
    justifyContent: 'flex-start',
  },
  underlayLeft: {
    flex: 1,
    backgroundColor: 'tomato',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
