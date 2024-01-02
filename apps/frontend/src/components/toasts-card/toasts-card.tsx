import { Toast } from '../toast';
import styles from './toasts-card.module.css';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Card } from '../card';
import { Tooltip } from '@mui/material';
import { useGetFutureToastsQuery } from '../../store/services';
import { format } from 'date-fns';
import { useState } from 'react';
import { ToastModal } from '../toast-modal';
import { useLoginMutation } from '../../store/services';

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
        {!futureToasts || !futureToasts.length ? (
          <li>
            <p className={styles.empty}>אין שתיות</p>
          </li>
        ) : (
          futureToasts.map(({ id, user, date, reason, userId }) => {
            return (
              <li key={id} className={styles.toast}>
                <Toast
                  isPastToast={false}
                  name={user.username}
                  date={format(new Date(date), 'dd/MM/yyyy kk:mm')}
                  reason={reason}
                  isUserToast={
                    result.data && userId === result.data.id ? true : false
                  }
                  id={id}
                  userId={userId}
                ></Toast>
              </li>
            );
          })
        )}
      </ul>
    </Card>
  );
};
