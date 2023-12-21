import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import styles from './list-modal.module.css';
import { Dispatch, SetStateAction } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Toast } from '../toast';

export interface Props {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export const ListModal: React.FC<Props> = ({ openModal, setOpenModal }) => {
  const handleClose = () => {
    setOpenModal(false);
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
        open={openModal}
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
          <ul>
            <li>
              <Toast
                pastToast={true}
                name="test"
                date="2023-10-10 14:48:00+03"
                reason="because"
              ></Toast>
            </li>
            <li>
              <Toast
                pastToast={true}
                name="test"
                date="2023-10-10 14:48:00+03"
                reason="because"
              ></Toast>
            </li>
            <li>
              <Toast
                pastToast={true}
                name="test"
                date="2023-10-10 14:48:00+03"
                reason="because"
              ></Toast>
            </li>
            <li>
              <Toast
                pastToast={true}
                name="test"
                date="2023-10-10 14:48:00+03"
                reason="because"
              ></Toast>
            </li>
            <li>
              <Toast
                pastToast={true}
                name="test"
                date="2023-10-10 14:48:00+03"
                reason="because"
              ></Toast>
            </li>
            <li>
              <Toast
                pastToast={true}
                name="test"
                date="2023-10-10 14:48:00+03"
                reason="because"
              ></Toast>
            </li>
            <li>
              <Toast
                pastToast={true}
                name="test"
                date="2023-10-10 14:48:00+03"
                reason="because"
              ></Toast>
            </li>
            <li>
              <Toast
                pastToast={true}
                name="test"
                date="2023-10-10 14:48:00+03"
                reason="because"
              ></Toast>
            </li>
            <li>
              <Toast
                pastToast={true}
                name="test"
                date="2023-10-10 14:48:00+03"
                reason="because"
              ></Toast>
            </li>
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
};
