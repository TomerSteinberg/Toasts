import { MenuItem, Select } from '@mui/material';
import {
  useGetUsersQuery,
  useLoginMutation,
} from '../../store/services/user.api';
import styles from './user-select.module.css';

export interface Props {
  selectFunction: (param: string | null) => void;
  defaultValue?: string | null;
  selectedUser: string | null;
}

export const UserSelect: React.FC<Props> = ({
  selectFunction,
  defaultValue = null,
  selectedUser,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, result] = useLoginMutation({
    fixedCacheKey: 'userKey',
  });

  const { data: allUsers } = useGetUsersQuery();

  return (
    <div className={styles.container}>
      {result.data && (
        <Select
          value={selectedUser}
          onChange={(e) => {
            selectFunction(e.target.value);
          }}
          defaultValue={defaultValue}
          dir="rtl"
          autoWidth
          sx={{
            maxWidth: '60%',
            marginLeft: '20%',
            marginBottom: '5%',
            maxHeight: '20%',
          }}
        >
          {allUsers ? (
            allUsers.map(({ id, username }) => {
              return (
                <MenuItem key={id} dir="rtl" value={id}>
                  {username}
                </MenuItem>
              );
            })
          ) : (
            <p>אין</p>
          )}
        </Select>
      )}
    </div>
  );
};
