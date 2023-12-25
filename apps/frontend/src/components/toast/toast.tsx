import styles from './toast.module.css';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { Tooltip, Checkbox } from '@mui/material';
import { useState } from 'react';
import { ToastModal } from '../toast-modal';

export interface Props {
  name: string;
  date: string;
  reason: string;
  pastToast: boolean;
  isUserToast: boolean;
  isConvicting?: boolean;
}
export const Toast: React.FC<Props> = ({
  name,
  date,
  reason,
  pastToast,
  isUserToast,
  isConvicting,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      {!pastToast && isUserToast && (
        <button className={styles.toastBtn}>
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
        openModal={isOpen}
        setOpenModal={setIsOpen}
        defaultDate={date}
        defaultReason={reason}
      />
    </div>
  );
};
