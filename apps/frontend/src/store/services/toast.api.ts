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
    GetPastUserToasts: builder.query<Toast[], string>({
      query: (id) => ({ url: `user_past_toasts/${id}`, method: 'GET' }),
    }),
  }),
});

export const {
  useGetFutureToastsQuery,
  useGetLeaderboardQuery,
  useGetTotalToastsQuery,
  useGetPastUserToastsQuery,
} = toastApi;
