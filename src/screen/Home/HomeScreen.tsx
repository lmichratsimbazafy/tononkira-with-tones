import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import Realm from 'realm';
import {
  refId,
  useFind,
  useList,
} from '../../data/realm/hooks/realmGenericQuery';
import {Author} from '../../data/realm/models/Author';
import {RealmModelNames, RootStackParamList} from '../../types';
import {client} from '../../api/axiosClient';

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const authors = ['Abra', 'Kada', 'Bra'];
const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [authorList, setAuthorList] = useState<Realm.Results<Author>>();
  const [authorDetails, setAuthorDetails] = useState<
    (Author & Realm.Object<Author>) | null
  >();
  const details = useFind<Author>(RealmModelNames.Author, {
    _id: refId('6504c6bd67f5d162ec1a79d6'),
  });
  const list = useList<Author>(RealmModelNames.Author, {});

  const author = client
    .get('/authors/create')
    .then(res => {
      console.log('author  ===>', res.data);
    })
    .catch(e => {
      console.log('error ==>', e);
    });
  console.log('author ==>', author);

  useEffect(() => {
    // authors.map(author => create({
    //   name: author
    // }))
    // const authList = list({
    //   filter: {
    //     id: { criteria: '==', value: '6504c6bd67f5d162ec1a79d6' }
    //   }
    // })
    // setAuthorList(authList)
    setAuthorDetails(details);
  }, [details]);
  console.log('Author ===>', JSON.stringify(list));
  return (
    <View style={styles.container}>
      <Button
        title="Rechercher par titre/artiste/texte de chanson"
        onPress={() => navigation.navigate('Search')}
      />
      <Button
        title="Mise à jour de l'app"
        onPress={() => navigation.navigate('Update')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
