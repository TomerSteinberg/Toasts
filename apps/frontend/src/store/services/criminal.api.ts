import { Criminal } from '../../types';
import { serverApi } from './server.api';

const criminalApi = serverApi.injectEndpoints({
  endpoints: (builder) => ({
    GetCriminals: builder.query<Criminal[], void>({
      query: () => ({ url: 'future_toast', method: 'GET' }),
    }),
  }),
});

export const { useGetCriminalsQuery } = criminalApi;
