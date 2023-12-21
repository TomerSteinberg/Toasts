import { Toast } from '../toast';
import styles from './toast-card.module.css';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Card } from '../card';
import { Tooltip } from '@mui/material';
import { useGetFutureToastsQuery } from '../../store/services/toast.api';
import { format } from 'date-fns';
import { useState } from 'react';
import { ToastModal } from '../toast-modal';

export const ToastCard = () => {
  const { data: futureToasts } = useGetFutureToastsQuery();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card title="🍺שתיות קרובות" width="40%" height="95vh">
      <div className={styles.addToast}>
        <button
          className={styles.addBtn}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <Tooltip title="הוספת שתיה" placement="left">
            <ControlPointIcon />
          </Tooltip>
        </button>
        <ToastModal
          title="הוספת שתיה"
          setOpenModal={setIsOpen}
          openModal={isOpen}
        />
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
