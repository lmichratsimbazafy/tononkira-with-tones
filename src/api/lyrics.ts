import {AxiosResponse} from 'axios';
import {GenericList, LyricsApi, LyricsListPayload} from '../types';
import {client} from './axiosClient';

export const list = async (payload: LyricsListPayload) => {
  return await client
    .get<GenericList<LyricsApi>, AxiosResponse<GenericList<LyricsApi>>>(
      '/lyrics/list',
      {
        params: {
          ...payload,
        },
      },
    )
    .then(res => res.data);
};
