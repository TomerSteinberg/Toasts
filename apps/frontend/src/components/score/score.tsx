import styles from './score.module.css';

export interface Props {
  placement: number;
  username: string;
  score: number;
}

export const Score: React.FC<Props> = ({ placement, username, score }) => {
  return (
    <div className={styles.container}>
      <h2 className="placement">{placement}#</h2>
      <p>{username}</p>
      <p>{score}</p>
    </div>
  );
};
