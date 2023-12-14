import styles from './score.module.css';

/* eslint-disable-next-line */
export interface ScoreProps {}

export const Score: React.FC<ScoreProps> = (props: ScoreProps) => {
  return (
    <div className={styles.container}>
      <h2 className="placement">תומר 1</h2>
      <p>6</p>
    </div>
  );
};

export default Score;
