import {useQuery} from '@tanstack/react-query';
import {LyricsListPayload} from '../types';
import {list} from '../api/lyrics';

const lyricsKeys = {
  all: ['lyrics'],
  lists: () => [...lyricsKeys.all, 'list'],
  list: (params: LyricsListPayload) => [...lyricsKeys.lists(), params],
};
export const useGetList = (payload: LyricsListPayload) => {
  return useQuery({
    queryKey: lyricsKeys.list(payload),
    queryFn: async () => await list(payload),
    keepPreviousData: true,
  });
};
