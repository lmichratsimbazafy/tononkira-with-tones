/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NavigationProvider} from './src/components/navigation/MainRouter';
import {useRealmContext} from './src/data/realm/models/RealmProvider';
import Realm from 'realm';
import {ToastProvider} from './src/components/providers/ToastProvider';
import Toast from 'react-native-toast-message';

Realm.copyBundledRealmFiles();
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  console.log('isDarkMode ===>');
  const {RealmProvider} = useRealmContext();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RealmProvider>
        <ToastProvider>
          <NavigationProvider />
        </ToastProvider>
      </RealmProvider>
      <Toast />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
