import { LoggedUser } from '../../types/logged-user.type';
import { Login } from '../../types/login.type';
import { serverApi } from './server.api';

const userApi = serverApi.injectEndpoints({
  endpoints: (builder) => ({
    Login: builder.mutation<LoggedUser, Login>({
      query: (body) => ({ url: 'login', method: 'POST', body }),
    }),
  }),
});

export const { useLoginMutation } = userApi;
