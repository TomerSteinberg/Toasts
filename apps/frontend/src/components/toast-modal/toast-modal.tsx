import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import styles from './toast-modal.module.css';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import {
  DatePicker,
  DateValidationError,
  PickerChangeHandlerContext,
  TimePicker,
} from '@mui/x-date-pickers';
import { useState } from 'react';

export interface Props {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export const ToastModal: React.FC<Props> = ({ openModal, setOpenModal }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');

  const handleClose = () => {
    setOpenModal(false);
  };

  const resetStates = () => {
    setTime('');
    setDate('');
    setReason('');
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
          הוספת שתיה
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
              className={styles.userInput}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (new Date(e.target.value) >= new Date()) {
                  setDate(e.target.value);
                  return;
                }
                setDate('');
              }}
              type="date"
            ></input>
            <input
              className={styles.timeInput}
              type="time"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setTime(e.target.value);
              }}
            ></input>
          </div>
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setReason(e.target.value);
            }}
            maxLength={20}
            placeholder="סיבה לשתיה"
            className={styles.userInput}
          ></input>
          <div className={styles.actionContainer}>
            <button
              className={
                date === '' || reason.length === 0 || time.length === 0
                  ? styles.modalBtnDisabled
                  : styles.modalBtn
              }
              disabled={
                date === '' || reason.length === 0 || time.length === 0
                  ? true
                  : false
              }
              onClick={() => {
                handleClose();
                resetStates();
              }}
            >
              קביעה
            </button>
            <button
              className={styles.modalBtn}
              onClick={() => {
                handleClose();
                resetStates();
              }}
            >
              סגירה
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
