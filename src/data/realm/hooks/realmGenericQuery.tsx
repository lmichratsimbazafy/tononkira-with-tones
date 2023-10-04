import Realm from 'realm';
import {
  BuildQueryFilter,
  RealmModelNames,
  filterCriterias,
} from '../../../types';
import {useRealmContext} from '../models/RealmProvider';

export const refId = (id: unknown) => {
  if (id instanceof Realm.BSON.ObjectId) {
    return id;
  }
  if (typeof id === 'string') {
    return new Realm.BSON.ObjectId(id);
  }
  throw new Error(`Cannot cast to ObjectId value : ${id}`);
};
export const useCreate = <T,>(modelName: RealmModelNames, obj: Partial<T>) => {
  const {useRealm} = useRealmContext();
  const realm = useRealm();
  return realm.write(() => {
    realm.create(modelName, {
      ...obj,
      _id: (obj as unknown as {id: string}).id
        ? new Realm.BSON.ObjectId((obj as unknown as {id: string}).id)
        : new Realm.BSON.ObjectId(),
    });
  });
};

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
