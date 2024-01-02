import { Toast, Score, Record, UpdateToast } from '../../types';
import { AddToast } from '../../types/add-toast.type';
import { serverApi } from './server.api';

const toastApi = serverApi.injectEndpoints({
  endpoints: (builder) => ({
    GetFutureToasts: builder.query<Toast[], void>({
      query: () => ({ url: 'toasts/future_toast', method: 'GET' }),
      providesTags: ['toasts'],
    }),
    GetLeaderboard: builder.query<Score[], void>({
      query: () => ({ url: 'toasts/leaderboard', method: 'GET' }),
      providesTags: ['user'],
    }),
    GetTotalToasts: builder.query<Record, void>({
      query: () => ({ url: 'toasts/count_toasts', method: 'GET' }),
      providesTags: ['score'],
    }),
    GetPastUserToasts: builder.query<Toast[], string>({
      query: (id) => ({ url: `toasts/user_past_toasts/${id}`, method: 'GET' }),
      providesTags: ['user', 'criminal'],
      serializeQueryArgs: (arg) => ({ id: arg }),
    }),
    DeleteToast: builder.mutation<number, { id: string; userId: string }>({
      query: ({ id, userId }) => ({
        url: `toasts/${id}?userId=${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['toasts'],
    }),
    CreateToast: builder.mutation<Toast, AddToast>({
      query: (body) => ({
        url: 'toasts',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['toasts'],
    }),
    UpdateToast: builder.mutation<number, UpdateToast>({
      query: (body) => ({
        url: `toasts/${body.id}/?userId=${body.userId}`,
        method: 'PATCH',
        body: {
          reason: body.reason,
          date: body.date,
          isConvicting: body.isConvicting,
        },
      }),
      invalidatesTags: ['toasts', 'criminal', 'score'],
    }),
  }),
});

export const {
  useGetFutureToastsQuery,
  useGetLeaderboardQuery,
  useGetTotalToastsQuery,
  useLazyGetPastUserToastsQuery,
  useGetPastUserToastsQuery,
  useDeleteToastMutation,
  useCreateToastMutation,
  useUpdateToastMutation,
} = toastApi;
