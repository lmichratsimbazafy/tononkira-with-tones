import React, {FC} from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import colours from '../../config/colors';

interface CustomButtonProps {
  handlePress: () => void;
  text: string;
}
const CustomButton: FC<CustomButtonProps> = ({handlePress, text}) => {
  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
      style={styles.textContainer}>
      <Text style={styles.text}>{text} </Text>
    </TouchableWithoutFeedback>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  text: {
    color: colours.primaryWhite,
    fontSize: 20,
    textTransform: 'uppercase',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: colours.highlightBlack,
    borderColor: colours.primaryTeal,
    borderStyle: 'solid',
    borderWidth: 1,
  },
});
