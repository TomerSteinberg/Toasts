import styles from './card.module.css';
import Criminal from '../criminal/criminal';
import Toast from '../toast/toast';
import Score from '../score/score';

/* eslint-disable-next-line */
export interface CardProps {
  title: string;
}

export const Card: React.FC<CardProps> = (props: CardProps) => {
  return (
    <div className={styles.container}>
      <h1>{props.title}</h1>
      <ul>
        <li>
          <Criminal></Criminal>
        </li>
        <li>
          <Toast></Toast>
        </li>
        <li>
          <Score></Score>
        </li>
      </ul>
    </div>
  );
};

export default Card;
