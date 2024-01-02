import styles from './card.module.css';
import { PropsWithChildren } from 'react';

export interface Props {
  title: string;
  width: string;
  height: string;
}

export const Card: React.FC<Props & PropsWithChildren> = ({
  title,
  width,
  height,
  children,
}) => {
  return (
    <div className={styles.container} style={{ width, height }}>
      {<h1>{title}</h1>}
      {children}
    </div>
  );
};
