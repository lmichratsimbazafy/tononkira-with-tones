import {createRealmContext} from '@realm/react';
import {Author} from './Author';
import {Lyrics} from './Lyrics';

export const realmConfig: Realm.Configuration = {
  schema: [Author, Lyrics],
  schemaVersion: 5,
  path: 'bundle.realm',
};

export const realmContext = createRealmContext(realmConfig);
export const useRealmContext = () => realmContext;
