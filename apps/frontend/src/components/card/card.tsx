import styles from './card.module.css';
import { PropsWithChildren } from 'react';

export interface Props {
  title: string;
}

export const Card: React.FC<Props & PropsWithChildren> = ({
  title,
  children,
}) => {
  return (
    <div className={styles.container}>
      {<h1>{title}</h1>}
      {children}
    </div>
  );
};
