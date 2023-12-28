import {
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
} from '@mui/material';
import styles from './list-modal.module.css';
import { Dispatch, SetStateAction } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useGetPastUserToastsQuery } from '../../store/services/toast.api';
import {
  useGetUsersQuery,
  useLoginMutation,
} from '../../store/services/user.api';
import { Toast as ToastType } from '../../types';
import { Toast } from '../toast';
import { format } from 'date-fns';

export interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ListModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, result] = useLoginMutation({
    fixedCacheKey: 'userKey',
  });

  const { data: allUsers } = useGetUsersQuery();

  const {
    data: toasts,
    isLoading,
    isError,
  } = useGetPastUserToastsQuery(
    !result.isSuccess || !result.data ? '' : result.data.id,
    {
      skip: !result.isSuccess,
    }
  );

  const getUserHistory = async (id: string) => {
    //refetch(id);
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
            <h2> היסטורית שתיות </h2>
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
          {result.data && result.data.isAdmin && (
            <Select
              onChange={(e) => {
                getUserHistory(e.target.value);
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
          <ul className={styles.toastList}>
            {toasts &&
              !isError &&
              !isLoading &&
              toasts.map((toast: ToastType) => {
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
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
};
