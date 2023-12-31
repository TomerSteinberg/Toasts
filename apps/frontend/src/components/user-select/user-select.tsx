import { MenuItem, Select } from '@mui/material';
import {
  useGetUsersQuery,
  useLoginMutation,
} from '../../store/services/user.api';
import styles from './user-select.module.css';

export interface Props {
  selectFunction: (param: string) => void;
}

export const UserSelect: React.FC<Props> = ({ selectFunction }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, result] = useLoginMutation({
    fixedCacheKey: 'userKey',
  });

  const { data: allUsers } = useGetUsersQuery();

  return (
    <div className={styles.container}>
      {result.data && (
        <Select
          onChange={(e) => {
            selectFunction(e.target.value);
          }}
          defaultValue={result.data.id}
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
            allUsers.map((user) => {
              return (
                <MenuItem dir="rtl" value={user.id}>
                  {user.username}
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
