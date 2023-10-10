import Realm, {BaseObjectSchema, PropertiesTypes} from 'realm';
import {RealmModelNames} from '../../../types';
import {Author} from './Author';

export class Lyrics extends Realm.Object<Lyrics, '_id' | 'lyrics'> {
  _id!: Realm.BSON.ObjectId;
  lyrics!: string[];
  authors!: Realm.List<Author>;
  title!: string;
  tone!: string;
  createdAt!: Date;
  updatedAt!: Date;

  static schema: BaseObjectSchema & {
    properties: PropertiesTypes;
  } = {
    name: RealmModelNames.Lyrics,
    properties: {
      _id: 'objectId',
      lyrics: 'string[]',
      authors: 'Author[]',
      title: {type: 'string', indexed: true},
      tone: 'string',
      createdAt: {type: 'date', default: new Date()},
      updatedAt: {type: 'date', default: new Date()},
    },
    primaryKey: '_id',
  };
}
