import { Toast, Score, Record } from '../../types';
import { serverApi } from './server.api';

const toastApi = serverApi.injectEndpoints({
  endpoints: (builder) => ({
    GetFutureToasts: builder.query<Toast[], void>({
      query: () => ({ url: 'future_toast', method: 'GET' }),
    }),
    GetLeaderboard: builder.query<Score[], void>({
      query: () => ({ url: 'leaderboard', method: 'GET' }),
    }),
    GetTotalToasts: builder.query<Record, void>({
      query: () => ({ url: 'count_toasts', method: 'GET' }),
    }),
  }),
});

export const {
  useGetFutureToastsQuery,
  useGetLeaderboardQuery,
  useGetTotalToastsQuery,
} = toastApi;
