import { Toast } from '../toast';
import styles from './toast-card.module.css';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Card } from '../card';
import { Tooltip } from '@mui/material';

export const ToastCard = () => {
  return (
    <Card title="🍺שתיות קרובות">
      <div className={styles.add_toast}>
        <button className={styles.add_btn}>
          <Tooltip title="הוספת שתיה" placement="left">
            <ControlPointIcon />
          </Tooltip>
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
    </Card>
  );
};
