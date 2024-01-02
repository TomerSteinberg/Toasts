import { Checkbox, Tooltip } from '@mui/material';
import {
  useLoginMutation,
  useMakeAdminMutation,
} from '../../store/services/user.api';
import styles from './user.module.css';

export interface Props {
  username: string;
  id: string;
  isAdmin: boolean;
}

export const User: React.FC<Props> = ({ username, id, isAdmin }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, result] = useLoginMutation({
    fixedCacheKey: 'userKey',
  });

  const [triggerMakeAdmin] = useMakeAdminMutation();

  const makeAdmin = async () => {
    if (result.data) {
      triggerMakeAdmin({ id, adminId: result.data.id });
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.userText}>{username}</p>
      <Tooltip title="הרשאת מנהל">
        <Checkbox
          onChange={() => {
            makeAdmin();
          }}
          checked={isAdmin}
          disabled={isAdmin}
          sx={{
            color: 'black',
            '&.Mui-checked': {
              color: 'black',
            },
          }}
        ></Checkbox>
      </Tooltip>
    </div>
  );
};
