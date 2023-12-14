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
    </div>
  );
};

export default Card;
