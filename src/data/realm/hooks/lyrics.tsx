import Realm from 'realm';
import {
  AuthorApi,
  BuildQueryFilter,
  LyricsApi,
  RealmModelNames,
  filterCriterias,
} from '../../../types';
import {realmConfig, useRealmContext} from '../models/RealmProvider';
import {Author} from '../models/Author';

export const refId = (id: unknown) => {
  if (id instanceof Realm.BSON.ObjectId) {
    return id;
  }
  if (typeof id === 'string') {
    return new Realm.BSON.ObjectId(id);
  }
  throw new Error(`Cannot cast to ObjectId value : ${id}`);
};

export const upsertLyricsList = async (lyricsList: LyricsApi[]) => {
  const realm = await Realm.open(realmConfig);
  for (const lyricsItem of lyricsList) {
    upsertLyrics(lyricsItem, realm);
  }
};

export const upsertLyrics = async (lyrics: LyricsApi, realm: Realm) => {
  realm.write(() => {
    const authors = lyrics.authors.map(author => upsertAuthor(author, realm));
    console.log(`Creating lyrics : ${lyrics.title}`);
    realm.create(RealmModelNames.Lyrics, {
      _id: new Realm.BSON.ObjectId(lyrics.id),
      lyrics: lyrics.lyrics,
      authors: authors,
      title: lyrics.title,
      tone: lyrics.tone,
      createdAt: lyrics.createdAt,
      updatedAt: lyrics.updatedAt,
    });
  });
};
const upsertAuthor = (author: AuthorApi, realm: Realm) => {
  const existing = realm.objectForPrimaryKey<Author>(
    RealmModelNames.Author,
    refId(author.id),
  );
  if (existing) {
    return existing;
  }
  console.log(`Creating author : ${author.name}`);
  return realm.create(RealmModelNames.Author, {
    _id: new Realm.BSON.ObjectId(author.id),
    name: author.name,
    createdAt: author.createdAt,
    updatedAt: author.updatedAt,
  });
};
// export const useCreate = <T,>(modelName: RealmModelNames, obj: Partial<T>) => {
//   return realm.write(() => {
//     realm.create(modelName, {
//       ...obj,
//       _id: (obj as unknown as {id: string}).id
//         ? new Realm.BSON.ObjectId((obj as unknown as {id: string}).id)
//         : new Realm.BSON.ObjectId(),
//     });
//   });
// };

export const useList = <T,>(
  modelName: RealmModelNames,
  p: {
    filter?: {
      [field in string]: {criteria: filterCriterias; value: any};
    };
    sort?: {
      field: string;
      reversed: boolean;
    };
  },
) => {
  const {useQuery} = useRealmContext();
  let listResult = useQuery<T>(modelName);
  const buildQuery = (filter: BuildQueryFilter) => {
    let query = '';
    Object.keys(filter).map((key, index) => {
      query += `${key} ${filter[key].criteria} "${filter[key].value}"`;
      if (index < Object.keys(filter).length - 1) {
        query += 'AND';
      }
    });
    return query;
  };

  if (p.filter) {
    listResult = listResult.filtered(buildQuery({...p.filter}));
  }
  if (p.sort) {
    listResult = listResult.sorted(p.sort.field, p.sort.reversed);
  }
  return listResult;
};

export const useFind = <T,>(
  modelName: RealmModelNames,
  {_id}: {_id: T[keyof T]},
) => {
  const {useObject} = useRealmContext();
  return useObject<T>(modelName, _id);
};

export const useDeleteOne = <T,>(
  modelName: RealmModelNames,
  _id: T[keyof T],
) => {
  const {useObject, useRealm} = useRealmContext();
  const realm = useRealm();
  const obj = useObject<T>(modelName, _id);
  return realm.write(() => {
    realm.delete(obj);
  });
};
