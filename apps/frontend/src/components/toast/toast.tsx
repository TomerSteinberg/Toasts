import styles from './toast.module.css';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { Tooltip, Checkbox } from '@mui/material';
import { useState } from 'react';
import { ToastModal } from '../toast-modal';
import { useLoginMutation } from '../../store/services/user.api';
import {
  useDeleteToastMutation,
  useUpdateToastMutation,
} from '../../store/services/toast.api';
import {
  useCreateCriminalMutation,
  useGetCriminalsQuery,
} from '../../store/services/criminal.api';

export interface Props {
  name: string;
  date: string;
  reason: string;
  isPastToast: boolean;
  isUserToast: boolean;
  isConvicting?: boolean;
  id: string;
  userId: string;
}
export const Toast: React.FC<Props> = ({
  name,
  date,
  reason,
  isPastToast,
  isUserToast,
  isConvicting,
  id,
  userId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, result] = useLoginMutation({
    fixedCacheKey: 'userKey',
  });

  const [trigger] = useDeleteToastMutation();
  const [triggerUpdate] = useUpdateToastMutation();
  const { data: criminals } = useGetCriminalsQuery();
  const [triggerCreateCriminal] = useCreateCriminalMutation();

  const updateToastDidHappen = async () => {
    if (result.data && result.data.isAdmin) {
      await triggerUpdate({
        userId: userId,
        isConvicting: !isConvicting,
        id: id,
      });
      if (
        !isConvicting &&
        criminals &&
        !criminals.find((criminal) => criminal.users.id === userId)
      ) {
        triggerCreateCriminal({
          criminalType: false,
          userId: userId,
          adminId: result.data.id,
        });
      }
    }
  };

  const deleteToast = async (id: string, userId: string) => {
    await trigger({ id: id, userId: userId });
  };
  return (
    <div className={isPastToast ? styles.pastContainer : styles.container}>
      <p className={isPastToast ? styles.pastText : styles.toastText}>{name}</p>
      <p className={isPastToast ? styles.pastText : styles.toastText}>
        {reason}
      </p>
      <label>{date}</label>
      {!isPastToast && isUserToast && (
        <div className={styles.toastButtonContainer}>
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
        </div>
      )}
      {isPastToast && (
        <Tooltip title="?שתיה מפשיעה">
          <Checkbox
            onChange={() => {
              updateToastDidHappen();
            }}
            checked={isConvicting ? true : false}
            disabled={result.data && !result.data.isAdmin}
            sx={{
              color: 'black',
              '&.Mui-checked': {
                color: 'black',
              },
            }}
          ></Checkbox>
        </Tooltip>
      )}

      {!isPastToast && !isUserToast && (
        <div className={styles.emptyContainer}></div>
      )}
      <ToastModal
        title="שינוי שתיה"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        defaultDate={date}
        defaultReason={reason}
        toastId={id}
      />
    </div>
  );
};
