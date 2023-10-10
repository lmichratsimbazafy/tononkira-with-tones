import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import colours from '../../config/colors';

interface LyricsProps {
  lyrics: string[];
}

const Lyrics: FC<LyricsProps> = ({lyrics}) => {
  return (
    <View>
      {lyrics.map((lyric, index) => (
        <Text style={styles.lyrics} key={index}>
          {lyric}
        </Text>
      ))}
    </View>
  );
};

export default Lyrics;

const styles = StyleSheet.create({
  lyrics: {
    color: colours.primaryWhite,
    lineHeight: 22,
    paddingBottom: 20,
  },
});
