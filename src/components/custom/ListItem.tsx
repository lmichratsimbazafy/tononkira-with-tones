import { StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren } from 'react'
import { TouchableOpacity } from 'react-native'
import colours from '../../config/colors'
import { Image } from 'react-native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { RootStackParamList } from '../../types'

type SearchScreenProps = PropsWithChildren<{
  onPress: ()=> void
}>
const ListItem: React.FC<SearchScreenProps> = ({children, onPress}) => {
  return (
    <TouchableOpacity
        style={styles.suggestionItem}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
  )
}

export default ListItem

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
      marginBottom: 10
    },
  });