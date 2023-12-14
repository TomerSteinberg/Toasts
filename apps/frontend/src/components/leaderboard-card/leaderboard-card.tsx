import { Score } from '../score';
import styles from './leaderboard-card.module.css';
import { Card } from '../card';

export const LeaderboardCard = () => {
  return (
    <Card title="🏆לוח תוצאות">
      <ul className={styles.score_list}>
        <li>
          <Score></Score>
        </li>
        <li>
          <Score></Score>
        </li>
        <li>
          <Score></Score>
        </li>
        <li>
          <Score></Score>
        </li>
        <li>
          <Score></Score>
        </li>
        <li>
          <Score></Score>
        </li>
        <li>
          <Score></Score>
        </li>
      </ul>
      <div className={styles.count_container}>
        <h1 className={styles.toast_number}>32 / 35</h1>
        <div className={styles.number_label}>
          <label>נוכחי</label>
          <label>שיא </label>
        </div>
      </div>
    </Card>
  );
};
