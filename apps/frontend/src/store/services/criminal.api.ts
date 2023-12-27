import { Criminal } from '../../types';
import { serverApi } from './server.api';

const criminalApi = serverApi.injectEndpoints({
  endpoints: (builder) => ({
    GetCriminals: builder.query<Criminal[], void>({
      query: () => ({ url: 'criminals', method: 'GET' }),
      providesTags: ['user', 'criminal'],
    }),
    DeleteCriminal: builder.mutation<number, { id: string; adminId: string }>({
      query: (ids) => ({
        url: `criminals/${ids.id}?adminId=${ids.adminId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['criminal'],
    }),
  }),
});

export const { useGetCriminalsQuery, useDeleteCriminalMutation } = criminalApi;
