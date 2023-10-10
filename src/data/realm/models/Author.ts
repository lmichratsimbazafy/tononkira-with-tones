import Realm, {BaseObjectSchema, PropertiesTypes} from 'realm';
import {Lyrics} from './Lyrics';
import {RealmModelNames} from '../../../types';

export class Author extends Realm.Object<Author, '_id' | 'name'> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  songs!: Realm.List<Lyrics>;
  createdAt!: Date;
  updatedAt!: Date;
  static schema: BaseObjectSchema & {
    properties: PropertiesTypes;
  } = {
    name: RealmModelNames.Author,
    properties: {
      _id: 'objectId',
      name: 'string',
      songs: 'Lyrics[]',
      createdAt: {type: 'date', default: new Date()},
      updatedAt: {type: 'date', default: new Date()},
    },
    primaryKey: '_id',
  };
}
