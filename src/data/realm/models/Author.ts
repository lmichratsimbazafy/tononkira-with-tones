import Realm from 'realm';
import { Lyrics } from "./Lyrics"
import { RealmModelNames } from '../../../types';

export class Author extends Realm.Object<Author, '_id' | 'name'> {
    _id!: Realm.BSON.ObjectId
    name!: string
    songs!: Realm.List<Lyrics>
    static schema = {
        name: RealmModelNames.Author,
        properties: {
            _id: 'objectId',
            name: 'string',
            songs: 'Lyrics[]'
        },
        primaryKey: '_id',
    }
}