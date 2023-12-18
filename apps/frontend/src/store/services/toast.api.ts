import { Toast } from '../../types';
import { serverApi } from './server.api';

const toastApi = serverApi.injectEndpoints({
  endpoints: (builder) => ({
    GetFutureToasts: builder.query<Toast[], void>({
      query: () => ({ url: 'future_toast', method: 'GET' }),
    }),
  }),
});

export const { useGetFutureToastsQuery } = toastApi;
