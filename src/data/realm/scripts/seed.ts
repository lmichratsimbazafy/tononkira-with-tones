import axios, {AxiosResponse} from 'axios';
import Realm from 'realm';
import {Lyrics} from '../models/Lyrics';
import {Author} from '../models/Author';
// import {realmConfig} from '../models/RealmProvider';
import {
  //   AuthorApi,
  //   GenericList,
  //   LyricsApi,
  RealmModelNames,
} from '../../../types';
// const Config = require('react-native-config');
const realmConfig = {
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
  const lyricsApiData = await client.get('/lyrics/list');
  const lirycsList = lyricsApiData.data.items;
  const realm = await Realm.open(realmConfig);
  realm.write(() => {
    const authors: Array<any> = [];
    for (const author of authorsList) {
      authors.push(
        realm.create(RealmModelNames.Author, {
          _id: new Realm.BSON.ObjectId(author.id),
          name: author.name,
        }),
      );
    }
    for (const lyrics of lirycsList) {
      const authors = lyrics.authors.map((author: any) => {
        return realm.objectForPrimaryKey(
          Author,
          new Realm.BSON.ObjectId(author.id),
        );
      });
      console.log('authors', authors);
      realm.create(RealmModelNames.Lyrics, {
        _id: new Realm.BSON.ObjectId(lyrics.id),
        lyrics: lyrics.lyrics,
        authors: authors,
        title: lyrics.title,
        tone: lyrics.tone,
      });
    }
  });
  realm.close();

  return;
};

// syncDataWithApi();
