import { Criminal } from '../../types';
import { serverApi } from './server.api';

const criminalApi = serverApi.injectEndpoints({
  endpoints: (builder) => ({
    GetCriminals: builder.query<Criminal[], void>({
      query: () => ({ url: 'criminals', method: 'GET' }),
      providesTags: ['user'],
    }),
  }),
});

export const { useGetCriminalsQuery } = criminalApi;
