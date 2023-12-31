import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import styles from './list-modal.module.css';
import { Dispatch, SetStateAction, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useLazyGetPastUserToastsQuery } from '../../store/services/toast.api';
import {
  useGetUsersQuery,
  useLoginMutation,
} from '../../store/services/user.api';
import { Toast as ToastType } from '../../types';
import { Toast } from '../toast';
import { format } from 'date-fns';
import { User } from '../user';
import { UserSelect } from '../user-select/user-select';

export interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isHistory: boolean;
  title: string;
}

export const ListModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  isHistory,
  title,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, result] = useLoginMutation({
    fixedCacheKey: 'userKey',
  });

  const { data: allUsers } = useGetUsersQuery();

  const [triggerPastToasts, toasts] = useLazyGetPastUserToastsQuery();
  useEffect(() => {
    if (result.data) {
      triggerPastToasts(result.data.id);
    }
  }, [result.data, isOpen]);

  const getUserHistory = async (id: string) => {
    triggerPastToasts(id);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <Dialog
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '30em',
            },
          },
        }}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
            fontSize: '2rem',
            textAlign: 'center',
            fontFamily: 'Segoe UI',
            backgroundColor: '#f9eeda',
          }}
        >
          <div className={styles.titleContainer}>
            <h2 className={styles.titleText}> {title}</h2>
            <button
              className={styles.closeBtn}
              onClick={() => {
                handleClose();
              }}
            >
              <CloseIcon className={styles.closeIcon} />
            </button>
          </div>
        </DialogTitle>
        <DialogContent
          sx={{
            background: '#f9eeda',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {isHistory && result.data && result.data.isAdmin && (
            <UserSelect selectFunction={getUserHistory} />
          )}
          <ul className={styles.toastList}>
            {isHistory &&
              toasts.data &&
              toasts.data.map((toast: ToastType) => {
                return (
                  <li key={toast.id}>
                    <Toast
                      name={toast.user.username}
                      reason={toast.reason}
                      date={format(new Date(toast.date), 'dd/MM/yyyy kk:mm')}
                      isUserToast={false}
                      isPastToast={true}
                      isConvicting={toast.isConvicting}
                      id={toast.id}
                      userId={toast.userId}
                    ></Toast>
                  </li>
                );
              })}
            {isHistory && toasts.data && toasts.data.length === 0 && (
              <p className={styles.emptyText}>אין שתיות בהיסטוריה</p>
            )}

            {!isHistory &&
              allUsers &&
              allUsers.map((user) => {
                return (
                  <li>
                    <User
                      username={user.username}
                      id={user.id}
                      isAdmin={user.isAdmin}
                    />
                  </li>
                );
              })}
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
};
