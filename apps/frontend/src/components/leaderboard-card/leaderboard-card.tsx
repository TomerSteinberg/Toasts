import { Score } from '../score';
import styles from './leaderboard-card.module.css';
import { Card } from '../card';
import {
  useGetLeaderboardQuery,
  useGetTotalToastsQuery,
} from '../../store/services/toast.api';

export const LeaderboardCard = () => {
  const { data: leaderboard } = useGetLeaderboardQuery();
  const { data: toastNumber } = useGetTotalToastsQuery();

  return (
    <Card title="🏆לוח תוצאות" width="25vw" height="95vh">
      <div className={styles.emptyContainer}></div>
      <ul className={styles.scoreList}>
        {leaderboard === undefined || leaderboard.length === 0 ? (
          <li>
            <p className={styles.empty}>אין נקודות</p>
          </li>
        ) : (
          leaderboard.map((entry, index) => {
            return (
              <li key={entry.user.id}>
                <Score
                  username={entry.user.username}
                  score={entry.toasts}
                  placement={index + 1}
                />
              </li>
            );
          })
        )}
      </ul>
      <div className={styles.countContainer}>
        <h1 className={styles.toastNumber}>
          {!toastNumber
            ? 'אין / אין'
            : toastNumber.currentPeriod + ' / ' + toastNumber.record}
        </h1>
        <div className={styles.numberLabel}>
          <label className={styles.recordLabel}>נוכחי</label>
          <label className={styles.recordLabel}>שיא </label>
        </div>
      </div>
    </Card>
  );
};
