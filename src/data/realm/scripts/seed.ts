import axios, {AxiosResponse} from 'axios';
import Realm from 'realm';
import {Lyrics} from '../models/Lyrics';
import {Author} from '../models/Author';
// import {realmConfig} from '../models/RealmProvider';
import {
  // AuthorApi,
  // GenericList,
  // LyricsApi,
  RealmModelNames,
} from '../../../types';
// const Config = require('react-native-config');
export const realmConfig: Realm.Configuration = {
  schema: [Author, Lyrics],
  schemaVersion: 5,
  path: 'bundle.realm',
};
const client = axios.create({
  baseURL: 'http://localhost:8080',
});

export const syncDataWithApi = async () => {
  const authorApiData = await client.get('/authors/list');
  const authorsList = authorApiData.data.items;
  console.log('authorsList+ ==>', authorsList);
  const lyricsApiData = await client.get('/lyrics/list');
  const lirycsList = lyricsApiData.data.items;
  console.log('lyrics list', lirycsList);
  const realm = await Realm.open(realmConfig);
  realm.write(() => {
    Promise.all(
      authorsList.map((author: any) =>
        realm.create(RealmModelNames.Author, {
          _id: new Realm.BSON.ObjectId(author.id),
          name: author.name,
        }),
      ),
    );
    Promise.all(
      lirycsList.map((lyrics: any) => {
        realm.create(RealmModelNames.Lyrics, {
          _id: new Realm.BSON.ObjectId(lyrics.id),
          songs: lyrics.lyrics,
          authors: lyrics.authors,
          title: lyrics.title,
          tone: lyrics.tone,
        });
      }),
    );
  });

  return;
};

syncDataWithApi();
