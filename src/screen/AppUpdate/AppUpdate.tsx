import dayjs from 'dayjs';
import React, {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomButton from '../../components/custom/CustomButton';
import Loader from '../../components/custom/Loader';
import NotFound from '../../components/custom/NotFound';
import OpenDrawerBotton from '../../components/custom/OpenDrawerBotton';
import MainLayout from '../../components/layout/MainLayout';
import {useToastContext} from '../../components/providers/ToastProvider';
import colours from '../../config/colors';
import {upsertLyricsList} from '../../data/realm/hooks/lyrics';
import {Lyrics} from '../../data/realm/models/Lyrics';
import {useRealmContext} from '../../data/realm/models/RealmProvider';
import {useGetList} from '../../query/lyrics';
import {RealmModelNames} from '../../types';

const AppUpdate = () => {
  const realmContext = useRealmContext();
  const {showToast} = useToastContext();
  const lyrics = realmContext
    .useQuery<Lyrics>(RealmModelNames.Lyrics)
    .sorted('createdAt', true)[0];
  if (!lyrics) {
    throw new Error(`Could not find lyrics`);
  }
  const {
    error,
    isLoading,
    data: lyricsList,
  } = useGetList({
    fromDate: dayjs(lyrics.createdAt).toISOString(),
  });
  const createLyrics = useCallback(async () => {
    if (lyricsList?.items?.length) {
      upsertLyricsList(lyricsList?.items ?? []).then(() => {
        showToast({
          text1: 'Opération réussie',
          text2: 'Les dernières paroles ont été téléchargées avec succès',
          visibilityTime: 4000,
          type: 'success',
        });
      });
    }
  }, [lyricsList]);

  return (
    <MainLayout header={<OpenDrawerBotton />}>
      <View style={{flex: 1, padding: 10}}>
        <View style={styles.infoContainer}>
          <Text style={styles.text}>
            Téléchargez les paroles récemment ajoutées
          </Text>
          {isLoading && <Loader />}
          {lyricsList?.items?.length && (
            <View style={styles.downloadInformation}>
              <Text style={[styles.text, styles.boldText, {marginRight: 10}]}>
                {lyricsList.items.length}
              </Text>
              <Text style={styles.text}>parole(s) à télécharger</Text>
            </View>
          )}
          {!lyricsList?.items?.length && <NotFound />}
        </View>
        <CustomButton handlePress={createLyrics} text="Mettre à jour" />
      </View>
    </MainLayout>
  );
};

export default AppUpdate;

const styles = StyleSheet.create({
  text: {
    color: colours.primaryWhite,
  },
  infoContainer: {
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: '800',
  },
  downloadInformation: {
    display: 'flex',
    flexDirection: 'row',
  },
});
