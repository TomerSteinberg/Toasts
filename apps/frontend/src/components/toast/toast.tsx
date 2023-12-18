import styles from './toast.module.css';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { Tooltip } from '@mui/material';

export interface Props {
  name: string;
  date: string;
  reason: string;
}
export const Toast: React.FC<Props> = ({ name, date, reason }) => {
  return (
    <div className={styles.container}>
      <button className={styles.toastBtn}>
        <Tooltip title="מחיקת שתיה">
          <ClearIcon className={styles.toastIcon} />
        </Tooltip>
      </button>
      <p>{name}</p>
      <p>{date}</p>
      <p>{reason}</p>
      <button className={styles.toastBtn}>
        <Tooltip title="שינוי שתיה">
          <EditIcon className={styles.toastIcon} />
        </Tooltip>
      </button>
    </div>
  );
};
