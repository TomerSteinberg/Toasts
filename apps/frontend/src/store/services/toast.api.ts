import { Toast, Score, Record, UpdateToast } from '../../types';
import { AddToast } from '../../types/add-toast.type';
import { serverApi } from './server.api';

const toastApi = serverApi.injectEndpoints({
  endpoints: (builder) => ({
    GetFutureToasts: builder.query<Toast[], void>({
      query: () => ({ url: 'future_toast', method: 'GET' }),
      providesTags: ['toasts'],
    }),
    GetLeaderboard: builder.query<Score[], void>({
      query: () => ({ url: 'leaderboard', method: 'GET' }),
      providesTags: ['user'],
    }),
    GetTotalToasts: builder.query<Record, void>({
      query: () => ({ url: 'count_toasts', method: 'GET' }),
    }),
    GetPastUserToasts: builder.query<Toast[], string>({
      query: (id) => ({ url: `user_past_toasts/${id}`, method: 'GET' }),
      providesTags: ['user', 'criminal'],
      serializeQueryArgs: (arg) => ({ id: arg }),
    }),
    DeleteToast: builder.mutation<number, { id: string; userId: string }>({
      query: (ids) => ({
        url: `remove_toast/${ids.id}?userId=${ids.userId}`,
        method: 'GET',
      }),
      invalidatesTags: ['toasts'],
    }),
    CreateToast: builder.mutation<Toast, AddToast>({
      query: (body) => ({
        url: 'toast',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['toasts'],
    }),
    UpdateToast: builder.mutation<number, UpdateToast>({
      query: (body) => ({
        url: `toast/${body.id}/?userId=${body.userId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['toasts', 'criminal'],
    }),
  }),
});

export const {
  useGetFutureToastsQuery,
  useGetLeaderboardQuery,
  useGetTotalToastsQuery,
  useGetPastUserToastsQuery,
  useDeleteToastMutation,
  useCreateToastMutation,
  useUpdateToastMutation,
} = toastApi;
