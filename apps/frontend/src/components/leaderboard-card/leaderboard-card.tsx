import { Score } from '../score';
import styles from './leaderboard-card.module.css';
import { Card } from '../card';
import {
  useGetLeaderboardQuery,
  useGetTotalToastsQuery,
} from '../../store/services';

export const LeaderboardCard = () => {
  const { data: leaderboard } = useGetLeaderboardQuery();
  const { data: toastNumber } = useGetTotalToastsQuery();

  return (
    <Card title="🏆לוח תוצאות" width="25vw" height="95vh">
      <div className={styles.emptyContainer}></div>
      <ul className={styles.scoreList}>
        {!leaderboard || !leaderboard.length ? (
          <li>
            <p className={styles.empty}>אין נקודות</p>
          </li>
        ) : (
          leaderboard.map(({ toasts, user }, index) => {
            return (
              <li key={user.id}>
                <Score
                  username={user.username}
                  score={toasts}
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
