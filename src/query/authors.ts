import {useQuery} from '@tanstack/react-query';
import {list} from '../api/authors';

export interface AuthorsListPayload {
  name?: string;
}

const authorKeys = {
  all: ['authors'],
  lists: () => [...authorKeys.all, 'list'],
  list: (params: AuthorsListPayload) => [...authorKeys.lists(), params],
};
export const useGetList = (payload: AuthorsListPayload) => {
  return useQuery({
    queryKey: authorKeys.list(payload),
    queryFn: async () => await list(payload),
    keepPreviousData: true,
  });
};
