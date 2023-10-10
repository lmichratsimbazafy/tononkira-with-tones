import {View, StyleSheet, TextInputProps, TextInput} from 'react-native';
import React, {FC} from 'react';
import colours from '../../config/colors';
interface CustomTextInputProps {
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
}
const CustomTextInput: FC<CustomTextInputProps & TextInputProps> = ({
  leftIcon,
  rightIcon,
  ...rest
}) => {
  return (
    <View style={styles.searchContainer}>
      {leftIcon || null}
      <TextInput
        style={styles.TextInput}
        onChangeText={rest.onChangeText}
        value={rest.value}
        placeholder={rest.placeholder}
        placeholderTextColor="#fff"
        clearButtonMode="always"
      />
      {rightIcon || null}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
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
});
