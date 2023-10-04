export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Update: undefined;
};

export enum RealmModelNames {
  Author = 'Author',
  Lyrics = 'Lyrics',
}

export type filterCriterias =
  | 'CONTAINS[c]'
  | 'CONTAINS'
  | 'BEGINSWITH[c]'
  | 'BEGINSWITH'
  | 'ENDSWITH[c]'
  | 'ENDSWITH'
  | 'IN'
  | '<'
  | '<='
  | '>'
  | '>='
  | '=='
  | '!=';
export interface BuildQueryFilter {
  [field: string]: {criteria: string; value: string | number | Date};
}

export interface AuthorApi {
  id: string;
  name: string;
  song: LyricsApi[] | null;
}

export interface LyricsApi {
  id: string;
  lyrics: string[];
  authors: string[];
  tone: string;
  title: string;
}

export interface GenericList<T> {
  items: T[];
  totalItems: number;
  itemsPerPage: number;
  page: number;
  itemCount: number;
}
