import styles from './score.module.css';

export interface Props {
  placement: number;
  username: string;
  score: number;
}

export const Score: React.FC<Props> = ({ placement, username, score }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.scoreText}>#{placement}</h2>
      <p className={styles.scoreText}>{username}</p>
      <p className={styles.scoreText}>{score}</p>
    </div>
  );
};
