export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Update: undefined;
  Details: {lyricsId: string};
  Program: undefined;
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
  createdAt: string;
  updatedAt: string;
}

export interface LyricsApi {
  id: string;
  lyrics: string[];
  authors: AuthorApi[];
  tone: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface GenericList<T> {
  items: T[];
  totalItems: number;
  itemsPerPage: number;
  page: number;
  itemCount: number;
}

export interface LyricsListPayload {
  title?: string;
  fromDate?: string;
}
