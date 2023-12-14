import styles from './card.module.css';
import Criminal from '../criminal/criminal';
import Toast from '../toast/toast';
import { ReactElement } from 'react';

/* eslint-disable-next-line */
export interface CardProps {
  title: string;
  children: ReactElement;
}

export const Card: React.FC<CardProps> = (props: CardProps) => {
  return (
    <div className={styles.container}>
      {<h1>{props.title}</h1>}
      {props.children}
    </div>
  );
};

export default Card;
