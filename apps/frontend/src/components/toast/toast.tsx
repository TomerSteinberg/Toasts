import styles from './toast.module.css';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { Tooltip, Checkbox } from '@mui/material';
import { useState } from 'react';
import { ToastModal } from '../toast-modal';
import { useLoginMutation } from '../../store/services/user.api';
import { useLazyDeleteToastQuery } from '../../store/services/toast.api';

export interface Props {
  name: string;
  date: string;
  reason: string;
  pastToast: boolean;
  isUserToast: boolean;
  isConvicting?: boolean;
  id: string;
}
export const Toast: React.FC<Props> = ({
  name,
  date,
  reason,
  pastToast,
  isUserToast,
  isConvicting,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, result] = useLoginMutation({
    fixedCacheKey: 'shared-update-post',
  });

  const [trigger] = useLazyDeleteToastQuery();

  const deleteToast = async (id: string, userId: string) => {
    await trigger({ id: id, userId: userId });
  };
  return (
    <div className={styles.container}>
      {!pastToast && isUserToast && (
        <button
          className={styles.toastBtn}
          onClick={() => {
            if (result.data) {
              deleteToast(id, result.data.id);
            }
          }}
        >
          <Tooltip title="מחיקת שתיה">
            <ClearIcon className={styles.toastIcon} />
          </Tooltip>
        </button>
      )}
      <p>{name}</p>
      <p>{date}</p>
      <p>{reason}</p>
      {!pastToast && isUserToast && (
        <button
          className={styles.toastBtn}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <Tooltip title="שינוי שתיה">
            <EditIcon className={styles.toastIcon} />
          </Tooltip>
        </button>
      )}
      {pastToast && (
        <Checkbox
          checked={isConvicting ? true : false}
          disabled={true}
          sx={{
            color: 'black',
            '&.Mui-checked': {
              color: 'black',
            },
          }}
        ></Checkbox>
      )}
      <ToastModal
        title="שינוי שתיה"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        defaultDate={date}
        defaultReason={reason}
      />
    </div>
  );
};
