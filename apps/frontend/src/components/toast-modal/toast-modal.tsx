import { ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import styles from './toast-modal.module.css';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import {
  useCreateToastMutation,
  useUpdateToastMutation,
} from '../../store/services';
import { useLoginMutation } from '../../store/services/user.api';
import { UserSelect } from '../user-select/user-select';

export interface Props {
  title: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  defaultDate?: string;
  defaultReason?: string;
  toastId?: string;
}

export const ToastModal: React.FC<Props> = ({
  title,
  isOpen,
  setIsOpen,
  defaultDate,
  defaultReason,
  toastId,
}) => {
  const parsedDate = defaultDate
    ? defaultDate.split(' ')[0].split('/').reverse().join('-')
    : '';
  const parsedTime = defaultDate ? defaultDate.split(' ')[1] : '';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, result] = useLoginMutation({
    fixedCacheKey: 'userKey',
  });
  const [createTrigger] = useCreateToastMutation();
  const [updateTrigger] = useUpdateToastMutation();
  const [date, setDate] = useState(parsedDate);
  const [time, setTime] = useState(parsedTime);
  const [reason, setReason] = useState(defaultReason ?? '');
  const [selectedUser, setSelectedUser] = useState<string | null>(
    result.data?.username ?? null
  );

  useEffect(() => {
    if (result.data && !selectedUser) {
      setSelectedUser(result.data.id);
    }
  }, [result.data, selectedUser]);

  const isUpdateMode = defaultDate !== undefined && defaultReason !== undefined;

  const createToast = async () => {
    if (result.data && reason && selectedUser) {
      await createTrigger({
        reason,
        userId:
          result.data.isAdmin && selectedUser !== ''
            ? selectedUser
            : result.data.id,
        date: new Date(date + ' ' + time).toISOString(),
      });
      setSelectedUser('');
    }
  };

  const updateToast = async () => {
    if (result.data && toastId) {
      await updateTrigger({
        reason,
        date: new Date(date + ' ' + time).toISOString(),
        id: toastId,
        userId: result.data.id,
      });
    }
  };

  const resetStates = () => {
    if (defaultReason !== undefined && defaultDate !== undefined) {
      setReason(defaultReason);
      setDate(parsedDate);
      setTime(parsedTime);
      return;
    }
    setTime('');
    setDate('');
    setReason('');
    setSelectedUser('');
  };

  const handleClose = () => {
    setIsOpen(false);
    resetStates();
  };

  const inputsFilled = (): boolean => {
    return (
      date === '' ||
      (reason !== undefined && reason.length === 0) ||
      time.length === 0
    );
  };
  const allInputsFilled: boolean = inputsFilled();

  return (
    <div className={styles.container}>
      <Dialog
        sx={{ borderRadius: '1.5vh' }}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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
          {title}
        </DialogTitle>
        <DialogContent
          sx={{
            background: '#f9eeda',
            display: 'flex',
            flexDirection: 'column',
            gap: '1em',
          }}
        >
          <div className={styles.pickerContainer}>
            <input
              defaultValue={parsedDate}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (new Date(e.target.value) >= new Date()) {
                  setDate(e.target.value);
                  return;
                }
                setDate('');
              }}
              type="date"
            />
            <input
              defaultValue={parsedTime}
              className={styles.timeInput}
              type="time"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setTime(e.target.value);
              }}
            />
          </div>
          <input
            defaultValue={defaultReason}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setReason(e.target.value);
            }}
            maxLength={20}
            placeholder="סיבה לשתיה"
          />
          {result.data && result.data.isAdmin && !isUpdateMode && (
            <UserSelect
              selectFunction={setSelectedUser}
              selectedUser={selectedUser}
              defaultValue={selectedUser}
            />
          )}
          <div className={styles.actionContainer}>
            <button
              className={
                allInputsFilled
                  ? styles.modalButtonDisabled
                  : styles.modalButton
              }
              disabled={allInputsFilled ? true : false}
              onClick={() => {
                isUpdateMode ? updateToast() : createToast();
                handleClose();
              }}
            >
              שמור
            </button>
            <button
              className={styles.modalButton}
              onClick={() => {
                handleClose();
              }}
            >
              סגור
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
