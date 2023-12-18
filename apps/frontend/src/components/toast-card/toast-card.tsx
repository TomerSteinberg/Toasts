import { Toast } from '../toast';
import styles from './toast-card.module.css';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Card } from '../card';
import { Tooltip } from '@mui/material';
import { useGetFutureToastsQuery } from '../../store/services/toast.api';
import { format } from 'date-fns';

export const ToastCard = () => {
  const { data: futureToasts } = useGetFutureToastsQuery();
  return (
    <Card title="🍺שתיות קרובות">
      <div className={styles.addToast}>
        <button className={styles.addBtn}>
          <Tooltip title="הוספת שתיה" placement="left">
            <ControlPointIcon />
          </Tooltip>
        </button>
      </div>
      <ul>
        {futureToasts === undefined || futureToasts.length === 0 ? (
          <li>
            <p className={styles.empty}>אין שתיות</p>
          </li>
        ) : (
          futureToasts.map((toast) => {
            return (
              <li key={toast.id}>
                <Toast
                  name={toast.user.username}
                  date={format(new Date(toast.date), 'dd/MM/yyyy kk:mm')}
                  reason={toast.reason}
                ></Toast>
              </li>
            );
          })
        )}
      </ul>
    </Card>
  );
};
