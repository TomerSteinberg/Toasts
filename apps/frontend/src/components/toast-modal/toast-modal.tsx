import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import styles from './toast-modal.module.css';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';

export interface Props {
  title: string;
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  defaultDate?: string;
  defaultReason?: string;
}

export const ToastModal: React.FC<Props> = ({
  title,
  openModal,
  setOpenModal,
  defaultDate,
  defaultReason,
}) => {
  const [date, setDate] = useState(
    defaultDate !== undefined
      ? defaultDate.split(' ')[0].split('/').reverse().join('-')
      : ''
  );
  const [time, setTime] = useState(
    defaultDate !== undefined ? defaultDate.split(' ')[1] : ''
  );
  const [reason, setReason] = useState(
    defaultReason !== undefined ? defaultReason : ''
  );

  const resetStates = () => {
    if (defaultReason !== undefined && defaultDate !== undefined) {
      setReason(defaultReason);
      setDate(defaultDate.split(' ')[0].split('/').reverse().join('-'));
      setTime(defaultDate.split(' ')[1]);
      return;
    }
    setTime('');
    setDate('');
    setReason('');
  };

  const handleClose = () => {
    setOpenModal(false);
    resetStates();
  };

  const inputsFilled = (): boolean => {
    return date === '' || reason.length === 0 || time.length === 0;
  };

  return (
    <div className={styles.container}>
      <Dialog
        sx={{ borderRadius: '1.5vh' }}
        open={openModal}
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
          }}
        >
          <div className={styles.pickerContainer}>
            <input
              defaultValue={date}
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
              defaultValue={time}
              className={styles.timeInput}
              type="time"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setTime(e.target.value);
              }}
            />
          </div>
          <input
            defaultValue={reason}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setReason(e.target.value);
            }}
            maxLength={20}
            placeholder="סיבה לשתיה"
          />
          <div className={styles.actionContainer}>
            <button
              className={
                inputsFilled() ? styles.modalBtnDisabled : styles.modalBtn
              }
              disabled={inputsFilled() ? true : false}
              onClick={() => {
                handleClose();
              }}
            >
              שמור
            </button>
            <button
              className={styles.modalBtn}
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
