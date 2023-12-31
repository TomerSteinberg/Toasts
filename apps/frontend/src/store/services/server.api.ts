import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const serverApi = createApi({
  reducerPath: 'serverApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  tagTypes: ['toasts', 'user', 'criminal', 'score'],
  endpoints: (builder) => ({}),
});
