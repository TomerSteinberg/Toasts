import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import styles from './list-modal.module.css';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useGetPastUserToastsQuery } from '../../store/services/toast.api';
import { useGetUsersQuery, useLoginMutation } from '../../store/services';
import { Toast } from '../toast';
import { format } from 'date-fns';
import { User } from '../user';
import { UserSelect } from '../user-select/user-select';

export interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isShowHistory: boolean;
  title: string;
}

export const ListModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  isShowHistory,
  title,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, result] = useLoginMutation({
    fixedCacheKey: 'userKey',
  });

  const { data: allUsers } = useGetUsersQuery();
  const [selectedUser, setSelectedUser] = useState<string | null>(
    result.data?.username ?? null
  );
  const { data: toasts } = useGetPastUserToastsQuery(selectedUser ?? '', {
    skip: !selectedUser || !result.data,
  });

  useEffect(() => {
    if (result.data && !selectedUser) {
      setSelectedUser(result.data.id);
    }
  }, [result.data, selectedUser]);

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
          {isShowHistory && result.data && result.data.isAdmin && (
            <UserSelect
              selectFunction={setSelectedUser}
              defaultValue={selectedUser}
              selectedUser={selectedUser}
            />
          )}
          <ul className={styles.toastList}>
            {isShowHistory &&
              toasts &&
              toasts.map(({ id, reason, date, isConvicting, userId, user }) => {
                return (
                  <li key={id}>
                    <Toast
                      name={user.username}
                      reason={reason}
                      date={format(new Date(date), 'dd/MM/yyyy kk:mm')}
                      isUserToast={false}
                      isPastToast
                      isConvicting={isConvicting}
                      id={id}
                      userId={userId}
                    ></Toast>
                  </li>
                );
              })}
            {isShowHistory && toasts && !toasts.length && (
              <p className={styles.emptyText}>אין שתיות בהיסטוריה</p>
            )}

            {!isShowHistory &&
              allUsers &&
              allUsers.map((user) => {
                return (
                  <li key={user.id}>
                    <User {...user} />
                  </li>
                );
              })}
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
};
