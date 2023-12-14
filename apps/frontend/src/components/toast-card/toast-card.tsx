import Toast from '../toast/toast';
import styles from './toast-card.module.css';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

/* eslint-disable-next-line */
export interface ToastCardProps {}

export function ToastCard(props: ToastCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.add_toast}>
        <button className={styles.add_btn}>
          <ControlPointIcon />
        </button>
      </div>
      <ul>
        <li>
          <Toast></Toast>
        </li>
        <li>
          <Toast></Toast>
        </li>
        <li>
          <Toast></Toast>
        </li>
        <li>
          <Toast></Toast>
        </li>
      </ul>
    </div>
  );
}

export default ToastCard;
