import { useLoginMutation } from '../../store/services/user.api';
import ClearIcon from '@mui/icons-material/Clear';
import styles from './criminal.module.css';
import { Tooltip } from '@mui/material';
import {
  useDeleteCriminalMutation,
  useUpdateCriminalMutation,
} from '../../store/services/criminal.api';
import { Checkbox } from '@mui/material';

export interface Props {
  username: string;
  type: boolean;
  id: string;
}

export const Criminal: React.FC<Props> = ({ username, type, id }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, result] = useLoginMutation({
    fixedCacheKey: 'userKey',
  });

  const [updateCriminalTrigger] = useUpdateCriminalMutation();
  const [deleteCriminalTrigger] = useDeleteCriminalMutation();
  const updateCriminal = async () => {
    if (result.data && result.data.isAdmin) {
      await updateCriminalTrigger({
        criminalType: !type,
        id: id,
        adminId: result.data.id,
      });
    }
  };

  const deleteCriminal = async () => {
    if (result.data && result.data.isAdmin) {
      await deleteCriminalTrigger({ id: id, adminId: result.data.id });
    }
  };

  return (
    <div className={styles.container}>
      {result.data && result.data.isAdmin && (
        <button
          className={styles.criminalButton}
          onClick={() => {
            deleteCriminal();
          }}
        >
          <Tooltip title="מחיקת פושע">
            <ClearIcon className={styles.criminalIcon}></ClearIcon>
          </Tooltip>
        </button>
      )}
      <p>{username}</p>
      <p>{type ? 'פרסונה נון גרטה' : 'פושע רגיל'}</p>
      {result.data && result.data.isAdmin && (
        <Tooltip title="סוג פושע">
          <Checkbox
            checked={type ? true : false}
            onChange={() => {
              updateCriminal();
            }}
            sx={{
              color: 'black',
              '&.Mui-checked': {
                color: 'black',
              },
            }}
          ></Checkbox>
        </Tooltip>
      )}
    </div>
  );
};
