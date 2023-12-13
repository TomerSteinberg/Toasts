import styles from './leaderboard.module.css';

/* eslint-disable-next-line */
export interface LeaderboardProps {}

export function Leaderboard(props: LeaderboardProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Leaderboard!</h1>
    </div>
  );
}

export default Leaderboard;
