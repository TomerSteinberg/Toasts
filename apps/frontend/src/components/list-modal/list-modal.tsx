import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import styles from './list-modal.module.css';
import { Dispatch, SetStateAction } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useGetPastUserToastsQuery } from '../../store/services/toast.api';
import { useLoginMutation } from '../../store/services/user.api';
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
    fixedCacheKey: 'shared-update-post',
  });

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
          <div className={styles.colName}>
            <label>שם</label>
            <label>שעה</label>
            <label>תאריך</label>
            <label>סיבה לשתיה</label>
            <label>שתיה מפשיעה</label>
          </div>
          <ul>
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
                      pastToast={true}
                      isConvicting={toast.isConvicting}
                      id={toast.id}
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
