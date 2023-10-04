import Realm from 'realm';
import {RealmModelNames} from '../../../types';
import {Author} from './Author';

export class Lyrics extends Realm.Object<Lyrics, '_id' | 'lyrics'> {
  _id!: Realm.BSON.ObjectId;
  lyrics!: string[];
  authors!: Author[];
  title!: string;
  tone!: string;

  static schema = {
    name: RealmModelNames.Lyrics,
    properties: {
      _id: 'objectId',
      lyrics: 'string[]',
      authors: 'Author[]',
      title: 'string',
      tone: 'string',
    },
    primaryKey: '_id',
  };
}
