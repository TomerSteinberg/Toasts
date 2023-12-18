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
  console.log(toastNumber);

  return (
    <Card title="🏆לוח תוצאות">
      <ul className={styles.score_list}>
        {leaderboard?.map((placement, index) => {
          return (
            <li key={placement.user.id}>
              <Score
                username={placement.user.username}
                score={placement.toasts}
                placement={index + 1}
              />
            </li>
          );
        })}
      </ul>
      <div className={styles.count_container}>
        <h1 className={styles.toast_number}>
          {toastNumber?.currentPeriod} / {toastNumber?.record}
        </h1>
        <div className={styles.number_label}>
          <label>נוכחי</label>
          <label>שיא </label>
        </div>
      </div>
    </Card>
  );
};
