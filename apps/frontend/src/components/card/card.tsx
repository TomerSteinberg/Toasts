import styles from './card.module.css';
import Toast from '../toast/toast';

/* eslint-disable-next-line */
export interface CardProps {}

export const Card = (props: CardProps) => {
  return (
    <div className={styles.container}>
      <Toast></Toast>
    </div>
  );
};

export default Card;
