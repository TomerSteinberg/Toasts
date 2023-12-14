import Score from '../score/score';
import styles from './leaderboard-card.module.css';

/* eslint-disable-next-line */
export interface LeaderboardCardProps {}

export function LeaderboardCard(props: LeaderboardCardProps) {
  return (
    <>
      <ul>
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
      <div className="count_container">
        <h1 className={styles.toast_number}>32 / 35</h1>
        <div className={styles.number_label}>
          <label>נוכחי</label>
          <label>שיא </label>
        </div>
      </div>
    </>
  );
}

export default LeaderboardCard;
