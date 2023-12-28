import { Toast } from '../toast';
import styles from './toasts-card.module.css';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Card } from '../card';
import { Tooltip } from '@mui/material';
import { useGetFutureToastsQuery } from '../../store/services/toast.api';
import { format } from 'date-fns';
import { useState } from 'react';
import { ToastModal } from '../toast-modal';
import { useLoginMutation } from '../../store/services/user.api';

export const ToastsCard = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, result] = useLoginMutation({
    fixedCacheKey: 'userKey',
  });

  const { data: futureToasts } = useGetFutureToastsQuery();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card title="🍺שתיות קרובות" width="40vw" height="95vh">
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
        <ToastModal title="הוספת שתיה" setIsOpen={setIsOpen} isOpen={isOpen} />
      </div>
      <ul className={styles.toastList}>
        {futureToasts === undefined || futureToasts.length === 0 ? (
          <li>
            <p className={styles.empty}>אין שתיות</p>
          </li>
        ) : (
          futureToasts.map((toast) => {
            return (
              <li key={toast.id} className={styles.toast}>
                <Toast
                  isPastToast={false}
                  name={toast.user.username}
                  date={format(new Date(toast.date), 'dd/MM/yyyy kk:mm')}
                  reason={toast.reason}
                  isUserToast={
                    result.data !== undefined && toast.userId === result.data.id
                      ? true
                      : false
                  }
                  id={toast.id}
                  userId={toast.userId}
                ></Toast>
              </li>
            );
          })
        )}
      </ul>
    </Card>
  );
};
