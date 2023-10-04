import {AuthorsListPayload} from '../query/authors';
import {client} from './axiosClient';

export const list = async (payload: AuthorsListPayload) => {
  return await client
    .get('/authors/list', {
      params: {
        payload,
      },
    })
    .then(res => res.data);
};
