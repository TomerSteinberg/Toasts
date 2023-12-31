import { UpdateUser } from '../../types';
import { LoggedUser } from '../../types/logged-user.type';
import { Login } from '../../types/login.type';
import { serverApi } from './server.api';

const userApi = serverApi.injectEndpoints({
  endpoints: (builder) => ({
    Login: builder.mutation<LoggedUser, Login>({
      query: (body) => ({ url: 'login', method: 'POST', body }),
    }),
    UpdateUser: builder.mutation<number, UpdateUser>({
      query: (body) => ({ url: `user/${body.id}`, method: 'PATCH', body }),
      invalidatesTags: ['toasts', 'user'],
    }),
    Signup: builder.mutation<LoggedUser, Login>({
      query: (body) => ({
        url: 'signup',
        method: 'POST',
        body,
      }),
    }),
    GetUsers: builder.query<
      { username: string; id: string; isAdmin: boolean }[],
      void
    >({
      query: () => ({
        url: 'users',
        method: 'GET',
      }),
      providesTags: ['user'],
    }),
    MakeAdmin: builder.mutation<number, { id: string; adminId: string }>({
      query: (ids) => ({
        url: `make_admin/${ids.id}?adminId=${ids.adminId}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['user'],
    }),
  }),
});

export const {
  useLoginMutation,
  useUpdateUserMutation,
  useSignupMutation,
  useGetUsersQuery,
  useMakeAdminMutation,
} = userApi;
