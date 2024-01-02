import { UpdateUserInput } from '../../types';
import { LoggedUser } from '../../types/logged-user.type';
import { LoginInput } from '../../types/login.type';
import { serverApi } from './server.api';

const userApi = serverApi.injectEndpoints({
  endpoints: (builder) => ({
    Login: builder.mutation<LoggedUser, LoginInput>({
      query: (body) => ({ url: 'users/login', method: 'POST', body }),
    }),
    UpdateUser: builder.mutation<number, UpdateUserInput>({
      query: (body) => ({ url: `users/${body.id}`, method: 'PATCH', body }),
      invalidatesTags: ['toasts', 'user'],
    }),
    Signup: builder.mutation<LoggedUser, LoginInput>({
      query: (body) => ({
        url: 'users/signup',
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
      query: ({ id, adminId }) => ({
        url: `users/make_admin/${id}?adminId=${adminId}`,
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
